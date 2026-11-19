"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

type Action = { label: string; href: string };

export default function ServiceCta({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section className="bg-home-surface-dark">
      <AnimatedSection className="mx-auto flex max-w-[760px] flex-col items-center px-5 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
        <motion.h2
          variants={fadeUp}
          className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-text-inverse sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p variants={fadeUp} className="font-home-sans mx-auto mt-5 max-w-lg text-[17px] leading-7 text-home-text-inverse-secondary">
            {description}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <HomeButton variant="lime" asChild className="px-8 text-base">
            <Link href={primary.href}>{primary.label}</Link>
          </HomeButton>
          {secondary && (
            <HomeButton variant="secondary" onDark asChild className="px-8 text-base">
              <Link href={secondary.href}>{secondary.label}</Link>
            </HomeButton>
          )}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
