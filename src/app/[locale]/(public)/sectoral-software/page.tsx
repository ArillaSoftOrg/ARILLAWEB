import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import SectoralHubContent from './HubContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Sectoral Software Solutions';
  const description =
    'Websites, appointment systems, management panels, and CRM tools built for your industry — from beauty and healthcare to hospitality, real estate, and retail.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/sectoral-software` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/sectoral-software`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SectoralSoftwarePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <SectoralHubContent locale="en" />;
}
