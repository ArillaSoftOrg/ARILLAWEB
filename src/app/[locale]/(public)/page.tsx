import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import HomeClient from './HomeClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.home' });
  const ogLocale = locale === 'en' ? 'en_US' : 'tr_TR';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: '/tr', en: '/en', 'x-default': '/tr' },
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-default.png'],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            sameAs: [
              'https://linkedin.com/company/arillasoft',
              'https://github.com/arillasoft',
              'https://instagram.com/arillasoft',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              url: `${SITE_URL}/kurumsal/iletisim`,
            },
          }),
        }}
      />
      <HomeClient />
    </>
  );
}
