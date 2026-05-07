import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import HomeClient from './HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${SITE_NAME} | Web, Mobil ve Özel Yazılım Çözümleri`,
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Web, Mobil ve Özel Yazılım Çözümleri`,
      description: SITE_DESCRIPTION,
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | Web, Mobil ve Özel Yazılım Çözümleri`,
      description: SITE_DESCRIPTION,
      images: ['/og-default.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
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
