import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import { COMPANY_CONTACT, whatsappUrl } from '@/lib/constants/company';
import { getCityBySlug } from '@/lib/cities-data';
import { SERVICES, INDUSTRIES, servicesHubHref, serviceHref, industryHref, industriesHubHref, t } from '@/lib/en-site-data';
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

// Industries genuinely relevant to Antalya's known business context
// (tourism/hospitality, restaurants, clinics, beauty, fitness, real
// estate, automotive, retail — see the Phase 4 report). This is a fixed
// editorial selection, not a per-city-computed "top sectors" claim — no
// market-share or density statistic is implied.
const SECTOR_HIGHLIGHT_SLUGS = [
  'hotel-hospitality',
  'restaurant-cafe',
  'clinic',
  'dental-clinic',
  'beauty-center',
  'sports-fitness',
  'real-estate',
  'automotive',
  'retail',
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sehir } = await params;
  if (locale !== 'tr') return {};
  const city = getCityBySlug(sehir);
  if (!city) return {};

  const isIndexable = city.status === 'indexable';
  const title = city.isVerifiedOffice
    ? `${city.name} Yazılım Firması | Özel Yazılım ve Web Çözümleri`
    : `${city.name} Yazılım Firması ve Özel Yazılım Çözümleri`;
  const description = city.isVerifiedOffice
    ? `${city.name} Konyaaltı merkezli ArillaSoft; özel yazılım, web uygulama, mobil uygulama, otomasyon ve sektörel yazılım çözümleri geliştirir.`
    : `${city.name}'deki işletmelere özel yazılım, web ve mobil uygulama geliştirme hizmeti. Uzaktan proje teslim süreci, ilgili hizmetler ve sektörel çözümler.`;

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

