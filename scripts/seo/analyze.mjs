import { join } from 'node:path';
import { fetchSitemapUrls, readJsonIfExists, seoDir, writeJson } from './common.mjs';

const defaultCompetitors = [
  { domain: 'atalay.tech', url: 'https://atalay.tech/', source: 'web research', focus: 'web, mobile, custom software' },
  { domain: 'mostidea.com.tr', url: 'https://www.mostidea.com.tr/', source: 'web research', focus: 'custom software, mobile, corporate web' },
  { domain: 'erginyazilim.com', url: 'https://www.erginyazilim.com/', source: 'web research', focus: 'custom software, ERP, CRM, web' },
  { domain: 'qrall.co', url: 'https://qrall.co/', source: 'web research', focus: 'QR menu, ordering, restaurant software' },
  { domain: 'qrmenue.com', url: 'https://qrmenue.com/', source: 'web research', focus: 'QR menu and restaurant automation' },
];

function numeric(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function key(row) {
  return Array.isArray(row.keys) ? row.keys.join(' | ') : '';
}

function gscOpportunities(gsc) {
  if (gsc?.status !== 'connected') return [];
  const rows = gsc.data?.last90?.queryPage ?? [];
  const previousByQuery = new Map((gsc.data?.previous28?.query ?? []).map((row) => [key(row), row]));
  const lastByQuery = new Map((gsc.data?.last28?.query ?? []).map((row) => [key(row), row]));
  const byQuery = new Map();
  const opportunities = [];

  for (const row of rows) {
    const [query, page] = row.keys ?? [];
    if (!query || !page) continue;
    if (!byQuery.has(query)) byQuery.set(query, new Set());
    byQuery.get(query).add(page);

    const impressions = numeric(row.impressions);
    const ctr = numeric(row.ctr);
    const position = numeric(row.position);
    if (impressions >= 100 && ctr < 0.02) {
      opportunities.push({ type: 'high-impression-low-ctr', priority: 'high', query, page, metrics: row });
    }
    if (position >= 4 && position <= 10) {
      opportunities.push({ type: 'position-4-10', priority: 'high', query, page, metrics: row });
    }
    if (position > 10 && position <= 20) {
      opportunities.push({ type: 'position-11-20', priority: 'medium', query, page, metrics: row });
    }
  }

  for (const [query, pages] of byQuery.entries()) {
    if (pages.size > 1) {
      opportunities.push({ type: 'multiple-urls-for-query', priority: 'medium', query, pages: [...pages] });
    }
  }

  for (const [queryValue, current] of lastByQuery.entries()) {
    const previous = previousByQuery.get(queryValue);
    if (!previous) continue;
    const delta = numeric(current.impressions) - numeric(previous.impressions);
    if (delta >= 50) opportunities.push({ type: 'rising-keyword', priority: 'medium', query: queryValue, deltaImpressions: delta });
    if (delta <= -50) opportunities.push({ type: 'declining-keyword', priority: 'medium', query: queryValue, deltaImpressions: delta });
  }

  return opportunities;
}

function crawlOpportunities(siteone) {
  const opportunities = [];
  for (const issue of siteone?.technicalIssues ?? []) {
    const priority = ['broken-or-error-url', 'missing-canonical'].includes(issue.type) ? 'high' : 'medium';
    opportunities.push({ type: issue.type, priority, count: issue.count, source: 'siteone' });
  }
  return opportunities;
}

function lighthouseOpportunities(lighthouse) {
  const opportunities = [];
  for (const page of lighthouse?.pages ?? []) {
    if (page.scores?.seo < 100) opportunities.push({ type: 'lighthouse-seo-regression', priority: 'critical', page: page.url, score: page.scores.seo });
    if (page.scores?.performance < 70) opportunities.push({ type: 'performance-lcp-tbt', priority: 'low', page: page.url, score: page.scores.performance });
    const contrast = page.issues?.find((issue) => issue.id === 'color-contrast');
    if (contrast) opportunities.push({ type: 'color-contrast', priority: 'low', page: page.url });
  }
  return opportunities;
}

function contentMap(gsc, sitemapUrls) {
  const clusters = [];
  const queryRows = gsc?.status === 'connected' ? gsc.data?.last90?.queryPage ?? [] : [];
  for (const row of queryRows.slice(0, 200)) {
    const [query, page] = row.keys ?? [];
    if (!query || !page) continue;
    const lower = query.toLocaleLowerCase('tr-TR');
    const intent = lower.includes('fiyat') || lower.includes('teklif') ? 'transactional'
      : lower.includes('firma') || lower.includes('şirket') || lower.includes('sistem') ? 'commercial'
        : lower.includes('arilla') ? 'navigational'
          : 'informational';
    clusters.push({
      keyword: query,
      intent,
      existingUrl: page,
      shouldOptimize: numeric(row.impressions) >= 50 || numeric(row.position) <= 20,
      newPageNeeded: false,
      internalLinkOpportunity: sitemapUrls.some((url) => url !== page && url.includes('/sektorel-yazilimlar')),
      priority: numeric(row.impressions) >= 100 && numeric(row.position) <= 20 ? 'high' : 'medium',
      metrics: row,
    });
  }

  if (!clusters.length) {
    for (const url of sitemapUrls.slice(0, 40)) {
      const intent = url.includes('/teklif-al') || url.includes('/randevual') ? 'transactional'
        : url.includes('/hizmetler') || url.includes('/sektorel-yazilimlar') ? 'commercial'
          : url.includes('/blog') ? 'informational'
            : 'navigational';
      clusters.push({
        keyword: 'data unavailable',
        intent,
        existingUrl: url,
        shouldOptimize: false,
        newPageNeeded: false,
        internalLinkOpportunity: true,
        priority: 'low',
        metrics: 'data unavailable',
      });
    }
  }
  return clusters;
}

async function publicCompetitorSnapshot(competitors) {
  const analyzed = [];
  for (const competitor of competitors) {
    const item = {
      ...competitor,
      searchVolume: 'data unavailable',
      keywordDifficulty: 'data unavailable',
      rankingKeywords: 'data unavailable',
      robots: 'data unavailable',
      sitemapUrls: [],
      title: 'data unavailable',
      h1: 'data unavailable',
      schema: 'data unavailable',
    };
    try {
      const robotsUrl = new URL('/robots.txt', competitor.url).toString();
      const robots = await fetch(robotsUrl).then((res) => (res.ok ? res.text() : 'data unavailable'));
      item.robots = robots.slice(0, 2000);
      const sitemapMatch = robots.match(/sitemap:\s*(\S+)/i);
      if (sitemapMatch) {
        const xml = await fetch(sitemapMatch[1]).then((res) => (res.ok ? res.text() : ''));
        item.sitemapUrls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].slice(0, 30).map((match) => match[1]);
      }
      const html = await fetch(competitor.url).then((res) => (res.ok ? res.text() : ''));
      item.title = html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]?.replace(/\s+/g, ' ').trim() ?? item.title;
      item.h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is)?.[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() ?? item.h1;
      item.schema = html.includes('application/ld+json') ? 'present' : 'not detected';
    } catch (error) {
      item.error = error.message;
    }
    analyzed.push(item);
  }
  return analyzed;
}

