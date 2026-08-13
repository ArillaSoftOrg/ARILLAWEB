import type { Prisma } from "@prisma/client";

export type DesignColor = {
  name: string;
  value: string;
  usage: string;
};

export type DesignSectorFeature = { title: string; description: string };
export type DesignCustomizationOption = { title: string; description: string };
export type DesignAudienceFit = { title: string; description: string };
export type DesignKeyDecision = { title: string; description: string };

export type DesignDna = {
  styleName: string;
  colorPalette: DesignColor[];
  typographyStyle: string;
  visualDirection: string;
  uiCharacteristics: string[];
  layoutCharacteristics: string[];
  interactionStyle: string;
  mobileCharacteristics: string[];
  sectorFeatures: DesignSectorFeature[];
  suitableFor: DesignAudienceFit[];
  customizationOptions: DesignCustomizationOption[];
  contextualAccent: string;
  keyDecisions: DesignKeyDecision[];
};

const STRING_ARRAY_KEYS = ["uiCharacteristics", "layoutCharacteristics", "mobileCharacteristics"] as const;

const ITEM_LIST_FALLBACKS: Record<"sectorFeatures" | "customizationOptions" | "suitableFor", string> = {
  sectorFeatures: "Marka içeriğiniz ve çalışma şeklinizle uyumlu hale getirilir.",
  customizationOptions: "İhtiyacınıza göre birlikte netleştirilir.",
  suitableFor: "Bu tasarım yönü işletmenizin ihtiyaçlarına uyarlanabilir.",
};

const DEFAULT_ACCENT = "#2B4BF2";
const MIN_KEY_DECISIONS = 4;
const MAX_KEY_DECISIONS = 8;

export function parseDesignDna(value: Prisma.JsonValue | null | undefined): DesignDna | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Partial<Record<keyof DesignDna, unknown>>;

  if (
    typeof data.styleName !== "string" ||
    typeof data.typographyStyle !== "string" ||
    typeof data.visualDirection !== "string" ||
    typeof data.interactionStyle !== "string" ||
    !Array.isArray(data.colorPalette)
  ) {
    return null;
  }

  const colorPalette = data.colorPalette.filter(isDesignColor);
  if (colorPalette.length < 4) return null;

  const stringArrays = Object.fromEntries(
    STRING_ARRAY_KEYS.map((key) => [
      key,
      Array.isArray(data[key]) ? (data[key] as unknown[]).filter((item): item is string => typeof item === "string") : [],
    ]),
  ) as Pick<DesignDna, (typeof STRING_ARRAY_KEYS)[number]>;

  const sectorFeatures = parseItemList(data.sectorFeatures, "sectorFeatures");
  const customizationOptions = parseItemList(data.customizationOptions, "customizationOptions");
  const suitableFor = parseItemList(data.suitableFor, "suitableFor");

  const contextualAccent = parseContextualAccent(data.contextualAccent, colorPalette);

  const keyDecisions = parseKeyDecisions(data.keyDecisions, {
    styleName: data.styleName,
    uiCharacteristics: stringArrays.uiCharacteristics,
    layoutCharacteristics: stringArrays.layoutCharacteristics,
    mobileCharacteristics: stringArrays.mobileCharacteristics,
  });

  return {
    styleName: data.styleName,
    colorPalette,
    typographyStyle: data.typographyStyle,
    visualDirection: data.visualDirection,
    interactionStyle: data.interactionStyle,
    ...stringArrays,
    sectorFeatures,
    customizationOptions,
    suitableFor,
    contextualAccent,
    keyDecisions,
  };
}

function isDesignColor(value: unknown): value is DesignColor {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const color = value as Partial<DesignColor>;
  return (
    typeof color.name === "string" &&
    /^#[0-9a-f]{6}$/i.test(color.value ?? "") &&
    typeof color.usage === "string"
  );
}

function isTitledItem(value: unknown): value is { title: string; description: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as { title?: unknown; description?: unknown };
  return typeof item.title === "string" && typeof item.description === "string";
}

/** Accepts either the current `{title,description}[]` shape or the legacy
 *  `string[]` shape (wrapped with a field-specific fallback sentence), so a
 *  DB row that hasn't been reseeded yet still renders instead of 404ing. */
function parseItemList(
  raw: unknown,
  field: keyof typeof ITEM_LIST_FALLBACKS,
): { title: string; description: string }[] {
  if (!Array.isArray(raw)) return [];
  const fallback = ITEM_LIST_FALLBACKS[field];
  const items: { title: string; description: string }[] = [];
  for (const entry of raw) {
    if (isTitledItem(entry)) {
      items.push({ title: entry.title, description: entry.description });
    } else if (typeof entry === "string") {
      items.push({ title: entry, description: fallback });
    }
  }
  return items;
}

function parseContextualAccent(raw: unknown, colorPalette: DesignColor[]): string {
  if (typeof raw === "string" && /^#[0-9a-f]{6}$/i.test(raw)) return raw;

  const labeled = colorPalette.find((color) => /vurgu|accent/i.test(color.usage));
  if (labeled) return labeled.value;

  if (colorPalette[1]) return colorPalette[1].value;

  return DEFAULT_ACCENT;
}

function parseKeyDecisions(
  raw: unknown,
  fallbackSource: {
    styleName: string;
    uiCharacteristics: string[];
    layoutCharacteristics: string[];
    mobileCharacteristics: string[];
  },
): DesignKeyDecision[] {
  if (Array.isArray(raw)) {
    const items = raw.filter(isTitledItem).slice(0, MAX_KEY_DECISIONS);
    if (items.length >= MIN_KEY_DECISIONS) return items;
  }

  const phrases = [
    ...fallbackSource.uiCharacteristics,
    ...fallbackSource.layoutCharacteristics,
    ...fallbackSource.mobileCharacteristics,
  ].slice(0, MAX_KEY_DECISIONS);

  return phrases.map((phrase) => ({
    title: phrase,
    description: `${phrase}, ${fallbackSource.styleName} kimliğinin bir parçası olarak uygulanır.`,
  }));
}
