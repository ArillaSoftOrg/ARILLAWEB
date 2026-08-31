"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

interface CtaLink {
  label: string;
  href: string;
}

interface CorporatePageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  surface?: "canvas" | "warm";
}

const surfaceClass: Record<NonNullable<CorporatePageHeroProps["surface"]>, string> = {
  canvas: "bg-home-surface",
  warm: "bg-home-surface-warm",
};

export function CorporatePageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  surface = "canvas",
}: CorporatePageHeroProps) {
  return (
    <section className={`${surfaceClass[surface]} py-16 sm:py-20 lg:py-28`}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl">
          {eyebrow && (
            <motion.div variants={fadeUp} className="mb-5">
              <HomeBadge variant="neutral">{eyebrow}</HomeBadge>
            </motion.div>
          )}
          <motion.h1
            variants={fadeUp}
            className="font-home-sans text-[40px] font-semibold leading-[1.12] tracking-[-0.03em] text-home-fg sm:text-[56px] sm:leading-[1.07]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={fadeUp}
              className="font-home-sans mt-6 max-w-2xl text-[17px] leading-7 text-home-text-secondary sm:text-[18px] sm:leading-[1.55]"
            >
              {description}
            </motion.p>
          )}
          {(primaryCta || secondaryCta) && (
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              {primaryCta && (
                <HomeButton asChild variant="primary">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </HomeButton>
              )}
              {secondaryCta && (
                <HomeButton asChild variant="secondary">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </HomeButton>
              )}
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
