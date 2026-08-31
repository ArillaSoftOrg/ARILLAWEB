"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import { BUSINESS_TOOL_CONCEPT_ICONS, BUSINESS_TOOL_CONCEPT_IMAGES } from "@/components/home/sections/data";
import "@/lib/home-fonts";

type Concept = { key: string; title: string; description: string };

// ~180-240ms per hop, per design.
const STEP_TRANSITION_MS = 210;

// Product-reveal easing: restrained ease-out, no bounce.
const PRODUCT_EASE = [0.16, 1, 0.3, 1] as const;

// Scroll-progress breakpoints across the whole section (0 = section just
// entering from below, 1 = section fully scrolled past). The dashboard
// settles flat for the entire interactive middle portion and only tilts
// near the very edges, matching the "enter angled, stay flat while
// interacting, exit angled" brief.
const TILT_PROGRESS: number[] = [0, 0.12, 0.88, 1];
const ENTRY_TILT = { rotateX: 7, rotateY: -5, rotateZ: -2, y: 60, scale: 0.94 };
const FLAT = { rotateX: 0, rotateY: 0, rotateZ: 0, y: 0, scale: 1 };
const EXIT_TILT = { rotateX: -5, rotateY: 4, rotateZ: 1.5, y: -45, scale: 0.96 };
const SHADOW_ANGLED = "0 28px 70px rgba(16,16,16,0.14)";
const SHADOW_FLAT = "0 16px 40px rgba(16,16,16,0.09)";

