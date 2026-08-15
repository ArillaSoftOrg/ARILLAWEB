import localFont from "next/font/local";

/**
 * Typography for the Site Örnekleri detail route only. Exposed as CSS
 * variables and applied via `.variable` on the route's own `<main>` wrapper
 * (see page.tsx) — never on the root layout, so global Navbar/Footer/FAQ
 * keep the system font stack untouched.
 *
 * Self-hosted (next/font/local) rather than next/font/google: the Google
 * Fonts build step fetches CSS + woff2 files from fonts.gstatic.com at
 * build time, and a stale/invalid cached URL there took down the Vercel
 * build with a 404. Local files remove that network dependency entirely.
 * Files are latin-subset woff2 downloads of the same Manrope, Instrument
 * Serif (italic), and IBM Plex Mono weights the previous config requested.
 */
export const manrope = localFont({
  src: "../fonts/site-examples/Manrope-Variable.woff2",
  weight: "400 800",
  variable: "--font-se-manrope",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: "../fonts/site-examples/InstrumentSerif-Italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-se-serif",
  display: "swap",
});

export const ibmPlexMono = localFont({
  src: [
    { path: "../fonts/site-examples/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/site-examples/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/site-examples/IBMPlexMono-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-se-mono",
  display: "swap",
});

export const siteExampleFontVariables = `${manrope.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`;
