"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <section
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(124,58,237,0.2)',
      }}
      className="py-16 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Sık Sorulan Sorular
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hizmetlerimiz hakkında merak ettiklerinize yanıt bulun
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-700 rounded-lg overflow-hidden hover:border-violet-500/30 transition-colors duration-200"
            >
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-900/50 transition-colors duration-200"
              >
                <span className="font-semibold text-slate-100">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-violet-400 flex-shrink-0 transition-transform duration-300 ${
                    expanded === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expanded === index && (
                <div className="px-6 py-4 bg-slate-900/30 border-t border-slate-700 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
