import GuzellikMerkeziRandevuSistemiClient from './GuzellikMerkeziRandevuSistemiClient';
import SektorelCrossLinks from '@/components/sections/SektorelCrossLinks';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';

export const metadata = {
  title: 'Güzellik Merkezi Randevu Sistemi | ArillaSoft',
  description: 'Güzellik merkezleri, spa salonları ve kişisel bakım işletmeleri için online randevu yönetim sistemi. Hizmet paketleri, sadakat programı, müşteri takibi.',
};

const faqs = [
  {
    question: 'Farklı hizmet paketlerini nasıl yönetiyorum?',
    answer: 'Her paket ayrı tanımlanır. Örneğin "5 masaj paketi" tanımlarsanız, sistem müşteri randevu aldığında paketten 1 seans çıkarır. Paket bitince müşteriye otomatik yenileme teklifi gönderilir.',
  },
  {
    question: 'Uzun hizmetler (90+ dakika masaj) nasıl planlanıyor?',
    answer: 'Hizmetin süresini tanımlarken saati yazarsınız. Sistem otomatik terapeut takvimine blok takvim atar. No conflict ensured.',
  },
  {
    question: 'Abonelik/reküran randevuları yapabilir miyim?',
    answer: '"Her hafta Çarşamba 14:00 masaj" gibi düzenli randevular sisteme tanımlarsınız. Sistem otomatik hatırlatma yapar.',
  },
  {
    question: 'Müşteri sadakat programını nasıl çalıştırıyorum?',
    answer: 'Her randevu veya harcamaya puan tanımlarsınız. Müşteri belirli puana ulaştığında kupon veya bonus hizmet elde eder. Otomatik sistem tarafından takip edilir.',
  },
  {
    question: 'Promosyon ve sezon kodlarını nasıl oluşturum?',
    answer: 'Yönetici panelinden "Kış indirimi", "Cilt bakımı haftası" gibi kodlar oluşturursunuz. Bu kodlar müşteriler tarafından randevu alırken kullanılabilir.',
  },
  {
    question: 'Sosyal medyada randevu linkini nasıl paylaşıyorum?',
    answer: 'Sisteme özel lansman linkini sosyal medya biyografisinde paylaşırsınız. Müşteriler Instagram veya Whatsapp linkinizden doğrudan randevu alabilir.',
  },
];

export default function GuzellikMerkeziRandevuSistemiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Güzellik Merkezi Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi' },
        ]}
      />
      <ServiceJsonLd
        name="Güzellik Merkezi Randevu Sistemi"
        description="Güzellik merkezleri, spa salonları ve kişisel bakım işletmeleri için online randevu yönetim sistemi. Hizmet paketleri, sadakat programı, müşteri takibi."
        url="/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi"
        serviceType="Güzellik Merkezi Randevu Yazılımı"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />
      <Breadcrumbs
        items={[
          { label: 'Sektörel Yazılımlar', href: '/sektorel-yazilimlar' },
          { label: 'Online Randevu Sistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
          { label: 'Güzellik Merkezi Randevu Sistemi' },
        ]}
      />
      <GuzellikMerkeziRandevuSistemiClient />
      <SektorelCrossLinks currentHref="/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi" />
    </>
  );
}
