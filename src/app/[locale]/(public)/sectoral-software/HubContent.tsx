import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductCTASection from '@/components/sections/ProductCTASection';
import {
  INDUSTRY_GROUPS,
  INDUSTRIES,
  industriesHubHref,
  industryHref,
  t,
  type Locale,
} from '@/lib/en-site-data';

const COPY = {
  en: {
    eyebrow: 'Sectoral Software',
    breadcrumb: 'Sectoral Software',
    h1: 'Software built around how your industry actually works',
    intro:
      'Every industry below can combine the same building blocks — a website, an appointment system, a management panel, CRM, a mobile app, and automation — into the mix that fits how the business actually runs. Pick your industry to see which solutions apply.',
    explore: 'Explore',
    ctaTitle: "Don't see your industry listed?",
    ctaDescription:
      "We build sectoral software for businesses outside this list too. Tell us how your business runs and we'll tell you what fits.",
    ctaPrimary: 'Book a Free Discovery Call',
    ctaSecondary: 'Contact Us',
    ctaBadge: 'Free Discovery Call',
  },
  tr: {
    eyebrow: 'Sektörel Yazılımlar',
    breadcrumb: 'Sektörel Yazılımlar',
    h1: 'Sektörünüzün gerçekten nasıl çalıştığına göre kurulan yazılımlar',
    intro:
      'Aşağıdaki her sektör aynı yapı taşlarını — bir web sitesi, randevu sistemi, yönetim paneli, CRM, mobil uygulama ve otomasyonu — işletmenizin gerçek işleyişine uyacak şekilde birleştirebilir. İşletmenizin bulunduğu sektörü seçerek hangi çözümlerin size uygun olduğunu görün.',
    explore: 'İncele',
    ctaTitle: 'Sektörünüzü listede bulamadınız mı?',
    ctaDescription:
      'Bu listede yer almayan işletmeler için de sektörel yazılımlar geliştiriyoruz. İşletmenizin nasıl çalıştığını anlatın, size neyin uygun olduğunu söyleyelim.',
    ctaPrimary: 'Ücretsiz Keşif Görüşmesi Alın',
    ctaSecondary: 'Bize Ulaşın',
    ctaBadge: 'Ücretsiz Keşif Görüşmesi',
  },
} as const;

export default function SectoralHubContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={[{ label: copy.breadcrumb, href: `/${locale}${industriesHubHref(locale)}` }]} />
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

      {INDUSTRY_GROUPS.map((group) => {
        const industries = INDUSTRIES.filter((industry) => industry.group === group.key);
        return (
          <section key={group.key} className="section-py" style={{ paddingTop: 0 }}>
            <div className="section-container">
              <h2 className="text-role-section-heading mb-8">{t(group.label, locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      {copy.explore} <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
