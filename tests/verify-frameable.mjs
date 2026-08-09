/**
 * Standalone cross-origin frameability verifier.
 *
 *   node tests/verify-frameable.mjs https://a.framer.website/ https://b.framer.website/
 *   node tests/verify-frameable.mjs --file candidates.txt
 *   node tests/verify-frameable.mjs --json out.json  <urls...>
 *
 * Independent of the Next app: it serves a tiny local host page containing one
 * cross-origin <iframe> using the SAME sandbox flags production uses, then
 * inspects the embedded document through Playwright.
 *
 * Why not just read headers: a bot-protection interstitial can answer 200/202
 * with no X-Frame-Options at all, and an XFO-blocked frame still fires `load`
 * in Chrome. Headers are recorded as evidence, but the real cross-origin render
 * is the only authority — a candidate that does not visibly render is rejected.
 *
 * Nothing here proxies, mirrors, or works around a security header. A site that
 * refuses to be framed is simply reported as unusable.
 */

import { createServer } from "node:http";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

/** Identical to LivePreviewFrame.tsx — omits allow-top-navigation/popups/modals/downloads. */
const SANDBOX = "allow-scripts allow-same-origin";
const HOST_PORT = 4711;
const HOST_URL = `http://localhost:${HOST_PORT}`;

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

const FRAME_TIMEOUT_MS = 25000;
/** Time to let the framed page paint before measuring. Raise it (SETTLE_MS=20000)
 *  to tell a genuinely slow/lazy-loading page apart from a broken one — image
 *  load ratio at settle time predicts how empty the compact preview will look. */
const SETTLE_MS = Number(process.env.SETTLE_MS ?? 9000);
const CONCURRENCY = 3;

/** Markers of an error page or bot challenge rather than the real site. */
const BAD_CONTENT = [
  /access denied/i,
  /javascript is disabled/i,
  /verify that you'?re not a robot/i,
  /are you a human/i,
  /human verification/i,
  /verify you are human/i,
  /security check/i,
  /just a moment/i,
  /enable javascript and cookies/i,
  /ddos protection/i,
  /attention required/i,
  /checking your browser/i,
  /\b(403|404|410|502|503) (forbidden|not found|gone|bad gateway|unavailable)\b/i,
];

const COOKIE_BANNER = /(cookie|çerez|consent|gdpr)/i;

// ---------------------------------------------------------------- args

const argv = process.argv.slice(2);
let jsonOut = null;
let shotDir = null;
const urls = [];

for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--file") {
    const body = readFileSync(argv[++i], "utf8");
    for (const line of body.split(/\r?\n/)) {
      const t = line.trim();
      if (t && !t.startsWith("#")) urls.push(t);
    }
  } else if (argv[i] === "--json") {
    jsonOut = argv[++i];
  } else if (argv[i] === "--shots") {
    shotDir = argv[++i];
    mkdirSync(shotDir, { recursive: true });
  } else {
    urls.push(argv[i]);
  }
}

/** Filesystem-safe stem from a URL host. */
const slugOf = (u) =>
  new URL(u).host.replace(/\.framer\.(website|app|media|ai)$/, "").replace(/[^a-z0-9-]/gi, "-");

if (urls.length === 0) {
  console.error(
    "usage: node tests/verify-frameable.mjs [--file list.txt] [--json out.json] <url> [url...]"
  );
  process.exit(2);
}

// ---------------------------------------------------------------- host page

