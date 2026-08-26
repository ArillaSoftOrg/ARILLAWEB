import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import MaintenanceTechnicalSupportContent from './Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Maintenance & Technical Support';
  const description =
    'Ongoing maintenance, updates, and technical support for existing websites, applications, and custom software — whether we built it or not.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services/maintenance-technical-support` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/services/maintenance-technical-support`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function MaintenanceTechnicalSupportPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <MaintenanceTechnicalSupportContent />;
}
