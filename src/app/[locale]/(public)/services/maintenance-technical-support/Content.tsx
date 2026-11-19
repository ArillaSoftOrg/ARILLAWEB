'use client';

import { LifeBuoy, RefreshCw, Activity } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import ServiceFeatureGrid from '@/components/services/ServiceFeatureGrid';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceLinkGrid from '@/components/services/ServiceLinkGrid';
import ServiceCta from '@/components/services/ServiceCta';
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
        title={copy.whatsIncludedTitle}
        description={copy.whatsIncludedDescription}
        features={features}
      />
      <ServiceLinkGrid
        title={copy.alongsideTitle}
        description={copy.alongsideBody}
        items={otherServices.map((item) => ({ key: item.slug, href: serviceHref(locale, item), title: t(item.title, locale), description: t(item.shortDescription, locale) }))}
        linkLabel={copy.learnMore}
        columns={3}
        tone="warm"
        size="md"
      />
      <ServiceCta
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primary={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondary={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
      />
    </main>
  );
}
