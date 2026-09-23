import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import FAQSection from '@/components/sections/FAQSection';
import ProductCTASection from '@/components/sections/ProductCTASection';
import SiteExampleCard, { type CatalogCardProject } from '@/components/site-examples/SiteExampleCard';
import { Link } from '@/i18n/navigation';
import {
  INDUSTRIES,
  designExamplesHref,
  industriesHubHref,
  industryHref,
  serviceHref,
  t,
  type IndustryMeta,
  type Locale,
  type ServiceMeta,
} from '@/lib/en-site-data';
import SolutionsFeatureGrid from './SolutionsFeatureGrid';

const COPY = {
  en: {
    eyebrow: 'Sectoral Software',
    breadcrumbHub: 'Sectoral Software',
    h1: (title: string) => `Software for ${title} Businesses`,
    serviceJsonName: (title: string) => `Software for ${title}`,
    serviceType: 'Sectoral Software',
    relatedServices: 'Related services',
    relatedIndustries: 'Related industries',
    learnMore: 'Learn more',
    designExamplesFor: (title: string) => `Design examples for ${title}`,
    viewAllDesignExamples: 'View all design examples',
    faqHeading: 'Frequently Asked Questions',
    ctaTitle: (title: string) => `Ready to talk about software for your ${title.toLowerCase()} business?`,
    ctaDescription: "Book a free discovery call and we'll walk through what fits your business.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
  },
  tr: {
    eyebrow: 'Sektörel Yazılımlar',
    breadcrumbHub: 'Sektörel Yazılımlar',
    h1: (title: string) => `${title} İşletmeleri İçin Yazılım`,
    serviceJsonName: (title: string) => `${title} İçin Yazılım`,
    serviceType: 'Sektörel Yazılım',
    relatedServices: 'İlgili hizmetler',
    relatedIndustries: 'İlgili sektörler',
    learnMore: 'Detayları incele',
    designExamplesFor: (title: string) => `${title} için tasarım örnekleri`,
    viewAllDesignExamples: 'Tüm tasarım örneklerini gör',
    faqHeading: 'Sıkça Sorulan Sorular',
    ctaTitle: (title: string) => `${title.toLocaleLowerCase('tr-TR')} işletmeniz için yazılımı konuşmaya hazır mısınız?`,
    ctaDescription: 'Ücretsiz bir keşif görüşmesi ayarlayalım, işletmenize neyin uygun olduğunu birlikte belirleyelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
  },
} as const;

export default function IndustryContent({
  locale,
  industry,
  relatedServices,
  exampleProjects,
}: {
  locale: Locale;
  industry: IndustryMeta;
  relatedServices: ServiceMeta[];
  exampleProjects: CatalogCardProject[];
}) {
  const copy = COPY[locale];
  const title = t(industry.title, locale);
  const summary = t(industry.summary, locale);
  const relatedIndustries = INDUSTRIES.filter(
    (other) => other.group === industry.group && other.slug !== industry.slug
  );
  const faqForJsonLd = (industry.faq ?? []).map((item) => ({
    question: t(item.question, locale),
    answer: t(item.answer, locale),
  }));

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: copy.breadcrumbHub, href: `/${locale}${industriesHubHref(locale)}` },
          { label: title, href: `/${locale}${industryHref(locale, industry)}` },
        ]}
      />
      <ServiceJsonLd
        name={copy.serviceJsonName(title)}
        description={summary}
        url={`/${locale}${industryHref(locale, industry)}`}
        serviceType={copy.serviceType}
      />
      {faqForJsonLd.length > 0 && <FAQJsonLd faqs={faqForJsonLd} />}
      <Breadcrumbs
        items={[
          { label: copy.breadcrumbHub, href: industriesHubHref(locale) },
          { label: title },
        ]}
      />

      <section className="section-py" style={{ paddingBottom: '32px' }}>
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              {copy.eyebrow}
            </span>
            <h1 className="text-role-hero mb-4">{copy.h1(title)}</h1>
            <p className="text-role-body-lg">{summary}</p>
          </div>
        </div>
      </section>

      <SolutionsFeatureGrid locale={locale} solutions={industry.applicableSolutions} />

      {relatedServices.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">{copy.relatedServices}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={serviceHref(locale, service)}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                      {t(service.title, locale)}
                    </h3>
                    <p className="text-role-body text-sm">{t(service.shortDescription, locale)}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {locale === 'tr' && industry.dedicatedAppointmentPageHref && (
        <section className="section-py" style={{ paddingTop: 0, paddingBottom: relatedServices.length > 0 ? undefined : 0 }}>
          <div className="section-container">
            <Link
              href={industry.dedicatedAppointmentPageHref}
              className="group flex items-center justify-between rounded-2xl border border-violet-200 bg-violet-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <h3 className="text-role-subheading mb-1 text-violet-700">
                  {title} için özel randevu sistemini inceleyin
                </h3>
                <p className="text-role-body text-sm">
                  Bu sektöre özel geliştirilmiş randevu sistemi sayfamızda özellikleri detaylıca görün.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </Link>
          </div>
        </section>
      )}

      {relatedIndustries.length > 0 && (
        <section className="section-py bg-slate-50" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">{copy.relatedIndustries}</h2>
            <div className="flex flex-wrap gap-3">
              {relatedIndustries.map((other) => (
                <Link
                  key={other.slug}
                  href={industryHref(locale, other)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-violet-300 hover:text-violet-700"
                >
                  {t(other.title, locale)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {industry.faq && industry.faq.length > 0 && (
        <FAQSection
          title={copy.faqHeading}
          faqs={industry.faq.map((item) => ({ question: t(item.question, locale), answer: t(item.answer, locale) }))}
          darkMode={false}
          columns={1}
        />
      )}

      {exampleProjects.length > 0 && (
        <section className="section-py bg-slate-50" style={{ paddingTop: relatedServices.length > 0 ? undefined : 0 }}>
          <div className="section-container">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="text-role-section-heading">{copy.designExamplesFor(title)}</h2>
              <Link href={designExamplesHref(locale)} className="text-role-navigation text-violet-600 inline-flex items-center gap-1">
                {copy.viewAllDesignExamples} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {exampleProjects.map((project) => (
                <SiteExampleCard key={project.id} project={project} linkLocale={locale === 'en' ? 'tr' : undefined} />
              ))}
            </div>
          </div>
        </section>
      )}

      {locale === 'tr' && (
        <div className="section-container" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          <Link href="/yazilim-firmasi" className="text-role-navigation text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-violet-600">
            ArillaSoft hakkında ve diğer hizmetlerimiz →
          </Link>
        </div>
      )}

      <ProductCTASection
        title={copy.ctaTitle(title)}
        description={copy.ctaDescription}
        primaryButton={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondaryButton={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
        badgeLabel={copy.ctaBadge}
      />
    </main>
  );
}
