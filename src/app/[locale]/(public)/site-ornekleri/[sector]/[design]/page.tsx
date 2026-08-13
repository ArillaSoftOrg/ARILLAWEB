import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import { parseDesignDna } from "@/lib/design-dna";
import { getCatalogProject } from "@/lib/project-actions";
import { siteExampleFontVariables } from "@/lib/site-example-fonts";
import HeroSection from "@/components/site-examples/HeroSection";
import DesignInquiryForm from "@/components/site-examples/DesignInquiryForm";
import LivePreviewSection from "@/components/site-examples/LivePreviewSection";
import DesignDNA from "@/components/site-examples/DesignDNA";
import AnalysisSection from "@/components/site-examples/AnalysisSection";
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
    <main className={`min-h-screen bg-white pb-24 pt-28 lg:pt-36 ${siteExampleFontVariables} font-[family-name:var(--font-se-manrope)]`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
        <Link href={`/site-ornekleri/${sector}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          <ArrowLeft className="h-4 w-4" /> {project.category.name} tasarımları
        </Link>

        <HeroSection
          kind={project.kind}
          sectorName={project.category.name}
          designCode={project.designCode}
          title={project.title}
          summary={project.summary}
          styleName={designDna.styleName}
          accent={designDna.contextualAccent}
        >
          <DesignInquiryForm
            projectId={project.id}
            designCode={project.designCode}
            designTitle={project.title}
            sector={project.category.name}
            detailUrl={`${SITE_URL}/tr/site-ornekleri/${sector}/${design}`}
          />
        </HeroSection>

        <LivePreviewSection sector={sector} design={design} title={project.title} accent={designDna.contextualAccent} />

        <DesignDNA dna={designDna} />
        <AnalysisSection dna={designDna} />
        <SectorAdaptation dna={designDna} sector={project.category.name} />
        <CustomizationOptions dna={designDna} />
        <SuitableFor dna={designDna} />
        <FinalDesignCTA title={project.title} />
      </div>
    </main>
  );
}
