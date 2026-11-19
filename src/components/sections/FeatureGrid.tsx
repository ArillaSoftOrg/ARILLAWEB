'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/home/ui/AnimatedSection';
import { fadeUp, fadeUpItem, stagger } from '@/components/home/motion';
import '@/lib/home-fonts';

interface Feature {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  description: string;
  color?: string; // legacy, ignored: icon tiles use the brand lime
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3;
  darkMode?: boolean;
  title?: string;
  description?: string;
  accentColor?: string; // legacy, ignored
}

/** Home-styled feature cards. Transparent frame so the host page keeps its own background. */
export default function FeatureGrid({
  features,
  columns = 3,
  darkMode = true,
  title,
  description,
}: FeatureGridProps) {
  const colsClass = columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        {(title || description) && (
          <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
            {title && (
              <motion.h2
                variants={fadeUp}
                className={`font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em] ${
                  darkMode ? 'text-home-text-inverse' : 'text-home-fg'
                }`}
              >
                {title}
              </motion.h2>
            )}
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
        )}

        <AnimatedSection variants={stagger} className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${colsClass}`}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUpItem}
                className={`rounded-home-xl border p-6 sm:p-8 ${
                  darkMode
                    ? 'border-home-border-dark bg-home-surface-dark-raised'
                    : 'border-transparent bg-home-surface'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-home-md bg-home-primary text-home-primary-foreground">
                  <Icon size={22} color="currentColor" />
                </div>
                <h3
                  className={`font-home-sans mt-5 text-xl font-semibold tracking-[-0.01em] ${
                    darkMode ? 'text-home-text-inverse' : 'text-home-fg'
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`font-home-sans mt-2 text-[15px] leading-6 ${
                    darkMode ? 'text-home-text-inverse-secondary' : 'text-home-text-secondary'
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
