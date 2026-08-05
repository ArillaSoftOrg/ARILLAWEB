import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ExternalLink, Info, Palette, PanelsTopLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import { getCatalogProject } from "@/lib/project-actions";
import ExampleKindBadge from "@/components/site-examples/ExampleKindBadge";
import SiteExampleVisual from "@/components/site-examples/SiteExampleVisual";
import DesignInquiryForm from "@/components/site-examples/DesignInquiryForm";
import LivePreviewSection from "@/components/site-examples/LivePreviewSection";

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

  const screenshots = [project.coverImage, ...project.gallery].filter(
    (image): image is string => Boolean(image),
  );

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

            {project.kind === "DESIGN_CONCEPT" && (
              <div className="mt-6 flex max-w-3xl gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-violet-900">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                <p><strong>Bu çalışma görsel konsepttir.</strong> Henüz çalışan bir site değildir; seçildiğinde işletmenizin ihtiyaçlarına göre tasarlanıp geliştirilecektir.</p>
              </div>
            )}

            {project.projectUrl && project.kind !== "DESIGN_CONCEPT" && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Canlı demoyu aç <ExternalLink className="h-4 w-4" />
              </a>
            )}
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

        <section className="mt-16">
          {screenshots.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {screenshots.map((screenshot, index) => (
                <div key={`${screenshot}-${index}`} className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={screenshot}
                    alt={`${project.title} ${index + 1}. ekran görünümü`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_270px]">
              <SiteExampleVisual
                title={project.title}
                sector={project.category.name}
                designCode={project.designCode}
                variant="desktop"
              />
              <SiteExampleVisual
                title={project.title}
                sector={project.category.name}
                designCode={project.designCode}
                variant="mobile"
              />
            </div>
          )}
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 p-6">
            <Palette className="h-6 w-6 text-blue-600" />
            <h2 className="mt-4 text-xl font-black text-slate-950">Tasarım yaklaşımı</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.styleTags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">{tag}</span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{project.content}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 p-6">
            <PanelsTopLeft className="h-6 w-6 text-violet-600" />
            <h2 className="mt-4 text-xl font-black text-slate-950">Önerilen sayfalar</h2>
            <ul className="mt-4 space-y-3">
              {project.recommendedPages.map((page) => (
                <li key={page} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="h-4 w-4 text-emerald-500" /> {page}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 p-6">
            <Check className="h-6 w-6 text-emerald-600" />
            <h2 className="mt-4 text-xl font-black text-slate-950">Öne çıkan özellikler</h2>
            <ul className="mt-4 space-y-3">
              {project.featureHighlights.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {feature}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-3xl bg-blue-50 px-6 py-10 sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Neleri değiştirebiliriz?</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Tasarım bir başlangıç noktasıdır.</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
            {project.customizationNote ?? "Renkleri, içerikleri, sayfaları ve işlevleri işletmenizin ihtiyaçlarına göre değiştirebiliriz."}
          </p>
        </section>
      </div>
    </main>
  );
}
