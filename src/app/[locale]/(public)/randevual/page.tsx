import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import RandevualClient from './RandevualClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.randevual' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/randevual`,
      languages: { tr: '/tr/randevual', en: '/en/randevual', 'x-default': '/tr/randevual' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/randevual`,
      type: 'website',
    },
  };
}

export default function RandevualPage() {
  return (
    <main
      style={{
        background: '#F4FAF7',
        minHeight: '100svh',
        paddingTop: '88px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '40px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', padding: '0 16px' }}>
        <RandevualClient />
      </div>
    </main>
  );
}