const remoteFaqs = [
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

// Antalya-specific: this city has a verified office presence
// (src/lib/constants/company.ts), so FAQ can honestly reference it —
// but still without promising an in-person meeting process we haven't
// confirmed exists.
const antalyaFaqs = [
  {
    question: 'Antalya\'da yüz yüze görüşme mümkün mü?',
    answer:
      'Standart sürecimiz uzaktan yürütülür ve projelerin büyük çoğunluğu bu şekilde tamamlanır. Yüz yüze bir görüşme talebiniz olursa bize iletebilirsiniz, ihtiyaca göre değerlendiririz.',
  },
  {
    question: 'Antalya dışındaki işletmelerle çalışıyor musunuz?',
    answer: 'Evet. Konyaaltı, Antalya merkezli olsak da projelerin büyük bölümünü Türkiye genelinde uzaktan yürütüyoruz.',
  },
  {
    question: 'Web sitesi dışında özel yazılım geliştiriyor musunuz?',
    answer:
      'Evet — web sitesi ve web uygulamasının yanında mobil uygulama, özel yönetim panelleri ve sistem entegrasyonu/otomasyonu da geliştiriyoruz.',
  },
  {
    question: 'QR menü veya randevu sistemi geliştirebiliyor musunuz?',
    answer:
      'Evet, bunlar sektörel yazılım çözümlerimiz arasında — restoran/kafe işletmeleri için QR menü, randevuya dayalı işletmeler için online randevu sistemi geliştiriyoruz.',
  },
  {
    question: 'Proje teklifi nasıl alınır?',
    answer: 'Ücretsiz bir keşif görüşmesiyle başlıyoruz — ihtiyacınızı dinleyip kapsamı birlikte netleştiriyoruz.',
  },
];

export default async function CitySoftwareCompanyPage({ params }: Props) {
  const { locale, sehir } = await params;
  if (locale !== 'tr') notFound();

  const city = getCityBySlug(sehir);
  if (!city) notFound();

  const isVerified = city.isVerifiedOffice === true;
  const faqs = isVerified ? antalyaFaqs : remoteFaqs;
  const title = isVerified
    ? `${city.name} Yazılım Firması | Özel Yazılım ve Web Çözümleri`
    : `${city.name} Yazılım Firması ve Özel Yazılım Çözümleri`;
  const heroDescription = isVerified
    ? `${COMPANY_CONTACT.locationShort} merkezli ArillaSoft, ${city.name}'deki işletmelere özel yazılım, web sitesi, mobil uygulama ve kurumsal yönetim paneli geliştirir. ${city.name}'dan Türkiye geneline uzaktan proje teslim süreciyle hizmet veriyoruz.`
    : `${city.name}'deki işletmelere özel yazılım, web sitesi, mobil uygulama ve kurumsal yönetim paneli geliştiriyoruz. Süreç tamamen uzaktan yürütülür — keşif görüşmesinden teslimata kadar aynı standart ekiple ilerlersiniz.`;

  const sectorHighlights = SECTOR_HIGHLIGHT_SLUGS.map((slug) => INDUSTRIES.find((industry) => industry.slug === slug)).filter(
    (industry): industry is (typeof INDUSTRIES)[number] => Boolean(industry)
  );
  const qrMenuIndustry = INDUSTRIES.find((industry) => industry.slug === 'restaurant-cafe');

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
        description={`${city.name}'deki işletmeler için özel yazılım, web ve mobil uygulama geliştirme hizmeti.`}
        url={`/tr/yazilim-firmasi/${city.slug}`}
        serviceType="Yazılım Geliştirme"
        areaServed={city.name}
      />
      <FAQJsonLd faqs={faqs} />

      <CorporatePageHero
        eyebrow={`${city.name} Yazılım Firması`}
        title={title}
        description={heroDescription}
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi', href: '/teklif-al' }}
        secondaryCta={{ label: 'Hizmetlerimizi İnceleyin', href: servicesHubHref('tr') }}
      />

      <EditorialSection
        surface="canvas"
        heading={`${city.name}'daki işletmeler için yazılım hizmetleri`}
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
        heading={`${city.name}'da sektörel yazılım çözümleri`}
        description={`${city.name}'daki turizm/konaklama, restoran, klinik, güzellik, spor, emlak, otomotiv ve perakende gibi sektörlerdeki işletmelere hizmet verebiliriz.`}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sectorHighlights.map((industry) => (
            <Link
              key={industry.slug}
              href={industryHref('tr', industry)}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 no-underline transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              {t(industry.title, 'tr')}
            </Link>
          ))}
          {qrMenuIndustry && (
            <Link
              href="/sektorel-yazilimlar/qr-menu"
              className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 no-underline transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              QR Menü Sistemi
            </Link>
          )}
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

      <EditorialSection
        surface="canvas"
        heading="Neden özel yazılım?"
        description="Hazır paket yazılımlar hızlı başlangıç sağlar ama genellikle işletmenizin kendine özgü süreçlerine tam olarak uymaz. Özel yazılım, mevcut iş akışınıza göre tasarlanır: gereksiz ekranlar olmadan, gerçekten ihtiyaç duyduğunuz özelliklerle ilerlersiniz ve işletmeniz büyüdükçe sistem sizinle birlikte gelişir."
      />

      <EditorialSection
        surface="light"
        heading="Proje süreci"
        description={isVerified ? `${COMPANY_CONTACT.locationShort}'dan Türkiye geneline hizmet veriyoruz.` : undefined}
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
              {isVerified
                ? `Konyaaltı, Antalya merkezli ekibimizle görüşmeler, süreç takibi ve teslimat tamamen dijital ortamda ilerler.`
                : 'Görüşmeler, süreç takibi ve teslimat tamamen dijital ortamda ilerler; şehrinizden bağımsız olarak aynı standart süreci uygularız.'}
            </p>
          </HomeCard>
        </div>
      </EditorialSection>

      <FAQSection title="Sıkça Sorulan Sorular" faqs={faqs} darkMode={false} columns={1} />

      <CTASection
        heading={`${city.name}'daki projenizi konuşmaya hazır mısınız?`}
        body="Ücretsiz bir keşif görüşmesi ayarlayalım, işletmenize uygun yazılım çözümünü birlikte netleştirelim."
        primaryCta={{ label: 'Ücretsiz Keşif Görüşmesi Alın', href: '/teklif-al' }}
        secondaryCta={{ label: 'Bize Ulaşın', href: '/kurumsal/iletisim' }}
      />

      <div className="section-container" style={{ paddingTop: '24px', paddingBottom: '48px', textAlign: 'center' }}>
        <a
          href={whatsappUrl(`Merhaba, ${city.name}'daki işletmem için yazılım hizmetleriniz hakkında bilgi almak istiyorum.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-home-sans text-sm font-medium text-home-fg underline decoration-home-border underline-offset-4"
        >
          WhatsApp üzerinden yazın →
        </a>
      </div>
    </>
  );
}
