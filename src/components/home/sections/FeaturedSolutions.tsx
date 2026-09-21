"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { PriceDisclaimer } from "@/components/solutions/PriceDisclaimer";
import { fadeUp, fadeUpItem, stagger } from "@/components/home/motion";
import { getFeaturedSolutions, getCategories, type Locale } from "@/lib/solutions";
import "@/lib/home-fonts";

export default function FeaturedSolutions() {
  const t = useTranslations("pages.home.sections.featuredSolutions");
  const locale = useLocale() as Locale;
  const basePath = locale === "en" ? "/solutions" : "/cozumler";
  const featured = getFeaturedSolutions();
  const categories = getCategories();
  const categoryNameById = new Map(categories.map((c) => [c.id, c.name[locale]]));

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

        <AnimatedSection variants={stagger} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((solution) => (
            <motion.div key={solution.id} variants={fadeUpItem}>
              <SolutionCard
                solution={solution}
                locale={locale}
                basePath={basePath}
                categoryLabel={categoryNameById.get(solution.category)}
              />
            </motion.div>
          ))}
        </AnimatedSection>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12">
          <HomeButton variant="outline" asChild>
            <Link href={basePath}>
              {t("viewAllLabel")}
              <ArrowRight size={16} />
            </Link>
          </HomeButton>
          <PriceDisclaimer locale={locale} className="max-w-xl" />
        </div>
      </div>
    </section>
  );
}
