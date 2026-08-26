import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import GameDevelopmentContent from './Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Game Development Services';
  const description =
    '2D and 3D game development, gamification, and interactive experiences for web and mobile platforms.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services/game-development` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/services/game-development`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function GameDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <GameDevelopmentContent locale="en" />;
}
