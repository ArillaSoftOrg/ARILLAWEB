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
  Calendar,
  Clock,
  Users,
  Phone,
  BarChart3,
  Lock,
  Smartphone,
  CheckCircle,
  Settings,
  Zap,
  AlertCircle,
  Scissors,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
      icon: Phone,
      problem: 'Sürekli Telefon Çalmakası',
      solution: 'Müşteriler kendileri randevu alabilsin. Siz sadece işinize odaklanın.',
    },
    {
      icon: Users,
      problem: 'Boş Saatler',
      solution: 'Müşterilerin görüp kolayca randevu alabileceği online sistem sayesinde doluluk artar.',
    },
    {
      icon: AlertCircle,
      problem: 'Randevu Çatışması',
      solution: 'Aynı saate iki randevu olmaması için sistem otomatik kontrol eder.',
    },
    {
      icon: TrendingUp,
      problem: 'Verilere Erişim Eksikliği',
      solution: 'Hangi hizmet popüler, hangi saatler dolgun, hangi çalışan meşgul. Tümü canlı gösterilir.',
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
            Kuaför Salonunuz Hangi Sorunlarla Karşı Karşıya?
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
            Manuel randevu yönetiminin zorlukları artık geçmişte kalabilir.
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

// Solution Section Component
function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const solutions = [
    {
      icon: CheckCircle,
      title: 'Online Randevu Sistemi',
      description: 'Müşteriler 7/24 istediği saatte randevu alabilir. Salonunuz kapalı olsa bile siparişler gelmeye devam eder.',
    },
    {
      icon: MessageSquare,
      title: 'Otomatik Hatırlatma',
      description: 'Müşterilere SMS ve email ile randevu hatırlatması yapın. İptal oranı düşer, gelişs oranı artar.',
    },
    {
      icon: DollarSign,
      title: 'Ödeme Entegrasyonu',
      description: 'Online olarak ön ödeme alın veya randevuda ödeme seçeneği sunun. Sahtekarlık yok, güvenli işlem.',
    },
    {
      icon: BarChart3,
      title: 'Performans Raporları',
      description: 'Hangi hizmet popüler, hangi çalışan yoğun, hangi saatler dolgun. Veriye dayalı kararlar alın.',
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
            ✅ Randevu Sistemi Çözümü
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
            Online randevu yönetimi artık çok kolay. Müşteriler kendi randevularını alsın, siz işinize odaklanın.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
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
                  borderColor: '#10b98140',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#d1fae5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color='#059669' />
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
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
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

export default function KuaforRandevuSistemiClient() {
  const features = [
    {
      icon: Calendar,
      title: 'Hızlı & Kolay Randevu Alma',
      description: '3 tıklamada randevu alınsın. Müşteri dostu, sezgisel arayüz.',
      color: '#7c3aed',
    },
    {
      icon: Clock,
      title: 'Zamanı Otomatik Yönetin',
      description: 'Her hizmetin süresi tanımlı. Sistem otomatik uygun saatleri gösterir.',
      color: '#06b6d4',
    },
    {
      icon: Users,
      title: 'Çalışan Yönetimi',
      description: 'Hangi çalışan ne saatte müşterilere uygun. Adil dağıtım, verimli kullanım.',
      color: '#8b5cf6',
    },
    {
      icon: Scissors,
      title: 'Hizmet Tanımlama',
      description: 'Saç kesim, ağda, tıraş, boyama vs. Her hizmetin süresi ve fiyatını belirleyin.',
      color: '#06b6d4',
    },
    {
      icon: MessageSquare,
      title: 'Sms & Email Bildirim',
      description: 'Müşterilere otomatik hatırlatma gönderilir. Randevu iptalleri azalır, gelişler artar.',
      color: '#7c3aed',
    },
    {
      icon: Lock,
      title: 'Güvenli & Gizli',
      description: 'Müşteri verileriniz güvenli sunucularda tutulur. KVKK uyumlu, sertifikalı.',
      color: '#8b5cf6',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Hesap Oluşturun',
      description: 'Arillasoft\'a kaydolun ve salonunuzu ekleyin. Tamamı ücretsiz.',
      icon: Smartphone,
    },
    {
      number: 2,
      title: 'Hizmetleri Tanımlayın',
      description: 'Saç kesim, boyama, tıraş vb. hizmetleri ekleyin. Her birinin süre ve fiyatını belirleyin.',
      icon: Scissors,
    },
    {
      number: 3,
      title: 'Çalışanları Ekleyin',
      description: 'Salonunuzdaki çalışanları sisteme ekleyin. Hangi hizmeti kim yapıyor belirleyin.',
      icon: Users,
    },
    {
      number: 4,
      title: 'Canlı Yayında',
      description: 'Müşteriler web sitesinden veya sosyal medya linkinden randevu alabilir.',
      icon: Zap,
    },
  ];

  const faqs = [
    {
      question: 'Kurulum ne kadar zaman alır?',
      answer:
        '30 dakika kadar. Hesap oluşturduktan sonra hizmetlerinizi ve çalışanlarınızı ekleyin. Bitirdiğinizde hemen canlı olur.',
    },
    {
      question: 'Müşteriler randevu almak için uygulamayı indirmesi gerekir mi?',
      answer:
        'Hayır. Web tabanlıdır. Mobil tarayıcısında açılır. Ekleme önerisine kabul ederse aşama da sayılır, ama gerekli değil.',
    },
    {
      question: 'Kaç çalışan ve hizmet ekleyebilirim?',
      answer:
        'Sınırsız. 1 çalışanlı salon da 10 çalışanlı salon da kullanabilir. Paket özelleştirilir, size uygun çözüm bulunur.',
    },
    {
      question: 'Ödeme sistemi nasıl çalışır?',
      answer:
        'Otomatik ödeme entegrasyonu vardır. Stripe, Iyzico gibi ödeme sistemleriyle bağlıdır. İster online ister yerinde ödeme seçin.',
    },
    {
      question: 'Müşteri iptal etmek isterse ne olur?',
      answer:
        'Sisteme girerek kendileri iptal edebilirler. Siz de yönetici panelinden iptaller yapabilirsiniz. SMS ile haber verilir.',
    },
    {
      question: 'Hafta sonu veya özel günler nasıl yönetilir?',
      answer:
        'İstisnai günleri tanımlayabilirsiniz. Örneğin Bayram tatili, hafta sonu kapalı vb. Sistem bunları otomatik kontrol eder.',
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <ProductHero
        badge="Kuaför & Berber Salonları İçin"
        title="Kuaför Salonunuz İçin Online Randevu Sistemi"
        description="Müşterileriniz 7/24 istediği saatte randevu alabilsin. Siz telefonu açmak zorunda olmayın. Otomatik bildirimler, performans raporları, güvenli işlem."
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
            <HeroBookingForm defaultService="Randevu Yönetim Sistemi" />
          </div>
        }
      />

      {/* Problem Section */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Features Section */}
      <FeatureGrid
        title="Kuaför Randevu Sisteminin Özellikleri"
        description="Her şey salonunuzın ihtiyacına göre tasarlandı. Kullanması kolay, güvenli, hızlı."
        features={features}
        columns={3}
        darkMode={true}
        accentColor="#7c3aed"
      />

      {/* How It Works Section */}
      <HowItWorks
        title="4 Adımda Başlayın"
        description="Hiçbir teknik bilgiye ihtiyacınız yok. Saatinizde canlı olabilirsiniz."
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

      {/* FAQ Section */}
      <FAQSection
        title="Sık Sorulan Sorular"
        description="Kuaför Randevu Sistemi hakkında merak ettiklerinize cevap bulun."
        faqs={faqs}
        columns={2}
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* CTA Section */}
      <ProductCTASection
        title="Kuaför Salonunuz İçin Online Randevu Yönetimi Başlayın"
        description="Müşteri kaybını durdurun. Boş saatları doldurun. Operasyonunuzu otomatikleştirin. Hemen başlayın, ilk ay %30 indirim."
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
        badgeLabel="İlk Ay %30 İndirim"
      />
    </div>
  );
}
