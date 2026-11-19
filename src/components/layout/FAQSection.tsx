'use client';

import ServiceFaq from '@/components/services/ServiceFaq';

interface FaqItem {
  question: string;
  answer: string;
}

/** Page-level FAQ rendered by the public layout; uses the shared home-styled accordion. */
export default function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;

  return <ServiceFaq title="Sık Sorulan Sorular" faqs={faqs} tone="bg" />;
}
