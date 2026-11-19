"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import "@/lib/home-fonts";

/** Single-link promo band (design examples). */
export default function ServicePromo({
  heading,
  body,
  label,
  href,
}: {
  heading: string;
  body: string;
  label: string;
  href: string;
}) {
  return (
    <section className="bg-home-bg pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col items-start justify-between gap-6 rounded-home-xl border border-home-border bg-home-primary-soft p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <h2 className="font-home-sans text-2xl font-semibold leading-[1.2] tracking-[-0.02em] text-home-fg sm:text-[28px]">
              {heading}
            </h2>
            <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-secondary">{body}</p>
          </div>
          <HomeButton variant="primary" asChild className="shrink-0">
            <Link href={href}>
              {label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </HomeButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
