'use client';

import Link from 'next/link';
import ProductHero from '@/components/sections/ProductHero';
import HeroBookingForm from '@/components/hero/HeroBookingForm';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQSection from '@/components/sections/FAQSection';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  Calendar,
  Clock,
  Users,
  Bell,
  BarChart3,
  Lock,
  Smartphone,
  Mail,
  Settings,
  Zap,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Online Randevu Alma',
    description: 'Müşterileriniz 7/24 web veya mobil üzerinden randevu alabilir. Telefon kuyruğu olmadan anında rezervasyon.',
    color: '#7c3aed',
  },
  {
    icon: Clock,
    title: 'Randevu Yönetimi',
    description: 'Tüm randevularınızı tek panelden görüntüleyin, düzenleyin ve yönetin. Çakışma uyarıları ile hata yapmayın.',
    color: '#06b6d4',
  },
  {
    icon: Users,
    title: 'Müşteri Randevu Takibi',
    description: 'Her müşterinin geçmiş randevularını, tercihlerini ve notlarını takip edin. Kişiselleştirilmiş hizmet sunun.',
    color: '#8b5cf6',
  },
  {
    icon: Bell,
    title: 'Otomatik Hatırlatmalar',
    description: 'SMS ve e-posta ile otomatik randevu hatırlatmaları gönderin. Gelmeme oranını önemli ölçüde azaltın.',
    color: '#06b6d4',
  },
  {
    icon: BarChart3,
    title: 'Raporlama ve Analitik',
    description: 'Randevu doluluk oranları, iptal istatistikleri ve gelir tahminleri ile işletmenizi veriye dayalı yönetin.',
    color: '#7c3aed',
  },
  {
    icon: Lock,
    title: 'Güvenli Altyapı',
    description: 'KVKK uyumlu, şifreli veri saklama ile müşteri bilgileriniz ve randevu verileriniz güvende.',
    color: '#8b5cf6',
  },
];

const steps = [
  {
    number: 1,
    title: 'Sistemi Kurun',
    description: 'İşletmenizin çalışma saatlerini, hizmetlerini ve personelini tanımlayın. Kurulum birkaç dakika sürer.',
    icon: Settings,
  },
  {
    number: 2,
    title: 'Randevu Sayfanızı Paylaşın',
    description: 'Müşterilerinize özel randevu linkinizi gönderin veya web sitenize yerleştirin.',
    icon: Smartphone,
  },
  {
    number: 3,
    title: 'Randevular Gelsin',
    description: 'Müşteriler 7/24 uygun zamanı seçerek online randevu alır. Siz onay beklerken işinize devam edin.',
    icon: Mail,
  },
  {
    number: 4,
    title: 'Hatırlatma ve Takip',
    description: 'Sistem otomatik olarak hatırlatma gönderir. Randevu sonrası geri bildirim toplayın.',
    icon: Zap,
  },
];

const faqs = [
  {
    question: 'Online randevu sistemi hangi sektörler için uygundur?',
    answer:
      'Kuaförler, klinikler, güzellik merkezleri, hukuk büroları, danışmanlık firmaları ve randevuya dayalı çalışan her işletme için uygundur. Sektöre özel versiyon tercih edebilir ya da genel randevu sistemi kullanabilirsiniz.',
  },
  {
    question: 'Müşteriler randevularını nasıl alır?',
    answer:
      'Müşterileriniz size özel randevu sayfası üzerinden, istedikleri tarih ve saati seçerek online randevu alır. Mobil uyumlu arayüz sayesinde telefondan da kolayca işlem yapabilirler.',
  },
  {
    question: 'Randevu hatırlatmaları nasıl çalışır?',
    answer:
      'Sistem, randevu tarihinden belirlenen süre önce (örneğin 24 saat ve 1 saat) otomatik olarak SMS ve/veya e-posta ile hatırlatma gönderir. Hatırlatma içeriği ve zamanlamasını özelleştirebilirsiniz.',
  },
  {
    question: 'Birden fazla personel veya şube yönetebilir miyim?',
    answer:
      'Evet. Birden fazla personele ve şubeye ayrı takvimler tanımlayabilirsiniz. Merkezi panel üzerinden tüm lokasyonlarınızı ve çalışanlarınızı yönetmek mümkündür.',
  },
  {
    question: 'Mevcut web siteme entegre edebilir miyim?',
    answer:
      'Evet. Randevu widget\'ını veya iframe kodunu web sitenize kolayca yerleştirebilirsiniz. Ayrıca size özel randevu sayfası URL\'si ile sosyal medya profillerinizde de paylaşabilirsiniz.',
  },
  {
    question: 'Sistem KVKK\'ya uygun mu?',
    answer:
      'Evet. Tüm müşteri verileriniz Türkiye\'deki sunucularda şifreli olarak saklanır. KVKK uyumlu aydınlatma metinleri ve veri silme talepleri için gerekli altyapı mevcuttur.',
  },
];

