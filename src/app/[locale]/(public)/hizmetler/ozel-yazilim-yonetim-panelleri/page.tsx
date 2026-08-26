import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import CustomSoftwareAdminPanelsContent from '../../services/custom-software-admin-panels/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Özel Yazılım & Yönetim Panelleri';
  const description =
    'İşletmenizin gerçek çalışma biçimine göre tasarlanan özel arka ofis araçları, yönetim panelleri ve role dayalı personel erişimi.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/ozel-yazilim-yonetim-panelleri` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/ozel-yazilim-yonetim-panelleri`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function OzelYazilimYonetimPanelleriPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <CustomSoftwareAdminPanelsContent locale="tr" />;
}
