import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { binDir, ensureDir, fetchSitemapUrls, findNewestJson, rawDir, run, seoDir, siteoneBinaryPath, startServerIfNeeded, writeJson } from './common.mjs';

function summarizeSiteOne(report, sitemapUrls) {
  const documentRows = (report.results ?? [])
    .filter((row) => Number(row.type) === 1)
    .map((row) => ({
      url: row.url,
      status: Number(row.status) || null,
      elapsedTime: row.elapsedTime,
      size: row.size,
    }));
  const seoRows = report.tables?.seo?.rows ?? [];
  const headingRows = report.tables?.['seo-headings']?.rows ?? [];
  const brokenInternalLinks = report.tables?.['404']?.rows ?? [];
  const redirects = report.tables?.redirects?.rows ?? [];
  const duplicateTitles = report.tables?.['non-unique-titles']?.rows ?? [];
  const duplicateDescriptions = report.tables?.['non-unique-descriptions']?.rows ?? [];
  const missingTitle = seoRows.filter((row) => !row.title);
  const missingDescription = seoRows.filter((row) => !row.description);
  const missingH1 = seoRows.filter((row) => !row.h1);
  const headingIssues = headingRows.filter((row) => Number(row.headingsErrorsCount) > 0);
  const technicalIssues = [];

  if (brokenInternalLinks.length) technicalIssues.push({ type: 'broken-or-error-url', count: brokenInternalLinks.length });
  if (redirects.length) technicalIssues.push({ type: 'redirect', count: redirects.length });
  if (missingTitle.length) technicalIssues.push({ type: 'missing-title', count: missingTitle.length });
  if (missingDescription.length) technicalIssues.push({ type: 'missing-description', count: missingDescription.length });
  if (missingH1.length) technicalIssues.push({ type: 'missing-h1', count: missingH1.length });
  if (headingIssues.length) technicalIssues.push({ type: 'heading-order', count: headingIssues.length });
  if (duplicateTitles.length) technicalIssues.push({ type: 'duplicate-title', count: duplicateTitles.length });
  if (duplicateDescriptions.length) technicalIssues.push({ type: 'duplicate-description', count: duplicateDescriptions.length });
  for (const category of report.qualityScores?.categories ?? []) {
    if (category.code !== 'seo') continue;
    for (const deduction of category.deductions ?? []) {
      if (/canonical/i.test(deduction.reason)) {
        technicalIssues.push({ type: 'canonical', count: Number(deduction.reason.match(/\d+/)?.[0] ?? 1), reason: deduction.reason });
      }
    }
  }

  const crawled = new Set(documentRows.map((row) => row.url));
  const sitemapMissingFromCrawl = sitemapUrls.filter((url) => {
    const local = url.replace(/^https:\/\/arillasoft\.com/i, 'http://localhost:3001');
    return !crawled.has(url) && !crawled.has(local);
  });
  if (sitemapMissingFromCrawl.length) technicalIssues.push({ type: 'sitemap-url-not-crawled', count: sitemapMissingFromCrawl.length });

  return {
    crawledPages: documentRows.length,
    fetchedUrls: report.results?.length ?? 0,
    qualityScores: report.qualityScores?.categories?.map((category) => ({
      code: category.code,
      score: category.score,
      deductions: category.deductions ?? [],
    })) ?? [],
    statusCodes: documentRows.reduce((acc, row) => {
      const key = String(row.status ?? 'unknown');
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
    technicalIssues,
    samples: {
      brokenInternalLinks: brokenInternalLinks.slice(0, 20),
      redirects: redirects.slice(0, 20),
      missingTitle: missingTitle.slice(0, 20),
      missingDescription: missingDescription.slice(0, 20),
      missingH1: missingH1.slice(0, 20),
      headingIssues: headingIssues.slice(0, 20),
      duplicateTitles: duplicateTitles.slice(0, 20),
      duplicateDescriptions: duplicateDescriptions.slice(0, 20),
      sitemapMissingFromCrawl: sitemapMissingFromCrawl.slice(0, 20),
    },
  };
}

async function main() {
  ensureDir(seoDir);
  ensureDir(rawDir);
  ensureDir(binDir);

  const binary = siteoneBinaryPath();
  if (!existsSync(binary)) {
    await run(process.execPath, [join('scripts', 'seo', 'install-siteone.mjs')]);
  }

  const server = await startServerIfNeeded();
  try {
    const sitemapUrls = await fetchSitemapUrls(server.baseUrl);
    const result = await run(
      binary,
      [
        `--url=${server.baseUrl.replace(/\/$/, '')}/tr`,
        '--output=json',
        '--device=desktop',
        '--workers=2',
        '--max-reqs-per-sec=5',
        '--timeout=10',
        '--max-depth=8',
        '--hide-progress-bar',
        '--no-cache',
      ],
      { cwd: rawDir, allowFailure: true, stdio: 'ignore' },
    );

    const newestJson = findNewestJson(rawDir);
    if (!newestJson) {
      writeJson(join(seoDir, 'siteone-summary.json'), {
        status: 'failed',
        generatedAt: new Date().toISOString(),
        exitCode: result.code,
        crawledPages: 0,
        technicalIssues: [{ type: 'siteone-json-missing', count: 1 }],
      });
      process.exitCode = 1;
      return;
    }

    const report = JSON.parse(readFileSync(newestJson, 'utf8'));
    const summary = {
      status: result.code === 0 ? 'completed' : 'completed-with-findings',
      generatedAt: new Date().toISOString(),
      baseUrl: server.baseUrl,
      rawReport: newestJson,
      ...summarizeSiteOne(report, sitemapUrls),
    };
    writeJson(join(seoDir, 'siteone-summary.json'), summary);
    console.log(JSON.stringify({ status: summary.status, crawledPages: summary.crawledPages, issues: summary.technicalIssues }, null, 2));
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
