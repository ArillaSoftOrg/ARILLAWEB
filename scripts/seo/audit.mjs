import { join } from 'node:path';
import { npmCmd, run, startServerIfNeeded } from './common.mjs';

async function main() {
  await run(npmCmd(), ['run', 'build']);
  const server = await startServerIfNeeded(process.env.SEO_BASE_URL || 'http://localhost:3001');
  const env = { SEO_BASE_URL: server.baseUrl };

  try {
    await run(process.execPath, [join('scripts', 'seo', 'lighthouse.mjs')], { env });
    await run(process.execPath, [join('scripts', 'seo', 'crawl.mjs')], { env, allowFailure: true });
    await run(process.execPath, [join('scripts', 'seo', 'gsc.mjs')], { env, allowFailure: true });
    await run(process.execPath, [join('scripts', 'seo', 'analyze.mjs')], { env });
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
