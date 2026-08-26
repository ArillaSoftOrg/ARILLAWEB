import { createSign } from 'node:crypto';
import { join } from 'node:path';
import { ensureDir, seoDir, writeJson } from './common.mjs';

const tokenUrl = 'https://oauth2.googleapis.com/token';
const scope = 'https://www.googleapis.com/auth/webmasters.readonly';
const dimensions = {
  query: ['query'],
  page: ['page'],
  queryPage: ['query', 'page'],
  country: ['country'],
  device: ['device'],
};

function dateString(date) {
  return date.toISOString().slice(0, 10);
}

function ranges() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const last28Start = new Date(end);
  last28Start.setUTCDate(last28Start.getUTCDate() - 27);
  const prev28End = new Date(last28Start);
  prev28End.setUTCDate(prev28End.getUTCDate() - 1);
  const prev28Start = new Date(prev28End);
  prev28Start.setUTCDate(prev28Start.getUTCDate() - 27);
  const last90Start = new Date(end);
  last90Start.setUTCDate(last90Start.getUTCDate() - 89);

  return {
    last28: { startDate: dateString(last28Start), endDate: dateString(end) },
    previous28: { startDate: dateString(prev28Start), endDate: dateString(prev28End) },
    last90: { startDate: dateString(last90Start), endDate: dateString(end) },
  };
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function credentials() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    const parsed = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
    return { clientEmail: parsed.client_email, privateKey: parsed.private_key };
  }

  return {
    clientEmail: process.env.GSC_CLIENT_EMAIL,
    privateKey: process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
}

function makeJwt(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope,
    aud: tokenUrl,
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(privateKey, 'base64url');
  return `${unsigned}.${signature}`;
}

async function accessToken(clientEmail, privateKey) {
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: makeJwt(clientEmail, privateKey),
  });
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`GSC token request failed: ${json.error_description ?? json.error ?? response.status}`);
  return json.access_token;
}

async function querySearchAnalytics({ siteUrl, token, range, dimensionList, rowLimit }) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: range.startDate,
      endDate: range.endDate,
      dimensions: dimensionList,
      rowLimit,
      startRow: 0,
    }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`GSC query failed: ${json.error?.message ?? response.status}`);
  return json.rows ?? [];
}

async function main() {
  ensureDir(seoDir);
  const siteUrl = process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://arillasoft.com/';
  const rowLimit = Number(process.env.GSC_ROW_LIMIT || 25000);
  const creds = credentials();

  if (!creds.clientEmail || !creds.privateKey) {
    writeJson(join(seoDir, 'gsc-summary.json'), {
      status: 'credentials required',
      generatedAt: new Date().toISOString(),
      siteUrl,
      requiredEnv: ['GSC_CLIENT_EMAIL', 'GSC_PRIVATE_KEY'],
      alternativeEnv: 'GSC_SERVICE_ACCOUNT_JSON',
      queriesAnalyzed: 0,
      data: {},
    });
    console.log('GSC credentials required');
    return;
  }

  const token = await accessToken(creds.clientEmail, creds.privateKey);
  const periods = ranges();
  const data = {};

  for (const [periodName, range] of Object.entries(periods)) {
    data[periodName] = {};
    for (const [dimensionName, dimensionList] of Object.entries(dimensions)) {
      data[periodName][dimensionName] = await querySearchAnalytics({ siteUrl, token, range, dimensionList, rowLimit });
    }
  }

  const queriesAnalyzed = data.last90?.query?.length ?? 0;
  writeJson(join(seoDir, 'gsc-summary.json'), {
    status: 'connected',
    generatedAt: new Date().toISOString(),
    siteUrl,
    rowLimit,
    periods,
    queriesAnalyzed,
    data,
  });
  console.log(`GSC connected, queries analyzed: ${queriesAnalyzed}`);
}

main().catch((error) => {
  writeJson(join(seoDir, 'gsc-summary.json'), {
    status: 'failed',
    generatedAt: new Date().toISOString(),
    error: error.message,
    queriesAnalyzed: 0,
    data: {},
  });
  console.error(error.message);
  process.exitCode = 1;
});
