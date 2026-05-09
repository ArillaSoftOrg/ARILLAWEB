'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import ProductHero from '@/components/sections/ProductHero';
import HeroBookingForm from '@/components/hero/HeroBookingForm';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQSection from '@/components/sections/FAQSection';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  QrCode,
  Smartphone,
  RefreshCw,
  BarChart3,
  Globe,
  Palette,
  Wifi,
  Lock,
  Zap,
  TrendingUp,
  UtensilsCrossed,
  Wine,
  Briefcase,
  MapPin,
  ArrowRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Problem Section Component
function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const problems = [
    {
      icon: Smartphone,
      problem: 'Basılı Menüler Eski',
      solution: 'Fiyat değişikliklerini anında yayınlayın, hepsi aynı sayfada görünsün.',
    },
    {
      icon: TrendingUp,
      problem: 'Baskı Maliyetleri Yüksek',
      solution: 'Kağıt maliyetini sıfıra indirin. Dijital menü tamamen ücretsiz güncellenir.',
    },
    {
      icon: Zap,
      problem: 'Müşteri İletişimi Zor',
      solution: 'QR kod ile anında erişim. Müşteriler hiçbir uygulama indirmeden menüyü görebilir.',
    },
    {
      icon: BarChart3,
      problem: 'Veri Eksikliği',
      solution: 'Hangi ürünler en çok okunuyor? Zirve saatler ne zaman? Tüm analitik canlı.',
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      className="py-16 sm:py-20 lg:py-28"
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-5 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              wordBreak: 'break-word',
            }}
          >
            Restoranınız Hangi Sorunlarla Karşı Karşıya?
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 17px)',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Basılı menülerden kaynaklanan maliyetler ve zorlukları ortadan kaldırın.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.problem}
                variants={fadeUp}
                className="p-5 sm:p-7"
                style={{
                  borderRadius: '16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={{
                  y: -4,
                  borderColor: '#7c3aed40',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#fecaca',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color='#dc2626' />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    ❌ {item.problem}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#64748b',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.solution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Target Audience Section Component
function TargetAudienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const audiences = [
    {
      icon: UtensilsCrossed,
      title: 'Restoranlar',
      description: 'Hızlı servis, çeşitli menü seçenekleri ve gerçek zamanlı fiyat güncellemeleri.',
      color: '#f97316',
    },
    {
      icon: Wine,
      title: 'Kafe & Bar',
      description: 'Sezonluk içecekler, promosyonlar ve özel menü sunumları kolayca yönetin.',
      color: '#a16207',
    },
    {
      icon: Briefcase,
      title: 'Birçok Şubeli İşletmeler',
      description: 'Tüm şubeleri merkezi olarak yönetin, her yerin kendi menüsü olsun.',
      color: '#3b82f6',
    },
    {
      icon: MapPin,
      title: 'Catering & Etkinlik Şirketleri',
      description: 'Etkinlere özel menüler oluşturun ve müşterilere QR kod ile paylaşın.',
      color: '#06b6d4',
    },
  ];

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      className="py-16 sm:py-20 lg:py-28"
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.015)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }} className="px-5 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              wordBreak: 'break-word',
            }}
          >
            Hangi İşletmeler için Ideal?
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 17px)',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Restoran, kafe, bar ve catering hizmetleri sağlayan tüm işletmeler için tasarlanmıştır.
          </p>
        </motion.div>

        {/* Audience Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.title}
                variants={fadeUp}
                className="p-5 sm:p-7"
                style={{
                  borderRadius: '16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${audience.color}40`,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${audience.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={audience.color} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {audience.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {audience.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function QrMenuClient() {
  const features = [
    {
      icon: QrCode,
      title: 'QR Kod & NFC Desteği',
      description: 'Masaya QR kodu koyun, müşteri telefonunu yaklaştır, menüyü görsün.',
      color: '#7c3aed',
    },
    {
      icon: RefreshCw,
      title: 'Anlık Menü Güncelleme',
      description: 'Fiyat veya ürün değişikliğini 5 saniyede yayınlayın. Baskı maliyeti sıfır.',
      color: '#06b6d4',
    },
    {
      icon: BarChart3,
      title: 'Detaylı Analitik',
      description: 'Hangi ürünler okunuyor, ne zaman zirve, müşteri tercihleri. Canlı gösterge paneli.',
      color: '#10b981',
    },
    {
      icon: Globe,
      title: 'Çoklu Dil Desteği',
      description: 'Otomatik çeviri ile yabancı müşterilere kendi dillerinde hizmet sunun.',
      color: '#f59e0b',
    },
    {
      icon: Palette,
      title: 'Tam Özelleştirme',
      description: 'Markanızın renkleri, logonuzu, fontlarınızı kullanarak kişiselleştirilmiş tasarım.',
      color: '#ec4899',
    },
    {
      icon: Wifi,
      title: 'Çevrimdışı Modu',
      description: 'İnternet kesintisinde bile menü erişilebilir kalır. Müşteri kaybı yok.',
      color: '#8b5cf6',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Hesap Oluşturun',
      description: 'Arillasoft\'a kaydolun ve işletmenizi ekleyin. 2 dakika sürüyor.',
      icon: Smartphone,
    },
    {
      number: 2,
      title: 'Menünüzü Yükleyin',
      description: 'Kategoriler, ürünler, fiyatları ekleyin. CSV ile toplu yüklemede mümkün.',
      icon: Palette,
    },
    {
      number: 3,
      title: 'QR Kod Alın',
      description: 'Masalarınız için QR kodları basın veya dijital olarak gösterin.',
      icon: QrCode,
    },
    {
      number: 4,
      title: 'Canlı Yayında',
      description: 'Müşteriler QR\'ı tarıyor, menü açılıyor. Her zaman güncel.',
      icon: Zap,
    },
  ];

  const faqs = [
    {
      question: 'QR Menü sistemi uygulamaya başlamak ne kadar kolay?',
      answer:
        'Çok kolay. Hesap oluşturup menünüzü yükledikten sonra hazırsınız. Hiç teknik bilgi gerekli değil. İlk menüyü 10 dakikada oluşturabilirsiniz.',
    },
    {
      question: 'Müşteriler menüyü görmek için uygulama indirmesi gerekir mi?',
      answer:
        'Hayır! Tamamen web tabanlı. Telefon tarayıcısında açılır. Hiçbir indirme, hiçbir hesap kaydı gerekli değil.',
    },
    {
      question: 'Kaç menü oluşturabilirim?',
      answer: 'Sınırsız menü, sınırsız ürün, sınırsız kategori. İstediğiniz kadar menü ekleyebilirsiniz.',
    },
    {
      question: 'Birden fazla şubem varsa ne oluyor?',
      answer:
        'Her şube için ayrı menü yönetebilirsiniz. Merkez yönetim panelinden tüm şubeleri kontrol edin veya şubelere erişim verin.',
    },
    {
      question: 'Menüyü her ne zaman güncelleyebilirim?',
      answer:
        'Zamanınız olduğu her an. Güncelleme anında canlı yayına çıkar. Müşteriler her zaman en güncel menüyü görür.',
    },
    {
      question: 'İnternet kesilirse ne olur?',
      answer:
        'QR Menü offline modda da çalışır. İnternet kesintisinde bile müşteriler menüyü görebilir. Bağlantı geri geldiğinde otomatik senkronizasyon yapılır.',
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <ProductHero
        badge="En Popüler Ürünümüz"
        title="Restoranınız İçin Akıllı Dijital Menü Sistemi"
        description="QR kod ile anında erişilen, anlık güncellenebilen, çok dilli dijital menü çözümü. Müşteri deneyimini dönüştürün, maliyetleri azaltın."
        primaryButton={{
          label: 'Ücretsiz Demo Al',
          href: '/teklif-al',
        }}
        secondaryButton={{
          label: 'Tüm Özellikler',
          href: '#features',
        }}
        accentColor="#7c3aed"
        image={
          <div className="flex w-full justify-center">
            <HeroBookingForm defaultService="QR Menü Sistemi" />
          </div>
        }
      />

      {/* Problem Section */}
      <ProblemSection />

      {/* Features Section */}
      <FeatureGrid
        title="Neden QR Menü Sistemi Seçmelisiniz?"
        description="Masaya QR kodu koyun, müşteri tarar, menüye erişir. Basit, hızlı, etkili."
        features={features}
        columns={3}
        darkMode={true}
        accentColor="#7c3aed"
      />

      {/* How It Works Section */}
      <HowItWorks
        title="4 Adımda Başlayın"
        description="Henüz 10 dakika içinde canlı olun. Teknik bilgi gerekmez."
        steps={steps}
        layout="horizontal"
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* Mid-page CTA */}
      <section
        style={{
          paddingTop: '60px',
          paddingBottom: '60px',
          background: '#f8fafc',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              padding: '40px 32px',
              borderRadius: '12px',
              border: '1px solid rgba(124,58,237,0.2)',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#0f172a',
                margin: 0,
              }}
            >
              İşletmeniz için hemen kullanmaya başlayın
            </h2>
            <Link
              href="/teklif-al"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                color: '#FFFFFF',
                background: '#7c3aed',
                boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(124,58,237,0.3)';
              }}
            >
              Ücretsiz Demo Al
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <TargetAudienceSection />

      {/* FAQ Section */}
      <FAQSection
        title="Sık Sorulan Sorular"
        description="QR Menü Sistemi hakkında merak ettiklerinize cevap bulun."
        faqs={faqs}
        columns={2}
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* CTA Section */}
      <ProductCTASection
        title="QR Menü ile Dijital Dönüşümünüz Başlasın"
        description="Projenizi bizimle paylaşın. 24 saat içinde size özel teklifimizi hazırlayalım. İlk ayı %30 indirimle başlatabilirsiniz."
        primaryButton={{
          label: 'Ücretsiz Teklif Al',
          href: '/teklif-al',
        }}
        secondaryButton={{
          label: 'Fiyat Teklifi Al',
          href: '/teklif-al',
        }}
        accentColor="#7c3aed"
        secondaryColor="#06b6d4"
        badgeLabel="Sınırlı Süre Teklif"
      />

      {/* Cross-links to other sector products */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', background: '#f8fafc' }}>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Diğer Sektörel Yazılımlar
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b' }}>
              İşletmenizin farklı ihtiyaçları için diğer çözümlerimizi inceleyin.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              { title: 'Online Randevu Sistemi', description: 'İşletmeler için online randevu yönetimi ve müşteri takibi.', href: '/sektorel-yazilimlar/randevu-sistemi' },
              { title: 'Kuaför Randevu Sistemi', description: 'Kuaför ve berber salonlarına özel randevu yönetimi.', href: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi' },
              { title: 'Klinik Randevu Sistemi', description: 'Klinik ve sağlık kurumları için hasta randevu takibi.', href: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi' },
              { title: 'Güzellik Merkezi Randevu Sistemi', description: 'Spa ve güzellik merkezleri için hizmet ve terapis yönetimi.', href: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi' },
            ].map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group flex flex-col gap-2 rounded-xl border border-black/[0.08] bg-white p-5 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(37,99,235,0.09)]"
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                  {product.title}
                </span>
                <span style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, flex: 1 }}>
                  {product.description}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#2563eb',
                    marginTop: '4px',
                  }}
                >
                  İncele <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
