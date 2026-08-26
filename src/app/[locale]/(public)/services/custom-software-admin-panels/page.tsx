import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import CustomSoftwareAdminPanelsContent from './Content';

type Props = { params: Promise<{ locale: string }> };

const SLUG = 'custom-software-admin-panels' as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Custom Software & Admin Panels';
  const description =
    'Bespoke back-office tools, management dashboards, and role-based staff access built around how your business actually operates.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services/${SLUG}` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/services/${SLUG}`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CustomSoftwareAdminPanelsPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <CustomSoftwareAdminPanelsContent />;
}
