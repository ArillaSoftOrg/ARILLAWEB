import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import { parseDesignDna } from "@/lib/design-dna";
import { getCatalogProject } from "@/lib/project-actions";
import ExampleKindBadge from "@/components/site-examples/ExampleKindBadge";
import DesignInquiryForm from "@/components/site-examples/DesignInquiryForm";
import LivePreviewSection from "@/components/site-examples/LivePreviewSection";
import DesignDNA from "@/components/site-examples/DesignDNA";
import DesignCharacteristics from "@/components/site-examples/DesignCharacteristics";
import SectorAdaptation from "@/components/site-examples/SectorAdaptation";
import CustomizationOptions from "@/components/site-examples/CustomizationOptions";
import SuitableFor from "@/components/site-examples/SuitableFor";
import FinalDesignCTA from "@/components/site-examples/FinalDesignCTA";

type Props = { params: Promise<{ locale: string; sector: string; design: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sector, design } = await params;
  if (locale !== "tr") return {};
  const project = await getCatalogProject(sector, design);
  if (!project || !project.category) return {};
  const url = `${SITE_URL}/tr/site-ornekleri/${sector}/${design}`;
  return {
    title: `${project.title} | ${project.designCode} | ArillaSoft`,
    description: project.summary,
    alternates: { canonical: `/tr/site-ornekleri/${sector}/${design}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "website",
      images: project.coverImage ? [{ url: project.coverImage, alt: project.title }] : undefined,
    },
  };
}

export default async function SiteExampleDetailPage({ params }: Props) {
  const { locale, sector, design } = await params;
  if (locale !== "tr") notFound();
  const project = await getCatalogProject(sector, design);
  if (!project || !project.category || !project.designCode) notFound();

  const designDna = parseDesignDna(project.designDna);
  if (!designDna) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/tr` },
      { "@type": "ListItem", position: 2, name: "Site Örnekleri", item: `${SITE_URL}/tr/site-ornekleri` },
      { "@type": "ListItem", position: 3, name: project.category.name, item: `${SITE_URL}/tr/site-ornekleri/${sector}` },
      { "@type": "ListItem", position: 4, name: project.title },
    ],
  };

  return (
    <main className="min-h-screen bg-white pb-24 pt-28 lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link href={`/site-ornekleri/${sector}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          <ArrowLeft className="h-4 w-4" /> {project.category.name} tasarımları
        </Link>

        <section className="mt-7 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <ExampleKindBadge kind={project.kind} />
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                {project.category.name}
              </span>
              <span className="rounded-md bg-slate-950 px-2.5 py-1 font-mono text-xs font-bold text-white">
                {project.designCode}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>
          </div>

          <DesignInquiryForm
            projectId={project.id}
            designCode={project.designCode}
            designTitle={project.title}
            sector={project.category.name}
            detailUrl={`${SITE_URL}/tr/site-ornekleri/${sector}/${design}`}
          />
        </section>

        <LivePreviewSection sector={sector} design={design} title={project.title} />

        <DesignDNA dna={designDna} />
        <DesignCharacteristics dna={designDna} />
        <SectorAdaptation dna={designDna} sector={project.category.name} />
        <CustomizationOptions dna={designDna} />
        <SuitableFor dna={designDna} />
        <FinalDesignCTA title={project.title} />
      </div>
    </main>
  );
}
