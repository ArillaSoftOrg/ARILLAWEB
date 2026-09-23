// Guards against the URL-integrity regressions that caused the 2026-09-22
// Search Console indexing incident: cross-locale slug combinations,
// sitemap entries that don't resolve to a real indexable page, and
// duplicate/malformed sitemap URLs. Run against a live server (dev,
// preview, or production) with SEO_BASE_URL, or defaults to prod.
import { fetchSitemapUrls, startServerIfNeeded } from './common.mjs';

const SITE_HOST = 'arillasoft.com';

// Locale + slug-tree combinations that must never resolve to a real page.
// If one of these starts returning 200, a route or link generator has
// regressed back into producing the wrong-locale URL the GSC 404 report
// flagged (see PRODUCT_SPEC/CLAUDE.md canonical locale architecture:
// TR -> /hizmetler, /sektorel-yazilimlar, /site-ornekleri;
// EN -> /services, /sectoral-software, /web-design-examples).
const FORBIDDEN_LOCALE_SLUG_PATTERNS = [
  /^\/en\/hizmetler(\/|$)/,
  /^\/en\/sektorel-yazilimlar(\/|$)/,
  /^\/en\/site-ornekleri(\/|$)/,
  /^\/tr\/services(\/|$)/,
  /^\/tr\/sectoral-software(\/|$)/,
  /^\/tr\/web-design-examples(\/|$)/,
  // /tr/yazilim-firmasi (national pillar + city pages) is TR-only, same
  // pattern as the routes above — see src/app/[locale]/(public)/yazilim-firmasi.
  /^\/en\/yazilim-firmasi(\/|$)/,
];

// A city page URL's slug segment must be a plain lowercase-ASCII slug (see
// src/lib/cities-data.ts) — catches a malformed or mistakenly-unencoded
// city slug making it into the sitemap.
const CITY_PATH_PATTERN = /^\/tr\/yazilim-firmasi\/([^/]+)$/;
const VALID_CITY_SLUG_PATTERN = /^[a-z0-9-]+$/;

function classify(urls) {
  const problems = [];
  const seen = new Map();

  for (const rawUrl of urls) {
    let url;
    try {
      url = new URL(rawUrl);
    } catch {
      problems.push({ type: 'malformed-url', url: rawUrl });
      continue;
    }

    if (url.hostname !== SITE_HOST || url.protocol !== 'https:') {
      problems.push({ type: 'wrong-host', url: rawUrl });
    }

    if (/[&$]/.test(url.pathname)) {
      problems.push({ type: 'malformed-path-segment', url: rawUrl });
    }

    for (const pattern of FORBIDDEN_LOCALE_SLUG_PATTERNS) {
      if (pattern.test(url.pathname)) {
        problems.push({ type: 'cross-locale-slug-in-sitemap', url: rawUrl, pattern: pattern.source });
      }
    }

    const cityMatch = url.pathname.match(CITY_PATH_PATTERN);
    if (cityMatch && !VALID_CITY_SLUG_PATTERN.test(cityMatch[1])) {
      problems.push({ type: 'malformed-city-slug', url: rawUrl, slug: cityMatch[1] });
    }

    const key = rawUrl.toLowerCase();
    if (seen.has(key)) {
      problems.push({ type: 'duplicate-sitemap-url', url: rawUrl });
    }
    seen.set(key, true);
  }

  return problems;
}

function extractTag(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].replace(/\s+/g, ' ').trim() : null;
}

function pageSignals(html) {
  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  return { title, canonical, h1Count };
}

function urlLocale(rawUrl) {
  return new URL(rawUrl).pathname.match(/^\/(tr|en)(\/|$)/)?.[1] ?? 'unknown';
}

