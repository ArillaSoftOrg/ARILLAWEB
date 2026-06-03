'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Zap,
  Globe,
  Clock,
  Lightbulb,
  Code2,
  Users,
  ArrowRight,
  MapPin,
  Briefcase,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Hero Section
function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '80svh',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'hidden',
        overflowY: 'clip',
        paddingTop: '68px',
        background: '#ffffff',
      }}
    >
      {/* Grid overlay */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(300px, 50vw, 640px)',
          height: 'clamp(300px, 50vw, 640px)',
          background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(124,58,237,0.06)',
                border: '1px solid rgba(124,58,237,0.15)',
                color: '#7c3aed',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              ✦ Bizimle Büyü, Öğren, Başarılı Ol
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.2,
              maxWidth: '640px',
              margin: '0',
            }}
          >
            ArillaSoft&apos;ta Kariyer
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#64748b',
              maxWidth: '560px',
              lineHeight: 1.7,
              margin: '0',
            }}
          >
            Teknoloji odaklı, dinamik bir ekibin parçası olun. Öğrenme, büyüme ve inovasyonun merkezi.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUp}>
            <Link
              href="/kurumsal/iletisim"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                color: 'white',
                background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                boxShadow: '0 4px 14px rgba(124,58,237,0.25)',
                marginTop: '12px',
              }}
            >
              Başvur <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Culture Section
function CultureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 5vw, 42px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              wordBreak: 'break-word',
            }}
          >
            ArillaSoft Kültürü
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 17px)',
              color: '#64748b',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Biz sadece yazılım geliştirmiyoruz — ekip olarak birlikte öğreniyoruz ve büyüyoruz. Startup hızı ve geniş ölçekli projelerin çeşitliliği ile, her gün yeni teknolojiler keşfetme ve en iyi uygulamaları uygulama fırsatı sunuyoruz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Why Work With Us Section
function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const benefits = [
    {
      icon: Globe,
      title: 'Uzaktan Çalışma',
      description: 'Evinden veya dünyanın herhangi bir yerinden çalış. Coğrafi sınırlama yok.',
      color: '#7c3aed',
    },
    {
      icon: Clock,
      title: 'Esnek Çalışma Saatleri',
      description: 'Senin en üretken saatlerinde çalış. Saat 09:00 başlamak zorunlu değil.',
      color: '#06b6d4',
    },
    {
      icon: Lightbulb,
      title: 'Öğrenme & Gelişim',
      description: 'Peşinde olduğun yetkinlikleri geliştir. Kurslar, konferanslar, mentorluk.',
      color: '#8b5cf6',
    },
    {
      icon: Code2,
      title: 'Modern Teknolojiler',
      description: 'Next.js, TypeScript, React, Node.js, AWS. Güncel ve ilginç tech stack.',
      color: '#10b981',
    },
    {
      icon: Users,
      title: 'İşbirlikçi Ekip',
      description: 'Açık iletişim, fikir paylaşımı ve karşılıklı destek. Asla yalnız değilsin.',
      color: '#f59e0b',
    },
    {
      icon: Zap,
      title: 'Hızlı Kariyer Gelişimi',
      description: 'Başarılar tanınır, sorumluluk artar. Senin büyümen bizim başarımız.',
      color: '#ec4899',
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
            Neden ArillaSoft?
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
            Sadece işler yapan bir yer değil, kariyer hedeflerin için eğitim kurumu.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
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
                  borderColor: `${benefit.color}40`,
                  boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${benefit.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={benefit.color} />
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
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#64748b',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {benefit.description}
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

// Open Positions Section
function PositionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const positions = [
    {
      title: 'Frontend Developer (React/Next.js)',
      level: 'Mid/Senior',
      type: 'Tam Zamanlı',
      description: 'Modern web uygulamalar geliştir. TypeScript, React, Tailwind CSS expertise gereklilidir.',
    },
    {
      title: 'Backend Developer (Node.js/Python)',
      level: 'Mid/Senior',
      type: 'Tam Zamanlı',
      description: 'Ölçeklenebilir API\'ler ve sistem mimarileri tasarla. AWS ve Docker bilgisi olması iyi olur.',
    },
    {
      title: 'Full Stack Developer',
      level: 'Junior/Mid',
      type: 'Tam Zamanlı',
      description: 'Frontend\'den backend\'e, veritabanından deploy\'a tüm proje yaşam döngüsünde yer al.',
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
            Açık Pozisyonlar
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
            Şu anda aşağıdaki pozisyonları dolduruyoruz. Aradığın iş burası olabilir.
          </p>
        </motion.div>

        {/* Positions List */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {positions.map((position) => (
            <motion.div
              key={position.title}
              variants={fadeUp}
              className="p-6 sm:p-8"
              style={{
                borderRadius: '16px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{
                y: -4,
                borderColor: '#7c3aed40',
                boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '12px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  {position.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#7c3aed',
                      background: 'rgba(124,58,237,0.1)',
                    }}
                  >
                    {position.level}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#06b6d4',
                      background: 'rgba(6,182,212,0.1)',
                    }}
                  >
                    {position.type}
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}
              >
                {position.description}
              </p>
              <Link
                href="/kurumsal/iletisim"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#7c3aed',
                  textDecoration: 'none',
                  marginTop: '8px',
                }}
              >
                Başvur <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-5 sm:px-6">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #0f0a1e 0%, #0a1628 50%, #0a0f1e 100%)',
            border: '1px solid rgba(124,58,237,0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20"
        >
          {/* Background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontSize: 'clamp(24px, 5vw, 48px)',
                fontWeight: 800,
                color: '#f1f5f9',
                letterSpacing: '-1px',
                lineHeight: 1.15,
                marginBottom: '16px',
                wordBreak: 'break-word',
              }}
            >
              ArillaSoft&apos;ta Kariyer Başlat
            </h2>

            <p
              style={{
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                color: '#64748b',
                maxWidth: '500px',
                margin: '0 auto 32px',
                lineHeight: 1.7,
              }}
            >
              Hiçbir pozisyon listelenmemiş mi? Yine de bize ulaş ve bize uygun olabileceğin pozisyonlar hakkında konuş.
            </p>

            <Link
              href="/kurumsal/iletisim"
              className="inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all"
              style={{
                padding: '12px 28px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                boxShadow: '0 0 40px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Bize Ulaş
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function KariyerClient() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', overflowX: 'hidden' }}>
      <HeroSection />
      <CultureSection />
      <BenefitsSection />
      <PositionsSection />
      <CTASection />
    </div>
  );
}
