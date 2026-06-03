import KuaforRandevuSistemiClient from './KuaforRandevuSistemiClient';
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
  const t = await getTranslations({ locale, namespace: 'pages.kuaforRandevu' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi`,
      languages: { tr: '/tr/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi', en: '/en/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi', 'x-default': '/tr/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

const faqs = [
  {
    question: 'Kurulum ne kadar zaman alır?',
    answer: '30 dakika kadar. Hesap oluşturduktan sonra hizmetlerinizi ve çalışanlarınızı ekleyin. Bitirdiğinizde hemen canlı olur.',
  },
  {
    question: 'Müşteriler randevu almak için uygulamayı indirmesi gerekir mi?',
    answer: 'Hayır. Web tabanlıdır. Mobil tarayıcısında açılır. Ekleme önerisine kabul ederse aşama da sayılır, ama gerekli değil.',
  },
  {
    question: 'Kaç çalışan ve hizmet ekleyebilirim?',
    answer: 'Sınırsız. 1 çalışanlı salon da 10 çalışanlı salon da kullanabilir. Paket özelleştirilir, size uygun çözüm bulunur.',
  },
  {
    question: 'Ödeme sistemi nasıl çalışır?',
    answer: 'Otomatik ödeme entegrasyonu vardır. Stripe, Iyzico gibi ödeme sistemleriyle bağlıdır. İster online ister yerinde ödeme seçin.',
  },
  {
    question: 'Müşteri iptal etmek isterse ne olur?',
    answer: 'Sisteme girerek kendileri iptal edebilirler. Siz de yönetici panelinden iptaller yapabilirsiniz. SMS ile haber verilir.',
  },
  {
    question: 'Hafta sonu veya özel günler nasıl yönetilir?',
    answer: 'İstisnai günleri tanımlayabilirsiniz. Örneğin Bayram tatili, hafta sonu kapalı vb. Sistem bunları otomatik kontrol eder.',
  },
];

export default function KuaforRandevuSistemiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Kuaför Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi' },
        ]}
      />
      <ServiceJsonLd
        name="Kuaför Randevu Sistemi"
        description="Kuaför ve berber salonları için online randevu yönetim sistemi. 7/24 müşteri randevu alma, otomatik hatırlatmalar, performans raporları."
        url="/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi"
        serviceType="Kuaför Randevu Yazılımı"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />
      <Breadcrumbs
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Kuaför Randevu Sistemi' },
        ]}
      />
      <KuaforRandevuSistemiClient />
      <SektorelCrossLinks currentHref="/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi" />
    </>
  );
}
