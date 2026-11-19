"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeCard } from "@/components/home/ui/HomeCard";
import { fadeUpItem, stagger } from "@/components/home/motion";
import ServiceSection from "./ServiceSection";

type Step = { title: string; description: string };

/** Steps are a real sequence, so they carry numbers. */
export default function ServiceProcess({
  title,
  description,
  steps,
  tone = "warm",
}: {
  title: string;
  description?: string;
  steps: Step[];
  tone?: "bg" | "warm";
}) {
  const cols = steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ServiceSection title={title} description={description} tone={tone}>
      <AnimatedSection variants={stagger} className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${cols}`}>
        {steps.map((step, index) => (
          <motion.div key={step.title} variants={fadeUpItem}>
            <HomeCard surface="light" padding="sm" className="h-full p-6">
              <span
                aria-hidden="true"
                className="font-home-sans flex h-9 w-9 items-center justify-center rounded-home-full bg-home-primary text-[15px] font-semibold text-home-primary-foreground"
              >
                {index + 1}
              </span>
              <h3 className="font-home-sans mt-5 text-lg font-semibold tracking-[-0.01em] text-home-fg">{step.title}</h3>
              <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-secondary">{step.description}</p>
            </HomeCard>
          </motion.div>
        ))}
      </AnimatedSection>
    </ServiceSection>
  );
}