async function main() {
  const lighthouse = readJsonIfExists(join(seoDir, 'lighthouse-summary.json'), {});
  const siteone = readJsonIfExists(join(seoDir, 'siteone-summary.json'), {});
  const gsc = readJsonIfExists(join(seoDir, 'gsc-summary.json'), {});
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arillasoft.com';
  const sitemapUrls = await fetchSitemapUrls(baseUrl);
  const competitors = await publicCompetitorSnapshot(defaultCompetitors);

  const opportunities = [
    ...gscOpportunities(gsc),
    ...crawlOpportunities(siteone),
    ...lighthouseOpportunities(lighthouse),
  ].sort((a, b) => {
    const rank = { critical: 0, high: 1, medium: 2, low: 3 };
    return (rank[a.priority] ?? 9) - (rank[b.priority] ?? 9);
  });

  writeJson(join(seoDir, 'competitors.json'), {
    generatedAt: new Date().toISOString(),
    competitorsAnalyzed: competitors.length,
    competitors,
  });

  writeJson(join(seoDir, 'content-map.json'), {
    generatedAt: new Date().toISOString(),
    source: gsc?.status === 'connected' ? 'gsc+sitemap' : 'sitemap',
    clusters: contentMap(gsc, sitemapUrls),
  });

  writeJson(join(seoDir, 'opportunities.json'), {
    generatedAt: new Date().toISOString(),
    sources: {
      lighthouse: lighthouse?.status ?? 'missing',
      siteone: siteone?.status ?? 'missing',
      gsc: gsc?.status ?? 'missing',
      sitemapUrls: sitemapUrls.length,
    },
    topOpportunities: opportunities.slice(0, 10),
    opportunities,
  });

  console.log(`Opportunities: ${opportunities.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
