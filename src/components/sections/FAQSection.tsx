'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description?: string;
  faqs: FAQItem[];
  accentColor?: string;
  darkMode?: boolean;
  columns?: 1 | 2;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const expandVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

export default function FAQSection({
  title,
  description,
  faqs,
  accentColor = '#7c3aed',
  darkMode = true,
  columns = 1,
}: FAQSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const gridColsClass = columns === 2 ? 'lg:grid-cols-2' : 'grid-cols-1';

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
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: darkMode
            ? 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)',
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
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: '-1px',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              wordBreak: 'break-word',
            }}
          >
            {title}
          </h2>
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

        {/* FAQ Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`grid ${gridColsClass} gap-4`}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={`faq-${faq.question}`}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              style={{
                borderRadius: '16px',
                background: darkMode ? 'rgba(22, 24, 32, 0.8)' : '#f8fafc',
                border: darkMode
                  ? '1px solid rgba(255,255,255,0.07)'
                  : '1px solid #e2e8f0',
                backdropFilter: darkMode ? 'blur(12px)' : 'none',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 0.2s ease',
                }}
                className="hover:opacity-80"
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: darkMode ? '#f1f5f9' : '#0f172a',
                    letterSpacing: '-0.3px',
                    textAlign: 'left',
                    margin: 0,
                  }}
                >
                  {faq.question}
                </h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={20} color={accentColor} />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      borderTop: darkMode
                        ? '1px solid rgba(255,255,255,0.07)'
                        : '1px solid #e2e8f0',
                      overflow: 'hidden',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#64748b',
                        lineHeight: 1.8,
                        margin: 0,
                        padding: '0 24px 20px',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