/** Renders one iframe at an explicit intrinsic size, matching production markup. */
function hostPage(target, width, height) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>frame host</title>
<style>html,body{margin:0;background:#eef2f7}iframe{border:0;display:block}</style></head>
<body><iframe id="probe" src="${target.replace(/"/g, "&quot;")}"
  sandbox="${SANDBOX}" referrerpolicy="no-referrer"
  style="width:${width}px;height:${height}px"></iframe></body></html>`;
}

const hostServer = createServer((req, res) => {
  const u = new URL(req.url, HOST_URL);
  const target = u.searchParams.get("url") ?? "about:blank";
  const width = Number(u.searchParams.get("w") ?? DESKTOP.width);
  const height = Number(u.searchParams.get("h") ?? DESKTOP.height);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(hostPage(target, width, height));
});

// ---------------------------------------------------------------- header probe

/** Records headers as evidence. Never the sole basis for a verdict. */
async function probeHeaders(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0" },
    });
    const csp = res.headers.get("content-security-policy") ?? "";
    return {
      status: res.status,
      finalUrl: res.url,
      redirected: res.url.replace(/\/$/, "") !== url.replace(/\/$/, ""),
      xfo: res.headers.get("x-frame-options") ?? "",
      frameAncestors: /frame-ancestors([^;]*)/i.exec(csp)?.[1]?.trim() ?? "",
      challenge: ["x-amzn-waf-action", "cf-mitigated", "x-datadome"].filter((h) =>
        res.headers.has(h)
      ),
    };
  } catch (err) {
    return { status: 0, error: err.message.slice(0, 90) };
  }
}

// ---------------------------------------------------------------- frame probe

async function inspectFrame(page) {
  const frame = page.frames().find((f) => f !== page.mainFrame());
  if (!frame) return { rendered: false, reason: "no child frame attached" };
  try {
    const info = await frame.evaluate(() => {
      const imgs = [...document.images];
      return {
        title: document.title,
        text: (document.body?.innerText || "").trim(),
        elements: document.querySelectorAll("*").length,
        images: imgs.length,
        imagesLoaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      };
    });
    const bad = BAD_CONTENT.find(
      (re) => re.test(info.title) || re.test(info.text.slice(0, 800))
    );
    if (bad) return { rendered: false, reason: `challenge/error page (${bad})`, ...info };
    if (info.text.length < 150 || info.elements < 25) {
      return {
        rendered: false,
        reason: `too sparse (${info.text.length} chars, ${info.elements} els)`,
        ...info,
      };
    }
    return { rendered: true, ...info };
  } catch (err) {
    return { rendered: false, reason: `frame unreadable: ${err.message.slice(0, 70)}` };
  }
}

async function verify(browser, url) {
  const row = { url, headers: await probeHeaders(url) };

  // --- desktop render -----------------------------------------------------
  // SHOT_SCALE=0.5 halves screenshot pixel dimensions (still a 1440x900 layout)
  // for contact sheets, where two dozen full-res captures would be unusably large.
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: Number(process.env.SHOT_SCALE ?? 1),
  });
  const page = await context.newPage();
  const started = Date.now();
  try {
    await page.goto(
      `${HOST_URL}/?url=${encodeURIComponent(url)}&w=${DESKTOP.width}&h=${DESKTOP.height}`,
      { waitUntil: "domcontentloaded", timeout: FRAME_TIMEOUT_MS }
    );
    await page.waitForTimeout(SETTLE_MS);
    row.desktop = await inspectFrame(page);
    row.loadMs = Date.now() - started;

    // Screenshot the iframe element itself — this is exactly the 1440x900 crop
    // the compact preview panel will show, so it is the honest basis for judging
    // visual quality (and the only way to see below-fold lazy images never load).
    if (shotDir && row.desktop.rendered) {
      // JPEG, not PNG: a 1440x900 screenshot of a photographic page is ~1.3MB as
      // PNG, which blows past an artifact's size budget across ~30 candidates.
      row.shot = `${shotDir}/${slugOf(url)}.jpg`;
      await page
        .locator("#probe")
        .screenshot({ path: row.shot, type: "jpeg", quality: 72 })
        .catch(() => {
          row.shot = null;
        });
    }

    if (row.desktop.rendered) {
      row.cookieBanner = COOKIE_BANNER.test(row.desktop.text.slice(0, 600));

      // --- top-level navigation escape test -------------------------------
      const before = page.url();
      const frame = page.frames().find((f) => f !== page.mainFrame());
      await frame
        ?.evaluate(() => {
          const a = document.createElement("a");
          a.href = "https://example.com/hijack";
          a.target = "_top";
          document.body.appendChild(a);
          a.click();
          try {
            window.open("https://example.com/popup", "_blank");
          } catch {
            /* blocked, as intended */
          }
        })
        .catch(() => {});
      await page.waitForTimeout(2000);
      row.topNavBlocked = page.url() === before && context.pages().length === 1;
    }
  } catch (err) {
    row.desktop = { rendered: false, reason: `navigation failed: ${err.message.slice(0, 70)}` };
  } finally {
    await context.close();
  }

  // --- mobile reflow ------------------------------------------------------
  if (row.desktop?.rendered) {
    const mCtx = await browser.newContext({ viewport: { width: 600, height: 900 } });
    const mPage = await mCtx.newPage();
    try {
      await mPage.goto(
        `${HOST_URL}/?url=${encodeURIComponent(url)}&w=${MOBILE.width}&h=${MOBILE.height}`,
        { waitUntil: "domcontentloaded", timeout: FRAME_TIMEOUT_MS }
      );
      await mPage.waitForTimeout(SETTLE_MS);
      const m = await inspectFrame(mPage);
      row.mobile = m.rendered
        ? {
            rendered: true,
            innerWidth: m.innerWidth,
            // A responsive site must not scroll sideways at 390px.
            noHorizontalOverflow: m.scrollWidth <= m.innerWidth + 2,
          }
        : { rendered: false, reason: m.reason };
    } catch (err) {
      row.mobile = { rendered: false, reason: err.message.slice(0, 70) };
    } finally {
      await mCtx.close();
    }
  }

  // Hard disqualifiers, checked before any render-quality judgement. A bot
  // challenge can paint a perfectly valid-looking document — it just isn't the
  // site. This gate is why the header probe exists; leaving it as mere evidence
  // let a WAF interstitial score PASS during development.
  const h = row.headers ?? {};
  if (h.challenge?.length) {
    row.blocker = `bot challenge (${h.challenge.join(", ")})`;
  } else if (h.status && h.status !== 200) {
    row.blocker = `upstream status ${h.status}`;
  } else if (/deny|sameorigin/i.test(h.xfo ?? "")) {
    row.blocker = `X-Frame-Options: ${h.xfo}`;
  } else if (h.frameAncestors && !/[*]|arillasoft/i.test(h.frameAncestors)) {
    row.blocker = `CSP frame-ancestors: ${h.frameAncestors}`;
  }

  row.verdict = row.blocker
    ? "REJECT"
    : row.desktop?.rendered &&
        row.mobile?.rendered &&
        row.mobile?.noHorizontalOverflow &&
        row.topNavBlocked
      ? "PASS"
      : row.desktop?.rendered
        ? "WARN"
        : "REJECT";

  return row;
}

// ---------------------------------------------------------------- run

async function pool(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    })
  );
  return out;
}

await new Promise((r) => hostServer.listen(HOST_PORT, "127.0.0.1", r));
console.log(`frame host on ${HOST_URL} — verifying ${urls.length} url(s), concurrency ${CONCURRENCY}\n`);

const browser = await chromium.launch();
let rows = [];
try {
  rows = await pool(urls, CONCURRENCY, async (url, i) => {
    const row = await verify(browser, url);
    console.log(`  [${i + 1}/${urls.length}] ${row.verdict.padEnd(6)} ${url}`);
    return row;
  });
} finally {
  await browser.close();
  hostServer.close();
}

// ---------------------------------------------------------------- report

console.log("\n================ FRAMEABILITY RESULTS ================\n");
for (const r of rows) {
  const h = r.headers ?? {};
  console.log(`${r.verdict}  ${r.url}`);
  console.log(
    `   http=${h.status ?? "?"}${h.redirected ? " (redirected → " + h.finalUrl + ")" : ""}` +
      `  xfo=${h.xfo || "none"}  frame-ancestors=${h.frameAncestors || "none"}` +
      `${h.challenge?.length ? "  CHALLENGE=" + h.challenge.join(",") : ""}`
  );
  if (r.blocker) {
    console.log(`   BLOCKED — ${r.blocker}`);
  } else if (r.desktop?.rendered) {
    console.log(
      `   desktop: ${r.desktop.text.length} chars, ${r.desktop.elements} els, ` +
        `${r.desktop.imagesLoaded}/${r.desktop.images} imgs, ${r.loadMs}ms` +
        `   title="${(r.desktop.title || "").slice(0, 60)}"`
    );
    console.log(
      `   mobile:  ${
        r.mobile?.rendered
          ? `renders, no-h-overflow=${r.mobile.noHorizontalOverflow}`
          : "FAILED — " + (r.mobile?.reason ?? "n/a")
      }   top-nav-blocked=${r.topNavBlocked}   cookie-banner=${r.cookieBanner}`
    );
  } else {
    console.log(`   NOT FRAMEABLE — ${r.desktop?.reason ?? "unknown"}`);
  }
  console.log();
}

const pass = rows.filter((r) => r.verdict === "PASS").length;
const warn = rows.filter((r) => r.verdict === "WARN").length;
const reject = rows.filter((r) => r.verdict === "REJECT").length;
console.log(`PASS ${pass}   WARN ${warn}   REJECT ${reject}   (of ${rows.length})`);
console.log("======================================================");

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify(rows, null, 2));
  console.log(`\nwrote ${jsonOut}`);
}

process.exit(reject === rows.length ? 1 : 0);
