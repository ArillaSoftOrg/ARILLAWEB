/**
 * Single source of truth for ArillaSoft's company identity data — the
 * fields that must stay identical across the footer, contact page,
 * structured data (Organization JSON-LD), maintenance notice, and any
 * future CTA/local-SEO content.
 *
 * PHASE 3 TRUST AUDIT (see the Phase 3 report in conversation history for
 * the full conflict matrix): several of these fields have multiple,
 * contradictory values live in the repo today. This file intentionally
 * does NOT pick a winner — that requires the business owner to confirm
 * the real value. Until then:
 *   - Fields with ONE consistent value across the codebase are
 *     consolidated here for real, and their call sites now import from
 *     here instead of repeating the literal.
 *   - Fields that are IN CONFLICT are exported as `null` here. Existing
 *     call sites keep their current (historical, possibly wrong) literal
 *     value unchanged — migrating them to `null` would put a blank/broken
 *     contact detail in front of real visitors, which is worse than a
 *     known inconsistency. Each such call site has a comment pointing
 *     back to this file. Once a field below is confirmed, update it here
 *     and then migrate every commented call site to import it.
 */

/** Consistent across all 3 call sites found in the repo (Footer, DesignInquiryForm, SupportChatWidget) — safe to centralize. */
export const WHATSAPP_NUMBER = '905422535192';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Consistent across Footer and OrganizationJsonLd (Footer additionally has X/Twitter, which OrganizationJsonLd was missing — added here). */
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/arillasoft',
  github: 'https://github.com/arillasoft',
  instagram: 'https://instagram.com/arillasoft',
  twitter: 'https://twitter.com/arillasoft',
} as const;

/**
 * CONFLICTING — do not populate without explicit confirmation from the
 * business owner. See the Phase 3 report for every location each
 * candidate value currently appears in.
 */
export const COMPANY_CONTACT = {
  /** Conflict: "info@arillasoft.com" (contact page) vs "iletisim@arillasoft.com" (footer) vs "hello@arillasoft.com" (maintenance notice). */
  email: null as string | null,
  /** Conflict: "+90 (555) 000 00 00" (contact page, explicitly a known placeholder) vs the real-looking WhatsApp number above. */
  phone: null as string | null,
  /** Conflict: "İstanbul, Türkiye" (contact page) vs "Konyaaltı / Antalya" (footer, both locales). The admin-managed SiteSetting DB record's `address` field is also null — no authoritative source exists yet anywhere in the system. */
  location: null as string | null,
} as const;
