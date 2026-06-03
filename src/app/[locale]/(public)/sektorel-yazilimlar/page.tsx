import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from "@/lib/constants";
import SektorelYazilimlarClient from "./SektorelYazilimlarClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sektorelYazilimlar' });
  const ogLocale = locale === 'en' ? 'en_US' : 'tr_TR';
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/sektorel-yazilimlar`,
      languages: { tr: '/tr/sektorel-yazilimlar', en: '/en/sektorel-yazilimlar', 'x-default': '/tr/sektorel-yazilimlar' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/sektorel-yazilimlar`,
      type: 'website',
      locale: ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function SektorelYazilimlarPage() {
  return <SektorelYazilimlarClient />;
}
