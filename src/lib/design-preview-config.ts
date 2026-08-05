/**
 * Configuration for the "Canlı Tasarım Önizlemesi" section on site example
 * detail pages.
 *
 * A reference site can only be embedded if it does NOT send a blocking
 * `X-Frame-Options` header or a restrictive CSP `frame-ancestors` directive.
 * Most large commercial sites do block framing, so verify a candidate before
 * adding it here (see `canBeFramed` below — it is the same check that runs at
 * request time).
 */

/** Sentinel meaning "no verified embeddable URL yet". While an entry holds this
 *  value the preview section does not render at all. */
export const PREVIEW_URL_PLACEHOLDER = "REPLACE_WITH_EMBEDDABLE_URL";

export type DesignPreview = {
  /** Absolute https:// URL of the reference site to embed. */
  url: string;
  /** Text shown in the fake browser address bar of the preview panel. */
  label: string;
};

/**
 * Keyed by `${sectorSlug}/${projectSlug}` — the two dynamic segments of
 * /tr/site-ornekleri/[sector]/[design].
 *
 * >>> TO ENABLE A PREVIEW: replace the `url` value below with a reference site
 * >>> you have confirmed is embeddable. That single line is the only change
 * >>> needed; the section appears automatically once it is a real URL.
 */
export const DESIGN_PREVIEWS: Record<string, DesignPreview> = {
  "emlak-danismanligi/emlak-danismanligi-modern-donusum": {
    url: PREVIEW_URL_PLACEHOLDER, // <<< REPLACE THIS
    label: "referans-tasarim.com",
  },
};

export function getDesignPreview(sector: string, design: string): DesignPreview | null {
  const preview = DESIGN_PREVIEWS[`${sector}/${design}`];
  if (!preview) return null;

  // Test-only escape hatch. `DESIGN_PREVIEW_TEST_URL` is set by the automated
  // responsive test (npm run test:preview) so the section can be exercised
  // against a local fixture. It is never set in production, which keeps the
  // committed config on PREVIEW_URL_PLACEHOLDER and the section hidden.
  const testUrl = process.env.DESIGN_PREVIEW_TEST_URL;
  if (testUrl) return { ...preview, url: testUrl };

  if (!preview.url || preview.url === PREVIEW_URL_PLACEHOLDER) return null;
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
