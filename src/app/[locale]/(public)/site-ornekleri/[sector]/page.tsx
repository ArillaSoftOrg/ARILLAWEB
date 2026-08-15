import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import CatalogFilters from "@/components/site-examples/CatalogFilters";
import { getCatalogSectorBySlug, getCatalogSectors } from "@/lib/project-actions";
import { SITE_URL } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; sector: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sector: slug } = await params;
  if (locale !== "tr") return {};
  const sector = await getCatalogSectorBySlug(slug);
  if (!sector) return {};
  return {
    title: `${sector.name} Site Örnekleri`,
    description: sector.description ?? `${sector.name} için canlı demo ve özgün web sitesi tasarım konseptleri.`,
    alternates: { canonical: `/tr/site-ornekleri/${sector.slug}` },
    openGraph: {
      title: `${sector.name} Site Örnekleri`,
      description: sector.description ?? "",
      url: `${SITE_URL}/tr/site-ornekleri/${sector.slug}`,
      type: "website",
    },
  };
}

export default async function SectorExamplesPage({ params }: Props) {
  const { locale, sector: slug } = await params;
  if (locale !== "tr") notFound();
  const [sector, sectors] = await Promise.all([getCatalogSectorBySlug(slug), getCatalogSectors()]);
  if (!sector) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-28 sm:px-6 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <Link href="/site-ornekleri" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          <ArrowLeft className="h-4 w-4" /> Tüm sektörler
        </Link>
        <div className="mb-10 mt-6 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Sektörel site örnekleri</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">{sector.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{sector.description}</p>
        </div>
        <CatalogFilters
          projects={sector.projects.map((project) => ({ ...project, category: { name: sector.name, slug: sector.slug } }))}
          sectors={sectors.map(({ name, slug }) => ({ name, slug }))}
          initialSector={sector.slug}
        />
      </div>
    </main>
  );
}
