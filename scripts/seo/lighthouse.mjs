import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { averageScores, defaultRoutes, ensureDir, npxCmd, run, seoDir, slugForRoute, startServerIfNeeded, summarizeLighthouseReport, tmpDir, writeJson } from './common.mjs';

async function main() {
  ensureDir(seoDir);
  const server = await startServerIfNeeded();
  const reportsDir = join(seoDir, 'lighthouse');
  const lighthouseTmp = join(tmpDir, 'lighthouse');
  ensureDir(reportsDir);
  ensureDir(lighthouseTmp);

  try {
    const routes = (process.env.SEO_ROUTES ? process.env.SEO_ROUTES.split(',') : defaultRoutes).map((route) => route.trim()).filter(Boolean);
    const pages = [];

    for (const route of routes) {
      const outputPath = join(reportsDir, `${slugForRoute(route)}.json`);
      const url = `${server.baseUrl.replace(/\/$/, '')}${route}`;
      const result = await run(
        npxCmd(),
        [
          'lighthouse',
          url,
          '--only-categories=performance,accessibility,best-practices,seo',
          '--output=json',
          `--output-path=${outputPath}`,
          '--chrome-flags=--headless=new --no-sandbox',
          '--quiet',
        ],
        {
          allowFailure: true,
          env: { TMP: lighthouseTmp, TEMP: lighthouseTmp },
          stdio: 'ignore',
          timeoutMs: Number(process.env.SEO_LIGHTHOUSE_TIMEOUT_MS || 120000),
        },
      );

      if (!existsSync(outputPath)) {
        throw new Error(`Lighthouse did not write ${outputPath}. Exit code: ${result.code}`);
      }
      pages.push(summarizeLighthouseReport(JSON.parse(readFileSync(outputPath, 'utf8'))));
    }

    const summary = {
      status: pages.every((page) => page.scores.seo === 100) ? 'passed' : 'seo-regression',
      generatedAt: new Date().toISOString(),
      baseUrl: server.baseUrl,
      average: averageScores(pages),
      pages,
    };
    writeJson(join(seoDir, 'lighthouse-summary.json'), summary);
    console.log(JSON.stringify(summary.average, null, 2));
    if (summary.status !== 'passed') process.exitCode = 1;
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
