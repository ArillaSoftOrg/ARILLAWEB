import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { Zap, CheckCircle2, Lightbulb } from 'lucide-react';
import TeklifAlClient from './TeklifAlClient';
import { HomeButton } from '@/components/home/ui/HomeButton';
import '@/lib/home-fonts';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.teklifAl' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/teklif-al`,
      languages: { tr: '/tr/teklif-al', en: '/en/teklif-al', 'x-default': '/tr/teklif-al' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/teklif-al`,
      type: 'website',
    },
  };
}

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

const faqs = [
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
];

const h2Class =
  'font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]';

export default function TeklifAlPage() {
  return (
    <main className="bg-home-bg">
      {/* Hero */}
      <section
        className="bg-home-surface-warm px-5 pb-14 sm:px-6 sm:pb-16 lg:pb-20"
        style={{ paddingTop: 'calc(var(--header-h) + 48px)' }}
      >
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className="font-home-sans text-[40px] font-semibold leading-[44px] tracking-[-0.02em] text-home-fg sm:text-[56px] sm:leading-[60px] sm:tracking-[-0.03em]">
            Projeniz İçin Teklif Alın
          </h1>
          <p className="font-home-sans mx-auto mt-5 max-w-[56ch] text-[17px] leading-[26px] text-home-text-secondary sm:mt-6 sm:text-[18px] sm:leading-[28px]">
            Yazılım geliştirme, web tasarımı veya sektörel yazılım çözümü için ihtiyaçlarınızı bize iletin. Uzman ekibimiz size özel bir teklif hazırlayacak.
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="scroll-mt-24 px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[760px]">
          <div className="rounded-home-xl border border-home-border bg-home-bg p-6 sm:p-10">
            <h2 className="font-home-sans mb-8 text-2xl font-semibold tracking-[-0.01em] text-home-fg">
              Teklif Talep Formu
            </h2>
            <TeklifAlClient />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-home-surface-warm px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
            <h2 className={h2Class}>Neden ArillaSoft?</h2>
            <p className="font-home-sans mt-5 text-[17px] leading-7 text-home-text-secondary">
              Projelerinizi en iyi şekilde yönetebilecek deneyimli ve güvenilir bir partner olarak yanınız.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {trustFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-home-xl border border-home-border bg-home-bg p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-home-md bg-home-primary text-home-primary-foreground">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-home-sans mt-5 text-xl font-semibold tracking-[-0.01em] text-home-fg">
                    {feature.title}
                  </h3>
                  <p className="font-home-sans mt-2 text-[15px] leading-6 text-home-text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[760px]">
          <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-12">
            <h2 className={h2Class}>Sık Sorulan Sorular</h2>
          </div>

          <div className="rounded-home-xl border border-home-border bg-home-bg px-2 sm:px-4">
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-home-border last:border-b-0">
                <summary className="font-home-sans flex cursor-pointer list-none items-center justify-between gap-4 px-2 py-4 text-[15px] font-medium text-home-fg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="text-home-text-muted transition-transform duration-200 group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="font-home-sans px-2 pb-4 text-[15px] leading-6 text-home-text-secondary">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-14 sm:px-6 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1280px] rounded-home-xl bg-home-primary px-6 py-14 text-center sm:px-10 sm:py-16 md:px-16">
          <h2 className="font-home-sans mx-auto max-w-2xl text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-primary-foreground sm:text-[44px] sm:leading-[1.14]">
            Projenizin Fiyatını Öğrenmek İstiyorsanız?
          </h2>
          <p className="font-home-sans mx-auto mt-5 max-w-xl text-[17px] leading-7 text-home-fg/80">
            Yukarıdaki formu doldurarak teklif talebinde bulunabilirsiniz. Hızlıca yanıt vereceğiz.
          </p>
          <div className="mt-8">
            <HomeButton variant="dark" asChild className="px-8 text-base">
              <a href="#form">Forma Dön</a>
            </HomeButton>
          </div>
        </div>
      </section>
    </main>
  );
}
