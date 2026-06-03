import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import KariyerClient from './KariyerClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.kariyer' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/kurumsal/kariyer`,
      languages: { tr: '/tr/kurumsal/kariyer', en: '/en/kurumsal/kariyer', 'x-default': '/tr/kurumsal/kariyer' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/kurumsal/kariyer`,
      type: 'website',
    },
  };
}

export default function KariyerPage() {
  return <KariyerClient />;
}
