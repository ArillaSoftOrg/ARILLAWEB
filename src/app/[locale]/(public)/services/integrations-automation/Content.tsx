'use client';

import { Plug, Workflow, Link2, Search, PenTool, Code2, Rocket } from 'lucide-react';
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
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'What kind of systems can you integrate?',
        answer:
          'It depends on the tools you use and whether they expose an API. Common examples are CRM, accounting, appointment, and e-commerce systems, plus third-party services like payment providers or messaging platforms — each integration is scoped individually.',
      },
      {
        question: "We don't have a specific tool to integrate — can automation still help?",
        answer:
          'Yes. A lot of automation work is about removing repetitive manual steps within your own systems — notifications, approvals, data syncing — not just connecting to outside tools.',
      },
      {
        question: 'How do you make sure an integration keeps working reliably?',
        answer:
          "We design for error handling and test with real data and edge cases before launch, then monitor the integration after it's live so issues get caught early rather than silently failing.",
      },
    ],
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
    faqHeading: 'Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Hangi sistemleri entegre edebiliyorsunuz?',
        answer:
          'Kullandığınız araçlara ve API desteği sunup sunmadığına bağlıdır. CRM, muhasebe, randevu ve e-ticaret sistemleri ile ödeme sağlayıcıları veya mesajlaşma platformları gibi üçüncü taraf servisler yaygın örneklerdir — her entegrasyon ayrı olarak kapsamlandırılır.',
      },
      {
        question: 'Entegre edecek belirli bir aracımız yok — otomasyon yine de işe yarar mı?',
        answer:
          'Evet. Otomasyon çalışmalarının büyük bir kısmı dış araçlara bağlanmaktan çok, kendi sistemleriniz içindeki tekrarlayan manuel adımları (bildirimler, onaylar, veri senkronizasyonu) ortadan kaldırmakla ilgilidir.',
      },
      {
        question: 'Bir entegrasyonun güvenilir çalışmaya devam etmesini nasıl sağlıyorsunuz?',
        answer:
          'Hata yönetimini baştan tasarlıyor, yayına almadan önce gerçek verilerle ve uç senaryolarla test ediyoruz; yayına aldıktan sonra da sorunların fark edilmeden büyümemesi için izlemeye devam ediyoruz.',
      },
    ],
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
