import KuaforRandevuSistemiClient from './KuaforRandevuSistemiClient';
import SektorelCrossLinks from '@/components/sections/SektorelCrossLinks';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';

export const metadata = {
  title: 'Kuaför Randevu Sistemi | ArillaSoft',
  description: 'Kuaför ve berber salonları için online randevu yönetim sistemi. 7/24 müşteri randevu alma, otomatik hatırlatmalar, performans raporları.',
};

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
