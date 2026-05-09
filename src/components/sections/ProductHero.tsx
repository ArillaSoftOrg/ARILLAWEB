'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductHeroProps {
  badge?: string;
  title: string;
  description: string;
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
  accentColor?: string; // hex color like #7c3aed
  backgroundGradient?: string; // gradient string
  image?: React.ReactNode;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProductHero({
  badge,
  title,
  description,
  primaryButton,
  secondaryButton,
  accentColor = '#7c3aed',
  backgroundGradient = 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 65%)',
  image,
}: ProductHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'hidden',
        overflowY: 'clip',
        paddingTop: '68px',
        background: '#ffffff',
      }}
    >
      {/* Subtle grid overlay */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Gradient glow background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'clamp(300px, 50vw, 640px)',
          height: 'clamp(300px, 50vw, 640px)',
          background: backgroundGradient,
          pointerEvents: 'none',
        }}
      />

      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center gap-10 lg:gap-20 px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-28">
        {/* Left: Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeUp}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  background: `${accentColor}0d`,
                  border: `1px solid ${accentColor}24`,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: accentColor,
                  letterSpacing: '0.04em',
                }}
              >
                ✦ {badge}
              </div>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(28px, 3vw, 48px)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.2,
              maxWidth: '520px',
            }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              color: '#64748b',
              maxWidth: '480px',
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'white',
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
                  boxShadow: `0 4px 14px ${accentColor}40`,
                }}
              >
                {primaryButton.label} <ArrowRight size={14} />
              </Link>
            )}
            {secondaryButton && (
              <Link
                href={secondaryButton.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: '#475569',
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                }}
              >
                {secondaryButton.label} <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Right: Image/Content */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center w-full"
          >
            {image}
          </motion.div>
        )}
      </div>
    </section>
  );
}
