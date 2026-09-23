import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import { getCityBySlug } from '@/lib/cities-data';
import { SERVICES, servicesHubHref, serviceHref, industriesHubHref, t } from '@/lib/en-site-data';
import { Link } from '@/i18n/navigation';
import { CorporatePageHero } from '@/components/corporate/CorporatePageHero';
import { EditorialSection } from '@/components/corporate/EditorialSection';
import { CTASection } from '@/components/corporate/CTASection';
import { HomeCard } from '@/components/home/ui/HomeCard';
import FAQSection from '@/components/sections/FAQSection';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FAQJsonLd from '@/components/seo/FAQJsonLd';

type Props = { params: Promise<{ locale: string; sehir: string }> };

// Every candidate city page exists and can be reviewed/previewed
// regardless of publish status — see generateMetadata for the noindex
// gate that actually controls discoverability. This intentionally does
// NOT pre-render every slug at build time (no generateStaticParams);
// pages render on demand, same as the rest of this dynamic route tree.

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sehir } = await params;
  if (locale !== 'tr') return {};
  const city = getCityBySlug(sehir);
  if (!city) return {};

  const title = `${city.name} Yazılım Firması ve Özel Yazılım Çözümleri`;
  const description = `${city.name}'deki işletmelere özel yazılım, web ve mobil uygulama geliştirme hizmeti. Uzaktan proje teslim süreci, ilgili hizmetler ve sektörel çözümler.`;
  const isIndexable = city.status === 'indexable';

  return {
    title,
    description,
    // DRAFT/REVIEW cities are reachable (for internal review) but must
    // never be indexed or crawled onward — see src/lib/cities-data.ts.
    robots: isIndexable ? undefined : { index: false, follow: false },
    alternates: {
      canonical: `/tr/yazilim-firmasi/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tr/yazilim-firmasi/${city.slug}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const faqs = [
  {
    question: 'Farklı bir şehirden veya tamamen uzaktan mı çalışıyorsunuz?',
    answer:
      'Evet. Projelerin büyük bölümünü uzaktan yürütüyoruz — keşif görüşmesinden teslimata kadar süreç tamamen dijital ortamda ilerliyor, şehrinizden bağımsız olarak aynı süreci uyguluyoruz.',
  },
  {
    question: 'Yerel bir ofisiniz veya ekibiniz var mı?',
    answer:
      'İşletmenize hizmeti uzaktan sunuyoruz. Bu sayfa, o şehirdeki işletmelere sunduğumuz hizmetleri anlatır; fiziksel bir şube iması taşımaz.',
  },
  {
    question: 'Teklif almak ücretli mi?',
    answer: 'Hayır. İlk adım her zaman ücretsiz bir keşif görüşmesi — ihtiyacınızı dinleyip kapsamı birlikte netleştiriyoruz.',
  },
];

export default async function CitySoftwareCompanyPage({ params }: Props) {
  const { locale, sehir } = await params;
  if (locale !== 'tr') notFound();

  const city = getCityBySlug(sehir);
  if (!city) notFound();

  const title = `${city.name} Yazılım Firması ve Özel Yazılım Çözümleri`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Anasayfa', href: '/' },
          { label: 'Özel Yazılım Firması', href: '/yazilim-firmasi' },
          { label: city.name },
        ]}
      />
      <ServiceJsonLd
        name={`${city.name} için Özel Yazılım Geliştirme`}
        description={`${city.name}'deki işletmeler için uzaktan sunulan özel yazılım, web ve mobil uygulama geliştirme hizmeti.`}
        url={`/tr/yazilim-firmasi/${city.slug}`}
        serviceType="Yazılım Geliştirme"
        areaServed={city.name}
      />
      <FAQJsonLd faqs={faqs} />

      <CorporatePageHero
        eyebrow={`${city.name} Yazılım Firması`}
        title={title}
        description={`${city.name}'deki işletmelere özel yazılım, web sitesi, mobil uygulama ve kurumsal yönetim paneli geliştiriyoruz. Süreç tamamen uzaktan yürütülür — keşif görüşmesinden teslimata kadar aynı standart ekiple ilerlersiniz.`}
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi', href: '/teklif-al' }}
        secondaryCta={{ label: 'Hizmetlerimizi İnceleyin', href: servicesHubHref('tr') }}
      />

      <EditorialSection
        surface="canvas"
        heading={`${city.name} için sunduğumuz hizmetler`}
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
        <div className="mt-8">
          <Link
            href={industriesHubHref('tr')}
            className="font-home-sans text-sm font-medium text-home-fg underline decoration-home-border underline-offset-4"
          >
            Sektörünüze özel çözümlerimizi görün →
          </Link>
        </div>
      </EditorialSection>

      <EditorialSection
        surface="light"
        heading="Uzaktan proje teslim süreci"
        description={`${city.name}'deki işletmeler dahil, projelerin büyük bölümünü uzaktan yürütüyoruz.`}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <HomeCard surface="neutral">
            <h3 className="font-home-sans text-base font-semibold text-home-fg">Nasıl çalışıyoruz</h3>
            <p className="font-home-sans mt-3 text-sm leading-6 text-home-text-secondary">
              Ücretsiz keşif görüşmesiyle başlıyor, ihtiyacınızı ve kapsamı netleştiriyoruz. Tasarım ve geliştirme
              aşamalarında düzenli olarak ilerlemeyi paylaşıyor, teslimat sonrası bakım ve destek sağlıyoruz.
            </p>
          </HomeCard>
          <HomeCard surface="neutral">
            <h3 className="font-home-sans text-base font-semibold text-home-fg">İletişim</h3>
            <p className="font-home-sans mt-3 text-sm leading-6 text-home-text-secondary">
              Görüşmeler, süreç takibi ve teslimat tamamen dijital ortamda ilerler; şehrinizden bağımsız olarak aynı
              standart süreci uygularız.
            </p>
          </HomeCard>
        </div>
      </EditorialSection>

      <FAQSection title="Sıkça Sorulan Sorular" faqs={faqs} darkMode={false} columns={1} />

      <CTASection
        heading={`${city.name}'deki projenizi konuşmaya hazır mısınız?`}
        body="Ücretsiz bir keşif görüşmesi ayarlayalım, işletmenize uygun yazılım çözümünü birlikte netleştirelim."
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi Alın', href: '/teklif-al' }}
        secondaryCta={{ label: 'Bize Ulaşın', href: '/kurumsal/iletisim' }}
      />
    </>
  );
}
