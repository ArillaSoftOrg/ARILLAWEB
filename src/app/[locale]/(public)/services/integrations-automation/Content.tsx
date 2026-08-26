'use client';

import { Plug, Workflow, Link2, Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';
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
  SERVICES,
  t,
  serviceHref,
  servicesHubHref,
  industryHref,
  type Locale,
} from '@/lib/en-site-data';

const SERVICE_SLUG = 'integrations-automation' as const;

const COPY = {
  en: {
    servicesBreadcrumb: 'Services',
    h1: 'Integrations and Business Process Automation',
    heroParagraph:
      'If your team is juggling disconnected tools or copying data between systems by hand, we connect them and automate the repetitive work in between.',
    whatWeBuildTitle: 'What we build',
    whatWeBuildDescription: 'Practical integrations and automations that remove manual work from your day-to-day operations.',
    features: [
      {
        title: 'API integrations',
        description:
          'Custom integrations between your CRM, accounting, booking, or e-commerce systems so data flows automatically instead of being re-entered by hand.',
      },
      {
        title: 'Workflow automation',
        description:
          'Automated processes for repetitive tasks — order routing, notifications, approvals, and data syncing — triggered by the events that matter to your business.',
      },
      {
        title: 'Third-party connectors',
        description:
          'Reliable connections to payment providers, marketplaces, messaging platforms, and other external services your business depends on.',
      },
    ],
    ourApproachTitle: 'Our approach',
    ourApproachDescription: 'A focused process for connecting your systems without disrupting how your business already runs.',
    steps: [
      {
        title: 'Audit current workflow',
        description: 'We map out the tools you use today and identify where manual work and data gaps slow you down.',
      },
      {
        title: 'Design integration',
        description: 'We define the data flow, triggers, and error handling needed to connect your systems reliably.',
      },
      {
        title: 'Build & test',
        description: 'We build the integration and test it against real data and edge cases before it touches production.',
      },
      {
        title: 'Launch & monitor',
        description: 'We deploy the integration and monitor it so issues are caught early, not after they cause problems.',
      },
    ],
    relatedIndustriesTitle: 'Related industries',
    relatedServicesTitle: 'Related services',
    ctaTitle: 'Ready to connect your systems?',
    ctaDescription:
      "Tell us which tools you use today and where the manual work is. We'll recommend where automation makes the biggest difference.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Integrations and Business Process Automation',
    learnMore: 'Learn more',
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    h1: 'Entegrasyon ve İş Süreci Otomasyonu',
    heroParagraph:
      'Ekibiniz birbirinden kopuk araçlarla uğraşıyor veya sistemler arasında veriyi elle taşıyorsa, bu sistemleri birbirine bağlıyor ve aradaki tekrar eden işleri otomatikleştiriyoruz.',
    whatWeBuildTitle: 'Neler geliştiriyoruz',
    whatWeBuildDescription: 'Günlük operasyonlarınızdan manuel iş yükünü kaldıran pratik entegrasyonlar ve otomasyonlar.',
    features: [
      {
        title: 'API entegrasyonları',
        description:
          'CRM, muhasebe, randevu veya e-ticaret sistemleriniz arasında özel entegrasyonlar kurarak verinin elle yeniden girilmek yerine otomatik olarak akmasını sağlıyoruz.',
      },
      {
        title: 'İş akışı otomasyonu',
        description:
          'Sipariş yönlendirme, bildirimler, onaylar ve veri senkronizasyonu gibi tekrarlayan görevler için, işletmeniz açısından önemli olan olaylarla tetiklenen otomatik süreçler.',
      },
      {
        title: 'Üçüncü taraf bağlantıları',
        description:
          'Ödeme sağlayıcıları, pazaryerleri, mesajlaşma platformları ve işletmenizin bağımlı olduğu diğer dış servislere güvenilir bağlantılar.',
      },
    ],
    ourApproachTitle: 'Yaklaşımımız',
    ourApproachDescription: 'İşletmenizin mevcut işleyişini aksatmadan sistemlerinizi birbirine bağlamaya odaklanan bir süreç.',
    steps: [
      {
        title: 'Mevcut iş akışını inceleme',
        description: 'Bugün kullandığınız araçları çıkarıyor, manuel işlerin ve veri kopukluklarının sizi nerede yavaşlattığını tespit ediyoruz.',
      },
      {
        title: 'Entegrasyonu tasarlama',
        description: 'Sistemlerinizi güvenilir şekilde bağlamak için gereken veri akışını, tetikleyicileri ve hata yönetimini belirliyoruz.',
      },
      {
        title: 'Geliştirme ve test',
        description: 'Entegrasyonu geliştiriyor, canlıya almadan önce gerçek verilerle ve uç senaryolarla test ediyoruz.',
      },
      {
        title: 'Yayına alma ve izleme',
        description: 'Entegrasyonu yayına alıyor ve sorunları büyümeden fark edebilmek için izliyoruz.',
      },
    ],
    relatedIndustriesTitle: 'İlgili sektörler',
    relatedServicesTitle: 'İlgili hizmetler',
    ctaTitle: 'Sistemlerinizi bağlamaya hazır mısınız?',
    ctaDescription:
      'Bugün hangi araçları kullandığınızı ve manuel işlerin nerede yoğunlaştığını bize anlatın. Otomasyonun en büyük farkı nerede yaratacağını birlikte belirleyelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Entegrasyon ve İş Süreci Otomasyonu',
    learnMore: 'Daha fazla bilgi',
  },
} as const;

export default function IntegrationsAutomationContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta(SERVICE_SLUG);
  const industries = getIndustriesForService(SERVICE_SLUG);
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'custom-software-admin-panels' || item.slug === 'maintenance-technical-support'
  );

  const whatWeBuild = [
    { icon: Plug, title: copy.features[0].title, description: copy.features[0].description },
    { icon: Workflow, title: copy.features[1].title, description: copy.features[1].description },
    { icon: Link2, title: copy.features[2].title, description: copy.features[2].description },
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
              {t(service.title, locale)}
            </span>
            <h1 className="text-role-hero mb-4">{copy.h1}</h1>
            <p className="text-role-body-lg">{copy.heroParagraph}</p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title={copy.whatWeBuildTitle}
        description={copy.whatWeBuildDescription}
        features={whatWeBuild}
        columns={3}
        darkMode={false}
      />

      <HowItWorks
        title={copy.ourApproachTitle}
        description={copy.ourApproachDescription}
        steps={steps}
        darkMode={false}
      />

      {industries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">{copy.relatedIndustriesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={industryHref(locale, industry)}
                  className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                    {t(industry.title, locale)}
                  </h3>
                  <p className="text-role-body text-sm leading-relaxed mb-4">{t(industry.summary, locale)}</p>
                  <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                    {copy.learnMore} <ArrowRight className="h-4 w-4" />
                  </span>
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
