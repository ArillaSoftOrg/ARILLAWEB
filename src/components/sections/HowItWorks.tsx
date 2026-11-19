'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/home/ui/AnimatedSection';
import { fadeUp, fadeUpItem, stagger } from '@/components/home/motion';
import '@/lib/home-fonts';

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
  accentColor?: string; // legacy, ignored
  darkMode?: boolean;
  layout?: 'horizontal' | 'vertical'; // legacy, both render the same numbered grid
  variant?: 'cards' | 'process'; // legacy, both render the same numbered grid
}

/** Home-styled numbered steps (these are a real sequence, so they carry numbers). */
export default function HowItWorks({ title, description, steps, darkMode = true }: HowItWorksProps) {
  const colsClass = steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            className={`font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em] ${
              darkMode ? 'text-home-text-inverse' : 'text-home-fg'
            }`}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              variants={fadeUp}
              className={`font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 ${
                darkMode ? 'text-home-text-inverse-secondary' : 'text-home-text-secondary'
              }`}
            >
              {description}
            </motion.p>
          )}
        </AnimatedSection>

        <AnimatedSection variants={stagger} className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${colsClass}`}>
          {steps.map((step) => (
            <motion.div
              key={`${step.number}-${step.title}`}
              variants={fadeUpItem}
              className={`rounded-home-lg border p-6 ${
                darkMode ? 'border-home-border-dark bg-home-surface-dark-raised' : 'border-home-border bg-home-bg'
              }`}
            >
              <span
                aria-hidden="true"
                className="font-home-sans flex h-9 w-9 items-center justify-center rounded-home-full bg-home-primary text-[15px] font-semibold text-home-primary-foreground"
              >
                {step.number}
              </span>
              <h3
                className={`font-home-sans mt-5 text-lg font-semibold tracking-[-0.01em] ${
                  darkMode ? 'text-home-text-inverse' : 'text-home-fg'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`font-home-sans mt-2 text-[15px] leading-6 ${
                  darkMode ? 'text-home-text-inverse-secondary' : 'text-home-text-secondary'
                }`}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
