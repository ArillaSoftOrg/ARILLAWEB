/**
 * Configuration for the "Canlı Tasarım Önizlemesi" section on site example
 * detail pages.
 *
 * A reference site can only be embedded if it does NOT send a blocking
 * `X-Frame-Options` header or a restrictive CSP `frame-ancestors` directive.
 * Most large commercial sites do block framing, so verify a candidate before
 * adding it here (see `canBeFramed` below — it is the same check that runs at
 * request time). `npm run verify:frame` (tests/verify-frameable.mjs) does a
 * deeper one-off check — real cross-origin render, not just headers — before
 * a candidate is trusted enough to add.
 *
 * Every reference here points at a template on the Framer Marketplace (or
 * Framer Community). It is never something ArillaSoft built — see the
 * disclosure copy in LivePreviewSection.tsx.
 */

export type DesignPreview = {
  /** Always "Framer" today; kept as a field rather than a hardcoded label so a
   *  future non-Framer reference doesn't require a schema change. */
  referencePlatform: "Framer";
  /** The template's public name, e.g. "Groomix - Pet Grooming Framer Template". */
  referenceTemplateName: string;
  /** The template author/studio, when the marketplace listing credits one. */
  referenceCreator?: string;
  /** Link to the Framer Marketplace (or Community) listing, when known. */
  referenceMarketplaceUrl?: string;
  /** Absolute https:// URL of the live template demo to embed. */
  referencePreviewUrl: string;
  /** Text shown in the fake browser address bar of the preview panel. */
  referenceLabel: string;
  /** Whether `npm run verify:frame` confirmed a real cross-origin render for
   *  this URL during curation. Historical/audit metadata — the runtime gate
   *  is still the live `canBeFramed` header check below, since a site's
   *  headers can change after this was recorded. Not rendered in the UI. */
  referenceIframeVerified: boolean;
  /** Kill switch: set false to hide a reference without deleting its record. */
  referenceEnabled: boolean;
};

/**
 * Keyed by `${sectorSlug}/${projectSlug}` — the two dynamic segments of
 * /tr/site-ornekleri/[sector]/[design]. One entry per existing design; this
 * is not a second catalog, just an attachment of an external reference to a
 * design that already exists in prisma/catalog-seed-data.ts.
 *
 * Sourced from docs/framer-reference-research.json (feat/framer-reference-research).
 */
