import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { SITE_URL } from '@/lib/constants';
import { INDUSTRY_GROUPS, INDUSTRIES } from '@/lib/en-site-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Sectoral Software Solutions';
  const description =
    'Websites, appointment systems, management panels, and CRM tools built for your industry — from beauty and healthcare to hospitality, real estate, and retail.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/sectoral-software` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/sectoral-software`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SectoralSoftwarePage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={[{ label: 'Sectoral Software', href: '/en/sectoral-software' }]} />
      <Breadcrumbs items={[{ label: 'Sectoral Software' }]} />

      <section className="section-py">
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              Sectoral Software
            </span>
            <h1 className="text-role-hero mb-4">Software built around how your industry actually works</h1>
            <p className="text-role-body-lg">
              Every industry below can combine the same building blocks — a website, an appointment
              system, a management panel, CRM, a mobile app, and automation — into the mix that fits
              how the business actually runs. Pick your industry to see which solutions apply.
            </p>
          </div>
        </div>
      </section>

      {INDUSTRY_GROUPS.map((group) => {
        const industries = INDUSTRIES.filter((industry) => industry.group === group.key);
        return (
          <section key={group.key} className="section-py" style={{ paddingTop: 0 }}>
            <div className="section-container">
              <h2 className="text-role-section-heading mb-8">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/sectoral-software/${industry.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-role-body text-sm leading-relaxed mb-4">{industry.summary}</p>
                    <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <ProductCTASection
        title="Don't see your industry listed?"
        description="We build sectoral software for businesses outside this list too. Tell us how your business runs and we'll tell you what fits."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
