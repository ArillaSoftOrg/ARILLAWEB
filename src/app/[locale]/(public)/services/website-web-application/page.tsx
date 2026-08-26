import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import WebsiteWebApplicationContent from './Content';

type Props = { params: Promise<{ locale: string }> };

const SERVICE_SLUG = 'website-web-application' as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Website & Web Application Development';
  const description =
    'Marketing websites, customer-facing web applications, and internal web portals, designed and built to support real business operations.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services/${SERVICE_SLUG}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/services/${SERVICE_SLUG}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function WebsiteWebApplicationPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <WebsiteWebApplicationContent />;
}
