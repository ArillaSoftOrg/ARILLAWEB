'use client';

import { Smartphone, Layers, Scale, Search, PenTool, Code2, Rocket } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceFaq from '@/components/services/ServiceFaq';
import ServiceFeatureGrid from '@/components/services/ServiceFeatureGrid';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceLinkGrid from '@/components/services/ServiceLinkGrid';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCta from '@/components/services/ServiceCta';
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
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Should I build a native app, a cross-platform app, or just a mobile-friendly website?',
        answer:
          "It depends on what the app needs to do and your budget. We help you decide during discovery — sometimes a mobile-friendly website or web application already covers the need, and a native app isn't the right first investment.",
      },
      {
        question: 'Do you build for both iOS and Android?',
        answer:
          'Yes, either as fully native apps for each platform or as a single cross-platform codebase, depending on what fits your project.',
      },
      {
        question: 'Do you handle app store submission?',
        answer:
          'Yes — app store submission and release is part of our process, along with ongoing updates and technical support after launch.',
      },
    ],
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
    faqHeading: 'Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Native uygulama mı, çoklu platform uygulama mı, yoksa mobil uyumlu bir web sitesi mi geliştirmeliyim?',
        answer:
          'Uygulamanın ne yapması gerektiğine ve bütçenize bağlıdır. Keşif aşamasında birlikte karar veriyoruz — bazen mobil uyumlu bir web sitesi veya web uygulaması ihtiyacı zaten karşılıyor ve native uygulama doğru ilk yatırım olmayabilir.',
      },
      {
        question: 'Hem iOS hem Android için geliştirme yapıyor musunuz?',
        answer:
          'Evet, projenize uygun olarak her platform için tamamen native uygulamalar ya da tek bir çoklu platform kod tabanı şeklinde geliştirebiliriz.',
      },
      {
        question: 'Uygulama mağazasına gönderim işlemini siz mi yapıyorsunuz?',
        answer:
          'Evet — mağaza gönderimi ve yayına alma sürecimizin bir parçasıdır; yayın sonrası güncelleme ve teknik destek de dahildir.',
      },
    ],
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
    <main className="bg-home-bg">
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
      <FAQJsonLd faqs={copy.faqs} />
      <ServiceHero
        breadcrumbs={[
          { label: copy.servicesBreadcrumb, href: servicesHubHref(locale) },
          { label: t(service.title, locale) },
        ]}
        heading={copy.h1}
        intro={copy.heroParagraph}
        primary={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondary={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
      />
      <ServiceFeatureGrid
        title={copy.whatWeBuildTitle}
        description={copy.whatWeBuildDescription}
        features={features}
      />
      <ServiceProcess
        title={copy.ourApproachTitle}
        description={copy.ourApproachDescription}
        steps={steps}
        tone="warm"
      />
      {relatedIndustries.length > 0 && (
        <ServiceLinkGrid
          title={copy.relatedIndustriesTitle}
          items={relatedIndustries.map((industry) => ({ key: industry.slug, href: industryHref(locale, industry), title: t(industry.title, locale), description: t(industry.summary, locale) }))}
          linkLabel={(locale === 'tr' ? 'Detayları incele' : 'Learn more')}
          columns={3}
          tone="bg"
          size="md"
        />
      )}
      {relatedServices.length > 0 && (
        <ServiceLinkGrid
          title={copy.relatedServicesTitle}
          items={relatedServices.map((item) => ({ key: item.slug, href: serviceHref(locale, item), title: t(item.title, locale), description: t(item.shortDescription, locale) }))}
          linkLabel={(locale === 'tr' ? 'Detayları incele' : 'Learn more')}
          columns={2}
          tone="warm"
          size="md"
        />
      )}
      <ServiceFaq title={copy.faqHeading} faqs={copy.faqs} tone="bg" />
      <ServiceCta
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primary={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondary={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
      />
    </main>
  );
}
