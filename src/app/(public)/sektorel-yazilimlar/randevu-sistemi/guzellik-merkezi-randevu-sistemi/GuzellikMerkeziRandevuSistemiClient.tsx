'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import ProductHero from '@/components/sections/ProductHero';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQSection from '@/components/sections/FAQSection';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  Calendar,
  Clock,
  Users,
  Palette,
  BarChart3,
  Lock,
  Smartphone,
  CheckCircle,
  Settings,
  Zap,
  AlertCircle,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Gift,
  Heart,
  Droplet,
  Scissors,
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
      icon: Scissors,
      problem: 'Randevu Pazarlaması Zor',
      solution: 'Müşteriler kolayca randevu alabilsin. Terapi paketleri, uzun süreli hizmetler düzenli yönetilsin.',
    },
    {
      icon: Gift,
      problem: 'Paket & Ödeme Karışıklığı',
      solution: 'Masaj paketi, cilt bakımı serisi, abonelik planları otomatik yönetilir ve hatırlatılır.',
    },
    {
      icon: Users,
      problem: 'Loyal Müşteri Kaybı',
      solution: 'SMS ve email ile düzenli müşteri takibi. Müşteri sık gelmeye başladığında otomatik hatırlatma.',
    },
    {
      icon: TrendingUp,
      problem: 'Satış Fırsatlarını Kaçırma',
      solution: 'Hangi hizmet popüler, hangi mevsim talep yoğun, hangi paket en çok satılıyor. Veriye dayalı pazarlama.',
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
            Güzellik Merkeziniz Hangi Sorunlarla Karşı Karşıya?
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
            Manuel randevu ve paket yönetiminin zorlukları artık geçmişte kalabilir.
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

// Target Users Section Component
function TargetUsersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const users = [
    {
      icon: Sparkles,
      title: 'Güzellik Salonları',
      description: 'Makyöz, epilasyon, cilt bakımı ve estetik hizmetleri sunan salonlar için ideal çözüm.',
      color: '#ec4899',
    },
    {
      icon: Droplet,
      title: 'Spa & Masaj Salonları',
      description: 'Masaj paketleri, aromaterapi, vücut bakımı gibi uzun süreli hizmetlerin planlanması kolay hale gelir.',
      color: '#06b6d4',
    },
    {
      icon: Palette,
      title: 'Tırnak Tasarımı (Nail Studio)',
      description: 'Manicure, pedicure, nail art randevuları ve paket satışları sistematik yönetilir.',
      color: '#8b5cf6',
    },
    {
      icon: Heart,
      title: 'Wellness & Terapi Merkezleri',
      description: 'Yoga, pilates, fizyoterapı, diyetetik danışmanlık gibi çok hizmetli merkezler için.',
      color: '#10b981',
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
            Hangi Güzellik Işletmeleri için Ideal?
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
            Kişisel bakım ve wellness hizmetleri sunan tüm işletmeler için tasarlanmıştır.
          </p>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {users.map((user) => {
            const Icon = user.icon;
            return (
              <motion.div
                key={user.title}
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
                  borderColor: `${user.color}40`,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${user.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={user.color} />
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
                    {user.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {user.description}
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

export default function GuzellikMerkeziRandevuSistemiClient() {
  const features = [
    {
      icon: Palette,
      title: 'Hizmet & Paket Yönetimi',
      description: 'Saç, cilt, masaj vb. hizmetleri ve paket satışlarını tanımlayın. Fiyat ve süresi otomatik hesaplanır.',
      color: '#7c3aed',
    },
    {
      icon: Calendar,
      title: 'Terapeut Takvimi',
      description: 'Her terapeut/stilistin ayrı takvimi. Tatiller, nöbet saatleri, çalışma periyotları yönetilir.',
      color: '#06b6d4',
    },
    {
      icon: Gift,
      title: 'Paket & Abonelik Planları',
      description: '10 seans masaj paketi, 5 haftalık cilt bakımı serisi. Otomatik takip ve hatırlatma yapılır.',
      color: '#8b5cf6',
    },
    {
      icon: MessageSquare,
      title: 'Müşteri İletişimi & Hatırlatma',
      description: 'SMS ve email ile randevu hatırlatması. Paket süresi bittiğinde yenileme teklifi gönderilir.',
      color: '#06b6d4',
    },
    {
      icon: BarChart3,
      title: 'Satış & Performans Raporları',
      description: 'Hangi hizmet en çok satılıyor, hangi terapeut meşgul, müşteri memnuniyeti. Akıllı pazarlama yapın.',
      color: '#7c3aed',
    },
    {
      icon: Heart,
      title: 'Sadakat Programı & Kupon',
      description: 'Sık gelen müşterilere bonus hizmet, sezon kuponları, doğum günü hediyesi otomatik sunun.',
      color: '#8b5cf6',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Hesap Oluşturun',
      description: 'Arillasoft\'a kaydolun ve merkezinizi ekleyin. Tamamı ücretsiz kurulum.',
      icon: Smartphone,
    },
    {
      number: 2,
      title: 'Hizmetleri & Paketleri Tanımlayın',
      description: 'Makyöz saati, masaj paketi, cilt bakımı serisi vb. Hizmetin süresi ve fiyatını belirleyin.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Terapistleri Ekleyin',
      description: 'Çalışanlarınızı sisteme ekleyin. Hangi hizmeti kim yapıyor belirleyin.',
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
      question: 'Farklı hizmet paketlerini nasıl yönetiyorum?',
      answer:
        'Her paket ayrı tanımlanır. Örneğin "5 masaj paketi" tanımlarsanız, sistem müşteri randevu aldığında paketten 1 seans çıkarır. Paket bitince müşteriye otomatik yenileme teklifi gönderilir.',
    },
    {
      question: 'Uzun hizmetler (90+ dakika masaj) nasıl planlanıyor?',
      answer:
        'Hizmetin süresini tanımlarken saati yazarsınız. Sistem otomatik terapeut takvimine blok takvim atar. No conflict ensured.',
    },
    {
      question: 'Abonelik/reküran randevuları yapabilir miyim?',
      answer:
        'Evet. "Her hafta Çarşamba 14:00 masaj" gibi düzenli randevular systeme tanımlarsınız. Sistem otomatik hatırlatma yapar.',
    },
    {
      question: 'Müşteri sadakat programını nasıl çalıştırıyorum?',
      answer:
        'Her randevu veya harcamaya puan tanımlarsınız. Müşteri belirli puana ulaştığında kupon veya bonus hizmet elde eder. Otomatik sistem tarafından takip edilir.',
    },
    {
      question: 'Promosyon ve sezon kodlarını nasıl oluşturum?',
      answer:
        'Yönetici panelinden "Kış indirimi", "Cilt bakımı haftası" gibi kodlar oluşturursunuz. Bu kodlar müşteriler tarafından randevu alırken kullanılabilir.',
    },
    {
      question: 'Sosyal medyada randevu linkini nasıl paylaşıyorum?',
      answer:
        'Sistemi size özel lansman linkini sosyal medya biyografisinde paylaşırsınız. Müşteriler Instagram veya Whatsapp linkinizden doğrudan randevu alabilir.',
    },
  ];

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <ProductHero
        badge="Güzellik & Wellness İşletmeleri İçin"
        title="Güzellik Merkeziniz İçin Online Randevu Sistemi"
        description="Stilistler, terapistler, estetisyenler için tasarlanmış. Hizmet paketleri, sadakat programı, müşteri takibi, satış raporları."
        primaryButton={{
          label: 'Ücretsiz Demo Al',
          href: '/teklif-al',
        }}
        secondaryButton={{
          label: 'Tüm Özellikler',
          href: '#features',
        }}
        accentColor="#7c3aed"
      />

      {/* Problem Section */}
      <ProblemSection />

      {/* Features Section */}
      <FeatureGrid
        title="Güzellik Merkezinin Özellikleri"
        description="Paket satışından sadakat programına, tüm ihtiyaçlar tek sistemde çözüldü."
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

      {/* Target Users Section */}
      <TargetUsersSection />

      {/* FAQ Section */}
      <FAQSection
        title="Sık Sorulan Sorular"
        description="Güzellik Merkezinin Randevu Sistemi hakkında merak ettiklerinize cevap bulun."
        faqs={faqs}
        columns={2}
        accentColor="#7c3aed"
        darkMode={true}
      />

      {/* CTA Section */}
      <ProductCTASection
        title="Güzellik Merkeziniz İçin Online Randevu Yönetimi Başlayın"
        description="Müşteri kaybını durdurun. Paket satışlarını arttırın. Müşteri sadakatini güçlendirin. Hemen başlayın, ilk ay %35 indirim."
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
        badgeLabel="İlk Ay %35 İndirim"
      />
    </div>
  );
}
