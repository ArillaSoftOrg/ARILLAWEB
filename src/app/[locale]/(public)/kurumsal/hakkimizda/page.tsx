import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { CorporatePageHero } from '@/components/corporate/CorporatePageHero';
import { EditorialSection } from '@/components/corporate/EditorialSection';
import { CTASection } from '@/components/corporate/CTASection';
import { HomeCard } from '@/components/home/ui/HomeCard';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.hakkimizda' });
  const isTurkish = locale === 'tr';
  const title = isTurkish ? t('title') : `${t('title')} (Turkish)`;
  const description = isTurkish ? t('description') : `${t('description')} Turkish archive.`;
  return {
    title,
    description,
    // No English body copy exists yet (see redesign plan) — noindex the EN
    // route rather than presenting Turkish content as real English content,
    // matching the pattern already used for the blog's EN routes.
    robots: isTurkish ? undefined : { index: false, follow: true },
    alternates: {
      canonical: '/tr/kurumsal/hakkimizda',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${isTurkish ? 'tr' : locale}/kurumsal/hakkimizda`,
      type: 'website',
    },
  };
}

const whyUs = [
  {
    title: 'Modern Yaklaşım',
    description: 'Güncel teknolojiler ve modern tasarım anlayışı ile güçlü ürünler geliştiriyoruz.',
  },
  {
    title: 'Güvenilir Altyapı',
    description: 'Performanslı, güvenli ve uzun vadede sürdürülebilir sistemler kuruyoruz.',
  },
  {
    title: 'İş Odaklı Çözümler',
    description: 'Her projeyi yalnızca teknik değil, ticari fayda açısından da değerlendiriyoruz.',
  },
  {
    title: 'Ölçeklenebilir Yapı',
    description: 'Bugünün ihtiyacına cevap veren ve yarının büyümesine uyum sağlayan sistemler tasarlıyoruz.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Anasayfa', href: '/' }, { label: 'Hakkımızda' }]} />

      <CorporatePageHero
        eyebrow="Hakkımızda"
        title="Arilla Soft ile Dijitalde Daha Güçlü Bir Gelecek"
        description="Arilla Soft olarak işletmeler için modern, hızlı ve ölçeklenebilir yazılım çözümleri geliştiriyoruz. Web sitelerinden özel yazılım projelerine, dijital sistemlerden kullanıcı odaklı arayüzlere kadar geniş bir alanda; güçlü, sade ve sürdürülebilir çözümler sunuyoruz."
      />

      <EditorialSection layout="stacked" surface="light">
        <div className="grid gap-6 sm:grid-cols-2">
          <HomeCard surface="neutral">
            <h2 className="font-home-sans text-xl font-semibold text-home-fg">Misyonumuz</h2>
            <p className="font-home-sans mt-4 text-[15px] leading-7 text-home-text-secondary">
              İşletmelerin ihtiyaçlarına uygun, güvenilir ve kullanıcı dostu yazılım çözümleri geliştirerek
              dijital dönüşüm süreçlerini kolaylaştırmak ve verimliliği artırmak.
            </p>
          </HomeCard>
          <HomeCard surface="neutral">
            <h2 className="font-home-sans text-xl font-semibold text-home-fg">Vizyonumuz</h2>
            <p className="font-home-sans mt-4 text-[15px] leading-7 text-home-text-secondary">
              Teknolojiyi sadeleştirerek işletmelerin daha güçlü, daha hızlı ve daha rekabetçi hale gelmesini
              sağlayan yenilikçi dijital çözümler üretmek.
            </p>
          </HomeCard>
        </div>
      </EditorialSection>

      <EditorialSection
        surface="canvas"
        heading="Neden Arilla Soft?"
        description="Sadece yazılım geliştirmiyor, işletmenizin büyümesine katkı sağlayan dijital sistemler kuruyoruz."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {whyUs.map((item) => (
            <HomeCard key={item.title} surface="light">
              <h3 className="font-home-sans text-lg font-semibold text-home-fg">{item.title}</h3>
              <p className="font-home-sans mt-3 text-sm leading-6 text-home-text-secondary">{item.description}</p>
            </HomeCard>
          ))}
        </div>
      </EditorialSection>

      <CTASection
        heading="Projenizi birlikte hayata geçirelim"
        body="İşletmeniz için modern bir web sitesi, özel yazılım çözümü veya dijital dönüşüm projesi planlıyorsanız bizimle iletişime geçin."
        primaryCta={{ label: 'Bizimle İletişime Geçin', href: '/kurumsal/iletisim' }}
        secondaryCta={{ label: 'Projelerimizi İnceleyin', href: '/' }}
      />
    </>
  );
}
