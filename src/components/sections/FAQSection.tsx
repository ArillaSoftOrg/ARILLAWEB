'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { AnimatedSection } from '@/components/home/ui/AnimatedSection';
import { fadeUp } from '@/components/home/motion';
import '@/lib/home-fonts';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  description?: string;
  faqs: readonly FAQItem[];
  accentColor?: string; // legacy, ignored
  darkMode?: boolean;
  columns?: 1 | 2; // legacy, a single readable column is used
}

/** Home-styled FAQ accordion (same pattern as the homepage FAQ). */
export default function FAQSection({ title, description, faqs, darkMode = true }: FAQSectionProps) {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[760px] px-5 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 lg:mb-12">
          <motion.h2
            variants={fadeUp}
            className={`font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em] ${
              darkMode ? 'text-home-text-inverse' : 'text-home-fg'
            }`}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              variants={fadeUp}
              className={`font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 ${
                darkMode ? 'text-home-text-inverse-secondary' : 'text-home-text-secondary'
              }`}
            >
              {description}
            </motion.p>
          )}
        </AnimatedSection>

        <AnimatedSection>
          <Accordion
            type="single"
            collapsible
            className={`rounded-home-xl border px-2 sm:px-4 ${
              darkMode ? 'border-home-border-dark bg-home-surface-dark-raised' : 'border-home-border bg-home-bg'
            }`}
          >
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className={darkMode ? 'border-home-border-dark' : 'border-home-border'}
              >
                <AccordionTrigger
                  className={`font-home-sans px-2 text-[15px] font-medium sm:px-2 ${
                    darkMode
                      ? 'text-home-text-inverse hover:text-home-text-inverse'
                      : 'text-home-fg hover:text-home-fg'
                  }`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-2 sm:px-2">
                  <p
                    className={`font-home-sans text-[15px] leading-6 ${
                      darkMode ? 'text-home-text-inverse-secondary' : 'text-home-text-secondary'
                    }`}
                  >
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
