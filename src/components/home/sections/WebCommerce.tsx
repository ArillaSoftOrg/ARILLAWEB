"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, fadeUpItem, EASE_PREMIUM, DURATION } from "@/components/home/motion";
import { WEB_COMMERCE_SOLUTION_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

type Solution = { id: string; title: string; description: string };

// Selector stagger — tighter than the default 80ms card stagger since these
// are small pill/list items, not content blocks.
const tabListStagger: Variants = {
  visible: { transition: { staggerChildren: 0.06 } },
};

// Product-panel first entrance only — a subtle mask reveal, never replayed
// on tab switch (the per-tab crossfade below handles that independently).
const panelRevealVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 8% 0 0)" },
  visible: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: DURATION.section, ease: EASE_PREMIUM } },
};

export default function WebCommerce() {
  const t = useTranslations("pages.home.sections.webCommerce");
  const solutions = t.raw("solutions") as Solution[];
  const capabilities = t.raw("capabilities") as string[];
  const [active, setActive] = useState(solutions[0]?.id ?? "");
  const activeSolution = solutions.find((s) => s.id === active) ?? solutions[0];
  const ActiveIcon = activeSolution ? WEB_COMMERCE_SOLUTION_ICONS[activeSolution.id] : undefined;

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

        <AnimatedSection>
          <Tabs value={active} onValueChange={setActive} className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
            <motion.div variants={tabListStagger}>
              <TabsList className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {solutions.map((solution) => {
                  const Icon = WEB_COMMERCE_SOLUTION_ICONS[solution.id];
                  const isActive = solution.id === active;
                  return (
                    <motion.div key={solution.id} variants={fadeUpItem} className="flex-shrink-0">
                      <TabsTrigger
                        value={solution.id}
                        className="font-home-sans flex w-full items-center gap-3 rounded-home-md px-4 py-3.5 text-left text-[15px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-home-primary-active focus-visible:ring-offset-2 data-[state=active]:bg-home-primary data-[state=active]:text-home-primary-foreground data-[state=inactive]:text-home-text-secondary data-[state=inactive]:hover:bg-home-bg"
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            strokeWidth={2}
                            className={isActive ? "text-home-primary-foreground" : "text-home-text-muted"}
                          />
                        )}
                        <span className="whitespace-nowrap lg:whitespace-normal">{solution.title}</span>
                      </TabsTrigger>
                    </motion.div>
                  );
                })}
              </TabsList>
            </motion.div>

            <motion.div
              variants={panelRevealVariants}
              className="relative overflow-hidden rounded-home-xl border border-home-border bg-home-bg"
            >
              <AnimatePresence mode="wait">
                {activeSolution && (
                  <TabsContent value={activeSolution.id} forceMount asChild>
                    <motion.div
                      key={activeSolution.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: DURATION.product, ease: EASE_PREMIUM }}
                      className="flex flex-col gap-8 p-8 sm:p-10 lg:min-h-[380px] lg:flex-row lg:items-center"
                    >
                      <div className="flex-1">
                        <div className="flex h-14 w-14 items-center justify-center rounded-home-md bg-home-primary-soft text-home-fg">
                          {ActiveIcon && <ActiveIcon size={26} strokeWidth={1.75} />}
                        </div>
                        <h3 className="font-home-sans mt-6 text-2xl font-semibold text-home-fg">
                          {activeSolution.title}
                        </h3>
                        <p className="font-home-sans mt-3 max-w-md text-[15px] leading-6 text-home-text-secondary">
                          {activeSolution.description}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap content-start gap-2.5">
                        {capabilities.map((capability) => (
                          <span
                            key={capability}
                            className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-3.5 py-1.5 text-xs font-medium text-home-fg"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </motion.div>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}
