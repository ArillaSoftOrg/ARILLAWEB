import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import MobileApplicationContent from '../../services/mobile-application/Content';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const title = 'Mobil Uygulama Geliştirme';
  const description =
    'iOS ve Android için, bir web sitesinden fazlasına ihtiyaç duyan işletmeler için geliştirilen native ve çoklu platform mobil uygulamalar.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/hizmetler/mobil-uygulama` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/hizmetler/mobil-uygulama`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function MobilUygulamaPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return <MobileApplicationContent locale="tr" />;
}
