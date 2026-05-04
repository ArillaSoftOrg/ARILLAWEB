import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import RandevuSistemiClient from './RandevuSistemiClient';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';

export const metadata: Metadata = {
  title: 'Online Randevu Sistemi | ArillaSoft',
  description: 'İşletmeler için online randevu sistemi, randevu yönetimi ve müşteri randevu takibi çözümü.',
  openGraph: {
    title: `Online Randevu Sistemi | ${SITE_NAME}`,
    description: 'İşletmeler için online randevu sistemi, randevu yönetimi ve müşteri randevu takibi çözümü.',
    url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Online Randevu Sistemi | ${SITE_NAME}`,
    description: 'İşletmeler için online randevu sistemi, randevu yönetimi ve müşteri randevu takibi çözümü.',
  },
};

const faqs = [
  {
    question: 'Online randevu sistemi hangi sektörler için uygundur?',
    answer: 'Kuaförler, klinikler, güzellik merkezleri, hukuk büroları, danışmanlık firmaları ve randevuya dayalı çalışan her işletme için uygundur. Sektöre özel versiyon tercih edebilir ya da genel randevu sistemi kullanabilirsiniz.',
  },
  {
    question: 'Müşteriler randevularını nasıl alır?',
    answer: 'Müşterileriniz size özel randevu sayfası üzerinden, istedikleri tarih ve saati seçerek online randevu alır. Mobil uyumlu arayüz sayesinde telefondan da kolayca işlem yapabilirler.',
  },
  {
    question: 'Randevu hatırlatmaları nasıl çalışır?',
    answer: 'Sistem, randevu tarihinden belirlenen süre önce (örneğin 24 saat ve 1 saat) otomatik olarak SMS ve/veya e-posta ile hatırlatma gönderir. Hatırlatma içeriği ve zamanlamasını özelleştirebilirsiniz.',
  },
  {
    question: 'Birden fazla personel veya şube yönetebilir miyim?',
    answer: 'Evet. Birden fazla personele ve şubeye ayrı takvimler tanımlayabilirsiniz. Merkezi panel üzerinden tüm lokasyonlarınızı ve çalışanlarınızı yönetmek mümkündür.',
  },
  {
    question: 'Mevcut web siteme entegre edebilir miyim?',
    answer: "Evet. Randevu widget'ını veya iframe kodunu web sitenize kolayca yerleştirebilirsiniz. Ayrıca size özel randevu sayfası URL'si ile sosyal medya profillerinizde de paylaşabilirsiniz.",
  },
  {
    question: "Sistem KVKK'ya uygun mu?",
    answer: "Evet. Tüm müşteri verileriniz Türkiye'deki sunucularda şifreli olarak saklanır. KVKK uyumlu aydınlatma metinleri ve veri silme talepleri için gerekli altyapı mevcuttur.",
  },
];

export default function RandevuSistemiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
        ]}
      />
      <ServiceJsonLd
        name="Online Randevu Sistemi"
        description="İşletmeler için online randevu sistemi, randevu yönetimi ve müşteri randevu takibi çözümü."
        url="/sektorel-yazilimlar/randevu-sistemi"
        serviceType="Randevu Yönetim Yazılımı"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />
      <Breadcrumbs
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi' },
        ]}
      />
      <RandevuSistemiClient />
    </>
  );
}
