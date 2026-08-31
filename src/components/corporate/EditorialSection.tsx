"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import { cn } from "@/lib/utils";
import "@/lib/home-fonts";

interface EditorialSectionProps {
  heading?: string;
  description?: string;
  layout?: "stacked" | "split";
  surface?: "light" | "canvas";
  children?: React.ReactNode;
  className?: string;
}

const surfaceClass: Record<NonNullable<EditorialSectionProps["surface"]>, string> = {
  light: "bg-home-bg",
  canvas: "bg-home-surface",
};

export function EditorialSection({
  heading,
  description,
  layout = "stacked",
  surface = "light",
  children,
  className,
}: EditorialSectionProps) {
  const hasHeader = Boolean(heading || description);

  return (
    <section className={cn(surfaceClass[surface], "py-14 sm:py-16 lg:py-24", className)}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div
          className={
            layout === "split" && hasHeader
              ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16"
              : undefined
          }
        >
          {hasHeader && (
            <AnimatedSection className={layout === "split" ? undefined : "mb-10 max-w-2xl sm:mb-12"}>
              {heading && (
                <motion.h2
                  variants={fadeUp}
                  className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
                >
                  {heading}
                </motion.h2>
              )}
              {description && (
                <motion.p
                  variants={fadeUp}
                  className="font-home-sans mt-5 max-w-2xl text-[17px] leading-7 text-home-text-secondary"
                >
                  {description}
                </motion.p>
              )}
            </AnimatedSection>
          )}
          {children && (
            <div className={layout === "split" && hasHeader ? "mt-10 lg:mt-0" : undefined}>{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}
