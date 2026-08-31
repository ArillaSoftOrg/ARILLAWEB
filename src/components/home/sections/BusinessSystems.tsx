"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, EASE_PREMIUM, DURATION } from "@/components/home/motion";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import { BUSINESS_SYSTEMS_CAPABILITY_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

type Capability = { id: string; title: string; description: string };

// "System assembly": the dark panel (the system itself) settles in first;
// the capability list is a *separate* top-level child with no stagger
// offset from the panel, so its own staggerChildren/delayChildren below is
// what makes the modules activate after the panel, not before it.
const noOffsetStagger: Variants = {
  visible: { transition: { staggerChildren: 0 } },
};

const systemPanelVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.component, ease: EASE_PREMIUM } },
};

const systemListStagger: Variants = {
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const systemItemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.component, ease: EASE_PREMIUM } },
};

export default function BusinessSystems() {
  const t = useTranslations("pages.home.sections.businessSystems");
  const capabilities = t.raw("capabilities") as Capability[];
  const [committed, setCommitted] = useState(capabilities[0]?.id ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const active = preview ?? committed;
  const activeCapability = capabilities.find((c) => c.id === active) ?? capabilities[0];

  return (
    <section className="bg-home-surface-dark py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-text-inverse sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-home-text-inverse-secondary"
          >
            {t("body")}
          </motion.p>
        </AnimatedSection>

        <AnimatedSection variants={noOffsetStagger} className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div variants={systemListStagger} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {capabilities.map((capability) => {
              const Icon = BUSINESS_SYSTEMS_CAPABILITY_ICONS[capability.id];
              const isActive = capability.id === active;
              const isCommitted = capability.id === committed;
              return (
                <motion.button
                  key={capability.id}
                  variants={systemItemVariants}
                  type="button"
                  aria-pressed={isCommitted}
                  onMouseEnter={() => setPreview(capability.id)}
                  onMouseLeave={() => setPreview(null)}
                  onFocus={() => setPreview(capability.id)}
                  onBlur={() => setPreview(null)}
                  onClick={() => setCommitted(capability.id)}
                  className="font-home-sans flex items-center gap-3.5 rounded-home-md border px-4 py-3.5 text-left text-[15px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary"
                  style={{
                    borderColor: isActive ? "var(--home-primary)" : "var(--home-border-dark)",
                    background: isActive ? "var(--home-surface-dark-raised)" : "transparent",
                    color: isActive ? "var(--home-text-inverse)" : "var(--home-text-inverse-secondary)",
                  }}
                >
                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={2}
                      style={{ color: isActive ? "var(--home-primary)" : "var(--home-text-inverse-secondary)" }}
                    />
                  )}
                  {capability.title}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            variants={systemPanelVariants}
            className="rounded-home-xl border border-home-border-dark bg-home-surface-dark-raised p-6 sm:p-8"
          >
            <div className="grid grid-cols-3 gap-3 sm:gap-4" aria-hidden="true">
              {capabilities.map((capability) => {
                const Icon = BUSINESS_SYSTEMS_CAPABILITY_ICONS[capability.id];
                const isActive = capability.id === active;
                return (
                  <motion.div
                    key={capability.id}
                    animate={{
                      borderColor: isActive ? "var(--home-primary)" : "var(--home-border-dark)",
                      backgroundColor: isActive ? "var(--home-surface-dark-elevated)" : "rgba(0, 0, 0, 0)",
                    }}
                    transition={{ duration: DURATION.micro, ease: EASE_PREMIUM }}
                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-home-md border"
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={2}
                        style={{ color: isActive ? "var(--home-primary)" : "var(--home-text-inverse-secondary)" }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              key={activeCapability?.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.product, ease: EASE_PREMIUM }}
              className="mt-6 border-t border-home-border-dark pt-6"
            >
              <h3 className="font-home-sans text-lg font-semibold text-home-text-inverse">
                {activeCapability?.title}
              </h3>
              <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-inverse-secondary">
                {activeCapability?.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 flex justify-center sm:mt-16">
          <motion.div variants={fadeUp}>
            <HomeBadge variant="lime" className="text-[13px] normal-case tracking-normal">
              {t("highlight")}
            </HomeBadge>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
