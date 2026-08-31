"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem, EASE_PREMIUM } from "@/components/home/motion";
import "@/lib/home-fonts";

type Step = { number: string; title: string; description: string };

export default function HowWeWork() {
  const t = useTranslations("pages.home.sections.howWeWork");
  const steps = t.raw("steps") as Step[];
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep the scroll-tracked active state even with reduced motion — it's
    // functional (which step is emphasized), not decorative. Only the
    // transition durations below are shortened to 0.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = triggerRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );

    triggerRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReducedMotion, steps.length]);

  return (
    <section className="bg-home-surface-warm py-14 sm:py-16 lg:py-24">
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

        {/* Desktop: sticky step indicator + scroll-tracked list */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="sticky top-28 self-start">
            <div className="relative flex flex-col gap-3">
              {/* Connecting line: neutral track + a lime fill that progresses
                  as activeIndex advances (scroll-tracked, not a mount replay). */}
              <div
                aria-hidden="true"
                className="absolute bottom-[18px] left-[18px] top-[18px] w-px bg-home-border"
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-[18px] left-[18px] top-[18px] w-px origin-top bg-home-primary"
                animate={{ scaleY: activeIndex / Math.max(steps.length - 1, 1) }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: EASE_PREMIUM }}
              />
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex items-center gap-3">
                  <span
                    className="font-home-sans flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-home-full text-sm font-semibold transition-colors duration-300"
                    style={{
                      background: index === activeIndex ? "var(--home-primary)" : "var(--home-surface)",
                      color: "var(--home-fg)",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-home-sans text-sm font-medium transition-opacity duration-300"
                    style={{ color: "var(--home-fg)", opacity: index === activeIndex ? 1 : 0.5 }}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                className="flex min-h-[220px] items-center border-b border-home-border py-10 last:border-b-0"
              >
                <motion.div
                  animate={{ opacity: index === activeIndex ? 1 : 0.4 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="max-w-xl"
                >
                  <span className="font-home-sans text-sm font-medium text-home-text-muted">{step.number}</span>
                  <h3 className="font-home-sans mt-2 text-2xl font-semibold text-home-fg">{step.title}</h3>
                  <p className="font-home-sans mt-3 text-[15px] leading-6 text-home-text-secondary">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical timeline */}
        <div className="flex flex-col lg:hidden">
          {steps.map((step, index) => (
            <AnimatedSection key={step.number} variants={fadeUpItem}>
              <div className="flex gap-4 pb-8">
                <div className="flex flex-col items-center">
                  <span className="font-home-sans flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-home-full bg-home-primary text-sm font-semibold text-home-primary-foreground">
                    {step.number}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-home-border" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-home-sans text-lg font-semibold text-home-fg">{step.title}</h3>
                  <p className="font-home-sans mt-1.5 text-[15px] leading-6 text-home-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
