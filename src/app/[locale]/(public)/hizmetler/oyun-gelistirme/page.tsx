import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import GameDevelopmentContent from '../../services/game-development/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Oyun Geliştirme Hizmetleri';
  const description =
    'Web ve mobil platformlar için 2D/3D oyun geliştirme, oyunlaştırma ve etkileşimli deneyimler.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/oyun-gelistirme` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/oyun-gelistirme`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function OyunGelistirmePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <GameDevelopmentContent locale="tr" />;
}
