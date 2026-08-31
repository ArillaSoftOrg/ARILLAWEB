"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp, EASE_PREMIUM, DURATION } from "@/components/home/motion";
import { INDUSTRY_SECTOR_ICONS } from "@/components/home/sections/data";
import "@/lib/home-fonts";

type Sector = { id: string; label: string; title: string; description: string; features: string[] };

export default function IndustrySolutions() {
  const t = useTranslations("pages.home.sections.industrySolutions");
  const sectors = t.raw("sectors") as Sector[];
  const [active, setActive] = useState(sectors[0]?.id ?? "");
  const activeSector = sectors.find((s) => s.id === active) ?? sectors[0];

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

        <AnimatedSection>
          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="mb-8 flex w-full flex-wrap justify-center gap-2 sm:mb-10">
              {sectors.map((sector) => {
                const Icon = INDUSTRY_SECTOR_ICONS[sector.id];
                return (
                  <TabsTrigger
                    key={sector.id}
                    value={sector.id}
                    className="font-home-sans flex items-center gap-2 rounded-home-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-home-primary-active focus-visible:ring-offset-2 data-[state=active]:border-transparent data-[state=active]:bg-home-fg data-[state=active]:text-home-text-inverse data-[state=inactive]:border-home-border data-[state=inactive]:text-home-text-secondary data-[state=inactive]:hover:bg-home-surface"
                  >
                    {Icon && <Icon size={16} strokeWidth={2} />}
                    {sector.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="relative overflow-hidden rounded-home-xl border border-home-border bg-home-surface lg:min-h-[320px]">
              <AnimatePresence mode="wait">
                {activeSector && (
                  <TabsContent value={activeSector.id} asChild>
                    <motion.div
                      key={activeSector.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: DURATION.product, ease: EASE_PREMIUM }}
                      className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12"
                    >
                      <div>
                        <h3 className="font-home-sans text-2xl font-semibold leading-snug text-home-fg sm:text-[28px]">
                          {activeSector.title}
                        </h3>
                        <p className="font-home-sans mt-4 max-w-md text-[15px] leading-6 text-home-text-secondary">
                          {activeSector.description}
                        </p>
                      </div>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {activeSector.features.map((feature) => (
                          <li
                            key={feature}
                            className="font-home-sans flex items-center gap-2.5 rounded-home-md bg-home-bg px-3.5 py-2.5 text-sm font-medium text-home-fg"
                          >
                            <Check size={15} strokeWidth={2.5} className="flex-shrink-0 text-home-primary-active" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}
