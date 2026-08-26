'use client';

import { Globe, LayoutDashboard, Users2, ArrowRight, Compass, PenTool, Code2, Rocket } from 'lucide-react';
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
  designExamplesHref,
  type Locale,
} from '@/lib/en-site-data';

const SERVICE_SLUG = 'website-web-application' as const;

const COPY = {
  en: {
    servicesBreadcrumb: 'Services',
    h1: 'Websites and Web Applications Built for Your Business',
    heroParagraph:
      'Whether you need a marketing site, a customer-facing web application, or an internal portal, we design and build it to work the way your business actually operates.',
    whatWeBuildTitle: 'What we build',
    whatWeBuildDescription: 'Three common starting points — and we can combine them as your needs grow.',
    features: [
      {
        title: 'Marketing websites',
        description:
          'Fast, well-structured websites that present your business clearly and are built to rank and convert.',
      },
      {
        title: 'Web applications',
        description:
          'Customer-facing tools such as booking flows, dashboards, and self-service portals built on a solid, maintainable stack.',
      },
      {
        title: 'Internal portals',
        description:
          'Internal tools your team uses daily to manage operations, data, and workflows without relying on spreadsheets.',
      },
    ],
    ourApproachTitle: 'Our approach',
    ourApproachDescription: 'A straightforward process from first conversation to a live, supported product.',
    steps: [
      {
        title: 'Discovery',
        description: 'We review your business, goals, and existing systems to define the right scope.',
      },
      {
        title: 'Design',
        description: 'Structure and interface design focused on clarity, usability, and your brand.',
      },
      {
        title: 'Build',
        description: 'Development in iterations, with regular check-ins so nothing is a surprise at the end.',
      },
      {
        title: 'Launch & support',
        description: 'We deploy, monitor, and stay available for updates and fixes after launch.',
      },
    ],
    relatedIndustriesTitle: 'Related industries',
    relatedServicesTitle: 'Related services',
    learnMore: 'Learn more',
    designExamplesEyebrow: 'Web Design Examples',
    designExamplesHeading: 'See What a Website Built by Us Looks Like',
    designExamplesBody:
      'Browse website concepts and design examples across industries to get a feel for our design quality before you start a project.',
    viewExamples: 'View examples',
    ctaTitle: 'Ready to build your website or web application?',
    ctaDescription: "Tell us about your business and what you need. We'll recommend the right approach and scope.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Website & Web Application Development',
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    h1: 'İşletmeniz İçin İnşa Edilen Web Siteleri ve Web Uygulamaları',
    heroParagraph:
      'İster kurumsal bir web sitesine, ister müşterilerinize yönelik bir web uygulamasına, ister bir iç portala ihtiyacınız olsun; bunu işletmenizin gerçekte nasıl çalıştığına uygun şekilde tasarlıyor ve geliştiriyoruz.',
    whatWeBuildTitle: 'Neler inşa ediyoruz',
    whatWeBuildDescription: 'Üç yaygın başlangıç noktası — ihtiyaçlarınız büyüdükçe bunları birleştirebiliriz.',
    features: [
      {
        title: 'Kurumsal web siteleri',
        description:
          'İşletmenizi net bir şekilde tanıtan, sıralamada üst sıralarda yer almak ve dönüşüm sağlamak için kurgulanmış hızlı ve iyi yapılandırılmış web siteleri.',
      },
      {
        title: 'Web uygulamaları',
        description:
          'Randevu akışları, panolar ve self-servis portallar gibi sağlam ve sürdürülebilir bir teknoloji altyapısı üzerine inşa edilen, müşterilerinize yönelik araçlar.',
      },
      {
        title: 'İç portallar',
        description:
          'Ekibinizin operasyonları, verileri ve iş akışlarını Excel tablolarına bağımlı kalmadan yönetmek için her gün kullandığı iç araçlar.',
      },
    ],
    ourApproachTitle: 'Yaklaşımımız',
    ourApproachDescription: 'İlk görüşmeden canlı ve desteklenen bir ürüne uzanan net bir süreç.',
    steps: [
      {
        title: 'Keşif',
        description: 'Doğru kapsamı belirlemek için işletmenizi, hedeflerinizi ve mevcut sistemlerinizi inceliyoruz.',
      },
      {
        title: 'Tasarım',
        description: 'Netlik, kullanılabilirlik ve markanıza odaklanan yapı ve arayüz tasarımı.',
      },
      {
        title: 'Geliştirme',
        description: 'Sonda sürpriz yaşamamak için düzenli geri bildirimlerle iteratif geliştirme süreci.',
      },
      {
        title: 'Yayına alma & destek',
        description: 'Projeyi yayına alıyor, izliyor ve sonrasında güncelleme ile düzeltmeler için yanınızda oluyoruz.',
      },
    ],
    relatedIndustriesTitle: 'İlgili sektörler',
    relatedServicesTitle: 'İlgili hizmetler',
    learnMore: 'Detayları incele',
    designExamplesEyebrow: 'Web Tasarım Örnekleri',
    designExamplesHeading: 'Bizim Tasarladığımız Bir Web Sitesi Nasıl Görünür?',
    designExamplesBody:
      'Bir projeye başlamadan önce tasarım kalitemizi görmek için farklı sektörlerden web sitesi konseptlerine ve tasarım örneklerine göz atın.',
    viewExamples: 'Örnekleri görüntüle',
    ctaTitle: 'Web sitenizi veya web uygulamanızı hayata geçirmeye hazır mısınız?',
    ctaDescription: 'İşletmenizi ve ihtiyaçlarınızı bize anlatın. Size doğru yaklaşımı ve kapsamı önerelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Web Sitesi ve Web Uygulama Geliştirme',
  },
} as const;

export default function WebsiteWebApplicationContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta(SERVICE_SLUG);
  const industries = getIndustriesForService(SERVICE_SLUG);
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'mobile-application' || item.slug === 'custom-software-admin-panels'
  );

  const whatWeBuild = [
    { icon: Globe, title: copy.features[0].title, description: copy.features[0].description },
    { icon: LayoutDashboard, title: copy.features[1].title, description: copy.features[1].description },
    { icon: Users2, title: copy.features[2].title, description: copy.features[2].description },
  ];

  const steps = [
    { number: 1, title: copy.steps[0].title, description: copy.steps[0].description, icon: Compass },
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

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <Link
            href={designExamplesHref(locale)}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="max-w-xl">
              <span className="text-role-eyebrow inline-block bg-white px-3 py-1 rounded-full mb-3 text-violet-600">
                {copy.designExamplesEyebrow}
              </span>
              <h2 className="text-role-section-heading mb-2">{copy.designExamplesHeading}</h2>
              <p className="text-role-body">{copy.designExamplesBody}</p>
            </div>
            <span className="text-role-navigation inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-3 transition-all whitespace-nowrap">
              {copy.viewExamples} <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
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
