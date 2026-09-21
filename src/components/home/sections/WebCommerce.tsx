"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem, EASE_PREMIUM, DURATION } from "@/components/home/motion";
import { WEB_COMMERCE_SOLUTION_ICONS } from "@/components/home/sections/data";
import { cn } from "@/lib/utils";
import "@/lib/home-fonts";

type Solution = { id: string; title: string; description: string };

// Panel stagger — first-view entrance only, before any hover/click state.
const panelListStagger: Variants = {
  visible: { transition: { staggerChildren: 0.06 } },
};

// Desktop-only autoplay: cycles activeIndex -> next panel in solutions order
// (Kurumsal -> E-Ticaret -> Web Uygulamaları -> Landing Page -> loop) while
// the row is in view and nothing is pausing it.
const AUTOPLAY_INTERVAL_MS = 3500;
// Grace period after the pointer/focus leaves the panel group before
// autoplay is allowed to resume — long enough that leaving doesn't read as
// an instant jump to the next panel.
const HOVER_RESUME_DELAY_MS = 1000;
// A click holds its panel open for a deliberate read-length pause before
// autoplay is allowed to continue from it.
const CLICK_PAUSE_MS = 5000;

export default function WebCommerce() {
  const t = useTranslations("pages.home.sections.webCommerce");
  const solutions = t.raw("solutions") as Solution[];
  const capabilities = t.raw("capabilities") as string[];

  // Single source of truth for which panel is expanded. Autoplay, hover,
  // focus, and click all drive this same index — nothing else decides what
  // renders as active.
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Two independent "keep it paused" reasons, tracked as refs (not state —
  // read only inside timeouts/handlers, never during render): literally
  // hovering/focused right now, and the 5s click hold. Autoplay may only
  // resume once BOTH are clear, so a quick mouse-out right after a click
  // can't cut the click's longer pause short, and a later hover/focus
  // always wins outright by reactivating isInteractingRef.
  const isInteractingRef = useRef(false);
  const isClickPausedRef = useRef(false);
  const hoverResumeTimerRef = useRef<number | null>(null);
  const clickResumeTimerRef = useRef<number | null>(null);

  const clearHoverResumeTimer = () => {
    if (hoverResumeTimerRef.current !== null) {
      window.clearTimeout(hoverResumeTimerRef.current);
      hoverResumeTimerRef.current = null;
    }
  };
  const clearClickResumeTimer = () => {
    if (clickResumeTimerRef.current !== null) {
      window.clearTimeout(clickResumeTimerRef.current);
      clickResumeTimerRef.current = null;
    }
  };

  const maybeResume = () => {
    if (!isInteractingRef.current && !isClickPausedRef.current) setIsPaused(false);
  };

  // Hover/focus/click all funnel through here: activate immediately, pause
  // indefinitely (until something schedules a resume below).
  const pauseAndActivate = (index: number) => {
    isInteractingRef.current = true;
    clearHoverResumeTimer();
    setActiveIndex(index);
    setIsPaused(true);
  };

  const handlePanelActivate = (index: number) => pauseAndActivate(index);

  const handlePanelLeave = () => {
    isInteractingRef.current = false;
    clearHoverResumeTimer();
    hoverResumeTimerRef.current = window.setTimeout(() => {
      hoverResumeTimerRef.current = null;
      maybeResume();
    }, HOVER_RESUME_DELAY_MS);
  };

  const handlePanelClick = (index: number) => {
    pauseAndActivate(index);
    isClickPausedRef.current = true;
    clearClickResumeTimer();
    clickResumeTimerRef.current = window.setTimeout(() => {
      clickResumeTimerRef.current = null;
      isClickPausedRef.current = false;
      maybeResume();
    }, CLICK_PAUSE_MS);
  };

  useEffect(() => () => {
    clearHoverResumeTimer();
    clearClickResumeTimer();
  }, []);

  const panelsRef = useRef<HTMLDivElement>(null);
  // Start autoplay once roughly a third of the panel row is visible. Not
  // `once`, so autoplay naturally stops when scrolled away and restarts
  // when scrolled back instead of running off-screen.
  const isPanelsInView = useInView(panelsRef, { amount: 0.35 });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Pause while the tab itself is hidden so no ticks accumulate in the
  // background; resuming re-enters with a fresh interval below.
  const [isTabVisible, setIsTabVisible] = useState(true);
  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === "visible");
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion || !isPanelsInView || isPaused || !isTabVisible) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutions.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isDesktop, prefersReducedMotion, isPanelsInView, isPaused, isTabVisible, solutions.length]);

  return (
    <section className="bg-home-surface-warm py-14 sm:py-16 lg:py-20">
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

        {/* Desktop: 4 panels side by side, one expanded at a time.
            Autoplay advances `activeIndex` every ~3.5s (see effect above);
            the outer ref is only for visibility detection, layout is unchanged. */}
        <div ref={panelsRef} className="hidden lg:block">
          <AnimatedSection variants={panelListStagger} className="flex gap-4 lg:h-[420px]">
            {solutions.map((solution, index) => {
              const Icon = WEB_COMMERCE_SOLUTION_ICONS[solution.id];
              const isActive = index === activeIndex;
              return (
                <motion.button
                  key={solution.id}
                  type="button"
                  variants={fadeUpItem}
                  layout
                  transition={{ layout: { duration: DURATION.section, ease: EASE_PREMIUM } }}
                  onMouseEnter={() => handlePanelActivate(index)}
                  onMouseLeave={handlePanelLeave}
                  onFocus={() => handlePanelActivate(index)}
                  onBlur={handlePanelLeave}
                  onClick={() => handlePanelClick(index)}
                  aria-pressed={isActive}
                  style={{ flexGrow: isActive ? 2.4 : 1 }}
                  className={cn(
                    "focus-ring-lime relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-home-xl border p-6 text-left transition-colors duration-200 sm:p-7",
                    isActive
                      ? "border-home-primary bg-home-bg"
                      : "border-home-border bg-home-surface hover:border-home-primary-active"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-home-md transition-colors duration-200",
                        isActive ? "bg-home-primary text-home-primary-foreground" : "bg-home-primary-soft text-home-fg"
                      )}
                    >
                      {Icon && <Icon size={20} strokeWidth={1.75} />}
                    </div>
                    <h3 className="font-home-sans text-[15px] font-semibold leading-tight text-home-fg">
                      {solution.title}
                    </h3>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`${solution.id}-content`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: DURATION.product, ease: EASE_PREMIUM }}
                        className="mt-6 flex flex-1 flex-col justify-between"
                      >
                        <div>
                          <p className="font-home-sans max-w-sm text-[15px] leading-6 text-home-text-secondary">
                            {solution.description}
                          </p>
                          <SolutionVisual solutionId={solution.id} />
                        </div>
                        <motion.div
                          className="mt-6 flex flex-wrap gap-2"
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 } } }}
                        >
                          {capabilities.map((capability) => (
                            <motion.span
                              key={capability}
                              variants={{
                                hidden: { opacity: 0, y: 6 },
                                visible: { opacity: 1, y: 0, transition: { duration: DURATION.micro, ease: EASE_PREMIUM } },
                              }}
                              className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-3 py-1.5 text-xs font-medium text-home-fg"
                            >
                              {capability}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </AnimatedSection>
        </div>

        {/* Mobile / tablet: compact accordion cards, one open at a time */}
        <Accordion type="single" collapsible defaultValue={solutions[0]?.id} className="flex flex-col gap-3 lg:hidden">
          {solutions.map((solution) => {
            const Icon = WEB_COMMERCE_SOLUTION_ICONS[solution.id];
            return (
              <AnimatedSection key={solution.id} variants={fadeUpItem}>
                <AccordionItem
                  value={solution.id}
                  className="rounded-home-lg border border-home-border bg-home-bg px-4 sm:px-5"
                >
                  <AccordionTrigger className="focus-ring-lime w-full py-4 font-home-sans text-[15px] font-semibold text-home-fg hover:text-home-fg [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-home-text-muted">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-home-md bg-home-primary-soft text-home-fg">
                        {Icon && <Icon size={18} strokeWidth={1.75} />}
                      </span>
                      {solution.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-home-text-secondary">
                    <p className="font-home-sans text-[15px] leading-6 text-home-text-secondary">
                      {solution.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-3 py-1.5 text-xs font-medium text-home-fg"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AnimatedSection>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}

// Subtle abstract browser/product mock — a few flat shapes, never a real
// screenshot, varied per solution so each expanded panel reads distinctly.
function SolutionVisual({ solutionId }: { solutionId: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-home-md border border-home-border bg-home-surface">
      <div className="flex items-center gap-1.5 border-b border-home-border px-3 py-2">
        <span className="h-2 w-2 rounded-home-full bg-home-border-strong" aria-hidden="true" />
        <span className="h-2 w-2 rounded-home-full bg-home-border-strong" aria-hidden="true" />
        <span className="h-2 w-2 rounded-home-full bg-home-primary" aria-hidden="true" />
      </div>
      <div className="p-3.5" aria-hidden="true">
        {solutionId === "ecommerce" && (
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn("aspect-square rounded-home-sm", i === 2 ? "bg-home-primary" : "bg-home-bg border border-home-border")}
              />
            ))}
          </div>
        )}
        {solutionId === "webapps" && (
          <div className="flex gap-1.5">
            <div className="flex w-1/3 flex-col gap-1.5">
              <div className="h-2 w-full rounded-home-sm bg-home-primary" />
              <div className="h-2 w-3/4 rounded-home-sm bg-home-bg" />
              <div className="h-2 w-3/4 rounded-home-sm bg-home-bg" />
            </div>
            <div className="flex-1 rounded-home-sm border border-home-border bg-home-bg" />
          </div>
        )}
        {solutionId === "landing" && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-2 w-2/3 rounded-home-sm bg-home-bg" />
            <div className="h-2 w-1/2 rounded-home-sm bg-home-bg" />
            <div className="mt-1 h-3 w-1/3 rounded-home-full bg-home-primary" />
          </div>
        )}
        {solutionId === "corporate" && (
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full rounded-home-sm bg-home-bg" />
            <div className="h-2 w-5/6 rounded-home-sm bg-home-bg" />
            <div className="h-2 w-2/3 rounded-home-sm bg-home-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
