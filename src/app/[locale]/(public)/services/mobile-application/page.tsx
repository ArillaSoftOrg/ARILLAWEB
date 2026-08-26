import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import MobileApplicationContent from './Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Mobile Application Development';
  const description =
    'Native and cross-platform mobile apps for iOS and Android, built for businesses that need more than a website can offer.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services/mobile-application` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/services/mobile-application`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function MobileApplicationPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <MobileApplicationContent locale="en" />;
}
