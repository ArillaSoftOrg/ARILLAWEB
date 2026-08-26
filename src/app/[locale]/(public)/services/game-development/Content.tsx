'use client';

import { ArrowRight, Gamepad2, Smartphone, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { SERVICES, getServiceMeta, t, serviceHref, servicesHubHref, type Locale } from '@/lib/en-site-data';

const COPY = {
  en: {
    servicesBreadcrumb: 'Services',
    eyebrow: 'Services',
    h1: 'Game Development for Web and Mobile',
    heroParagraph:
      "We build 2D and 3D games, interactive experiences, and gamified features for web and mobile — a newer part of our software practice, offered alongside our core web and app development work.",
    whatWeBuildTitle: 'What we build',
    whatWeBuildDescription:
      'From a self-contained browser game to a gamified feature inside a larger product.',
    features: [
      {
        title: '2D & 3D Game Development',
        description:
          'We build 2D and 3D games using tools and engines suited to the scope of the project, from simple browser games to more involved interactive builds.',
      },
      {
        title: 'Web & Mobile Platforms',
        description:
          'Games and interactive experiences built to run in the browser or as native and cross-platform mobile apps, depending on where your audience is.',
      },
      {
        title: 'Gamification & Interactive Experiences',
        description:
          'Mini-games, quizzes, and gamified features that can be embedded into an existing website or app, or delivered as a standalone promotional experience.',
      },
    ],
    relatedServicesTitle: 'Related services',
    ctaTitle: 'Have a game or interactive project in mind?',
    ctaDescription: "Tell us about what you're trying to build and we'll let you know how we can help.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Game Development',
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    eyebrow: 'Hizmetler',
    h1: 'Web ve Mobil için Oyun Geliştirme',
    heroParagraph:
      'Web ve mobil için 2D/3D oyunlar, etkileşimli deneyimler ve oyunlaştırılmış (gamification) özellikler geliştiriyoruz — yazılım pratiğimizin daha yeni bir alanı olarak, temel web ve uygulama geliştirme çalışmalarımızın yanında sunuyoruz.',
    whatWeBuildTitle: 'Neler geliştiriyoruz',
    whatWeBuildDescription:
      'Bağımsız bir tarayıcı oyunundan, daha büyük bir ürünün içine gömülü oyunlaştırılmış bir özelliğe kadar.',
    features: [
      {
        title: '2D & 3D Oyun Geliştirme',
        description:
          'Projenin kapsamına uygun araç ve motorları kullanarak 2D ve 3D oyunlar geliştiriyoruz; basit tarayıcı oyunlarından daha kapsamlı etkileşimli yapımlara kadar.',
      },
      {
        title: 'Web & Mobil Platformlar',
        description:
          'Hedef kitlenizin bulunduğu yere göre tarayıcıda çalışan ya da native veya çoklu platform mobil uygulama olarak geliştirilen oyunlar ve etkileşimli deneyimler.',
      },
      {
        title: 'Oyunlaştırma & Etkileşimli Deneyimler',
        description:
          'Mevcut bir web sitesine veya uygulamaya gömülebilen, ya da bağımsız bir tanıtım deneyimi olarak sunulabilen mini oyunlar, quizler ve oyunlaştırılmış özellikler.',
      },
    ],
    relatedServicesTitle: 'İlgili hizmetler',
    ctaTitle: 'Aklınızda bir oyun veya etkileşimli proje mi var?',
    ctaDescription: 'Ne inşa etmek istediğinizi anlatın, size nasıl yardımcı olabileceğimizi paylaşalım.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Oyun Geliştirme',
  },
} as const;

export default function GameDevelopmentContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta('game-development');
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'mobile-application' || item.slug === 'website-web-application'
  );

  const icons = [Gamepad2, Smartphone, Sparkles];
  const features = copy.features.map((feature, index) => ({
    icon: icons[index],
    title: feature.title,
    description: feature.description,
  }));

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: copy.servicesBreadcrumb, href: `/${locale}${servicesHubHref(locale)}` },
          { label: t(service.title, locale), href: `/${locale}${serviceHref(locale, service)}` },
        ]}
      />
      <ServiceJsonLd
        name={t(service.title, locale)}
        description={t(service.shortDescription, locale)}
        url={`/${locale}${serviceHref(locale, service)}`}
        serviceType={copy.serviceJsonServiceType}
      />
      <Breadcrumbs
        items={[
          { label: copy.servicesBreadcrumb, href: servicesHubHref(locale) },
          { label: t(service.title, locale) },
        ]}
      />

      <section className="section-py" style={{ paddingBottom: '32px' }}>
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              {copy.eyebrow}
            </span>
            <h1 className="text-role-hero mb-4">{copy.h1}</h1>
            <p className="text-role-body-lg">{copy.heroParagraph}</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title={copy.whatWeBuildTitle}
        description={copy.whatWeBuildDescription}
        features={features}
        columns={3}
        darkMode={false}
      />

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <h2 className="text-role-section-heading mb-8">{copy.relatedServicesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={serviceHref(locale, item)}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                    {t(item.title, locale)}
                  </h3>
                  <p className="text-role-body text-sm">{t(item.shortDescription, locale)}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductCTASection
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryButton={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondaryButton={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
        badgeLabel={copy.ctaBadge}
      />
    </main>
  );
}
