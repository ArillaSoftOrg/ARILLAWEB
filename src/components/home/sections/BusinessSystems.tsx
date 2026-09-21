"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, EASE_PREMIUM, DURATION } from "@/components/home/motion";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import {
  BUSINESS_SYSTEMS_CAPABILITY_ICONS,
  BUSINESS_SYSTEMS_CORE_ICON,
  BUSINESS_SYSTEMS_CORE_POSITION,
  BUSINESS_SYSTEMS_NODE_POSITIONS,
} from "@/components/home/sections/data";
import { cn } from "@/lib/utils";
import "@/lib/home-fonts";

type Capability = { id: string; title: string; description: string };

// First-view assembly: core settles in first, then each module + its
// connector line joins in sequence (matches BUSINESS_SYSTEMS_NODE_POSITIONS
// order). Total assembly time: ~0.28 + 5 * 0.16 + 0.32 ≈ 1.4s.
const ASSEMBLY_BASE_DELAY = 0.28;
const ASSEMBLY_STEP_DELAY = 0.16;

export default function BusinessSystems() {
  const t = useTranslations("pages.home.sections.businessSystems");
  const capabilities = t.raw("capabilities") as Capability[];
  const coreLabel = t("coreLabel");
  const [committed, setCommitted] = useState(capabilities[0]?.id ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const active = preview ?? committed;
  const activeCapability = capabilities.find((c) => c.id === active) ?? capabilities[0];
  const prefersReducedMotion = useReducedMotion();

  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, margin: "-80px" });
  const assembled = prefersReducedMotion || isInView;

  const CoreIcon = BUSINESS_SYSTEMS_CORE_ICON;

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

        {/* Desktop: central system core with 6 modules connected by lines */}
        <div ref={diagramRef} className="relative mx-auto hidden aspect-[600/480] max-w-[680px] lg:block">
          <svg
            viewBox="0 0 600 480"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {BUSINESS_SYSTEMS_NODE_POSITIONS.map((pos, index) => {
              const capability = capabilities[index];
              const isActive = capability?.id === active;
              const delay = prefersReducedMotion ? 0 : ASSEMBLY_BASE_DELAY + index * ASSEMBLY_STEP_DELAY;
              return (
                <motion.line
                  key={capability?.id ?? index}
                  x1={BUSINESS_SYSTEMS_CORE_POSITION.xSvg}
                  y1={BUSINESS_SYSTEMS_CORE_POSITION.ySvg}
                  x2={pos.xSvg}
                  y2={pos.ySvg}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{ stroke: isActive ? "var(--home-primary)" : "var(--home-border-dark)", transition: "stroke 200ms ease" }}
                  animate={{ pathLength: assembled ? 1 : 0, opacity: assembled ? 1 : 0 }}
                  transition={{ duration: DURATION.component, ease: EASE_PREMIUM, delay }}
                />
              );
            })}
          </svg>

          {/* Core node */}
          <motion.div
            className="absolute flex h-28 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-home-lg border border-home-border-dark bg-home-surface-dark-raised px-3"
            style={{ left: `${BUSINESS_SYSTEMS_CORE_POSITION.xPct}%`, top: `${BUSINESS_SYSTEMS_CORE_POSITION.yPct}%` }}
            animate={{ opacity: assembled ? 1 : 0, scale: assembled ? 1 : 0.94 }}
            transition={{ duration: DURATION.component, ease: EASE_PREMIUM }}
          >
            <CoreIcon size={22} strokeWidth={1.75} className="text-home-primary" />
            <span className="font-home-sans text-center text-[13px] font-semibold leading-tight text-home-text-inverse">
              {coreLabel}
            </span>
          </motion.div>

          {/* Module nodes */}
          {BUSINESS_SYSTEMS_NODE_POSITIONS.map((pos, index) => {
            const capability = capabilities[index];
            if (!capability) return null;
            const Icon = BUSINESS_SYSTEMS_CAPABILITY_ICONS[capability.id];
            const isActive = capability.id === active;
            const delay = prefersReducedMotion ? 0 : ASSEMBLY_BASE_DELAY + index * ASSEMBLY_STEP_DELAY;
            return (
              <motion.div
                key={capability.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.xPct}%`, top: `${pos.yPct}%` }}
                animate={{
                  opacity: assembled ? 1 : 0,
                  y: assembled ? 0 : 8,
                  scale: assembled ? 1 : 0.94,
                }}
                transition={{ duration: DURATION.component, ease: EASE_PREMIUM, delay }}
              >
                <button
                  type="button"
                  aria-pressed={capability.id === committed}
                  onMouseEnter={() => setPreview(capability.id)}
                  onMouseLeave={() => setPreview(null)}
                  onFocus={() => setPreview(capability.id)}
                  onBlur={() => setPreview(null)}
                  onClick={() => setCommitted(capability.id)}
                  className={cn(
                    "focus-ring-lime flex w-36 flex-col gap-2 rounded-home-md border p-2.5 text-left transition-all duration-200",
                    isActive
                      ? "border-home-primary bg-home-surface-dark-elevated opacity-100"
                      : "border-home-border-dark bg-home-surface-dark-raised opacity-55 hover:opacity-85"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    {Icon && (
                      <Icon size={14} strokeWidth={2} className={isActive ? "text-home-primary" : "text-home-text-inverse-secondary"} />
                    )}
                    <span className="font-home-sans truncate text-xs font-medium text-home-text-inverse">
                      {capability.title}
                    </span>
                  </div>
                  <ModuleMiniUI id={capability.id} isActive={isActive} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Compact detail area — reflects the active module regardless of
            interaction (hover preview or click commit). */}
        <div className="mx-auto mt-8 hidden max-w-xl text-center lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapability?.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: DURATION.product, ease: EASE_PREMIUM }}
            >
              <h3 className="font-home-sans text-lg font-semibold text-home-text-inverse">
                {activeCapability?.title}
              </h3>
              <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-inverse-secondary">
                {activeCapability?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile / tablet: compact core banner + accordion module list */}
        <div className="lg:hidden">
          <AnimatedSection className="mb-5 flex items-center justify-center gap-2 rounded-home-lg border border-home-border-dark bg-home-surface-dark-raised px-4 py-3">
            <CoreIcon size={18} strokeWidth={1.75} className="text-home-primary" />
            <span className="font-home-sans text-[15px] font-semibold text-home-text-inverse">{coreLabel}</span>
          </AnimatedSection>

          <Accordion type="single" collapsible defaultValue={capabilities[0]?.id} className="flex flex-col gap-2">
            {capabilities.map((capability) => {
              const Icon = BUSINESS_SYSTEMS_CAPABILITY_ICONS[capability.id];
              return (
                <AnimatedSection key={capability.id} variants={fadeUp}>
                  <AccordionItem
                    value={capability.id}
                    className="rounded-home-md border border-home-border-dark bg-home-surface-dark-raised px-4"
                  >
                    <AccordionTrigger className="focus-ring-lime w-full py-3.5 font-home-sans text-[15px] font-medium text-home-text-inverse hover:text-home-text-inverse [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-home-text-inverse-secondary">
                      <span className="flex items-center gap-3">
                        {Icon && <Icon size={18} strokeWidth={2} className="text-home-primary" />}
                        {capability.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3.5 text-home-text-inverse-secondary">
                      <p className="font-home-sans text-[15px] leading-6 text-home-text-inverse-secondary">
                        {capability.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedSection>
              );
            })}
          </Accordion>
        </div>

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

// Tiny representative UI mock per module — flat shapes only, never a real
// screenshot, so each node reads as "a real product surface" rather than an
// empty icon tile.
function ModuleMiniUI({ id, isActive }: { id: string; isActive: boolean }) {
  const accent = isActive ? "bg-home-primary" : "bg-home-text-inverse-secondary/40";
  const neutral = "bg-home-text-inverse-secondary/20";

  if (id === "appointments") {
    return (
      <div className="grid grid-cols-3 gap-1" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={cn("h-2.5 rounded-[2px]", i === 4 ? accent : neutral)} />
        ))}
      </div>
    );
  }
  if (id === "reservations") {
    return (
      <div className="flex flex-col gap-1" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-home-full", i === 0 ? accent : neutral)} />
            <span className={cn("h-1.5 flex-1 rounded-[2px]", neutral)} />
          </div>
        ))}
      </div>
    );
  }
  if (id === "crm") {
    return (
      <div className="flex flex-col gap-1.5" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className={cn("h-2.5 w-2.5 rounded-home-full", i === 0 ? accent : neutral)} />
            <span className={cn("h-1.5 flex-1 rounded-[2px]", neutral)} />
          </div>
        ))}
      </div>
    );
  }
  if (id === "admin") {
    return (
      <div className="flex flex-col gap-1.5" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className={cn("h-1.5 w-8 rounded-[2px]", neutral)} />
          <span className={cn("h-2.5 w-4 rounded-home-full", accent)} />
        </div>
        <span className={cn("h-1.5 w-3/4 rounded-[2px]", neutral)} />
      </div>
    );
  }
  if (id === "dashboards") {
    return (
      <div className="flex h-6 items-end gap-1" aria-hidden="true">
        {[0.4, 0.7, 1, 0.55].map((h, i) => (
          <span
            key={i}
            className={cn("w-1.5 rounded-t-[2px]", i === 2 ? accent : neutral)}
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    );
  }
  // workflows
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-1">
          <span className={cn("h-2 w-2 rounded-[2px]", i === 1 ? accent : neutral)} />
          {i < 2 && <span className={cn("h-px w-2", neutral)} />}
        </div>
      ))}
    </div>
  );
}
