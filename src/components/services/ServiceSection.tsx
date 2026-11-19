"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

/** Shared section frame + centered heading block, mirroring the homepage sections. */
export default function ServiceSection({
  title,
  description,
  tone = "bg",
  size = "lg",
  children,
}: {
  title?: string;
  description?: string;
  tone?: "bg" | "warm";
  size?: "lg" | "md";
  children: React.ReactNode;
}) {
  return (
    <section className={`${tone === "warm" ? "bg-home-surface-warm" : "bg-home-bg"} py-14 sm:py-16 lg:py-20`}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        {title && (
          <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
            <motion.h2
              variants={fadeUp}
              className={
                size === "lg"
                  ? "font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
                  : "font-home-sans text-[26px] font-semibold leading-[1.2] tracking-[-0.02em] text-home-fg sm:text-[34px]"
              }
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p variants={fadeUp} className="font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-home-text-secondary">
                {description}
              </motion.p>
            )}
          </AnimatedSection>
        )}
        {children}
      </div>
    </section>
  );
}