export const DESIGN_PREVIEWS: Record<string, DesignPreview> = {
  // EML-01 — verified and shipped in an earlier session. Left exactly as it was.
  "emlak-danismanligi/emlak-danismanligi-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Foreal — Real Estate Agency Framer Template",
    referencePreviewUrl: "https://luxurious-truly-737590.framer.app/",
    referenceLabel: "luxurious-truly-737590.framer.app",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // PET — Pet Kuaförü ve Pet Hizmetleri
  "pet-kuaforu-pet-hizmetleri/pet-kuaforu-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "CarePaw - Pet Care & Veterinary Template",
    referenceCreator: "Mezario",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/carepaw/",
    referencePreviewUrl: "https://carepaw.framer.website/",
    referenceLabel: "carepaw.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "pet-kuaforu-pet-hizmetleri/pet-kuaforu-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Groomix - Pet Grooming Framer Template",
    referenceCreator: "Dmytri Ivanov",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/groomix/",
    referencePreviewUrl: "https://groomix.framer.website/",
    referenceLabel: "groomix.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "pet-kuaforu-pet-hizmetleri/pet-kuaforu-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "DRAGO – Dark Creative Agency Template",
    referenceCreator: "Sohel Lunat",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/drago/",
    referencePreviewUrl: "https://drago-template.framer.website/",
    referenceLabel: "drago-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // KUA — Kuaför ve Berber
  "kuafor-berber/kuafor-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Velvera - Hair Salon Website Template",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/velvera/",
    referencePreviewUrl: "https://velvera.framer.website/",
    referenceLabel: "velvera.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "kuafor-berber/kuafor-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Salonix - Hair & Beauty Salon Framer Template",
    referenceCreator: "Nasir Nawaz",
    referenceMarketplaceUrl: "https://www.framer.com/community/marketplace/templates/salonix/",
    referencePreviewUrl: "https://salonix.framer.website/",
    referenceLabel: "salonix.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "kuafor-berber/kuafor-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Barón - Barber Shop Website Template",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/baron/",
    referencePreviewUrl: "https://baron.framer.ai/",
    referenceLabel: "baron.framer.ai",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // GUZ — Güzellik ve Bakım Merkezi
  "guzellik-bakim-merkezi/guzellik-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Xiro SPA - Wellness and Beauty Framer Template",
    referenceCreator: "fourtwelve",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/xiro-spa/",
    referencePreviewUrl: "https://xiro-template.framer.website/",
    referenceLabel: "xiro-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "guzellik-bakim-merkezi/guzellik-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Lusora - Spa & Wellness One-Page Template",
    referenceCreator: "Radu",
    referenceMarketplaceUrl: "https://www.framer.com/community/marketplace/templates/lusora/",
    referencePreviewUrl: "https://lusora.framer.website/",
    referenceLabel: "lusora.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "guzellik-bakim-merkezi/guzellik-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Makeup — Beauty Studio & Portfolio Template",
    referenceCreator: "Blush Creative",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/makeup/",
    referencePreviewUrl: "https://makeup-template.framer.website/",
    referenceLabel: "makeup-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // KLI — Diş Kliniği ve Özel Klinik
  "dis-klinigi-ozel-klinik/dis-klinigi-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Dental - Dentist and Dental Clinic Framer Template",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/dental/",
    referencePreviewUrl: "https://dental-template.framer.website/",
    referenceLabel: "dental-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "dis-klinigi-ozel-klinik/dis-klinigi-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Laurel - Modern Dermatology Template",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/laurel/",
    referencePreviewUrl: "https://laurel-template.framer.website/",
    referenceLabel: "laurel-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "dis-klinigi-ozel-klinik/dis-klinigi-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Dentry - Modern Dentist Boutique Template",
    referenceMarketplaceUrl: "https://www.framer.com/community/marketplace/templates/dentry/",
    referencePreviewUrl: "https://dentry.framer.website/",
    referenceLabel: "dentry.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // RES — Restoran ve Kafe
  "restoran-kafe/restoran-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Sofra Restaurant Template",
    referenceCreator: "Framerbucket",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/sofra/",
    referencePreviewUrl: "https://sofra.framer.website/",
    referenceLabel: "sofra.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "restoran-kafe/restoran-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Plate – Restaurant & Cafe Website Template",
    referenceCreator: "Toni Järvinen",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/plate/",
    referencePreviewUrl: "https://plate-template.framer.website/",
    referenceLabel: "plate-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "restoran-kafe/restoran-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Monks Crave",
    referenceCreator: "Design Monks",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/monks-crave/",
    referencePreviewUrl: "https://monkscrave.framer.website/",
    referenceLabel: "monkscrave.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // EML — Emlak Danışmanlığı (EML-01 above, unchanged)
  "emlak-danismanligi/emlak-danismanligi-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Villa Sofia",
    referenceCreator: "ena supply",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/villa-sofia/",
    referencePreviewUrl: "https://villa-sofia.framer.website/",
    referenceLabel: "villa-sofia.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "emlak-danismanligi/emlak-danismanligi-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Tropica",
    referenceCreator: "Fikri",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/tropica/",
    referencePreviewUrl: "https://tropica.framer.website/",
    referenceLabel: "tropica.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // OTO — Otomotiv Servisi ve Araç Bakım
  "otomotiv-servisi-arac-bakim/otomotiv-servisi-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Autofix - Auto Mechanic Framer Template",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/autofix/",
    referencePreviewUrl: "https://autofix-template.framer.website/",
    referenceLabel: "autofix-template.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "otomotiv-servisi-arac-bakim/otomotiv-servisi-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Origo.Studio",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/origostudio/",
    referencePreviewUrl: "https://origostudio.framer.media/",
    referenceLabel: "origostudio.framer.media",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "otomotiv-servisi-arac-bakim/otomotiv-servisi-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "RevX | Premium Body Shop & Car Garage Framer Template",
    referenceCreator: "Drew Builds",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/revx/",
    referencePreviewUrl: "https://revx.framer.website/",
    referenceLabel: "revx.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },

  // MIM — Mimarlık, Dekorasyon ve İnşaat
  "mimarlik-dekorasyon-insaat/mimarlik-dekorasyon-modern-donusum": {
    referencePlatform: "Framer",
    referenceTemplateName: "Refit - Construction & Renovation Website Template",
    referenceCreator: "JJ Gerrish",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/refit/",
    referencePreviewUrl: "https://refit.framer.website/",
    referenceLabel: "refit.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "mimarlik-dekorasyon-insaat/mimarlik-dekorasyon-sade-editoryal": {
    referencePlatform: "Framer",
    referenceTemplateName: "Mood Design",
    referenceCreator: "Filip Banasiak",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/mood-design/",
    referencePreviewUrl: "https://mooddesign.framer.website/",
    referenceLabel: "mooddesign.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
  "mimarlik-dekorasyon-insaat/mimarlik-dekorasyon-premium-koyu": {
    referencePlatform: "Framer",
    referenceTemplateName: "Nave – Architecture Studio Template",
    referenceCreator: "V2SPACE",
    referenceMarketplaceUrl: "https://www.framer.com/marketplace/templates/nave/",
    referencePreviewUrl: "https://nave.framer.website/",
    referenceLabel: "nave.framer.website",
    referenceIframeVerified: true,
    referenceEnabled: true,
  },
};

export function getDesignPreview(sector: string, design: string): DesignPreview | null {
  const preview = DESIGN_PREVIEWS[`${sector}/${design}`];
  if (!preview || !preview.referenceEnabled) return null;

  // Test-only escape hatch. `DESIGN_PREVIEW_TEST_URL` is set by the automated
  // responsive test (npm run test:preview) so the section can be exercised
  // against a local fixture without hitting a real third-party site by default.
  const testUrl = process.env.DESIGN_PREVIEW_TEST_URL;
  if (testUrl) return { ...preview, referencePreviewUrl: testUrl };

  return preview;
}

/** Response headers that mark a bot-protection interstitial rather than the
 *  real page. */
const CHALLENGE_HEADERS = ["x-amzn-waf-action", "cf-mitigated", "x-datadome"];

/**
 * Checks whether a URL permits being framed by us.
 *
 * Reads response headers only — the body is never read, forwarded or re-served,
 * so this is a preflight check and not a proxy. Nothing here bypasses or
 * weakens the target's security headers; a blocking header simply results in
 * `false` and the UI shows an unavailable state instead of a broken iframe.
 *
 * Cached for 24h (Next 16 does not cache `fetch` by default), so this costs one
 * upstream request per day rather than one per visitor.
 */
export async function canBeFramed(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });

    // Only a plain 200 is the real page. A bot-protection interstitial answers
    // with its own status (AWS WAF uses 202) and carries none of the origin's
    // headers, so anything else would let us inspect the wrong response.
    if (response.status !== 200) return false;

    // Sites behind a bot challenge cannot be framed either: the challenge needs
    // third-party cookies, which a sandboxed cross-site frame cannot set.
    const challenged = CHALLENGE_HEADERS.some((header) => response.headers.has(header));
    if (challenged) return false;

    const frameOptions = (response.headers.get("x-frame-options") ?? "").toLowerCase();
    if (frameOptions.includes("deny") || frameOptions.includes("sameorigin")) return false;

    const csp = response.headers.get("content-security-policy") ?? "";
    const frameAncestors = /frame-ancestors([^;]*)/i.exec(csp)?.[1]?.toLowerCase().trim();
    if (frameAncestors) {
      const permitsUs =
        frameAncestors.includes("*") || frameAncestors.includes("arillasoft");
      if (!permitsUs) return false;
    }

    return true;
  } catch {
    // Timeout, DNS failure, or a bot-protection challenge — treat as not embeddable.
    return false;
  }
}
