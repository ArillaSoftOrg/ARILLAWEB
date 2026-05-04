'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface ProductCTASectionProps {
  title: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ size: number }>;
  };
  secondaryButton?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ size: number }>;
  };
  accentColor?: string;
  secondaryColor?: string;
  badgeLabel?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductCTASection({
  title,
  description = 'Projenizi bizimle paylaşın. 24 saat içinde size özel teklifimizi hazırlayalım.',
  primaryButton = {
    label: 'Ücretsiz Teklif Al',
    href: '/kurumsal/iletisim',
    icon: Sparkles,
  },
  secondaryButton = {
    label: 'Bize Ulaşın',
    href: '/kurumsal/iletisim',
    icon: MessageSquare,
  },
  accentColor = '#7c3aed',
  secondaryColor = '#06b6d4',
  badgeLabel = 'Ücretsiz Danışmanlık',
}: ProductCTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const PrimaryIcon = primaryButton?.icon;
  const SecondaryIcon = secondaryButton?.icon;

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
            border: `1px solid ${accentColor}33`,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20"
        >
          {/* Background glow elements */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              background: `radial-gradient(ellipse, ${accentColor}33 0%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              right: '10%',
              width: '400px',
              height: '400px',
              background: `radial-gradient(ellipse, ${secondaryColor}1a 0%, transparent 65%)`,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            {badgeLabel && (
              <motion.div
                variants={fadeUp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  background: `${accentColor}26`,
                  border: `1px solid ${accentColor}59`,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#a78bfa',
                  letterSpacing: '0.05em',
                  marginBottom: '28px',
                }}
              >
                <Sparkles size={12} />
                {badgeLabel}
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(24px, 5vw, 52px)',
                fontWeight: 800,
                color: '#f1f5f9',
                letterSpacing: '-1px',
                lineHeight: 1.15,
                marginBottom: '16px',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                color: '#64748b',
                maxWidth: '500px',
                margin: '0 auto 32px',
                lineHeight: 1.7,
              }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              {primaryButton && (
                <Link
                  href={primaryButton.href}
                  className="inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all"
                  style={{
                    padding: '12px 24px',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    textDecoration: 'none',
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}80 100%)`,
                    boxShadow: `0 0 40px ${accentColor}66, 0 4px 20px rgba(0,0,0,0.3)`,
                  }}
                >
                  {PrimaryIcon && <PrimaryIcon size={15} />}
                  {primaryButton.label}
                </Link>
              )}
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all"
                  style={{
                    padding: '12px 24px',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    textDecoration: 'none',
                    color: '#e2e8f0',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {SecondaryIcon && <SecondaryIcon size={15} />}
                  {secondaryButton.label}
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
