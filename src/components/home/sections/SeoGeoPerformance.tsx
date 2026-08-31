"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem, stagger } from "@/components/home/motion";
import { GROWTH_FOUNDATION_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

type Item = { id: string; title: string; description: string };

export default function SeoGeoPerformance() {
  const t = useTranslations("pages.home.sections.growthFoundation");
  const items = t.raw("items") as Item[];

  return (
    <section className="bg-home-bg py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-home-text-secondary"
          >
            {t("body")}
          </motion.p>
        </AnimatedSection>

        <AnimatedSection
          variants={stagger}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-home-xl border border-home-border bg-home-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => {
            const Icon = GROWTH_FOUNDATION_ICONS[item.id];
            return (
              <motion.div
                key={item.id}
                variants={fadeUpItem}
                tabIndex={0}
                className="group bg-home-bg p-6 transition-colors duration-200 hover:bg-home-surface focus-visible:bg-home-surface focus-visible:outline-none"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-home-md bg-home-surface text-home-fg transition-colors duration-200 group-hover:bg-home-primary-soft">
                  {Icon && <Icon size={19} strokeWidth={2} />}
                </div>
                <h3 className="font-home-sans mt-4 text-base font-semibold text-home-fg">{item.title}</h3>
                <p className="font-home-sans mt-2 text-sm leading-6 text-home-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
