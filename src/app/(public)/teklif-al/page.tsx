import type { Metadata } from 'next';
import { Zap, CheckCircle2, Lightbulb } from 'lucide-react';
import TeklifAlClient from './TeklifAlClient';

export const metadata: Metadata = {
  title: 'Teklif Al | ArillaSoft',
  description:
    'Yazılım projeniz veya sektörel yazılım ihtiyacınız için ArillaSoft&apos;tan teklif alın. Hızlı, şeffaf ve ihtiyaca özel çözümler.',
};

const trustFeatures = [
  {
    icon: Zap,
    title: 'Hızlı Dönüş',
    description: '1-2 iş günü içinde size detaylı teklif hazırlarız',
  },
  {
    icon: Lightbulb,
    title: 'İhtiyaca Özel Analiz',
    description: 'İşletmenizin benzersiz ihtiyaçlarına uygun çözümler',
  },
  {
    icon: CheckCircle2,
    title: 'Şeffaf Süreç',
    description: 'Tüm adımlar açık ve anlaşılır şekilde iletişime alınır',
  },
];

export default function TeklifAlPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              ✨ Hızlı Teklif Talep Süreci
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Projeniz İçin Teklif Alın
            </h1>
            <p className="mb-8 text-lg text-slate-600 md:text-xl">
              Yazılım geliştirme, web tasarımı veya sektörel yazılım çözümü için ihtiyaçlarınızı bize iletin. Uzman ekibimiz size özel bir teklif hazırlayacak.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
            <h2 className="mb-8 text-2xl font-semibold text-slate-900">
              Teklif Talep Formu
            </h2>
            <TeklifAlClient />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Neden ArillaSoft?
            </h2>
            <p className="text-lg text-slate-600">
              Projelerinizi en iyi şekilde yönetebilecek deneyimli ve güvenilir bir partner olarak yanınız.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-100 p-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">
              Sık Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Teklifin hazırlanması ne kadar zaman alır?',
                a: 'Temel bilgilerinizi aldıktan sonra 1-2 iş günü içinde size detaylı bir teklif sunuyoruz.',
              },
              {
                q: 'Teklifin kendisi ücretsiz midir?',
                a: 'Evet, tamamen ücretsizdir. Projeleriniz hakkında danışmanlık sunmak bizim için bir zevktir.',
              },
              {
                q: 'Sadece sektörel yazılımlar mı sunuyorsunuz?',
                a: 'Hayır. QR Menü, Randevu Sistemleri gibi sektörel çözümlerin yanı sıra, özel yazılım geliştirme, web ve mobil uygulamaları da sunuyoruz.',
              },
              {
                q: 'Projem çok küçük olsa da teklif alabilir miyim?',
                a: 'Evet! Proje büyüklüğü ne olursa olsun, başvurunuzu memnuniyetle karşılarız.',
              },
              {
                q: 'Teklif aldıktan sonra ne oluyor?',
                a: 'Teklifimizi inceledikten sonra, sorunuz varsa cevaplamak için hazırız. İş yapmaya karar verirseniz, bir sözleşme imzalanır ve proje başlar.',
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-lg border border-slate-200 px-6 py-4 cursor-pointer transition hover:border-blue-200 hover:bg-blue-50/30"
              >
                <summary className="flex items-center justify-between font-medium text-slate-900 transition group-open:text-blue-600">
                  {item.q}
                  <span className="text-xl transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Projenizin Fiyatını Öğrenmek İstiyorsanız?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Yukarıdaki formu doldurarak teklif talebinde bulunabilirsiniz. Hızlıca yanıt vereceğiz.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Forma Dön
          </a>
        </div>
      </section>
    </main>
  );
}
