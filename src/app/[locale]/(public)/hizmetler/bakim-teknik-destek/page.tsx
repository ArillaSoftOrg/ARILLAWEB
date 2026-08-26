import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import MaintenanceTechnicalSupportContent from '../../services/maintenance-technical-support/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Bakım & Teknik Destek';
  const description =
    'Mevcut web siteleri, uygulamalar ve özel yazılımlar için sürekli bakım, güncelleme ve teknik destek — geliştiren biz olsak da olmasak da.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/bakim-teknik-destek` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/bakim-teknik-destek`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function BakimTeknikDestekPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <MaintenanceTechnicalSupportContent locale="tr" />;
}
