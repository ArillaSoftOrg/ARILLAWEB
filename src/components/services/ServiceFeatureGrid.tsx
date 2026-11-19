"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeCard } from "@/components/home/ui/HomeCard";
import { fadeUpItem, stagger } from "@/components/home/motion";
import ServiceSection from "./ServiceSection";

type Feature = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
};

export default function ServiceFeatureGrid({
  title,
  description,
  features,
  tone = "bg",
}: {
  title: string;
  description?: string;
  features: Feature[];
  tone?: "bg" | "warm";
}) {
  return (
    <ServiceSection title={title} description={description} tone={tone}>
      <AnimatedSection variants={stagger} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <motion.div key={feature.title} variants={fadeUpItem}>
            <HomeCard surface={tone === "warm" ? "light" : "neutral"} className="h-full rounded-home-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-home-md bg-home-primary text-home-primary-foreground">
                <feature.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-home-sans mt-5 text-xl font-semibold tracking-[-0.01em] text-home-fg">{feature.title}</h3>
              <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-secondary">{feature.description}</p>
            </HomeCard>
          </motion.div>
        ))}
      </AnimatedSection>
    </ServiceSection>
  );
}
