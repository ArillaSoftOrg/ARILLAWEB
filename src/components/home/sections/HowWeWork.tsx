"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem, DURATION, EASE_PREMIUM } from "@/components/home/motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HOW_WE_WORK_STEP_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

// `id` is a stable slug (unrelated to display order or locale) so this data
// shape can later be matched 1:1 against a real customer project-status
// system without renumbering — number/title/description/deliverables are
// display-only.
type Step = { id: string; number: string; title: string; description: string; deliverables: string[] };

// Scroll distance (vh) dedicated to each card while it is "active" at the
// top of the sticky stack. Tuned so a step is comfortably readable without
// turning the section into a multi-screen scroll-jack.
const SEGMENT_VH = 46;
// How many already-passed cards remain visible, peeking behind the active
// one — older cards fade out entirely rather than piling up indefinitely.
const MAX_STACK_DEPTH = 3;

export default function HowWeWork() {
  const t = useTranslations("pages.home.sections.howWeWork");
  const steps = t.raw("steps") as Step[];
  const deliverablesLabel = t("deliverablesLabel");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = triggerRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
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

        {/* Desktop: sticky stacked process cards. A tall scroll track holds
            one invisible trigger zone per step; an IntersectionObserver
            promotes the step whose zone crosses the vertical center band to
            `activeIndex`. No scroll hijacking — the browser's native scroll
            drives everything, this only reads position. */}
        {prefersReducedMotion ? (
          <div className="hidden flex-col gap-6 lg:flex">
            {steps.map((step) => (
              <ProcessCard
                key={step.id}
                step={step}
                total={steps.length}
                deliverablesLabel={deliverablesLabel}
                active
              />
            ))}
          </div>
        ) : (
          <div className="relative hidden lg:block" style={{ height: `${steps.length * SEGMENT_VH}vh` }}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => {
                  triggerRefs.current[index] = el;
                }}
                aria-hidden="true"
                className="absolute left-0 w-full"
                style={{ top: `${index * SEGMENT_VH}vh`, height: `${SEGMENT_VH}vh` }}
              />
            ))}

            <div className="sticky top-28">
              <div className="mx-auto mb-6 flex max-w-2xl items-center gap-4">
                <div className="h-1 flex-1 overflow-hidden rounded-home-full bg-home-border">
                  <motion.div
                    className="h-full origin-left rounded-home-full bg-home-primary"
                    animate={{ scaleX: (activeIndex + 1) / steps.length }}
                    transition={{ duration: DURATION.component, ease: EASE_PREMIUM }}
                  />
                </div>
                <span className="font-home-sans whitespace-nowrap text-sm font-medium tabular-nums text-home-text-muted">
                  {steps[activeIndex]?.number} / {String(steps.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mx-auto h-[480px] max-w-2xl">
                {steps.map((step, index) => {
                  const delta = activeIndex - index;
                  const isActive = delta === 0;
                  const isPast = delta > 0 && delta <= MAX_STACK_DEPTH;
                  const isVisible = isActive || isPast;
                  return (
                    <motion.div
                      key={step.id}
                      className="absolute inset-0"
                      style={{
                        zIndex: steps.length - Math.abs(delta),
                        pointerEvents: isActive ? "auto" : "none",
                        visibility: isVisible ? "visible" : "hidden",
                      }}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.55 - delta * 0.14 : 0,
                        y: isActive ? 0 : isPast ? -delta * 10 : 24,
                        scale: isActive ? 1 : isPast ? 1 - delta * 0.02 : 0.98,
                      }}
                      transition={{ duration: DURATION.component, ease: EASE_PREMIUM }}
                      aria-hidden={!isActive}
                    >
                      <ProcessCard step={step} total={steps.length} deliverablesLabel={deliverablesLabel} active={isActive} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile / tablet: compact accordion timeline — titles always
            readable, tapping one opens its description + deliverables;
            type="single" collapsible keeps at most one open at a time. */}
        <Accordion type="single" collapsible className="flex flex-col lg:hidden">
          {steps.map((step, index) => {
            const Icon = HOW_WE_WORK_STEP_ICONS[step.id];
            return (
              <AnimatedSection key={step.id} variants={fadeUpItem}>
                <AccordionItem value={step.id} className="border-none">
                  <div className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span className="font-home-sans flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-home-full bg-home-primary text-sm font-semibold text-home-primary-foreground">
                        {step.number}
                      </span>
                      {index < steps.length - 1 && (
                        <span className="mt-2 w-px flex-1 bg-home-border" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <AccordionTrigger className="focus-ring-lime w-full py-0 font-home-sans text-lg font-semibold text-home-fg hover:text-home-fg [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-home-text-muted">
                        <span className="flex items-center gap-2.5">
                          {Icon && <Icon size={16} strokeWidth={2} className="text-home-text-muted" />}
                          {step.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 text-home-text-secondary">
                        <p className="font-home-sans mt-1.5 text-[15px] leading-6 text-home-text-secondary">
                          {step.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {step.deliverables.map((item) => (
                            <span
                              key={item}
                              className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-2.5 py-1 text-xs font-medium text-home-fg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </AccordionContent>
                    </div>
                  </div>
                </AccordionItem>
              </AnimatedSection>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  total,
  deliverablesLabel,
  active,
}: {
  step: Step;
  total: number;
  deliverablesLabel: string;
  active: boolean;
}) {
  const Icon = HOW_WE_WORK_STEP_ICONS[step.id];
  return (
    <div
      className="flex h-full flex-col justify-between rounded-home-xl border border-home-border bg-home-bg p-8 sm:p-10"
      style={{ boxShadow: active ? "0 20px 50px rgba(16, 16, 16, 0.10)" : "0 8px 24px rgba(16, 16, 16, 0.06)" }}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-home-md bg-home-primary-soft text-home-fg">
            {Icon && <Icon size={22} strokeWidth={1.75} />}
          </div>
          <span className="font-home-sans text-sm font-medium tabular-nums text-home-text-muted">
            {step.number} <span aria-hidden="true">/</span> {String(total).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-home-sans mt-6 text-2xl font-semibold text-home-fg sm:text-[28px]">{step.title}</h3>
        <p className="font-home-sans mt-3 max-w-md text-[15px] leading-6 text-home-text-secondary">
          {step.description}
        </p>
      </div>
      <div className="mt-8 border-t border-home-border pt-6">
        <span className="font-home-sans text-xs font-medium uppercase tracking-[0.08em] text-home-text-muted">
          {deliverablesLabel}
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {step.deliverables.map((item) => (
            <span
              key={item}
              className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-3 py-1.5 text-xs font-medium text-home-fg"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