async function checkLive(baseUrl, urls) {
  const problems = [];
  // Duplicate-title/duplicate-canonical detection is scoped per locale:
  // a TR page and its EN hreflang counterpart legitimately sharing an
  // identical title string (e.g. an English loanword like "Landing Page"
  // used as-is in both languages) is not the problem this guards against —
  // two unrelated pages in the SAME language competing for the same title
  // is (see the /cozumler vs /sektorel-yazilimlar "Online Randevu Sistemi"
  // collision this caught during the non-brand SEO Phase 2 work).
  const titleOwners = new Map();
  const canonicalOwners = new Map();

  for (const rawUrl of urls) {
    const target = rawUrl.replace(`https://${SITE_HOST}`, baseUrl.replace(/\/$/, ''));
    try {
      const response = await fetch(target, { redirect: 'manual' });
      if (response.status >= 300 && response.status < 400) {
        problems.push({ type: 'sitemap-url-redirects', url: rawUrl, status: response.status, location: response.headers.get('location') });
        continue;
      } else if (response.status === 404 || response.status === 410) {
        problems.push({ type: 'sitemap-url-not-found', url: rawUrl, status: response.status });
        continue;
      } else if (response.status >= 500) {
        problems.push({ type: 'sitemap-url-server-error', url: rawUrl, status: response.status });
        continue;
      } else if (response.status !== 200) {
        problems.push({ type: 'sitemap-url-unexpected-status', url: rawUrl, status: response.status });
        continue;
      }

      const robotsHeader = response.headers.get('x-robots-tag');
      if (robotsHeader && /noindex/i.test(robotsHeader)) {
        problems.push({ type: 'noindex-url-in-sitemap', url: rawUrl });
      }

      const html = await response.text();
      const { title, canonical, h1Count } = pageSignals(html);
      const locale = urlLocale(rawUrl);

      if (!title) {
        problems.push({ type: 'missing-title', url: rawUrl });
      } else {
        const titleKey = `${locale}::${title}`;
        const owner = titleOwners.get(titleKey);
        if (owner && owner !== rawUrl) {
          problems.push({ type: 'duplicate-title', url: rawUrl, sharedWith: owner, title });
        }
        titleOwners.set(titleKey, owner ?? rawUrl);
      }

      if (!canonical) {
        problems.push({ type: 'missing-canonical', url: rawUrl });
      } else {
        const canonicalKey = `${locale}::${canonical}`;
        const owner = canonicalOwners.get(canonicalKey);
        if (owner && owner !== rawUrl) {
          problems.push({ type: 'duplicate-canonical', url: rawUrl, sharedWith: owner, canonical });
        }
        canonicalOwners.set(canonicalKey, owner ?? rawUrl);
        // A sitemap URL whose own canonical points elsewhere is a
        // self-canonical mismatch — the exact shape of the "Google chose a
        // different canonical" GSC category from the 2026-09-22 incident.
        const canonicalPath = canonical.startsWith('http') ? new URL(canonical).pathname : canonical;
        const rawPath = new URL(rawUrl).pathname;
        if (canonicalPath !== rawPath) {
          problems.push({ type: 'self-canonical-mismatch', url: rawUrl, canonical });
        }
      }

      if (h1Count === 0) {
        problems.push({ type: 'missing-h1', url: rawUrl });
      } else if (h1Count > 1) {
        problems.push({ type: 'multiple-h1', url: rawUrl, count: h1Count });
      }
    } catch (error) {
      problems.push({ type: 'sitemap-url-fetch-failed', url: rawUrl, error: error.message });
    }
  }
  return problems;
}

async function main() {
  const skipLiveCheck = process.argv.includes('--sitemap-only');
  const server = skipLiveCheck ? null : await startServerIfNeeded(process.env.SEO_BASE_URL || 'http://localhost:3001');
  const baseUrl = server?.baseUrl ?? process.env.SEO_BASE_URL ?? 'https://arillasoft.com';

  try {
    const urls = await fetchSitemapUrls(baseUrl);
    if (urls.length === 0) {
      console.error('sitemap.xml returned no URLs — cannot validate.');
      process.exitCode = 1;
      return;
    }

    const staticProblems = classify(urls);
    const liveProblems = skipLiveCheck ? [] : await checkLive(baseUrl, urls);
    const problems = [...staticProblems, ...liveProblems];

    console.log(`Checked ${urls.length} sitemap URLs.`);
    if (problems.length === 0) {
      console.log('No URL-integrity problems found.');
      return;
    }

    console.error(`Found ${problems.length} problem(s):`);
    for (const problem of problems) {
      console.error(`  [${problem.type}] ${problem.url}${problem.status ? ` (status ${problem.status})` : ''}`);
    }
    process.exitCode = 1;
  } finally {
    await server?.stop();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
