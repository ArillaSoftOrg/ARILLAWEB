"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

interface CtaLink {
  label: string;
  href: string;
}

interface CTASectionProps {
  heading: string;
  body?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export function CTASection({ heading, body, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <section className="bg-home-fg py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-text-inverse sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {heading}
          </motion.h2>
          {body && (
            <motion.p
              variants={fadeUp}
              className="font-home-sans mt-5 max-w-xl text-[17px] leading-7 text-home-text-inverse-secondary"
            >
              {body}
            </motion.p>
          )}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <HomeButton asChild variant="lime">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </HomeButton>
            {secondaryCta && (
              <HomeButton asChild variant="ghost" onDark>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </HomeButton>
            )}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
