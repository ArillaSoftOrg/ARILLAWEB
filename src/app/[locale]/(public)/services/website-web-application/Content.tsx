'use client';

import { Globe, LayoutDashboard, Users2, Compass, PenTool, Code2, Rocket } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import ServiceFaq from '@/components/services/ServiceFaq';
import ServiceFeatureGrid from '@/components/services/ServiceFeatureGrid';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceLinkGrid from '@/components/services/ServiceLinkGrid';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServicePromo from '@/components/services/ServicePromo';
import ServiceCta from '@/components/services/ServiceCta';
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
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'Do you use a website builder (WordPress, Wix, etc.) or is this custom-built?',
        answer:
          "It's custom-built rather than a template-based builder — the site is designed and developed around your business's actual structure and content, not adapted from a generic theme.",
      },
      {
        question: 'How long does a website or web application take?',
        answer:
          "It depends on scope — a marketing website and a full web application with a management panel take different amounts of time. We give you a clear timeline once the scope is defined.",
      },
      {
        question: "What's the difference between a website and a web application?",
        answer:
          'A website presents your business and content to visitors. A web application adds interactive functionality — logins, dashboards, booking flows, data management — for a specific task your business needs done online.',
      },
      {
        question: 'Do you provide support after launch?',
        answer:
          'Yes — post-launch maintenance and technical support is one of our services, so you have somewhere to go for updates and fixes after the site is live.',
      },
    ],
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
    faqHeading: 'Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Hazır bir site oluşturucu (WordPress, Wix vb.) mi kullanıyorsunuz, yoksa özel mi geliştiriyorsunuz?',
        answer:
          'Özel olarak geliştiriyoruz — site, genel bir temadan uyarlanmak yerine işletmenizin gerçek yapısına ve içeriğine göre tasarlanır ve kodlanır.',
      },
      {
        question: 'Bir web sitesi veya web uygulaması ne kadar sürede tamamlanır?',
        answer:
          'Kapsama bağlıdır — bir kurumsal web sitesi ile yönetim paneli içeren uçtan uca bir web uygulaması farklı sürelerde tamamlanır. Kapsamı netleştirdikten sonra net bir zaman çizelgesi paylaşıyoruz.',
      },
      {
        question: 'Web sitesi ile web uygulaması arasındaki fark nedir?',
        answer:
          'Web sitesi, işletmenizi ve içeriğinizi ziyaretçilere sunar. Web uygulaması ise giriş sistemi, panel, randevu akışı veya veri yönetimi gibi işletmenizin çevrimiçi yapmasını istediğiniz belirli bir işlevi ekler.',
      },
      {
        question: 'Yayına aldıktan sonra destek sağlıyor musunuz?',
        answer:
          'Evet — yayın sonrası bakım ve teknik destek hizmetlerimizden biridir; sitenizin yayına alınmasından sonra güncelleme ve düzeltmeler için yanınızda oluyoruz.',
      },
    ],
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
        features={whatWeBuild}
      />
      <ServiceProcess
        title={copy.ourApproachTitle}
        description={copy.ourApproachDescription}
        steps={steps}
        tone="warm"
      />
      {industries.length > 0 && (
        <ServiceLinkGrid
          title={copy.relatedIndustriesTitle}
          items={industries.map((industry) => ({ key: industry.slug, href: industryHref(locale, industry), title: t(industry.title, locale), description: t(industry.summary, locale) }))}
          linkLabel={copy.learnMore}
          columns={3}
          tone="bg"
          size="md"
        />
      )}
      {relatedServices.length > 0 && (
        <ServiceLinkGrid
          title={copy.relatedServicesTitle}
          items={relatedServices.map((item) => ({ key: item.slug, href: serviceHref(locale, item), title: t(item.title, locale), description: t(item.shortDescription, locale) }))}
          linkLabel={copy.learnMore}
          columns={2}
          tone="warm"
          size="md"
        />
      )}
      <ServicePromo
        heading={copy.designExamplesHeading}
        body={copy.designExamplesBody}
        label={copy.viewExamples}
        href={designExamplesHref(locale)}
      />
      <ServiceFaq title={copy.faqHeading} faqs={copy.faqs} tone="warm" />
      <ServiceCta
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primary={{ label: copy.ctaPrimary, href: '/teklif-al' }}
        secondary={{ label: copy.ctaSecondary, href: '/kurumsal/iletisim' }}
      />
    </main>
  );
}
