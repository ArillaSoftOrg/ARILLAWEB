import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import WebsiteWebApplicationContent from '../../services/website-web-application/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Web Sitesi ve Web Uygulama Geliştirme';
  const description =
    'İşletmenizin gerçek operasyonlarını destekleyecek şekilde tasarlanan ve geliştirilen kurumsal web siteleri, müşterilere yönelik web uygulamaları ve iç web portalları.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/web-sitesi-web-uygulama` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/web-sitesi-web-uygulama`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function WebSitesiWebUygulamaPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <WebsiteWebApplicationContent locale="tr" />;
}
