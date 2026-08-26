import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  SERVICE_GROUPS,
  SERVICES,
  designExamplesHref,
  servicesHubHref,
  serviceHref,
  t,
  type Locale,
} from '@/lib/en-site-data';

const COPY = {
  en: {
    eyebrow: 'Services',
    breadcrumb: 'Services',
    h1: 'Software development services for growing businesses',
    intro:
      'From a first website to custom internal tools, we work across the full stack of what a modern business needs — and keep supporting it after launch.',
    learnMore: 'Learn more',
    designExamplesTitle: 'Web Design Examples',
    designExamplesBody: "Browse website concepts and design examples we've created for different industries.",
    viewExamples: 'View examples',
    ctaTitle: 'Not sure which service fits?',
    ctaDescription: "Tell us about your business and what you're trying to solve. We'll recommend a starting point.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
  },
  tr: {
    eyebrow: 'Hizmetler',
    breadcrumb: 'Hizmetler',
    h1: 'Büyüyen işletmeler için yazılım geliştirme hizmetleri',
    intro:
      'İlk web sitenizden özel iç araçlara kadar, modern bir işletmenin ihtiyaç duyduğu her katmanda çalışıyoruz — ve yayına aldıktan sonra da desteklemeye devam ediyoruz.',
    learnMore: 'Detayları incele',
    designExamplesTitle: 'Web Tasarım Örnekleri',
    designExamplesBody: 'Farklı sektörler için hazırladığımız web sitesi konseptlerini ve tasarım örneklerini inceleyin.',
    viewExamples: 'Örnekleri incele',
    ctaTitle: 'Hangi hizmetin size uygun olduğundan emin değil misiniz?',
    ctaDescription: 'İşletmenizi ve çözmek istediğiniz problemi anlatın, size uygun başlangıç noktasını önerelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
  },
} as const;

export default function ServicesHubContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={[{ label: copy.breadcrumb, href: `/${locale}${servicesHubHref(locale)}` }]} />
      <Breadcrumbs items={[{ label: copy.breadcrumb }]} />

      <section className="section-py">
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              {copy.eyebrow}
            </span>
            <h1 className="text-role-hero mb-4">{copy.h1}</h1>
            <p className="text-role-body-lg">{copy.intro}</p>
          </div>
        </div>
      </section>

      {SERVICE_GROUPS.map((group) => {
        const services = SERVICES.filter((service) => service.group === group.key);
        return (
          <section key={group.key} className="section-py" style={{ paddingTop: 0 }}>
            <div className="section-container">
              <h2 className="text-role-section-heading mb-8">{t(group.label, locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={serviceHref(locale, service)}
                    className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                      {t(service.title, locale)}
                    </h3>
                    <p className="text-role-body text-sm leading-relaxed mb-4">{t(service.shortDescription, locale)}</p>
                    <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                      {copy.learnMore} <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <Link
            href={designExamplesHref(locale)}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-6"
          >
            <div>
              <h2 className="text-role-subheading mb-1">{copy.designExamplesTitle}</h2>
              <p className="text-role-body text-sm">{copy.designExamplesBody}</p>
            </div>
            <span className="text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
              {copy.viewExamples} <ArrowRight className="h-4 w-4" />
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
