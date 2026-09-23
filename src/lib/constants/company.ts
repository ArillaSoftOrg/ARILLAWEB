/**
 * Single source of truth for ArillaSoft's company identity data — the
 * fields that must stay identical across the footer, contact page,
 * structured data (Organization JSON-LD), maintenance notice, WhatsApp
 * CTAs, and local SEO content (city pages).
 *
 * PHASE 4 UPDATE: location, phone, and email are now verified by the
 * business owner (see the Phase 4 report in conversation history) and
 * populated below. Every call site that used to carry a conflicting
 * literal (contact page's "info@..."/"İstanbul, Türkiye/placeholder
 * phone", footer's "iletisim@...", the maintenance notice's "hello@...")
 * has been migrated to import from here — see each file's own diff.
 *
 * The one thing still deliberately NOT touched by this file: /cozumler
 * package pricing. That remains `isPlaceholder: true` and out of scope —
 * never reference it from here or from local SEO content.
 */

/** Consistent across all 3 call sites found in the repo (Footer, DesignInquiryForm, SupportChatWidget) — verified correct in Phase 4. */
export const WHATSAPP_NUMBER = '905422535192';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Consistent across Footer and OrganizationJsonLd. */
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/arillasoft',
  github: 'https://github.com/arillasoft',
  instagram: 'https://instagram.com/arillasoft',
  twitter: 'https://twitter.com/arillasoft',
} as const;

/**
 * Verified by the business owner in Phase 4. `location` intentionally
 * stays district/city/country text only — the supplied Google location
 * link (see `googleMapsUrl` below) did not resolve to a verifiable street
 * address in this environment (Google's share.google redirect requires a
 * live browser session/JS this tooling doesn't have), so no street
 * address, postal code, or lat/long is invented here. If a precise
 * address is later confirmed, add it here — nowhere else.
 */
export const COMPANY_CONTACT = {
  email: 'arillasoft@gmail.com',
  /** E.164-ish international form, for tel: links and structured data. */
  phone: '+90 542 253 51 92',
  /** Turkish local display form, for on-page text. */
  phoneDisplay: '0542 253 51 92',
  location: 'Konyaaltı, Antalya, Türkiye',
  locationShort: 'Antalya, Konyaaltı',
  /** Supplied by the business owner; kept as the "view on the map" link. Not parsed for an address — see the note above. */
  googleMapsUrl: 'https://share.google/YmxPBVWI2D0QtPh0o',
} as const;
