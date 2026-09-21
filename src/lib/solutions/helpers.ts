import { SOLUTIONS } from "./data";
import { SOLUTION_CATEGORIES } from "./categories";
import type { Locale, PlaceholderPrice, PricingType, Solution, SolutionCategoryId } from "./types";

export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getFeaturedSolutions(): Solution[] {
  return SOLUTIONS.filter((s) => s.featured);
}

export function getSolutionsByCategory(category: SolutionCategoryId): Solution[] {
  return SOLUTIONS.filter((s) => s.category === category);
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return SOLUTIONS.map((s) => s.slug);
}

export function getCategories() {
  return SOLUTION_CATEGORIES;
}

/**
 * Formats a TEMPORARY PLACEHOLDER price for display. Returns null for quote
 * pricing (no PlaceholderPrice) so callers render the "quote" copy instead.
 */
export function formatPlaceholderPrice(locale: Locale, price: PlaceholderPrice | null): string | null {
  if (!price) return null;
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "tr-TR", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}

const QUOTE_LABEL: Record<Locale, string> = {
  tr: "Özel Fiyatlandırma",
  en: "Custom Pricing",
};

const STARTING_AT_PREFIX: Record<Locale, (amount: string) => string> = {
  tr: (amount) => `${amount}'den başlayan`,
  en: (amount) => `From ${amount}`,
};

/**
 * Renders a short, locale-aware price line for a card or detail header —
 * e.g. "29.900 ₺'den başlayan", "3.900 ₺", or "Özel Fiyatlandırma". The
 * underlying figures are TEMPORARY PLACEHOLDERS (see data.ts); this only
 * formats whatever is passed in.
 */
export function getPriceLabel(
  locale: Locale,
  pricingType: PricingType,
  price: PlaceholderPrice | null
): string {
  if (pricingType === "quote" || !price) return QUOTE_LABEL[locale];
  const formatted = formatPlaceholderPrice(locale, price)!;
  return pricingType === "startingAt" ? STARTING_AT_PREFIX[locale](formatted) : formatted;
}

const DELIVERY_LABEL: Record<Locale, (days: number) => string> = {
  tr: (days) => `${days} gün teslim`,
  en: (days) => `${days}-day delivery`,
};

const DELIVERY_QUOTE_LABEL: Record<Locale, string> = {
  tr: "Kapsam görüşmesiyle belirlenir",
  en: "Set after the scoping call",
};

export function getDeliveryLabel(locale: Locale, deliveryDays: number | null): string {
  return deliveryDays === null ? DELIVERY_QUOTE_LABEL[locale] : DELIVERY_LABEL[locale](deliveryDays);
}
