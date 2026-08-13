import { IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";

/**
 * Typography for the Site Örnekleri detail route only. Exposed as CSS
 * variables and applied via `.variable` on the route's own `<main>` wrapper
 * (see page.tsx) — never on the root layout, so global Navbar/Footer/FAQ
 * keep the system font stack untouched.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-se-manrope",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-se-serif",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-se-mono",
  display: "swap",
});

export const siteExampleFontVariables = `${manrope.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`;
