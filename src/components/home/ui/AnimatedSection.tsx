"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { stagger } from "@/components/home/motion";

// Reduced-motion fallback: opacity-only, no translate/scale/stagger delay,
// so `prefers-reduced-motion` visitors still get a clean initial render
// instead of inheriting each variant's travel distance and timing.
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.16 } },
};

export function AnimatedSection({
  children,
  className = "",
  variants = stagger,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={prefersReducedMotion ? reducedVariants : variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
