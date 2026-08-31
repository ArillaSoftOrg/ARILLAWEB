"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem } from "@/components/home/motion";
import { AUTOMATION_PIPELINE_ICONS, AUTOMATION_CAPABILITY_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

// Each step activates, then the lime line travels to the next one. Runs
// once (~1.9s total) when the pipeline scrolls into view, no loop.
const STEP_DELAY_S = [0, 0.65, 1.05, 1.45, 1.85];
const LINE_DURATION_S = 0.4;
const NODE_TRANSITION_S = 0.25;
const FLOW_EASE = [0.4, 0, 0.2, 1] as const;

const LIME = "#C7F36B";
const INK = "#101010";
const MUTED = "#858580";
const NODE_BG = "#FFFFFF";
const NODE_BORDER = "#E8E7E3";

export default function AutomationIntegrations() {
  const t = useTranslations("pages.home.sections.automation");
  const pipeline = t.raw("pipeline") as string[];
  const capabilities = t.raw("capabilities") as string[];
  const prefersReducedMotion = useReducedMotion();
  const pipelineRef = useRef(null);
  const isInView = useInView(pipelineRef, { once: true, amount: 0.4 });
  const activeNow = prefersReducedMotion || isInView;

  return (
    <section className="bg-home-surface py-14 sm:py-16 lg:py-20">
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

        <div ref={pipelineRef} className="mb-10 sm:mb-12">
          {/* Desktop/tablet: horizontal pipeline, lime line travels left to right */}
          <div className="hidden sm:flex sm:items-center">
            {pipeline.map((step, index) => {
              const Icon = AUTOMATION_PIPELINE_ICONS[index];
              const delay = prefersReducedMotion ? 0 : STEP_DELAY_S[index];
              return (
                <div key={step} className="flex flex-1 items-center last:flex-none">
                  <motion.div
                    initial={prefersReducedMotion ? false : { color: MUTED }}
                    animate={activeNow ? { color: INK } : {}}
                    transition={{ duration: prefersReducedMotion ? 0 : NODE_TRANSITION_S, delay, ease: FLOW_EASE }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? false : { backgroundColor: NODE_BG, borderColor: NODE_BORDER }}
                      animate={activeNow ? { backgroundColor: LIME, borderColor: LIME } : {}}
                      transition={{ duration: prefersReducedMotion ? 0 : NODE_TRANSITION_S, delay, ease: FLOW_EASE }}
                      className="flex h-16 w-16 items-center justify-center rounded-home-full border"
                    >
                      {Icon && <Icon size={24} strokeWidth={1.75} />}
                    </motion.div>
                    <span className="font-home-sans max-w-[110px] text-sm font-medium">{step}</span>
                  </motion.div>
                  {index < pipeline.length - 1 && (
                    <div className="relative mx-2 h-px w-8 flex-1 self-center bg-home-border-strong sm:mx-0 sm:w-full">
                      <motion.div
                        initial={prefersReducedMotion ? false : { scaleX: 0 }}
                        animate={activeNow ? { scaleX: 1 } : {}}
                        transition={{ duration: prefersReducedMotion ? 0 : LINE_DURATION_S, delay, ease: FLOW_EASE }}
                        style={{ transformOrigin: "left" }}
                        className="absolute inset-0 bg-home-primary"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical pipeline, lime line travels top to bottom */}
          <div className="flex flex-col sm:hidden">
            {pipeline.map((step, index) => {
              const Icon = AUTOMATION_PIPELINE_ICONS[index];
              const delay = prefersReducedMotion ? 0 : STEP_DELAY_S[index];
              const isLast = index === pipeline.length - 1;
              return (
                <motion.div
                  key={step}
                  initial={prefersReducedMotion ? false : { color: MUTED }}
                  animate={activeNow ? { color: INK } : {}}
                  transition={{ duration: prefersReducedMotion ? 0 : NODE_TRANSITION_S, delay, ease: FLOW_EASE }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={prefersReducedMotion ? false : { backgroundColor: NODE_BG, borderColor: NODE_BORDER }}
                      animate={activeNow ? { backgroundColor: LIME, borderColor: LIME } : {}}
                      transition={{ duration: prefersReducedMotion ? 0 : NODE_TRANSITION_S, delay, ease: FLOW_EASE }}
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-home-full border"
                    >
                      {Icon && <Icon size={18} strokeWidth={1.75} />}
                    </motion.div>
                    {!isLast && (
                      <div className="relative w-px flex-1 bg-home-border-strong" style={{ minHeight: "28px" }}>
                        <motion.div
                          initial={prefersReducedMotion ? false : { scaleY: 0 }}
                          animate={activeNow ? { scaleY: 1 } : {}}
                          transition={{ duration: prefersReducedMotion ? 0 : LINE_DURATION_S, delay, ease: FLOW_EASE }}
                          style={{ transformOrigin: "top" }}
                          className="absolute inset-0 bg-home-primary"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <span className="font-home-sans pb-7 pt-2.5 text-sm font-medium">{step}</span>
                </motion.div>
              );
            })}
          </div>

          <p className="font-home-sans mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-home-text-secondary">
            {t("example")}
          </p>
        </div>

        <AnimatedSection className="flex flex-wrap justify-center gap-2">
          {capabilities.map((capability, index) => {
            const Icon = AUTOMATION_CAPABILITY_ICONS[index];
            return (
              <motion.span
                key={capability}
                variants={fadeUpItem}
                className="font-home-sans flex items-center gap-1.5 rounded-home-full border border-home-border bg-home-bg px-3 py-1.5 text-[13px] font-medium text-home-text-secondary"
              >
                {Icon && <Icon size={13} strokeWidth={2} className="text-home-text-muted" />}
                {capability}
              </motion.span>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
