import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import IntegrationsAutomationContent from '../../services/integrations-automation/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Entegrasyon ve İş Süreci Otomasyonu';
  const description =
    'İşletmenizin zaten kullandığı araçları birbirine bağlayın; özel API entegrasyonları ve iş akışı otomasyonuyla aralarındaki manuel, tekrarlayan işleri otomatikleştirin.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/entegrasyon-otomasyon` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/entegrasyon-otomasyon`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function EntegrasyonOtomasyonPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <IntegrationsAutomationContent locale="tr" />;
}
