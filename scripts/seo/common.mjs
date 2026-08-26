import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const seoDir = join(repoRoot, '.seo');
export const rawDir = join(seoDir, 'siteone-raw');
export const tmpDir = join(seoDir, 'tmp');
export const binDir = join(seoDir, 'bin');

export const defaultRoutes = [
  '/tr',
  '/tr/hizmetler',
  '/tr/sektorel-yazilimlar/qr-menu',
  '/tr/kurumsal/blog',
  '/tr/site-ornekleri',
];

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

export function writeJson(file, data) {
  ensureDir(dirname(file));
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

export function readJsonIfExists(file, fallback = null) {
  if (!existsSync(file)) return fallback;
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function slugForRoute(route) {
  return route.replace(/^\/+/, '').replace(/\/+/g, '-') || 'home';
}

export function npmCmd() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

export function npxCmd() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

export function siteoneBinaryPath() {
  return join(binDir, process.platform === 'win32' ? 'siteone-crawler.exe' : 'siteone-crawler');
}

export function run(command, args, options = {}) {
  return new Promise((resolveRun, reject) => {
    const shell = options.shell ?? (process.platform === 'win32' && /\.(cmd|bat)$/i.test(command));
    const child = spawn(command, args, {
      cwd: options.cwd ?? repoRoot,
      env: { ...process.env, ...(options.env ?? {}) },
      stdio: options.stdio ?? 'inherit',
      shell,
    });

    let stdout = '';
    let stderr = '';
    if (child.stdout) child.stdout.on('data', (chunk) => (stdout += chunk));
    if (child.stderr) child.stderr.on('data', (chunk) => (stderr += chunk));
    const timer = options.timeoutMs
      ? setTimeout(() => {
          if (process.platform === 'win32') {
            spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
          } else if (!child.killed) {
            child.kill('SIGKILL');
          }
        }, options.timeoutMs)
      : null;
    child.on('error', reject);
    child.on('close', (code) => {
      if (timer) clearTimeout(timer);
      const result = { code, stdout, stderr };
      if (code === 0 || options.allowFailure) resolveRun(result);
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

export async function isReachable(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });
    return response.status < 500;
  } catch {
    return false;
  }
}

export async function startServerIfNeeded(baseUrl = process.env.SEO_BASE_URL || 'http://localhost:3001') {
  if (await isReachable(baseUrl)) {
    return { baseUrl, stop: async () => {} };
  }

  const port = new URL(baseUrl).port || '3001';
  const child = spawn(npmCmd(), ['run', 'start', '--', '--port', port], {
    cwd: repoRoot,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
  });

  let output = '';
  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
    process.stdout.write(chunk);
  });
  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
    process.stderr.write(chunk);
  });

  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (await isReachable(baseUrl)) {
      return {
        baseUrl,
        stop: async () => {
          if (process.platform === 'win32') {
            spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
          } else if (!child.killed) {
            child.kill();
          }
        },
      };
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 500));
  }

  if (!child.killed) child.kill();
  throw new Error(`Production server did not become reachable at ${baseUrl}\n${output}`);
}

export function findNewestJson(dir) {
  if (!existsSync(dir)) return null;
  const files = [];
  const walk = (current) => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      const stats = statSync(full);
      if (stats.isDirectory()) walk(full);
      else if (entry.endsWith('.json')) files.push({ full, mtimeMs: stats.mtimeMs });
    }
  };
  walk(dir);
  files.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return files[0]?.full ?? null;
}

export async function fetchText(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

export async function fetchSitemapUrls(baseUrl) {
  try {
    const xml = await fetchText(`${baseUrl.replace(/\/$/, '')}/sitemap.xml`);
    return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  } catch {
    return [];
  }
}

export function summarizeLighthouseReport(report) {
  const categories = report.categories ?? {};
  return {
    url: report.finalDisplayedUrl ?? report.finalUrl,
    scores: {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score ?? 0) * 100),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
    },
    issues: Object.values(report.audits ?? {})
      .filter((audit) => audit.score !== 1 && audit.score !== null && audit.scoreDisplayMode !== 'notApplicable')
      .map((audit) => ({
        id: audit.id,
        title: audit.title,
        score: audit.score,
        displayValue: audit.displayValue,
        explanation: audit.explanation,
      })),
  };
}

export function averageScores(items) {
  const totals = { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 };
  for (const item of items) {
    for (const key of Object.keys(totals)) totals[key] += item.scores[key] ?? 0;
  }
  return Object.fromEntries(Object.entries(totals).map(([key, value]) => [key, Math.round(value / Math.max(items.length, 1))]));
}
