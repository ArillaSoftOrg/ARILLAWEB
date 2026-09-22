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
];

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

    const key = rawUrl.toLowerCase();
    if (seen.has(key)) {
      problems.push({ type: 'duplicate-sitemap-url', url: rawUrl });
    }
    seen.set(key, true);
  }

  return problems;
}

async function checkLive(baseUrl, urls) {
  const problems = [];
  for (const rawUrl of urls) {
    const target = rawUrl.replace(`https://${SITE_HOST}`, baseUrl.replace(/\/$/, ''));
    try {
      const response = await fetch(target, { redirect: 'manual' });
      if (response.status >= 300 && response.status < 400) {
        problems.push({ type: 'sitemap-url-redirects', url: rawUrl, status: response.status, location: response.headers.get('location') });
      } else if (response.status === 404 || response.status === 410) {
        problems.push({ type: 'sitemap-url-not-found', url: rawUrl, status: response.status });
      } else if (response.status >= 500) {
        problems.push({ type: 'sitemap-url-server-error', url: rawUrl, status: response.status });
      } else if (response.status !== 200) {
        problems.push({ type: 'sitemap-url-unexpected-status', url: rawUrl, status: response.status });
      } else {
        const robotsHeader = response.headers.get('x-robots-tag');
        if (robotsHeader && /noindex/i.test(robotsHeader)) {
          problems.push({ type: 'noindex-url-in-sitemap', url: rawUrl });
        }
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
