import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import ServicesHubContent from './HubContent';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Software Development Services';
  const description =
    'Websites and web applications, mobile apps, custom software, integrations, game development, and ongoing technical support.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/services`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <ServicesHubContent locale="en" />;
}
