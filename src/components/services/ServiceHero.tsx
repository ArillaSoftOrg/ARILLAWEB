"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

type Crumb = { label: string; href?: string };
type Action = { label: string; href: string };

export default function ServiceHero({
  breadcrumbs,
  heading,
  intro,
  primary,
  secondary,
}: {
  breadcrumbs: Crumb[];
  heading: string;
  intro: string;
  primary?: Action;
  secondary?: Action;
}) {
  return (
    <section
      className="bg-home-surface-warm pb-14 sm:pb-16 lg:pb-20"
      style={{ paddingTop: "calc(var(--header-h) + 24px)" }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10">
          <ol className="font-home-sans m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[13px] leading-[18px]">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={`${item.label}-${item.href ?? ""}`} className="flex items-center gap-1">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="text-home-text-muted no-underline transition-colors hover:text-home-fg">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-home-fg" : "text-home-text-muted"}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight size={13} aria-hidden="true" className="text-home-text-muted" />}
                </li>
              );
            })}
          </ol>
        </nav>

        <AnimatedSection className="max-w-[760px]">
          <motion.h1
            variants={fadeUp}
            className="font-home-sans text-[40px] font-semibold leading-[44px] tracking-[-0.02em] text-home-fg sm:text-[56px] sm:leading-[60px] sm:tracking-[-0.03em]"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-home-sans mt-5 max-w-[56ch] text-[17px] leading-[26px] text-home-text-secondary sm:mt-6 sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.005em]"
          >
            {intro}
          </motion.p>
          {(primary || secondary) && (
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              {primary && (
                <HomeButton variant="primary" asChild className="w-full sm:w-auto">
                  <Link href={primary.href}>{primary.label}</Link>
                </HomeButton>
              )}
              {secondary && (
                <HomeButton variant="outline" asChild className="w-full sm:w-auto">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </HomeButton>
              )}
            </motion.div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
