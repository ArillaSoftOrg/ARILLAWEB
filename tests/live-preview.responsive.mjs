/**
 * Automated responsive test for the "Canlı Tasarım Önizlemesi" section on
 * /tr/site-ornekleri/[sector]/[design].
 *
 * Run with:  npm run test:preview
 *
 * The script is self-contained: it serves a local fixture site, boots the Next
 * dev server with DESIGN_PREVIEW_TEST_URL pointing at that fixture (so the
 * committed config keeps its placeholder), drives Chromium through four
 * viewports, then tears everything down.
 */

import { createServer } from "node:http";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROUTE = "/tr/site-ornekleri/emlak-danismanligi/emlak-danismanligi-modern-donusum";
const FIXTURE_PORT = 4321;
const APP_PORT = 4322;
// Must be "localhost", not "127.0.0.1": Next 16 dev treats a mismatched host as
// a cross-origin dev request and the client bundle never hydrates, which makes
// every interaction silently do nothing.
const APP_URL = `http://localhost:${APP_PORT}`;

const VIEWPORTS = [
  { name: "375x812", width: 375, height: 812 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

/** A responsive stand-in for the reference site, served locally. */
const FIXTURE_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fixture Reference Site</title>
<style>
  body{font-family:system-ui;margin:0}
  header{padding:24px;background:#0f172a;color:#fff}
  .grid{display:grid;gap:16px;padding:24px;grid-template-columns:repeat(3,1fr)}
  @media (max-width:800px){.grid{grid-template-columns:1fr}}
  .card{background:#f1f5f9;padding:32px;border-radius:12px}
</style></head>
<body><header><h1>Fixture Reference Site</h1></header>
<div class="grid"><div class="card">A</div><div class="card">B</div><div class="card">C</div></div>
</body></html>`;

const results = [];
let failures = 0;

function check(viewport, name, pass, detail = "") {
  results.push({ viewport, name, pass, detail });
  if (!pass) failures++;
}

/**
 * Clicks `locator` until `condition` holds. The marketing routes wrap content in
 * a framer-motion PageTransition whose entry animation can absorb a click that
 * lands while it is still running.
 */
async function clickUntil(page, locator, condition, what, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    await locator.click({ force: i > 0 }).catch(() => {});
    for (let waited = 0; waited < 6000; waited += 300) {
      await page.waitForTimeout(300);
      if (await condition()) return;
    }
  }
  throw new Error(`"${what}" did not take effect after ${attempts} clicks`);
}

async function waitForServer(url, timeoutMs = 120000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not become ready in ${timeoutMs}ms`);
}

async function run() {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();
    await page.goto(APP_URL + ROUTE, { waitUntil: "networkidle" });

    // Dismiss the cookie banner if present so it cannot occlude the panel.
    const reject = page.getByRole("button", { name: /Yalnızca Zorunlu/i });
    if (await reject.count()) await reject.first().click().catch(() => {});

    const section = page.locator("section", { hasText: "Canlı Tasarım Önizlemesi" }).first();
    await section.scrollIntoViewIfNeeded();

    // --- before any user interaction -------------------------------------
    check(vp.name, "no iframe before interaction", (await page.locator("iframe").count()) === 0);

    const trigger = page.getByRole("button", { name: "Canlı önizlemeyi yükle" });
    check(vp.name, "lazy-load trigger present", (await trigger.count()) === 1);

    // --- compact panel ----------------------------------------------------
    // The route's PageTransition (framer-motion) can swallow a click landing
    // mid-animation, so retry until the frame actually mounts.
    await clickUntil(
      page,
      trigger,
      async () => (await page.locator("iframe").count()) === 1,
      "load preview"
    );
    await page.waitForTimeout(1500);

    check(vp.name, "exactly one iframe after load", (await page.locator("iframe").count()) === 1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    check(vp.name, "no horizontal document overflow", !overflow);

    const contained = await page.evaluate(() => {
      const f = document.querySelector("iframe");
      // The panel is the positioned ancestor that clips the scaled frame.
      const panel = f.closest("div[class*='aspect-']") ?? f.parentElement.parentElement;
      const p = panel.getBoundingClientRect();
      const r = f.getBoundingClientRect();
      const slack = 1.5; // sub-pixel rounding from the scale transform
      return (
        r.left >= p.left - slack &&
        r.top >= p.top - slack &&
        r.right <= p.right + slack &&
        r.bottom <= p.bottom + slack
      );
    });
    check(vp.name, "compact panel stays within container", contained);

    // --- modal ------------------------------------------------------------
    const openBtn = page.getByRole("button", { name: "Tasarımı büyük önizlemede aç" });
    await clickUntil(
      page,
      openBtn,
      async () => (await page.getByRole("dialog").count()) === 1,
      "open modal"
    );
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(1200);

    check(
      vp.name,
      "compact iframe unmounted while modal open",
      (await page.locator("iframe").count()) === 1
    );

    const inViewport = await page.evaluate(() => {
      const d = document.querySelector('[role="dialog"]');
      const r = d.getBoundingClientRect();
      return (
        r.left >= -1 &&
        r.top >= -1 &&
        r.right <= window.innerWidth + 1 &&
        r.bottom <= window.innerHeight + 1
      );
    });
    check(vp.name, "modal within viewport", inViewport);

    // The dialog's close control is labelled by an sr-only "Kapat" span.
    const closeBtn = dialog.getByRole("button", { name: "Kapat" });
    const closeBox = await closeBtn.boundingBox().catch(() => null);
    const closeVisible =
      (await closeBtn.isVisible().catch(() => false)) &&
      !!closeBox &&
      closeBox.x >= 0 &&
      closeBox.y >= 0 &&
      closeBox.x + closeBox.width <= vp.width + 1 &&
      closeBox.y + closeBox.height <= vp.height + 1;
    check(vp.name, "close button visible and on-screen", closeVisible);

    // Device controls: all three present, clickable, and reflecting state.
    const group = dialog.getByRole("group", { name: "Önizleme cihaz seçimi" });
    const deviceButtons = group.getByRole("button");
    check(vp.name, "three device controls", (await deviceButtons.count()) === 3);

    let controlsUsable = true;
    for (const label of ["Mobil", "Tablet", "Masaüstü"]) {
      const b = group.getByRole("button", { name: label });
      const box = await b.boundingBox();
      if (!box || box.width < 24 || box.height < 20) controlsUsable = false;
      await b.click();
      await page.waitForTimeout(400);
      if ((await b.getAttribute("aria-pressed")) !== "true") controlsUsable = false;
      if ((await page.locator("iframe").count()) !== 1) controlsUsable = false;
    }
    check(vp.name, "device controls usable + one iframe each", controlsUsable);

    // --- escape + focus restoration ---------------------------------------
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden", timeout: 5000 });
    check(vp.name, "Escape closes dialog", (await page.getByRole("dialog").count()) === 0);

    await page.waitForTimeout(600);
    const focusRestored = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-label") === "Tasarımı büyük önizlemede aç"
    );
    check(vp.name, "focus returns to trigger", focusRestored);

    await context.close();
  }

  await browser.close();
}

// --- harness ------------------------------------------------------------
const fixtureServer = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(FIXTURE_HTML);
});

