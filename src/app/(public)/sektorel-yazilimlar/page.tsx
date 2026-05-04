import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import SektorelYazilimlarClient from "./SektorelYazilimlarClient";

export const metadata: Metadata = {
  title: "Sektörel Yazılımlar | ArillaSoft",
  description: "Farklı sektörlere özel geliştirilen yazılım çözümleri. QR Menü, randevu sistemleri ve işletmelere özel dijital çözümler.",
  openGraph: {
    title: `Sektörel Yazılımlar | ${SITE_NAME}`,
    description: "Farklı sektörlere özel geliştirilen yazılım çözümleri. QR Menü, randevu sistemleri ve işletmelere özel dijital çözümler.",
    url: `${SITE_URL}/sektorel-yazilimlar`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sektörel Yazılımlar | ${SITE_NAME}`,
    description: "Farklı sektörlere özel geliştirilen yazılım çözümleri. QR Menü, randevu sistemleri ve işletmelere özel dijital çözümler.",
  },
};

export default function SektorelYazilimlarPage() {
  return <SektorelYazilimlarClient />;
}
