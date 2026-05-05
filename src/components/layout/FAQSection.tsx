"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQs = [
  {
    question: 'Hizmetleriniz hangi sektörlere uygun?',
    answer: 'QR Menü sistemi restoranlar, kafeler ve catering hizmetlerine; Randevu sistemi güzellik merkezleri, klinikler ve kuaförlere; Web ve mobil uygulamalar ise tüm sektörlere uygun çözümler sunmaktadır.',
  },
  {
    question: 'Kaç yıllık deneyime sahibsiniz?',
    answer: 'Arilla Soft, yazılım geliştirme ve dijital çözümlerde geniş deneyime sahip bir ekiple hizmet sunmaktadır. Onlarca işletmeyi başarılı bir şekilde dijitalleştirmişiz.',
  },
  {
    question: 'Destek ve bakım hizmetleri nelerdir?',
    answer: 'Yazılım tesliminden sonra sürükli teknik destek, sistem güncellemeleri, güvenlik yama ve periyodik bakım hizmetleri sunmaktayız.',
  },
  {
    question: 'Özel ihtiyaçlar için nasıl çözüm geliştirirsiniz?',
    answer: 'Müşterilerimizin özel ihtiyaçlarını anladıktan sonra, uzman ekibimiz tamamen özelleştirilmiş çözümler geliştirir ve uygulamaya sokar.',
  },
  {
    question: 'Proje başlangıcında danışmanlık hizmetleri sunuyor musunuz?',
    answer: 'Evet, projelerinizin başlangıcında stratejik danışmanlık sunarak, en uygun çözümü belirlenmesinde yardımcı oluyoruz.',
  },
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <section
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(124,58,237,0.2)',
      }}
      className="py-16 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Sık Sorulan Sorular
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Hizmetlerimiz hakkında merak ettiklerinize yanıt bulun
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-700 rounded-lg overflow-hidden hover:border-violet-500/30 transition-colors duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
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

              {/* Answer */}
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