const relatedProducts = [
  {
    title: 'Kuaför Randevu Sistemi',
    description: 'Kuaför salonlarına özel randevu yönetim çözümü.',
    href: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi',
  },
  {
    title: 'Klinik Randevu Sistemi',
    description: 'Klinikler ve sağlık kurumları için hasta randevu takibi.',
    href: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi',
  },
  {
    title: 'Güzellik Merkezi Randevu Sistemi',
    description: 'Spa ve güzellik merkezleri için hizmet ve terapis yönetimi.',
    href: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi',
  },
];

export default function RandevuSistemiClient() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <ProductHero
        badge="Randevu Yönetimi"
        title="Online Randevu Sistemi"
        description="İşletmeniz için geliştirilmiş online randevu sistemi ile müşteri randevu takibini ve randevu yönetimini tek platformdan yapın. 7/24 açık rezervasyon sayfası, otomatik hatırlatmalar ve detaylı raporlama."
        primaryButton={{
          label: 'Ücretsiz Demo Al',
          href: '/teklif-al',
        }}
        secondaryButton={{
          label: 'Özellikleri Gör',
          href: '#features',
        }}
        accentColor="#7c3aed"
        image={
          <div className="flex w-full justify-center">
            <HeroBookingForm defaultService="Randevu Yönetim Sistemi" />
          </div>
        }
      />

      {/* Features Section */}
      <FeatureGrid
        title="Randevu Sistemi Özellikleri"
        description="İşletmenizin tüm randevu süreçlerini dijitalleştiren kapsamlı özellikler."
        features={features}
        columns={3}
        darkMode={true}
        accentColor="#7c3aed"
      />

      {/* How It Works Section */}
      <HowItWorks
        title="Nasıl Çalışır?"
        description="Dört adımda online randevu sistemini kurumunuza entegre edin ve müşterileriniz randevu almaya başlasın."
        steps={steps}
        layout="horizontal"
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* Sektöre Özel Çözümler */}
      <section
        style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          background: 'rgba(124,58,237,0.04)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '30px',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '12px',
              }}
            >
              Sektörünüze Özel Randevu Sistemi
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              Genel randevu sisteminin yanı sıra sektörünüze özel çözümlerimizi inceleyin.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {relatedProducts.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                style={{
                  display: 'block',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(124,58,237,0.15)',
                  background: '#ffffff',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '8px',
                  }}
                >
                  {product.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                  {product.description}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#7c3aed',
                  }}
                >
                  İncele <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Sık Sorulan Sorular"
        description="Online randevu sistemi hakkında merak edilenlerin cevapları."
        faqs={faqs}
        columns={2}
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* CTA Section */}
      <ProductCTASection
        title="İşletmeniz İçin Online Randevu Sistemini Deneyin"
        description="Kurulum gerektirmeden demo hesabınızı oluşturun, randevu yönetimi ve müşteri randevu takibini canlı olarak görün."
        primaryButton={{
          label: 'Ücretsiz Demo Al',
          href: '/teklif-al',
        }}
        secondaryButton={{
          label: 'Fiyat Teklifi Al',
          href: '/teklif-al',
        }}
        accentColor="#7c3aed"
        secondaryColor="#06b6d4"
        badgeLabel="Ücretsiz Demo"
      />
    </div>
  );
}
