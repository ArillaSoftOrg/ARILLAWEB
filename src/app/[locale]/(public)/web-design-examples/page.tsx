import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import CatalogFilters from '@/components/site-examples/CatalogFilters';
import { getCatalogProjects, getCatalogSectors } from '@/lib/project-actions';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Web Design Examples';
  const description =
    'Website concepts and design examples created for different industries — browse by sector, style, and format.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/web-design-examples` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/web-design-examples`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const EN_CATALOG_LABELS = {
  panelTitle: 'Find a design that fits your business',
  searchPlaceholder: 'Search by industry, style, or design code',
  searchAriaLabel: 'Search designs',
  allSectors: 'All industries',
  sectorAriaLabel: 'Industry filter',
  allKinds: 'All content types',
  kindAriaLabel: 'Design type filter',
  kindLiveDemo: 'Live Demo',
  kindDesignConcept: 'Design Concept',
  kindClientProject: 'Published Project',
  allStyles: 'All styles',
  styleAriaLabel: 'Style filter',
  resultsCountTemplate: 'Showing {count} designs',
  emptyTitle: 'No designs match these filters.',
  emptyDescription: 'Try a different search term or clear a filter.',
};

export default async function WebDesignExamplesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  const [projects, sectors] = await Promise.all([getCatalogProjects(), getCatalogSectors()]);

  return (
    <main className="min-h-screen bg-slate-50">
      <BreadcrumbJsonLd items={[{ label: 'Web Design Examples', href: '/en/web-design-examples' }]} />
      <Breadcrumbs items={[{ label: 'Web Design Examples' }]} />

      <section className="px-4 pb-10 pt-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Web Design Examples</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Website concepts and design examples for different industries
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              These are concept and demo designs we&apos;ve built to explore what a site could look like for a
              given industry — not a list of client projects. Browse by industry, style, or format below, or
              get in touch and we&apos;ll design something specific to your business.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <CatalogFilters
            projects={projects}
            sectors={sectors.map(({ name, slug }) => ({ name, slug }))}
            linkLocale="tr"
            labels={EN_CATALOG_LABELS}
          />
        </div>
      </section>
    </main>
  );
}
