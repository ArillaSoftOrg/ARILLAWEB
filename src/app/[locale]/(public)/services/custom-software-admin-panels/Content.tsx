'use client';

import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  UsersRound,
  Search,
  PenTool,
  Code2,
  Rocket,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';
import FAQSection from '@/components/sections/FAQSection';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  getIndustriesForService,
  getServiceMeta,
  SERVICES,
  t,
  serviceHref,
  servicesHubHref,
  industryHref,
  type Locale,
} from '@/lib/en-site-data';

const SLUG = 'custom-software-admin-panels' as const;

const COPY = {
  en: {
    servicesBreadcrumb: 'Services',
    eyebrow: 'Custom Software & Admin Panels',
    h1: 'Custom Software and Admin Panels for Your Operations',
    heroParagraph:
      "When off-the-shelf tools stop fitting the way your business works, we design and build software that does — from internal tools to full management dashboards.",
    whatWeBuildTitle: 'What we build',
    whatWeBuildDescription: "Software shaped around your team's actual workflows, not a generic template.",
    features: [
      {
        title: 'Bespoke Back-Office Tools',
        description:
          "Purpose-built applications for the operational work that generic software doesn't handle well — order tracking, scheduling, inventory, reporting, and more.",
      },
      {
        title: 'Admin & Management Dashboards',
        description:
          'Centralized dashboards that give owners and managers real-time visibility into operations, staff activity, and business performance.',
      },
      {
        title: 'Role-Based Staff Access',
        description:
          'Access control that matches your organization structure, so each staff member sees and edits only what their role requires.',
      },
    ],
    ourApproachTitle: 'Our approach',
    ourApproachDescription: 'A straightforward process from first conversation to ongoing support.',
    steps: [
      {
        title: 'Discovery',
        description: 'We learn how your team works today and identify where custom software adds the most value.',
      },
      {
        title: 'Design',
        description: 'We map out workflows, roles, and screens before writing a line of code.',
      },
      {
        title: 'Build',
        description: 'We develop the application in stages, with regular check-ins so you can review progress.',
      },
      {
        title: 'Launch & Support',
        description: 'We deploy the software, train your team, and stay on for ongoing updates and support.',
      },
    ],
    industriesTitle: 'Industries we build this for',
    relatedServicesTitle: 'Related services',
    learnMore: 'Learn more',
    ctaTitle: "Have a workflow that doesn't fit off-the-shelf software?",
    ctaDescription: "Tell us how your team works today. We'll help you scope a custom tool that fits.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
    serviceJsonServiceType: 'Custom Software Development',
    faqHeading: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'How is custom software different from off-the-shelf software?',
        answer:
          'Off-the-shelf software is built for a general business model and often has screens you don\'t need and gaps for what you do need. Custom software is built around your actual workflow — you work with the screens you actually use, and it grows with your business.',
      },
      {
        question: 'How long does a custom software project take?',
        answer:
          'It depends entirely on scope — a single admin panel and a multi-role management system with several workflows take different amounts of time. We give you a concrete timeline after scoping the project.',
      },
      {
        question: 'Can the system integrate with tools we already use?',
        answer:
          'Often, yes — this is part of what our integrations and automation service covers. Specific integrations depend on the tool and its API, and are scoped as part of the project.',
      },
      {
        question: 'What happens after the software is live?',
        answer:
          'We provide post-launch maintenance and technical support, so there\'s a clear path for updates, fixes, and changes as your business evolves.',
      },
      {
        question: 'Do you build SaaS products, or just internal tools?',
        answer:
          "Both fall under custom software development. If you're building a product you plan to run as a subscription-based system with multiple customer accounts and role-based access, that's the same underlying architecture — multi-role panels, permission-based access, and a maintainable backend — as the internal tools and management panels we build. Scope, roles, and subscription/billing logic are defined together during discovery.",
      },
    ],
  },
  tr: {
    servicesBreadcrumb: 'Hizmetler',
    eyebrow: 'Özel Yazılım & Yönetim Panelleri',
    h1: 'Operasyonlarınız İçin Özel Yazılım ve Yönetim Panelleri',
    heroParagraph:
      'Hazır çözümler işletmenizin çalışma biçimine artık uymadığında, ihtiyacınıza tam oturan yazılımı biz tasarlar ve geliştiririz — dahili araçlardan uçtan uca yönetim panellerine kadar.',
    whatWeBuildTitle: 'Neler geliştiriyoruz',
    whatWeBuildDescription: 'Ekibinizin gerçek iş akışlarına göre şekillenen yazılımlar, hazır şablonlar değil.',
    features: [
      {
        title: 'Özel Arka Ofis Araçları',
        description:
          'Hazır yazılımların yeterince karşılamadığı operasyonel işler için özel olarak geliştirilen uygulamalar — sipariş takibi, planlama, stok yönetimi, raporlama ve daha fazlası.',
      },
      {
        title: 'Yönetim ve Kontrol Panelleri',
        description:
          'İşletme sahiplerine ve yöneticilere operasyonlar, personel aktiviteleri ve iş performansı hakkında gerçek zamanlı görünürlük sağlayan merkezi paneller.',
      },
      {
        title: 'Role Dayalı Personel Erişimi',
        description:
          'Organizasyon yapınıza uygun yetkilendirme; her personel yalnızca kendi rolünün gerektirdiği bilgileri görür ve düzenler.',
      },
    ],
    ourApproachTitle: 'Çalışma yöntemimiz',
    ourApproachDescription: 'İlk görüşmeden sürekli desteğe kadar net ve anlaşılır bir süreç.',
    steps: [
      {
        title: 'Keşif',
        description: 'Ekibinizin bugün nasıl çalıştığını öğrenir, özel yazılımın en çok değer katacağı noktaları belirleriz.',
      },
      {
        title: 'Tasarım',
        description: 'Tek bir satır kod yazmadan önce iş akışlarını, rolleri ve ekranları planlarız.',
      },
      {
        title: 'Geliştirme',
        description: 'Uygulamayı aşamalar halinde geliştirir, düzenli aralıklarla ilerlemeyi sizinle paylaşırız.',
      },
      {
        title: 'Yayına Alma & Destek',
        description: 'Yazılımı yayına alır, ekibinizi eğitir ve sürekli güncelleme ile destek sağlamaya devam ederiz.',
      },
    ],
    industriesTitle: 'Bu çözümü sunduğumuz sektörler',
    relatedServicesTitle: 'İlgili hizmetler',
    learnMore: 'Detayları incele',
    ctaTitle: 'Hazır yazılımlara uymayan bir iş akışınız mı var?',
    ctaDescription: 'Ekibinizin bugün nasıl çalıştığını anlatın, size uygun özel çözümü birlikte tanımlayalım.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
    serviceJsonServiceType: 'Özel Yazılım Geliştirme',
    faqHeading: 'Sıkça Sorulan Sorular',
    faqs: [
      {
        question: 'Özel yazılım, hazır yazılımdan farkı nedir?',
        answer:
          'Hazır yazılımlar genel bir işletme modeline göre tasarlanır ve genellikle ihtiyacınız olmayan ekranlar içerirken gerçek ihtiyaçlarınızda eksik kalır. Özel yazılım, gerçek iş akışınıza göre tasarlanır — yalnızca kullandığınız ekranlarla ilerlersiniz ve işletmeniz büyüdükçe sistem sizinle birlikte gelişir.',
      },
      {
        question: 'Özel yazılım projesi ne kadar sürer?',
        answer:
          'Tamamen kapsama bağlıdır — tek bir yönetim paneli ile birden fazla rol ve iş akışı içeren çok daha kapsamlı bir sistem farklı sürelerde tamamlanır. Kapsamı belirledikten sonra net bir zaman çizelgesi paylaşırız.',
      },
      {
        question: 'Sistem, hâlihazırda kullandığımız araçlarla entegre olabilir mi?',
        answer:
          'Çoğu zaman evet — bu, entegrasyon ve otomasyon hizmetimizin kapsamına girer. Belirli entegrasyonlar kullandığınız araca ve API desteğine bağlıdır ve proje kapsamında ayrıca netleştirilir.',
      },
      {
        question: 'Yazılım yayına alındıktan sonra ne oluyor?',
        answer:
          'Yayın sonrası bakım ve teknik destek hizmeti sağlıyoruz; işletmeniz geliştikçe güncelleme ve değişiklikler için net bir yol haritanız oluyor.',
      },
      {
        question: 'SaaS ürünü mü geliştiriyorsunuz, yoksa yalnızca iç araçlar mı?',
        answer:
          'İkisi de özel yazılım geliştirme kapsamına girer. Birden fazla müşteri hesabı ve role dayalı erişimle çalışan, abonelik tabanlı bir ürün geliştirmek istiyorsanız, bu da iç araçlarda ve yönetim panellerinde kullandığımız aynı temel mimariye dayanır — çok rollü paneller, yetkilendirme ve sürdürülebilir bir altyapı. Kapsam, roller ve abonelik/faturalama mantığı keşif aşamasında birlikte netleştirilir.',
      },
    ],
  },
} as const;

export default function CustomSoftwareAdminPanelsContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const service = getServiceMeta(SLUG);
  const relatedIndustries = getIndustriesForService(SLUG);
  const integrationsService = SERVICES.find((item) => item.slug === 'integrations-automation')!;
  const maintenanceService = SERVICES.find((item) => item.slug === 'maintenance-technical-support')!;

  const featureIcons = [LayoutDashboard, Code2, ShieldCheck];
  const stepIcons = [Search, PenTool, Code2, Rocket];

  return (
    <main className="bg-white">
      <ServiceJsonLd
        name={t(service.title, locale)}
        description={t(service.shortDescription, locale)}
        url={`/${locale}${serviceHref(locale, service)}`}
        serviceType={copy.serviceJsonServiceType}
      />
      <FAQJsonLd faqs={copy.faqs} />
      <BreadcrumbJsonLd
        items={[
          { label: copy.servicesBreadcrumb, href: `/${locale}${servicesHubHref(locale)}` },
          { label: t(service.title, locale), href: `/${locale}${serviceHref(locale, service)}` },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: copy.servicesBreadcrumb, href: servicesHubHref(locale) },
          { label: t(service.title, locale) },
        ]}
      />

      <section className="section-py">
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
        title={copy.whatWeBuildTitle}
        description={copy.whatWeBuildDescription}
        columns={3}
        darkMode={false}
        features={copy.features.map((feature, index) => ({
          icon: featureIcons[index],
          title: feature.title,
          description: feature.description,
        }))}
      />

      <HowItWorks
        title={copy.ourApproachTitle}
        description={copy.ourApproachDescription}
        layout="horizontal"
        darkMode={false}
        steps={copy.steps.map((step, index) => ({
          number: index + 1,
          title: step.title,
          description: step.description,
          icon: stepIcons[index],
        }))}
      />

      {relatedIndustries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">{copy.industriesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedIndustries.map((industry) => (
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

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <h2 className="text-role-section-heading mb-8">{copy.relatedServicesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={serviceHref(locale, integrationsService)}
              className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <UsersRound className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                {t(integrationsService.title, locale)}
              </h3>
              <p className="text-role-body text-sm leading-relaxed mb-4">
                {t(integrationsService.shortDescription, locale)}
              </p>
              <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                {copy.learnMore} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href={serviceHref(locale, maintenanceService)}
              className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <ShieldCheck className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                {t(maintenanceService.title, locale)}
              </h3>
              <p className="text-role-body text-sm leading-relaxed mb-4">
                {t(maintenanceService.shortDescription, locale)}
              </p>
              <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                {copy.learnMore} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection title={copy.faqHeading} faqs={copy.faqs} darkMode={false} columns={1} />

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
