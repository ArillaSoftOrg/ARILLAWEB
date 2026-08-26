'use client';

import { Smartphone, Layers, Scale, Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  getServiceMeta,
  getIndustriesForService,
  t,
  serviceHref,
  servicesHubHref,
  industryHref,
  type Locale,
} from '@/lib/en-site-data';

const COPY = {
  en: {
    servicesBreadcrumb: 'Services',
    eyebrow: 'Services',
    h1: 'Native and Cross-Platform Mobile Apps',
    heroParagraph:
      'A dedicated mobile app for your customers or staff, built and supported by a team that also handles the web, backend, and integrations around it.',
    whatWeBuildTitle: 'What we build',
    whatWeBuildDescription:
      'From fully native apps to shared cross-platform codebases, matched to what your business actually needs.',
    features: [
      {
        title: 'Native iOS & Android',
        description:
          'Fully native apps built with platform-specific tools for the best possible performance, look, and feel on each device.',
      },
      {
        title: 'Cross-Platform',
        description:
          'A single codebase that ships to both iOS and Android, reducing development time and cost without compromising on quality.',
      },
      {
        title: 'App vs. Web Application',
        description:
          'We help you decide whether a dedicated app is the right investment, or whether a mobile-friendly website or web application already meets the need.',
      },
    ],
    ourApproachTitle: 'Our approach',
    ourApproachDescription: 'A straightforward process from first conversation to a live app in the store.',
    steps: [
      {
        title: 'Discovery',
        description: 'We review your goals, users, and existing systems to define what the app needs to do.',
      },
      {
        title: 'Design',
        description: 'Wireframes and UI design tailored to your users, reviewed with you before development begins.',
      },
      {
        title: 'Build',
        description: 'Development in short cycles, with working builds you can test throughout the project.',
      },
      {
        title: 'Launch & Support',
        description: 'App store submission, release, and ongoing updates and technical support after launch.',
      },
    ],
    relatedIndustriesTitle: 'Related industries',
    relatedServicesTitle: 'Related services',
    ctaTitle: 'Ready to talk about your mobile app?',
    ctaDescription:
      "Book a free discovery call and we'll walk through whether an app, a web application, or both fits your business.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Mobile Application Development',
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    eyebrow: 'Hizmetler',
    h1: 'Native ve Çoklu Platform Mobil Uygulamalar',
    heroParagraph:
      'Müşterileriniz veya çalışanlarınız için, web, backend ve entegrasyonlarınızı da yöneten aynı ekip tarafından geliştirilen ve desteklenen özel bir mobil uygulama.',
    whatWeBuildTitle: 'Neler geliştiriyoruz',
    whatWeBuildDescription:
      'Tamamen native uygulamalardan paylaşımlı çoklu platform kod tabanlarına kadar, işletmenizin gerçek ihtiyacına uygun çözümler.',
    features: [
      {
        title: 'Native iOS & Android',
        description:
          'Her cihazda mümkün olan en iyi performansı, görünümü ve deneyimi sunmak için platforma özel araçlarla geliştirilen tamamen native uygulamalar.',
      },
      {
        title: 'Çoklu Platform',
        description:
          'Hem iOS hem Android’e yayınlanan tek bir kod tabanı; kaliteden ödün vermeden geliştirme süresini ve maliyetini azaltır.',
      },
      {
        title: 'Uygulama mı, Web Uygulaması mı?',
        description:
          'Özel bir mobil uygulamanın doğru yatırım olup olmadığına, ya da mobil uyumlu bir web sitesi veya web uygulamasının ihtiyacınızı zaten karşılayıp karşılamadığına karar vermenize yardımcı oluyoruz.',
      },
    ],
    ourApproachTitle: 'Yaklaşımımız',
    ourApproachDescription: 'İlk görüşmeden mağazada yayınlanan bir uygulamaya uzanan net bir süreç.',
    steps: [
      {
        title: 'Keşif',
        description: 'Uygulamanın ne yapması gerektiğini tanımlamak için hedeflerinizi, kullanıcılarınızı ve mevcut sistemlerinizi inceliyoruz.',
      },
      {
        title: 'Tasarım',
        description: 'Kullanıcılarınıza uygun wireframe ve arayüz tasarımı; geliştirme başlamadan önce sizinle birlikte gözden geçirilir.',
      },
      {
        title: 'Geliştirme',
        description: 'Proje boyunca test edebileceğiniz çalışan sürümlerle, kısa döngüler halinde geliştirme.',
      },
      {
        title: 'Yayın & Destek',
        description: 'Uygulama mağazasına gönderim, yayına alma ve yayın sonrası sürekli güncelleme ve teknik destek.',
      },
    ],
    relatedIndustriesTitle: 'İlgili sektörler',
    relatedServicesTitle: 'İlgili hizmetler',
    ctaTitle: 'Mobil uygulamanız hakkında konuşmaya hazır mısınız?',
    ctaDescription:
      'Ücretsiz bir keşif görüşmesi planlayın; bir uygulamanın mı, bir web uygulamasının mı, yoksa her ikisinin mi işletmenize uygun olduğunu birlikte değerlendirelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Mobil Uygulama Geliştirme',
  },
} as const;

export default function MobileApplicationContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta('mobile-application');
  const relatedIndustries = getIndustriesForService('mobile-application');
  const relatedServices = [getServiceMeta('website-web-application'), getServiceMeta('integrations-automation')];

  const features = [
    { icon: Smartphone, title: copy.features[0].title, description: copy.features[0].description },
    { icon: Layers, title: copy.features[1].title, description: copy.features[1].description },
    { icon: Scale, title: copy.features[2].title, description: copy.features[2].description },
  ];

  const steps = [
    { number: 1, title: copy.steps[0].title, description: copy.steps[0].description, icon: Search },
    { number: 2, title: copy.steps[1].title, description: copy.steps[1].description, icon: PenTool },
    { number: 3, title: copy.steps[2].title, description: copy.steps[2].description, icon: Code2 },
    { number: 4, title: copy.steps[3].title, description: copy.steps[3].description, icon: Rocket },
  ];

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

      <HowItWorks
        title={copy.ourApproachTitle}
        description={copy.ourApproachDescription}
        steps={steps}
        darkMode={false}
      />

      {relatedIndustries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">{copy.relatedIndustriesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={industryHref(locale, industry)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                      {t(industry.title, locale)}
                    </h3>
                    <p className="text-role-body text-sm">{t(industry.summary, locale)}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
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
      )}

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
