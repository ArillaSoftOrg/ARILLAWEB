import { createWriteStream, existsSync, chmodSync, copyFileSync, readdirSync, rmSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { binDir, ensureDir, run, seoDir, siteoneBinaryPath, tmpDir, writeJson } from './common.mjs';

const releaseApi = 'https://api.github.com/repos/janreges/siteone-crawler/releases/latest';

function assetPattern() {
  const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
  if (process.platform === 'win32') return new RegExp(`win-${arch}\\.zip$`, 'i');
  if (process.platform === 'darwin') return new RegExp(`macos-${arch}\\.tar\\.gz$`, 'i');
  return new RegExp(`linux-${arch}.*\\.tar\\.gz$`, 'i');
}

async function download(url, file) {
  const response = await fetch(url, { headers: { 'User-Agent': 'arillasoft-seo-audit' } });
  if (!response.ok || !response.body) throw new Error(`Failed to download ${url}: ${response.status}`);
  await pipeline(response.body, createWriteStream(file));
}

async function main() {
  ensureDir(seoDir);
  ensureDir(binDir);
  ensureDir(tmpDir);

  const binary = siteoneBinaryPath();
  if (existsSync(binary)) {
    writeJson(join(seoDir, 'siteone-install.json'), { status: 'already-installed', binary });
    console.log(`SiteOne already installed: ${binary}`);
    return;
  }

  const release = await fetch(releaseApi, { headers: { 'User-Agent': 'arillasoft-seo-audit' } }).then((res) => {
    if (!res.ok) throw new Error(`GitHub release lookup failed: ${res.status}`);
    return res.json();
  });

  const asset = release.assets?.find((candidate) => assetPattern().test(candidate.name));
  if (!asset) {
    throw new Error(`No SiteOne asset found for ${process.platform}/${process.arch}`);
  }

  const archive = join(tmpDir, asset.name);
  await download(asset.browser_download_url, archive);

  const extractDir = join(tmpDir, basename(asset.name).replace(/\.(zip|tar\.gz)$/i, ''));
  rmSync(extractDir, { recursive: true, force: true });
  ensureDir(extractDir);

  if (process.platform === 'win32') {
    await run('powershell', ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${archive.replaceAll("'", "''")}' -DestinationPath '${extractDir.replaceAll("'", "''")}' -Force`]);
  } else {
    await run('tar', ['-xzf', archive, '-C', extractDir]);
  }

  const candidates = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/^siteone-crawler(\.exe)?$/i.test(entry.name)) candidates.push(full);
    }
  };
  walk(extractDir);
  if (!candidates[0]) throw new Error('Downloaded archive did not contain siteone-crawler binary');

  copyFileSync(candidates[0], binary);
  if (process.platform !== 'win32') chmodSync(binary, 0o755);
  writeJson(join(seoDir, 'siteone-install.json'), {
    status: 'installed',
    version: release.tag_name,
    asset: asset.name,
    binary,
  });
  console.log(`Installed SiteOne ${release.tag_name}: ${binary}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