// Spawn the Next CLI through Node rather than the npx shim: Node 24 refuses to
// spawn a .cmd without a shell (EINVAL), and going through a shell would hide
// the real PID from the teardown below.
const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

const app = spawn(process.execPath, [nextBin, "dev", "-p", String(APP_PORT)], {
  env: {
    ...process.env,
    DESIGN_PREVIEW_TEST_URL: `http://localhost:${FIXTURE_PORT}/`,
  },
  stdio: "ignore",
  detached: process.platform !== "win32",
});

function shutdown() {
  // On Windows `child.kill()` only kills the npx shim, leaving the real dev
  // server alive. Next then refuses to start on the next run ("Another next dev
  // server is already running") and the following run silently attaches to the
  // stale one, so the whole tree must go.
  try {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/PID", String(app.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      process.kill(-app.pid, "SIGKILL");
    }
  } catch {
    /* already gone */
  }
  try {
    app.kill();
  } catch {
    /* already gone */
  }
  fixtureServer.close();
}

process.on("SIGINT", () => {
  shutdown();
  process.exit(1);
});

try {
  await new Promise((r) => fixtureServer.listen(FIXTURE_PORT, "127.0.0.1", r));
  console.log(`fixture site on :${FIXTURE_PORT}`);
  console.log("starting next dev…");
  await waitForServer(APP_URL + ROUTE);
  await run();
} catch (err) {
  console.error("\nTest harness error:", err.message);
  failures++;
} finally {
  shutdown();
}

// --- report -------------------------------------------------------------
const byViewport = new Map();
for (const r of results) {
  if (!byViewport.has(r.viewport)) byViewport.set(r.viewport, []);
  byViewport.get(r.viewport).push(r);
}

console.log("\n================ RESPONSIVE TEST RESULTS ================");
for (const [viewport, rows] of byViewport) {
  const passed = rows.filter((r) => r.pass).length;
  console.log(`\n${viewport}  —  ${passed}/${rows.length} passed`);
  for (const r of rows) {
    console.log(`  ${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? "  (" + r.detail + ")" : ""}`);
  }
}
console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : failures + " CHECK(S) FAILED"}`);
console.log("=========================================================");

process.exit(failures === 0 ? 0 : 1);
