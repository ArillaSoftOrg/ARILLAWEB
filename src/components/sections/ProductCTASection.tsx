'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { AnimatedSection } from '@/components/home/ui/AnimatedSection';
import { HomeButton } from '@/components/home/ui/HomeButton';
import { fadeUp } from '@/components/home/motion';
import '@/lib/home-fonts';

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
  accentColor?: string; // legacy, ignored
  secondaryColor?: string; // legacy, ignored
  badgeLabel?: string; // legacy, no longer rendered
}

/** Lime closing card, same treatment as the corporate CTA. */
export default function ProductCTASection({
  title,
  description = 'Projenizi bizimle paylaşın. 24 saat içinde size özel teklifimizi hazırlayalım.',
  primaryButton = { label: 'Ücretsiz Teklif Al', href: '/kurumsal/iletisim' },
  secondaryButton = { label: 'Bize Ulaşın', href: '/kurumsal/iletisim' },
}: ProductCTASectionProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="rounded-home-xl bg-home-primary px-6 py-14 text-center sm:px-10 sm:py-16 md:px-16 md:py-20">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans mx-auto max-w-2xl text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-primary-foreground sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p variants={fadeUp} className="font-home-sans mx-auto mt-5 max-w-xl text-[17px] leading-7 text-home-fg/80">
              {description}
            </motion.p>
          )}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <HomeButton variant="dark" asChild className="px-8 text-base">
              <Link href={primaryButton.href}>{primaryButton.label}</Link>
            </HomeButton>
            <HomeButton variant="secondary" asChild className="border-home-fg/40 px-8 text-base hover:bg-home-fg/10">
              <Link href={secondaryButton.href}>{secondaryButton.label}</Link>
            </HomeButton>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
