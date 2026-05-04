'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Feature {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  description: string;
  color?: string; // hex color
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
  darkMode?: boolean;
  title?: string;
  description?: string;
  accentColor?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function FeatureGrid({
  features,
  columns = 3,
  darkMode = true,
  title,
  description,
  accentColor = '#7c3aed',
}: FeatureGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const gridColsClass = columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

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
          background: darkMode
            ? 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-5 sm:px-6">
        {/* Header */}
        {(title || description) && (
          <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ marginBottom: '64px', textAlign: 'center' }}
          >
            {title && (
              <h2
                style={{
                  fontSize: 'clamp(24px, 5vw, 48px)',
                  fontWeight: 800,
                  color: darkMode ? '#f1f5f9' : '#0f172a',
                  letterSpacing: '-1px',
                  lineHeight: 1.15,
                  margin: '0 0 16px 0',
                  wordBreak: 'break-word',
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                style={{
                  fontSize: 'clamp(15px, 2.5vw, 17px)',
                  color: '#64748b',
                  maxWidth: '520px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-4 sm:gap-5`}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const featureColor = feature.color || accentColor;

            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="p-5 sm:p-7"
                style={{
                  borderRadius: '16px',
                  background: darkMode ? 'rgba(22, 24, 32, 0.8)' : '#f8fafc',
                  border: darkMode
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid #e2e8f0',
                  backdropFilter: darkMode ? 'blur(12px)' : 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                whileHover={
                  darkMode
                    ? {
                        y: -4,
                        borderColor: `${featureColor}40`,
                        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${featureColor}20`,
                      }
                    : {
                        y: -4,
                        borderColor: `${featureColor}40`,
                        boxShadow: '0 10px 28px rgba(0,0,0,0.09)',
                      }
                }
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${featureColor}15`,
                    border: `1px solid ${featureColor}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={22} color={featureColor} />
                </div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: darkMode ? '#f1f5f9' : '#0f172a',
                    marginBottom: '8px',
                    letterSpacing: '-0.3px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
