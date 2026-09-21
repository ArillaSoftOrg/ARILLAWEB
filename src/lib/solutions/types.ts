// Type definitions for the Arillasoft solution/package catalog.
//
// IMPORTANT — COMMERCIAL DATA IS TEMPORARY:
// Every price, deliveryDays and revisionCount value that flows through these
// types is a TEMPORARY PLACEHOLDER (see data.ts header). These types exist so
// that placeholder values today, and real verified values later, share one
// shape — nothing here should be read as a guarantee about the numbers.

export type Locale = "tr" | "en";

export type LocalizedText = Record<Locale, string>;

export type PricingType = "fixed" | "startingAt" | "quote";

// amount is always in the currency's smallest common display unit (whole
// TRY), never pre-formatted — display formatting happens at render time via
// Intl.NumberFormat so it can follow the active locale.
export interface PlaceholderPrice {
  amount: number;
  currency: "TRY";
}

export interface PlaceholderExtra {
  id: string;
  label: LocalizedText;
  price: PlaceholderPrice | null;
}

export interface ProcessStep {
  title: LocalizedText;
  description: LocalizedText;
}

export interface SolutionFaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

// A named variant of a solution (e.g. SEO Temel/Standart/Pro, QR Menü
// Basic/Standard/Pro). Tiers carry their own commercial fields so a
// comparison table can be rendered without touching the parent solution's
// own top-level price (which represents the "from" / entry tier).
export interface SolutionTier {
  id: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  pricingType: PricingType;
  price: PlaceholderPrice | null;
  deliveryDays: number | null;
  revisionCount: number | null;
  includedFeatures: LocalizedText[];
}

export type SolutionCategoryId =
  | "web-commerce"
  | "seo-geo"
  | "business-systems"
  | "automation-integrations"
  | "sector-solutions";

export interface SolutionCategory {
  id: SolutionCategoryId;
  name: LocalizedText;
  shortDescription: LocalizedText;
}

export interface Solution {
  id: string;
  /** Shared across the /tr and /en route trees — see data.ts header. */
  slug: string;
  category: SolutionCategoryId;
  title: LocalizedText;
  shortDescription: LocalizedText;

  // Entry-level commercial fields. When `tiers` is present these describe
  // the cheapest/entry tier (so a bare summary card still has a price to
  // show); the tiers themselves carry the authoritative per-tier numbers.
  pricingType: PricingType;
  price: PlaceholderPrice | null;
  deliveryDays: number | null;
  revisionCount: number | null;

  /** Shown on the homepage teaser (4–6 of these) and pinned in catalog filtering. */
  featured: boolean;

  includedFeatures: LocalizedText[];
  optionalExtras: PlaceholderExtra[];
  requirementsFromCustomer: LocalizedText[];
  suitableFor: LocalizedText[];
  process: ProcessStep[];
  deliverables: LocalizedText[];
  faq: SolutionFaqItem[];
  ctaLabel: LocalizedText;

  /** Present only for packages with named variants (SEO, QR Menü, ...). */
  tiers?: SolutionTier[];

  /**
   * Always true today. A literal (not boolean) so a future pass that
   * replaces placeholder figures with verified ones must touch this file
   * and consciously flip it per solution — it can never be silently true.
   */
  isPlaceholder: true;
}
