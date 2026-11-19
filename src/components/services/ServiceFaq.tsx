"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { fadeUp } from "@/components/home/motion";
import "@/lib/home-fonts";

type FaqItem = { question: string; answer: string };

export default function ServiceFaq({
  title,
  faqs,
  tone = "bg",
}: {
  title: string;
  faqs: readonly FaqItem[];
  tone?: "bg" | "warm";
}) {
  return (
    <section className={`${tone === "warm" ? "bg-home-surface-warm" : "bg-home-bg"} py-14 sm:py-16 lg:py-20`}>
      <div className="mx-auto max-w-[760px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]"
          >
            {title}
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection>
          <Accordion type="single" collapsible className="rounded-home-xl border border-home-border bg-home-bg px-2 sm:px-4">
            {faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-home-border">
                <AccordionTrigger className="font-home-sans px-2 text-[15px] font-medium text-home-fg hover:text-home-fg sm:px-2">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-2 sm:px-2">
                  <p className="font-home-sans text-[15px] leading-6 text-home-text-secondary">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
