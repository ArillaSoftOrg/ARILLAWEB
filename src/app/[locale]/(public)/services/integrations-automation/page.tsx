import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import IntegrationsAutomationContent from './Content';

type Props = { params: Promise<{ locale: string }> };

const SERVICE_SLUG = 'integrations-automation' as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Integrations and Business Process Automation';
  const description =
    'Connect the tools your business already uses and automate the manual, repetitive work between them with custom API integrations and workflow automation.';
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

export default async function IntegrationsAutomationPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return <IntegrationsAutomationContent locale="en" />;
}
