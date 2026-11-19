"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUpItem, stagger } from "@/components/home/motion";
import ServiceSection from "./ServiceSection";

export type ServiceLinkItem = { key: string; href: string; title: string; description: string };

/** Card grid of links: related industries, related services, hub index. */
export default function ServiceLinkGrid({
  title,
  description,
  items,
  linkLabel,
  columns = 3,
  tone = "bg",
  size = "md",
}: {
  title?: string;
  description?: string;
  items: ServiceLinkItem[];
  linkLabel: string;
  columns?: 2 | 3;
  tone?: "bg" | "warm";
  size?: "lg" | "md";
}) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ServiceSection title={title} description={description} tone={tone} size={size}>
      <AnimatedSection variants={stagger} className={`grid grid-cols-1 gap-5 ${cols}`}>
        {items.map((item) => (
          <motion.div key={item.key} variants={fadeUpItem} className="h-full">
            <Link
              href={item.href}
              className="focus-ring-lime group flex h-full flex-col rounded-home-lg border border-home-border bg-home-bg p-6 no-underline transition-colors duration-200 hover:border-home-fg"
            >
              <h3 className="font-home-sans text-lg font-semibold tracking-[-0.01em] text-home-fg">{item.title}</h3>
              <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-secondary">{item.description}</p>
              <span className="font-home-sans mt-5 inline-flex items-center gap-1.5 pt-1 text-[14px] font-medium text-home-fg">
                {linkLabel}
                <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        ))}
      </AnimatedSection>
    </ServiceSection>
  );
}
