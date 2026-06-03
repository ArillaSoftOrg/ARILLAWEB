import KlinikRandevuSistemiClient from './KlinikRandevuSistemiClient';
import SektorelCrossLinks from '@/components/sections/SektorelCrossLinks';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.klinikRandevu' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi`,
      languages: { tr: '/tr/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi', en: '/en/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi', 'x-default': '/tr/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

const faqs = [
  {
    question: 'Hasta verilerinin gizliliği nasıl sağlanıyor?',
    answer: 'Tüm hasta verileri 256-bit militaire şifreleme ile korunur. KVKK ve HIPAA standartlarına uyumludur. Günlük yedek alınır.',
  },
  {
    question: 'Sigorta doğrulaması otomatik olarak mı yapılıyor?',
    answer: 'Evet. Hastanın aile hekimi, sigorta durumu ve ek sigortası sistem tarafından otomatik doğrulanır. Ödeme garanti altına alınır.',
  },
  {
    question: 'Kaç doktor ve ne kadar hizmet tanımlayabilirim?',
    answer: 'Sınırsız. Tek hekim olan klinikten hastane ölçeğinde kurumlar için uygulanabilir. Her doktor kendine ait takvim sahibi olur.',
  },
  {
    question: 'Hasta randevu sistemi web mi yoksa mobil mi?',
    answer: 'Her ikisi de. Hastalar web tarayıcısında (masaüstü, tablet) veya mobil uygulamadan randevu alabilir. Uygulamaya ihtiyaç yoktur.',
  },
  {
    question: 'İlaç/reçete yönetimi sistem içine gömülü mü?',
    answer: 'Evet. Doktor muayenede ilen yazar, sistem reçeteyi ve ilacı hasta dosyasına kaydeder. Eczane ile entegrasyon (2. aşama) mümkün.',
  },
  {
    question: 'Cerrahiler ve uzun tedaviler nasıl planlanıyor?',
    answer: 'Blok takvim ayırabilirsiniz. Örneğin 3 saatlik ameliyat için takvim bloklanır. Doktor otomatik müsait olmaz.',
  },
];

export default function KlinikRandevuSistemiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Klinik Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi' },
        ]}
      />
      <ServiceJsonLd
        name="Klinik Randevu Sistemi"
        description="Klinikler, doktorlar ve sağlık hizmeti sunan işletmeler için online randevu yönetim sistemi. Hasta dosyası, sigorta doğrulama, otomatik hatırlatmalar."
        url="/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi"
        serviceType="Klinik Randevu Yazılımı"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />
      <Breadcrumbs
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Klinik Randevu Sistemi' },
        ]}
      />
      <KlinikRandevuSistemiClient />
      <SektorelCrossLinks currentHref="/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi" />
    </>
  );
}
