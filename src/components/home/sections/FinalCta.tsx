"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import { HomeButton } from "@/components/home/ui/HomeButton";
import FinalCtaWaveField from "@/components/home/sections/FinalCtaWaveField";
import "@/lib/home-fonts";

export default function FinalCta() {
  const t = useTranslations("pages.home.sections.finalCta");

  return (
    <section className="relative overflow-hidden bg-home-surface-dark">
      <FinalCtaWaveField />
      <AnimatedSection className="relative z-10 mx-auto flex min-h-[560px] max-w-[760px] flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[640px] sm:px-6 sm:py-24 lg:min-h-[720px] lg:py-28">
        <motion.h2
          variants={fadeUp}
          className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-text-inverse sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
        >
          {t("heading")}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="font-home-sans mx-auto mt-5 max-w-lg text-[17px] leading-7 text-home-text-inverse-secondary"
        >
          {t("body")}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9">
          <HomeButton variant="lime" asChild className="px-8 text-base">
            <Link href="/kurumsal/iletisim">{t("cta")}</Link>
          </HomeButton>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
