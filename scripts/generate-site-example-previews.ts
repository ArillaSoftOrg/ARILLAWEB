import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import type { Page } from "playwright";
import { CATALOG_EXAMPLES } from "../prisma/catalog-seed-data";
import { DESIGN_PREVIEWS } from "../src/lib/design-preview-config";

const OUTPUT_DIR = path.join(process.cwd(), "public", "site-example-previews");
const VIEWPORT = { width: 1440, height: 900 };
const CONCURRENCY = 4;

type Result = {
  designCode: string;
  label: string;
  ok: boolean;
  detail: string;
};

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const examplesByRoute = new Map(
    CATALOG_EXAMPLES.map((example) => [`${example.categorySlug}/${example.slug}`, example]),
  );

  const targets = Object.entries(DESIGN_PREVIEWS)
    .map(([routeKey, preview]) => {
      const example = examplesByRoute.get(routeKey);
      if (!example || !preview.referenceEnabled) return null;
      return {
        designCode: example.designCode,
        routeKey,
        url: preview.referencePreviewUrl,
        label: preview.referenceLabel,
      };
    })
    .filter((target): target is NonNullable<typeof target> => Boolean(target))
    .sort((a, b) => a.designCode.localeCompare(b.designCode));

  const browser = await chromium.launch();
  const results = await mapWithConcurrency(targets, CONCURRENCY, async (target) => {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
    const outputPath = path.join(OUTPUT_DIR, `${target.designCode}.webp`);

    try {
      await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
      await waitForRender(page);
      await page.screenshot({
        path: outputPath,
        type: "webp",
        quality: 82,
        fullPage: false,
        animations: "disabled",
      });
      const result = {
        designCode: target.designCode,
        label: target.label,
        ok: true,
        detail: outputPath,
      };
      logResult(result);
      return result;
    } catch (error) {
      const result = {
        designCode: target.designCode,
        label: target.label,
        ok: false,
        detail: error instanceof Error ? error.message : String(error),
      };
      logResult(result);
      return result;
    } finally {
      await page.close().catch(() => {});
    }
  });

  await browser.close();
  report(results);
}

async function waitForRender(page: Page) {
  await page.evaluate(async () => {
    await document.fonts?.ready;
    const imageSettled = Promise.all(
      Array.from(document.images)
        .filter((image) => !image.complete && image.getBoundingClientRect().top < window.innerHeight * 1.5)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            }),
        ),
    );
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 3500));
    await Promise.race([imageSettled, timeout]);
  });

  await page.waitForTimeout(800);
}

function report(results: Result[]) {
  const ok = results.filter((result) => result.ok).length;
  const failed = results.length - ok;

  console.log(`\nSite example previews: ${ok}/${results.length} generated, ${failed} failed\n`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, runNext));
  return results;
}

function logResult(result: Result) {
  const prefix = result.ok ? "PASS" : "FAIL";
  console.log(`${prefix} ${result.designCode} ${result.label} - ${result.detail}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
