import type { Prisma } from "@prisma/client";

export type DesignColor = {
  name: string;
  value: string;
  usage: string;
};

export type DesignDna = {
  styleName: string;
  colorPalette: DesignColor[];
  typographyStyle: string;
  visualDirection: string;
  uiCharacteristics: string[];
  layoutCharacteristics: string[];
  interactionStyle: string;
  mobileCharacteristics: string[];
  sectorFeatures: string[];
  suitableFor: string[];
  customizationOptions: string[];
};

const STRING_ARRAY_KEYS = [
  "uiCharacteristics",
  "layoutCharacteristics",
  "mobileCharacteristics",
  "sectorFeatures",
  "suitableFor",
  "customizationOptions",
] as const;

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
      Array.isArray(data[key]) ? data[key].filter((item): item is string => typeof item === "string") : [],
    ]),
  ) as Pick<
    DesignDna,
    | "uiCharacteristics"
    | "layoutCharacteristics"
    | "mobileCharacteristics"
    | "sectorFeatures"
    | "suitableFor"
    | "customizationOptions"
  >;

  return {
    styleName: data.styleName,
    colorPalette,
    typographyStyle: data.typographyStyle,
    visualDirection: data.visualDirection,
    interactionStyle: data.interactionStyle,
    ...stringArrays,
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
