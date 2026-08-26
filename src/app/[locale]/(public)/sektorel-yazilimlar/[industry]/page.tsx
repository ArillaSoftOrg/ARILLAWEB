import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import { getCatalogSectorBySlug } from '@/lib/project-actions';
import { getIndustryMetaByUrlSlug, getServicesForIndustry, industryHref, t } from '@/lib/en-site-data';
import IndustryContent from '../../sectoral-software/[industry]/IndustryContent';

type Props = { params: Promise<{ locale: string; industry: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, industry: slug } = await params;
  if (locale !== 'tr') return {};
  const industry = getIndustryMetaByUrlSlug(slug, 'tr');
  if (!industry) return {};

  const title = `${t(industry.title, 'tr')} İşletmeleri İçin Yazılım`;
  const description = t(industry.summary, 'tr');
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${industryHref('tr', industry)}` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}${industryHref('tr', industry)}`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function TrIndustryPage({ params }: Props) {
  const { locale, industry: slug } = await params;
  if (locale !== 'tr') notFound();

  const industry = getIndustryMetaByUrlSlug(slug, 'tr');
  if (!industry) notFound();

  const relatedServices = getServicesForIndustry(industry);
  const catalogSector = industry.catalogSectorSlug ? await getCatalogSectorBySlug(industry.catalogSectorSlug) : null;
  const exampleProjects = (catalogSector?.projects.slice(0, 3) ?? []).map((project) => ({
    ...project,
    category: { name: catalogSector!.name, slug: catalogSector!.slug },
  }));

  return (
    <IndustryContent locale="tr" industry={industry} relatedServices={relatedServices} exampleProjects={exampleProjects} />
  );
}
