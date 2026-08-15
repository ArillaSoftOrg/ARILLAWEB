/**
 * Global marketing-site typography: Lora (display), Archivo (body/UI/nav/
 * buttons), and IBM Plex Mono (eyebrow/metadata/index labels). Self-hosted
 * via @fontsource rather than next/font/google — see site-example-fonts.ts
 * for the Vercel build failure (a stale fonts.gstatic.com fetch) that
 * self-hosting fixed; this avoids the same build-time network dependency.
 *
 * Each imported weight file bundles latin + latin-ext subsets (covering
 * Turkish ğ/ş/ı/İ/ç/ö/ü) behind unicode-range, so the browser only fetches
 * the glyphs actually used on the page.
 */
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/500-italic.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
