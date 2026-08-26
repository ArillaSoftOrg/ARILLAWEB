import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import ProductCTASection from '@/components/sections/ProductCTASection';
import SiteExampleCard from '@/components/site-examples/SiteExampleCard';
import { Link } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/constants';
import { getCatalogSectorBySlug } from '@/lib/project-actions';
import { getIndustryMeta, getServicesForIndustry } from '@/lib/en-site-data';
import SolutionsFeatureGrid from './SolutionsFeatureGrid';

type Props = { params: Promise<{ locale: string; industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, industry: slug } = await params;
  const industry = getIndustryMeta(slug);
  if (!industry) return {};

  const title = `Software for ${industry.title} Businesses`;
  const description = industry.summary;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/sectoral-software/${industry.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/sectoral-software/${industry.slug}`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { locale, industry: slug } = await params;
  if (locale !== 'en') notFound();

  const industry = getIndustryMeta(slug);
  if (!industry) notFound();

  const relatedServices = getServicesForIndustry(industry);
  const catalogSector = industry.catalogSectorSlug ? await getCatalogSectorBySlug(industry.catalogSectorSlug) : null;
  const exampleProjects = (catalogSector?.projects.slice(0, 3) ?? []).map((project) => ({
    ...project,
    category: { name: catalogSector!.name, slug: catalogSector!.slug },
  }));

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: 'Sectoral Software', href: '/en/sectoral-software' },
          { label: industry.title, href: `/en/sectoral-software/${industry.slug}` },
        ]}
      />
      <ServiceJsonLd
        name={`Software for ${industry.title}`}
        description={industry.summary}
        url={`/en/sectoral-software/${industry.slug}`}
        serviceType="Sectoral Software"
      />
      <Breadcrumbs
        items={[
          { label: 'Sectoral Software', href: '/sectoral-software' },
          { label: industry.title },
        ]}
      />

      <section className="section-py" style={{ paddingBottom: '32px' }}>
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              Sectoral Software
            </span>
            <h1 className="text-role-hero mb-4">Software for {industry.title} Businesses</h1>
            <p className="text-role-body-lg">{industry.summary}</p>
          </div>
        </div>
      </section>

      <SolutionsFeatureGrid solutions={industry.applicableSolutions} />

      {relatedServices.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">Related services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-role-body text-sm">{service.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {exampleProjects.length > 0 && (
        <section className="section-py bg-slate-50" style={{ paddingTop: relatedServices.length > 0 ? undefined : 0 }}>
          <div className="section-container">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="text-role-section-heading">Design examples for {industry.title}</h2>
              <Link href="/web-design-examples" className="text-role-navigation text-violet-600 inline-flex items-center gap-1">
                View all design examples <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {exampleProjects.map((project) => (
                <SiteExampleCard key={project.id} project={project} linkLocale="tr" />
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductCTASection
        title={`Ready to talk about software for your ${industry.title.toLowerCase()} business?`}
        description="Book a free discovery call and we'll walk through what fits your business."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}

