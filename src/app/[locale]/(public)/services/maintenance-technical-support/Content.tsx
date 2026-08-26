'use client';

import { LifeBuoy, RefreshCw, Activity, ArrowRight } from 'lucide-react';
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
    h1: 'Ongoing Maintenance and Technical Support',
    heroParagraph:
      'For businesses that already have software in place — built by us or by someone else — and need it kept up to date, monitored, and supported after launch.',
    whatsIncludedTitle: "What's included",
    whatsIncludedDescription:
      'A support arrangement built around keeping existing software reliable, current, and looked after.',
    features: [
      {
        title: 'Support When Something Breaks',
        description:
          'A clear point of contact and a defined process for reporting issues, so problems get triaged and addressed rather than left waiting.',
      },
      {
        title: 'Regular Updates',
        description:
          'Ongoing maintenance of dependencies, libraries, and platform updates to keep your software secure and compatible over time.',
      },
      {
        title: 'Monitoring',
        description:
          'Keeping an eye on how your application is running so issues can be caught and flagged early, rather than discovered by your users first.',
      },
    ],
    alongsideTitle: 'Works alongside everything we build',
    alongsideBody:
      "Maintenance and support isn't a standalone product — it's an add-on we offer alongside any project, whatever it is.",
    learnMore: 'Learn more',
    ctaTitle: 'Need ongoing support for existing software?',
    ctaDescription:
      "Book a free discovery call and tell us what you have in place today. We'll walk through what an ongoing support arrangement could look like.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Software Maintenance and Technical Support',
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    eyebrow: 'Hizmetler',
    h1: 'Sürekli Bakım ve Teknik Destek',
    heroParagraph:
      'Halihazırda kullanılan bir yazılımı olan — ister bizim ister başka biri tarafından geliştirilmiş olsun — ve bu yazılımın güncel tutulmasını, izlenmesini ve yayına alındıktan sonra desteklenmesini isteyen işletmeler için.',
    whatsIncludedTitle: 'Neler dahil',
    whatsIncludedDescription:
      'Mevcut yazılımınızı güvenilir, güncel ve göz önünde tutmaya yönelik kurgulanmış bir destek anlaşması.',
    features: [
      {
        title: 'Bir Şeyler Bozulduğunda Destek',
        description:
          'Net bir iletişim noktası ve sorunları bildirmek için tanımlı bir süreç sayesinde, problemler beklemek yerine önceliklendirilip ele alınır.',
      },
      {
        title: 'Düzenli Güncellemeler',
        description:
          'Yazılımınızın güvenli ve uyumlu kalması için bağımlılıkların, kütüphanelerin ve platform güncellemelerinin sürekli olarak bakımı.',
      },
      {
        title: 'İzleme',
        description:
          'Uygulamanızın nasıl çalıştığının takip edilmesi, böylece sorunlar kullanıcılarınız fark etmeden önce erken tespit edilip bildirilebilir.',
      },
    ],
    alongsideTitle: 'Geliştirdiğimiz her işin yanında sunulur',
    alongsideBody:
      'Bakım ve destek başlı başına bir ürün değildir — hangi proje olursa olsun yanında sunduğumuz bir ek hizmettir.',
    learnMore: 'Detayları incele',
    ctaTitle: 'Mevcut yazılımınız için sürekli desteğe mi ihtiyacınız var?',
    ctaDescription:
      'Ücretsiz bir keşif görüşmesi ayırtın ve şu anda elinizde neyin bulunduğunu bize anlatın. Sizin için nasıl bir destek anlaşması kurgulanabileceğini birlikte değerlendirelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Yazılım Bakım ve Teknik Destek',
  },
} as const;

export default function MaintenanceTechnicalSupportContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta('maintenance-technical-support');
  const otherServices = SERVICES.filter((item) => item.slug !== 'maintenance-technical-support');

  const featureIcons = [LifeBuoy, RefreshCw, Activity];
  const features = copy.features.map((feature, index) => ({
    icon: featureIcons[index],
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
        title={copy.whatsIncludedTitle}
        description={copy.whatsIncludedDescription}
        features={features}
        columns={3}
        darkMode={false}
      />

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <h2 className="text-role-section-heading mb-8">{copy.alongsideTitle}</h2>
          <p className="text-role-body mb-8 max-w-2xl">{copy.alongsideBody}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={serviceHref(locale, item)}
                className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >
                <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                  {t(item.title, locale)}
                </h3>
                <p className="text-role-body text-sm leading-relaxed mb-4">{t(item.shortDescription, locale)}</p>
                <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                  {copy.learnMore} <ArrowRight className="h-4 w-4" />
                </span>
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
