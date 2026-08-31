import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { Globe, Clock, Lightbulb, Code2, Users, Zap } from 'lucide-react';
import { CorporatePageHero } from '@/components/corporate/CorporatePageHero';
import { EditorialSection } from '@/components/corporate/EditorialSection';
import { CTASection } from '@/components/corporate/CTASection';
import { HomeCard } from '@/components/home/ui/HomeCard';
import { Link } from '@/i18n/navigation';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.kariyer' });
  const isTurkish = locale === 'tr';
  const title = isTurkish ? t('title') : `${t('title')} (Turkish)`;
  const description = isTurkish ? t('description') : `${t('description')} Turkish archive.`;
  return {
    title,
    description,
    // No English body copy exists yet (see redesign plan) — noindex the EN
    // route rather than presenting Turkish content as real English content,
    // matching the pattern already used for the blog's EN routes.
    robots: isTurkish ? undefined : { index: false, follow: true },
    alternates: {
      canonical: '/tr/kurumsal/kariyer',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${isTurkish ? 'tr' : locale}/kurumsal/kariyer`,
      type: 'website',
    },
  };
}

const benefits = [
  { icon: Globe, title: 'Uzaktan Çalışma', description: 'Evinden veya dünyanın herhangi bir yerinden çalış. Coğrafi sınırlama yok.' },
  { icon: Clock, title: 'Esnek Çalışma Saatleri', description: 'Senin en üretken saatlerinde çalış. Saat 09:00 başlamak zorunlu değil.' },
  { icon: Lightbulb, title: 'Öğrenme & Gelişim', description: 'Peşinde olduğun yetkinlikleri geliştir. Kurslar, konferanslar, mentorluk.' },
  { icon: Code2, title: 'Modern Teknolojiler', description: 'Next.js, TypeScript, React, Node.js, AWS. Güncel ve ilginç tech stack.' },
  { icon: Users, title: 'İşbirlikçi Ekip', description: 'Açık iletişim, fikir paylaşımı ve karşılıklı destek. Asla yalnız değilsin.' },
  { icon: Zap, title: 'Hızlı Kariyer Gelişimi', description: 'Başarılar tanınır, sorumluluk artar. Senin büyümen bizim başarımız.' },
];

// Static copy — no job-listing data source exists (no CMS/DB model).
// Pending confirmation these three roles are still open before this section
// is treated as a live job board.
const positions = [
  {
    title: 'Frontend Developer (React/Next.js)',
    level: 'Mid/Senior',
    type: 'Tam Zamanlı',
    description: 'Modern web uygulamalar geliştir. TypeScript, React, Tailwind CSS expertise gereklidir.',
  },
  {
    title: 'Backend Developer (Node.js/Python)',
    level: 'Mid/Senior',
    type: 'Tam Zamanlı',
    description: "Ölçeklenebilir API'ler ve sistem mimarileri tasarla. AWS ve Docker bilgisi olması iyi olur.",
  },
  {
    title: 'Full Stack Developer',
    level: 'Junior/Mid',
    type: 'Tam Zamanlı',
    description: "Frontend'den backend'e, veritabanından deploy'a tüm proje yaşam döngüsünde yer al.",
  },
];

export default function KariyerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Anasayfa', href: '/' }, { label: 'Kariyer' }]} />

      <CorporatePageHero
        eyebrow="Kariyer"
        title="ArillaSoft'ta Kariyer"
        description="Teknoloji odaklı, dinamik bir ekibin parçası olun. Öğrenme, büyüme ve inovasyonun merkezi."
        primaryCta={{ label: 'Başvur', href: '/kurumsal/iletisim' }}
      />

      <EditorialSection
        surface="light"
        heading="ArillaSoft Kültürü"
        description="Biz sadece yazılım geliştirmiyoruz — ekip olarak birlikte öğreniyoruz ve büyüyoruz. Startup hızı ve geniş ölçekli projelerin çeşitliliği ile, her gün yeni teknolojiler keşfetme ve en iyi uygulamaları uygulama fırsatı sunuyoruz."
      />

      <EditorialSection
        surface="canvas"
        heading="Neden ArillaSoft?"
        description="Sadece işler yapan bir yer değil, kariyer hedeflerin için eğitim kurumu."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <HomeCard key={benefit.title} surface="light">
              <div className="flex h-11 w-11 items-center justify-center rounded-home-md bg-home-surface">
                <benefit.icon className="h-5 w-5 text-home-fg" />
              </div>
              <h3 className="font-home-sans mt-4 text-base font-semibold text-home-fg">{benefit.title}</h3>
              <p className="font-home-sans mt-2 text-sm leading-6 text-home-text-secondary">{benefit.description}</p>
            </HomeCard>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        surface="light"
        heading="Açık Pozisyonlar"
        description="Şu anda aşağıdaki pozisyonları dolduruyoruz. Aradığın iş burası olabilir."
      >
        <div className="divide-y divide-home-border rounded-home-lg border border-home-border">
          {positions.map((position) => (
            <div key={position.title} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-7">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-2.5 py-1 text-xs font-medium text-home-fg">
                    {position.level}
                  </span>
                  <span className="font-home-sans rounded-home-full border border-home-border bg-home-surface px-2.5 py-1 text-xs font-medium text-home-fg">
                    {position.type}
                  </span>
                </div>
                <h3 className="font-home-sans text-base font-semibold text-home-fg">{position.title}</h3>
                <p className="font-home-sans mt-1.5 max-w-xl text-sm leading-6 text-home-text-secondary">
                  {position.description}
                </p>
              </div>
              <Link
                href="/kurumsal/iletisim"
                className="font-home-sans shrink-0 whitespace-nowrap text-sm font-medium text-home-fg underline decoration-home-border-strong underline-offset-4 transition hover:decoration-home-fg"
              >
                Başvur
              </Link>
            </div>
          ))}
        </div>
      </EditorialSection>

      <CTASection
        heading="ArillaSoft'ta Kariyer Başlat"
        body="Hiçbir pozisyon listelenmemiş mi? Yine de bize ulaş ve sana uygun olabilecek pozisyonlar hakkında konuşalım."
        primaryCta={{ label: 'Bize Ulaş', href: '/kurumsal/iletisim' }}
      />
    </>
  );
}
