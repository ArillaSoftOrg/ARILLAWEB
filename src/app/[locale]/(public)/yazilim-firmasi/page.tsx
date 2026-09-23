import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import {
  SERVICES,
  INDUSTRIES,
  INDUSTRY_GROUPS,
  servicesHubHref,
  serviceHref,
  industriesHubHref,
  industryHref,
  t,
} from '@/lib/en-site-data';
import { getIndexableCities, cityHref } from '@/lib/cities-data';
import { Link } from '@/i18n/navigation';
import { CorporatePageHero } from '@/components/corporate/CorporatePageHero';
import { EditorialSection } from '@/components/corporate/EditorialSection';
import { CTASection } from '@/components/corporate/CTASection';
import { HomeCard } from '@/components/home/ui/HomeCard';
import FAQSection from '@/components/sections/FAQSection';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'tr') return {};
  const t = await getTranslations({ locale, namespace: 'pages.yazilimFirmasi' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/tr/yazilim-firmasi',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/tr/yazilim-firmasi`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

const faqs = [
  {
    question: 'Hazır yazılım yerine neden özel yazılım tercih etmeliyim?',
    answer:
      'Hazır paket yazılımlar genel bir işletme modeline göre tasarlanır; sizin süreçlerinize uymayan ekranlar ve eksik kalan ihtiyaçlar olabilir. Özel yazılım, mevcut iş akışınıza göre tasarlanır — gereksiz karmaşıklık olmadan, gerçekten kullandığınız ekranlarla ilerlersiniz.',
  },
  {
    question: 'Proje süresi ne kadar sürer?',
    answer:
      'Süre, projenin kapsamına göre değişir. Bir kurumsal web sitesi ile uçtan uca bir yönetim paneli farklı sürelerde tamamlanır. Kapsamı netleştirdikten sonra size net bir zaman çizelgesi paylaşıyoruz.',
  },
  {
    question: 'Farklı bir şehirden veya tamamen uzaktan çalışan işletmelerle proje yürütüyor musunuz?',
    answer:
      'Evet. Projelerin büyük bölümünü uzaktan yürütüyoruz — görüşmeler, süreç takibi ve teslimat tamamen dijital ortamda ilerliyor.',
  },
  {
    question: 'Teklif almak ücretli mi?',
    answer:
      'Hayır. İlk adım her zaman ücretsiz bir keşif görüşmesi — ihtiyacınızı dinleyip kapsamı birlikte netleştiriyoruz.',
  },
  {
    question: 'Proje tamamlandıktan sonra destek alabiliyor muyum?',
    answer:
      'Evet, teslimat sonrası bakım ve teknik destek hizmeti veriyoruz — bu, hizmet kapsamlarımızdan biridir.',
  },
];

export default async function YazilimFirmasiPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'tr') notFound();

  const indexableCities = getIndexableCities();

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Anasayfa', href: '/' }, { label: 'Özel Yazılım Firması' }]} />
      <ServiceJsonLd
        name="Özel Yazılım Geliştirme"
        description="İşletmeler için web, mobil ve kurumsal yazılım çözümleri geliştiren özel yazılım firması."
        url="/tr/yazilim-firmasi"
        serviceType="Yazılım Geliştirme"
        areaServed="Türkiye"
      />
      <FAQJsonLd faqs={faqs} />

      <CorporatePageHero
        eyebrow="Yazılım Firması"
        title="Özel Yazılım Firması"
        description="ArillaSoft, işletmeler için web, mobil ve kurumsal yazılım çözümleri geliştiren bir özel yazılım firmasıdır. Hazır paket çözümler yerine, işletmenizin gerçek süreçlerine göre tasarlanmış uçtan uca yazılımlar geliştiriyoruz."
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi', href: '/teklif-al' }}
        secondaryCta={{ label: 'Hizmetlerimizi İnceleyin', href: servicesHubHref('tr') }}
      />

      <EditorialSection
        surface="canvas"
        heading="Ne geliştiriyoruz"
        description="Web sitesinden özel yönetim paneline, mobil uygulamadan sistem entegrasyonuna kadar uçtan uca yazılım geliştirme hizmeti veriyoruz."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <Link key={service.slug} href={serviceHref('tr', service)} className="no-underline">
              <HomeCard surface="light" className="h-full transition-transform duration-200 hover:-translate-y-1">
                <h3 className="font-home-sans text-lg font-semibold text-home-fg">{t(service.title, 'tr')}</h3>
                <p className="font-home-sans mt-3 text-sm leading-6 text-home-text-secondary">
                  {t(service.shortDescription, 'tr')}
                </p>
              </HomeCard>
            </Link>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        surface="light"
        heading="Hangi sektörlere yazılım geliştiriyoruz"
        description="Güzellik ve kişisel bakımdan sağlık sektörüne, konaklamadan perakendeye kadar farklı sektörlerin ihtiyaçlarına göre uyarlanmış çözümler sunuyoruz."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {INDUSTRY_GROUPS.map((group) => (
            <HomeCard key={group.key} surface="neutral">
              <h3 className="font-home-sans text-base font-semibold text-home-fg">{t(group.label, 'tr')}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {INDUSTRIES.filter((industry) => industry.group === group.key).map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={industryHref('tr', industry)}
                      className="font-home-sans text-sm text-home-text-secondary underline decoration-home-border underline-offset-4 transition-colors hover:text-home-fg"
                    >
                      {t(industry.title, 'tr')}
                    </Link>
                  </li>
                ))}
              </ul>
            </HomeCard>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href={industriesHubHref('tr')}
            className="font-home-sans text-sm font-medium text-home-fg underline decoration-home-border underline-offset-4"
          >
            Tüm sektörel yazılım çözümlerini görün →
          </Link>
        </div>
      </EditorialSection>

      {/* Only cities with status: 'indexable' in src/lib/cities-data.ts ever
          appear here — this section renders nothing while that list is
          empty, so no orphan/thin city pages get linked from here. */}
      {indexableCities.length > 0 && (
        <EditorialSection
          surface="light"
          heading="Şehrinize özel sayfamızı görün"
          description="Aşağıdaki şehirlerdeki işletmelere sunduğumuz hizmetleri inceleyin."
        >
          <div className="flex flex-wrap gap-3">
            {indexableCities.map((city) => (
              <Link
                key={city.slug}
                href={cityHref(city)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-violet-300 hover:text-violet-700"
              >
                {city.name} Yazılım Firması
              </Link>
            ))}
          </div>
        </EditorialSection>
      )}

      <EditorialSection
        surface="canvas"
        heading="Hazır yazılım mı, özel yazılım mı?"
        description="Hazır paket yazılımlar hızlı başlangıç sağlar ama genellikle işletmenizin kendine özgü süreçlerine tam olarak uymaz. Özel yazılım, mevcut iş akışınıza göre tasarlanır: gereksiz ekranlar olmadan, gerçekten ihtiyaç duyduğunuz özelliklerle ilerlersiniz ve işletmeniz büyüdükçe sistem sizinle birlikte gelişir."
      />

      <FAQSection title="Sıkça Sorulan Sorular" faqs={faqs} darkMode={false} columns={1} />

      <CTASection
        heading="Projenizi konuşmaya hazır mısınız?"
        body="Ücretsiz bir keşif görüşmesi ayarlayalım, işletmenize uygun yazılım çözümünü birlikte netleştirelim."
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi Alın', href: '/teklif-al' }}
        secondaryCta={{ label: 'Bize Ulaşın', href: '/kurumsal/iletisim' }}
      />
    </>
  );
}
