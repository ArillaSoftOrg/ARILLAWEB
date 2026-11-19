import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceCta from '@/components/services/ServiceCta';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceLinkGrid from '@/components/services/ServiceLinkGrid';
import ServicePromo from '@/components/services/ServicePromo';
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
    <main className="bg-home-bg">
      <BreadcrumbJsonLd items={[{ label: copy.breadcrumb, href: `/${locale}${servicesHubHref(locale)}` }]} />
      <ServiceHero
        breadcrumbs={[{ label: copy.breadcrumb }]}
        heading={copy.h1}
        intro={copy.intro}
        primary={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondary={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
      />

      {SERVICE_GROUPS.map((group, index) => (
        <ServiceLinkGrid
          key={group.key}
          title={t(group.label, locale)}
          items={SERVICES.filter((service) => service.group === group.key).map((service) => ({
            key: service.slug,
            href: serviceHref(locale, service),
            title: t(service.title, locale),
            description: t(service.shortDescription, locale),
          }))}
          linkLabel={copy.learnMore}
          columns={3}
          tone={index % 2 === 0 ? 'bg' : 'warm'}
          size="md"
        />
      ))}

      <ServicePromo
        heading={copy.designExamplesTitle}
        body={copy.designExamplesBody}
        label={copy.viewExamples}
        href={designExamplesHref(locale)}
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
