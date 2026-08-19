'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ProcessTimeline from './ProcessTimeline';

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: React.ComponentType<{ size: number; color: string }>;
}

interface HowItWorksProps {
  title: string;
  description?: string;
  steps: Step[];
  accentColor?: string;
  darkMode?: boolean;
  layout?: 'horizontal' | 'vertical'; // horizontal for steps in a row, vertical for timeline
  variant?: 'cards' | 'process';
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HowItWorks({
  title,
  description,
  steps,
  accentColor = '#7c3aed',
  darkMode = true,
  layout = 'horizontal',
  variant = 'cards',
}: HowItWorksProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isProcess = variant === 'process';

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
      className="section-py"
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          width: isProcess ? '360px' : '500px',
          height: isProcess ? '360px' : '500px',
          background: darkMode
            ? 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)'
            : `radial-gradient(ellipse, ${isProcess ? 'rgba(124,58,237,0.03)' : 'rgba(124,58,237,0.04)'} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={isProcess ? 'mb-11 text-center sm:mb-12' : undefined}
          style={isProcess ? undefined : { textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            className={isProcess ? 'text-role-section-heading' : undefined}
            style={{
              fontSize: isProcess ? undefined : 'clamp(24px, 5vw, 48px)',
              fontWeight: isProcess ? undefined : 800,
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: isProcess ? undefined : '-1px',
              lineHeight: isProcess ? undefined : 1.15,
              margin: '0 0 16px 0',
              wordBreak: 'break-word',
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className={isProcess ? 'text-role-body-lg' : undefined}
              style={{
                fontSize: isProcess ? undefined : 'clamp(15px, 2.5vw, 17px)',
                color: '#64748b',
                maxWidth: '520px',
                margin: '0 auto',
                lineHeight: isProcess ? undefined : 1.7,
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* Steps */}
        {isProcess ? (
          <ProcessTimeline steps={steps} accentColor={accentColor} start={isInView} />
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={layout === 'horizontal' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-8'}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  style={{
                    position: 'relative',
                  }}
                >
                  {/* Connector line (only for horizontal layout, not last item) */}
                  {layout === 'horizontal' && i < steps.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '48px',
                        left: 'calc(100% + 12px)',
                        width: 'calc(100% - 24px)',
                        height: '2px',
                        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                        display: 'none',
                        zIndex: -1,
                      }}
                      className="lg:block"
                    />
                  )}

                  <div
                    style={{
                      borderRadius: '16px',
                      background: darkMode ? 'rgba(22, 24, 32, 0.8)' : '#f8fafc',
                      border: darkMode
                        ? '1px solid rgba(255,255,255,0.07)'
                        : '1px solid #e2e8f0',
                      backdropFilter: darkMode ? 'blur(12px)' : 'none',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}
                    className="hover:shadow-lg"
                  >
                    {/* Step number badge */}
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${accentColor}20`,
                        border: `2px solid ${accentColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 800,
                        color: accentColor,
                        flexShrink: 0,
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Icon (if provided) */}
                    {Icon && (
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: `${accentColor}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={20} color={accentColor} />
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: darkMode ? '#f1f5f9' : '#0f172a',
                          marginBottom: '8px',
                          letterSpacing: '-0.3px',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#64748b',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
