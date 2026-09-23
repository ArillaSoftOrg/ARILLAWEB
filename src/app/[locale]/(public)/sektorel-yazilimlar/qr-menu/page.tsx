import QrMenuClient from './QrMenuClient';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES, industryHref, t as tField } from '@/lib/en-site-data';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';

const restaurantIndustry = INDUSTRIES.find((industry) => industry.slug === 'restaurant-cafe');

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const t = await getTranslations({ locale, namespace: 'pages.qrMenu' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/sektorel-yazilimlar/qr-menu`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/sektorel-yazilimlar/qr-menu`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

const faqs = [
  {
    question: 'QR Menü sistemi uygulamaya başlamak ne kadar kolay?',
    answer: 'Çok kolay. Hesap oluşturup menünüzü yükledikten sonra hazırsınız. Hiç teknik bilgi gerekli değil. İlk menüyü 10 dakikada oluşturabilirsiniz.',
  },
  {
    question: 'Müşteriler menüyü görmek için uygulama indirmesi gerekir mi?',
    answer: 'Hayır! Tamamen web tabanlı. Telefon tarayıcısında açılır. Hiçbir indirme, hiçbir hesap kaydı gerekli değil.',
  },
  {
    question: 'Kaç menü oluşturabilirim?',
    answer: 'Sınırsız menü, sınırsız ürün, sınırsız kategori. İstediğiniz kadar menü ekleyebilirsiniz.',
  },
  {
    question: 'Birden fazla şubem varsa ne oluyor?',
    answer: 'Her şube için ayrı menü yönetebilirsiniz. Merkez yönetim panelinden tüm şubeleri kontrol edin veya şubelere erişim verin.',
  },
  {
    question: 'Menüyü her ne zaman güncelleyebilirim?',
    answer: 'Zamanınız olduğu her an. Güncelleme anında canlı yayına çıkar. Müşteriler her zaman en güncel menüyü görür.',
  },
  {
    question: 'İnternet kesilirse ne olur?',
    answer: 'QR Menü offline modda da çalışır. İnternet kesintisinde bile müşteriler menüyü görebilir. Bağlantı geri geldiğinde otomatik senkronizasyon yapılır.',
  },
  {
    question: 'QR Menü, sipariş alma veya adisyon (POS) sistemi mi?',
    answer:
      'Hayır. QR Menü bir dijital menü görüntüleme sistemidir — masadan sipariş alma, adisyon veya ödeme işlemleri kapsamında değildir. Bu tür bir ihtiyacınız varsa özel bir yazılım projesi olarak ayrıca değerlendirebiliriz.',
  },
];

export default async function QrMenuPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'QR Menü Sistemi', href: '/sektorel-yazilimlar/qr-menu' },
        ]}
      />
      <ServiceJsonLd
        name="QR Menü Sistemi"
        description="Restoran, kafe ve işletmeler için dijital QR menü sistemi. Anlık güncelleme, çoklu dil, gerçek zamanlı analitik."
        url="/sektorel-yazilimlar/qr-menu"
        serviceType="Dijital Menü Yazılımı"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />
      <Breadcrumbs
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'QR Menü Sistemi' },
        ]}
      />
      <QrMenuClient />

      {restaurantIndustry && (
        <section className="section-py bg-slate-50">
          <div className="section-container">
            <Link
              href={industryHref('tr', restaurantIndustry)}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div>
                <h3 className="text-role-subheading mb-1">
                  Restoran ve kafeler için diğer çözümlerimiz
                </h3>
                <p className="text-role-body text-sm">
                  {tField(restaurantIndustry.summary, 'tr')}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
