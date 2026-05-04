import QrMenuClient from './QrMenuClient';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';

export const metadata = {
  title: 'QR Menü Sistemi | ArillaSoft',
  description: 'Restoran, kafe ve işletmeler için dijital QR menü sistemi. Anlık güncelleme, çoklu dil, gerçek zamanlı analitik.',
};

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
];

export default function QrMenuPage() {
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
    </>
  );
}