export default function WebsiteAsBusinessTool() {
  const t = useTranslations("pages.home.sections.businessTool");
  const concepts = t.raw("concepts") as Concept[];

  // `targetIndex` is whatever scroll tracking (or a click) says SHOULD be
  // active. `activeIndex` is what's actually rendered, and only ever moves
  // one step at a time toward `targetIndex` — see the effect below. This
  // split is what fixes the skip bug: the previous version called
  // setActiveIndex directly from the IntersectionObserver callback, and on a
  // fast scroll two sentinels could change intersection state inside the
  // same callback batch, so the intermediate value never rendered (0 -> 2
  // skipped 1 entirely, since React only paints the last setState in a
  // batch).
  const [targetIndex, setTargetIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Section-level scroll progress drives the 3D "product reveal" tilt on the
  // desktop/tablet dashboard — entry angled, flat while the four states are
  // interacted with, angled again on exit. This never hijacks scroll: it
  // only reads normal scroll position to derive presentation state.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const dashboardRotateX = useTransform(
    scrollYProgress,
    TILT_PROGRESS,
    [ENTRY_TILT.rotateX, FLAT.rotateX, FLAT.rotateX, EXIT_TILT.rotateX]
  );
  const dashboardRotateY = useTransform(
    scrollYProgress,
    TILT_PROGRESS,
    [ENTRY_TILT.rotateY, FLAT.rotateY, FLAT.rotateY, EXIT_TILT.rotateY]
  );
  const dashboardRotateZ = useTransform(
    scrollYProgress,
    TILT_PROGRESS,
    [ENTRY_TILT.rotateZ, FLAT.rotateZ, FLAT.rotateZ, EXIT_TILT.rotateZ]
  );
  const dashboardY = useTransform(scrollYProgress, TILT_PROGRESS, [ENTRY_TILT.y, FLAT.y, FLAT.y, EXIT_TILT.y]);
  const dashboardScale = useTransform(
    scrollYProgress,
    TILT_PROGRESS,
    [ENTRY_TILT.scale, FLAT.scale, FLAT.scale, EXIT_TILT.scale]
  );
  // Opacity stays high through the settle and only eases down right at the
  // tail end of the exit, per brief ("keep opacity relatively high until
  // close to the section exit").
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 0.97, 1], [0.78, 1, 1, 1, 0.88]);
  const dashboardShadow = useTransform(scrollYProgress, TILT_PROGRESS, [
    SHADOW_ANGLED,
    SHADOW_FLAT,
    SHADOW_FLAT,
    SHADOW_ANGLED,
  ]);

  // Mobile-only accordion state (below the ~768px breakpoint). Independent
  // of activeIndex/targetIndex, which stay dedicated to the desktop/tablet
  // scroll-tracking + shared-dashboard behavior below.
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
  const toggleMobileStep = (index: number) => {
    setOpenMobileIndex((current) => (current === index ? null : index));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setTargetIndex(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [concepts.length]);

  useEffect(() => {
    if (activeIndex === targetIndex) return;
    const direction = targetIndex > activeIndex ? 1 : -1;
    const id = setTimeout(
      () => setActiveIndex((current) => current + direction),
      prefersReducedMotion ? 0 : STEP_TRANSITION_MS
    );
    return () => clearTimeout(id);
  }, [activeIndex, targetIndex, prefersReducedMotion]);

  // A direct click/tap is an explicit choice — it activates immediately
  // rather than queuing through intermediate steps.
  const selectStep = (index: number) => {
    setTargetIndex(index);
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="relative bg-home-bg pt-12 pb-16 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-home-sans mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.6] text-home-text-secondary"
          >
            {t("body")}
          </motion.p>
        </AnimatedSection>

        {/* Mobile accordion (<768px) — each step expands its own dashboard
            image directly beneath it. Replaces the shared-image behavior
            below for this breakpoint only; desktop/tablet is untouched. */}
        <div className="flex flex-col gap-3 md:hidden">
          {concepts.map((concept, index) => {
            const Icon = BUSINESS_TOOL_CONCEPT_ICONS[concept.key];
            const image = BUSINESS_TOOL_CONCEPT_IMAGES[concept.key];
            const isOpen = index === openMobileIndex;
            const panelId = `business-tool-panel-${concept.key}`;
            return (
              <div
                key={concept.key}
                className="border-l-2 pl-5 transition-colors duration-300"
                style={{ borderColor: isOpen ? "var(--home-primary)" : "var(--home-border)" }}
              >
                <button
                  type="button"
                  onClick={() => toggleMobileStep(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-label={t(isOpen ? "stepCollapseAriaLabel" : "stepExpandAriaLabel", { title: concept.title })}
                  className="focus-ring-lime flex w-full items-start gap-4 py-3 text-left"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-home-md transition-colors duration-300"
                    style={{
                      background: isOpen ? "var(--home-primary)" : "var(--home-surface)",
                      color: "var(--home-fg)",
                    }}
                  >
                    {Icon && <Icon size={18} strokeWidth={2} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-home-sans text-lg font-semibold text-home-fg">{concept.title}</h3>
                    <p className="font-home-sans mt-1 text-[14px] leading-[1.55] text-home-text-secondary">
                      {concept.description}
                    </p>
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    size={18}
                    strokeWidth={2}
                    className="mt-1 flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? "var(--home-fg)" : "var(--home-text-secondary)",
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && image && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={concept.title}
                      className="overflow-hidden"
                      initial={prefersReducedMotion ? false : { opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                    >
                      <div className="relative mt-3 mb-1 aspect-[3/2] w-full overflow-hidden rounded-home-lg border border-home-border bg-home-surface">
                        <Image
                          src={image}
                          alt={concept.title}
                          fill
                          className="object-contain"
                          sizes="100vw"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="hidden flex-col gap-10 md:flex lg:grid lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start lg:gap-12">
          {/* Step list — doubles as the scroll-tracking sentinels and the
              clickable/tappable controls. */}
          <div className="flex flex-col gap-6">
            {concepts.map((concept, index) => {
              const Icon = BUSINESS_TOOL_CONCEPT_ICONS[concept.key];
              const isActive = index === activeIndex;
              return (
                <button
                  key={concept.key}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-pressed={isActive}
                  className="focus-ring-lime flex w-full items-start gap-4 border-l-2 py-3 pl-5 text-left transition-colors duration-300"
                  style={{
                    borderColor: isActive ? "var(--home-primary)" : "var(--home-border)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-home-md transition-colors duration-300"
                    style={{
                      background: isActive ? "var(--home-primary)" : "var(--home-surface)",
                      color: "var(--home-fg)",
                    }}
                  >
                    {Icon && <Icon size={18} strokeWidth={2} />}
                  </div>
                  <div>
                    <h3 className="font-home-sans text-lg font-semibold text-home-fg">{concept.title}</h3>
                    <p
                      className="font-home-sans mt-1 max-w-md text-[14px] leading-[1.55] text-home-text-secondary transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0.55 }}
                    >
                      {concept.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="w-full lg:sticky lg:top-24">
            <motion.div
              className="relative aspect-[3/2] w-full overflow-hidden rounded-home-xl border border-home-border bg-home-surface"
              style={
                prefersReducedMotion
                  ? { boxShadow: SHADOW_FLAT }
                  : {
                      transformPerspective: 1400,
                      rotateX: dashboardRotateX,
                      rotateY: dashboardRotateY,
                      rotateZ: dashboardRotateZ,
                      y: dashboardY,
                      scale: dashboardScale,
                      opacity: dashboardOpacity,
                      boxShadow: dashboardShadow,
                    }
              }
            >
              <AnimatePresence initial={false}>
                {(() => {
                  const concept = concepts[activeIndex];
                  const image = BUSINESS_TOOL_CONCEPT_IMAGES[concept.key];
                  return (
                    <motion.div
                      key={concept.key}
                      className="absolute inset-0"
                      initial={
                        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985, rotateX: 1.5 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={
                        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985, rotateX: -1.5 }
                      }
                      transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: PRODUCT_EASE }}
                      style={{ transformPerspective: 800 }}
                    >
                      {image && (
                        <Image
                          src={image}
                          alt={concept.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 800px"
                          priority={activeIndex === 0}
                        />
                      )}
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
                {concepts.map((concept, index) => {
                  const isActive = index === activeIndex;
                  const isCompleted = index < activeIndex;
                  return (
                    <span
                      key={concept.key}
                      className="h-1.5 rounded-home-full transition-all duration-[280ms] ease-out"
                      style={{
                        width: isActive ? "24px" : "6px",
                        background: isActive || isCompleted ? "var(--home-primary)" : "var(--home-border-strong)",
                        opacity: isCompleted ? 0.45 : 1,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
