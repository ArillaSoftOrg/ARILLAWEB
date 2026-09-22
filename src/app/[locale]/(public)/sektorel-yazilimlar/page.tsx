import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { permanentRedirect } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import SectoralHubContent from "../sectoral-software/HubContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr") return {};
  const t = await getTranslations({ locale, namespace: 'pages.sektorelYazilimlar' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/sektorel-yazilimlar`,
      languages: { tr: '/tr/sektorel-yazilimlar', en: '/en/sectoral-software', 'x-default': '/tr/sektorel-yazilimlar' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/sektorel-yazilimlar`,
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function SektorelYazilimlarPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr") {
    // SektorelYazilimlarClient (this hub's non-tr branch) was 100%
    // hardcoded Turkish — a duplicate of the tr page, not real English
    // content. /en/sectoral-software is the real English hub.
    permanentRedirect("/en/sectoral-software");
  }

  return <SectoralHubContent locale="tr" />;
}
