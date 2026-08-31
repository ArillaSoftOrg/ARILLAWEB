"use client";

import { useTranslations, useLocale } from "next-intl";
import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeCard } from "@/components/home/ui/HomeCard";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import { fadeUp, stagger, EASE_PREMIUM } from "@/components/home/motion";
import {
  PLACEHOLDER_PRICING,
  PRICING_CTA_HREFS,
  PRICING_PLAN_VISUALS,
} from "@/components/home/sections/data";
import { cn } from "@/lib/utils";
import "@/lib/home-fonts";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  priceType: "free" | "from" | "custom";
  featured?: boolean;
  isCustom?: boolean;
  featuresIntro?: string;
  ctaLabel: string;
  features: string[];
};

// Plans reveal left -> right (design intent: pricing is read/compared in
// that order, so the entrance should match). translateX carries the
// left-to-right read; translateY keeps it grounded rather than sliding.
const priceCardVariants: Variants = {
  hidden: { opacity: 0, x: -16, y: 8 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.38, ease: EASE_PREMIUM } },
};

// The "recommended" badge lands ~80ms after its own card settles.
const priceBadgeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: EASE_PREMIUM, delay: 0.08 } },
};

export default function Pricing() {
  const t = useTranslations("pages.home.sections.pricing");
  const locale = useLocale();
  const plans = t.raw("plans") as Plan[];

  const formatPrice = (planId: string) => {
    const price = PLACEHOLDER_PRICING[planId];
    if (!price) return null;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: price.currency,
      maximumFractionDigits: 0,
    }).format(price.amount);
  };

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
          {/* TEMPORARY PLACEHOLDER pricing — figures in data.ts are illustrative, replace before launch */}
        </AnimatedSection>

        <AnimatedSection
          variants={stagger}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan) => {
            const visuals = PRICING_PLAN_VISUALS[plan.id] ?? { surface: "light", buttonVariant: "secondary" };
            const isDark = visuals.surface === "dark";
            const price = formatPrice(plan.id);

            return (
              <motion.div key={plan.id} variants={priceCardVariants}>
              <HomeCard
                surface={visuals.surface}
                padding="md"
                className="flex flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-home-sans text-xl font-semibold">{plan.name}</h3>
                  {plan.featured && (
                    <motion.div variants={priceBadgeVariants}>
                      <HomeBadge variant="dark" className="normal-case tracking-normal">
                        {t("recommendedBadge")}
                      </HomeBadge>
                    </motion.div>
                  )}
                </div>

                <p
                  className={cn(
                    "font-home-sans mt-2 text-sm leading-6",
                    isDark ? "text-home-text-inverse-secondary" : "text-home-text-secondary"
                  )}
                >
                  {plan.tagline}
                </p>

                <div className="mt-5">
                  {plan.priceType === "free" && (
                    <span className="font-home-sans text-3xl font-semibold">{t("freePriceLabel")}</span>
                  )}

                  {plan.priceType === "from" && price && (
                    <p className="font-home-sans leading-tight">
                      {t.rich("fromPriceLine", {
                        price,
                        amount: (chunks) => (
                          <span className="block text-3xl font-semibold">{chunks}</span>
                        ),
                      })}
                    </p>
                  )}

                  {plan.priceType === "custom" && (
                    <div>
                      <span className="font-home-sans text-xl font-semibold">{t("customPriceLabel")}</span>
                      <p
                        className={cn(
                          "font-home-sans mt-1.5 text-sm leading-5",
                          isDark ? "text-home-text-inverse-secondary" : "text-home-text-secondary"
                        )}
                      >
                        {t("customPriceNote")}
                      </p>
                    </div>
                  )}
                </div>

                {plan.featuresIntro && (
                  <p
                    className={cn(
                      "font-home-sans mt-6 text-xs font-medium uppercase tracking-[0.06em]",
                      isDark ? "text-home-text-inverse-secondary" : "text-home-text-muted"
                    )}
                  >
                    {plan.featuresIntro}
                  </p>
                )}

                <ul className={cn("flex flex-1 flex-col gap-2.5", plan.featuresIntro ? "mt-3" : "mt-6")}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="font-home-sans flex items-start gap-2.5 text-sm">
                      <Check size={16} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 opacity-70" />
                      <span className="leading-6">{feature}</span>
                    </li>
                  ))}
                </ul>

                <HomeButton variant={visuals.buttonVariant} asChild className="mt-8 w-full">
                  <Link href={PRICING_CTA_HREFS[plan.id] ?? "/teklif-al"}>{plan.ctaLabel}</Link>
                </HomeButton>
              </HomeCard>
              </motion.div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
