import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import CatalogFilters from "@/components/site-examples/CatalogFilters";
import { getCatalogProjects, getCatalogSectors } from "@/lib/project-actions";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Sektörel Site Örnekleri",
  description: "İşletmenizin sektörüne uygun canlı web sitesi demolarını ve özgün tasarım konseptlerini inceleyin.",
  alternates: { canonical: "/tr/site-ornekleri" },
};

export default async function SiteExamplesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  const [projects, sectors] = await Promise.all([getCatalogProjects(), getCatalogSectors()]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-4 pb-20 pt-32 sm:px-6 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,.10),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(124,58,237,.09),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mx-auto mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Sektörünü seç · Tasarımını incele
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl">
            İşletmenize yakışacak web sitesini önce görün.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Çalışan demoları ve özgün tasarım konseptlerini karşılaştırın. Beğendiğiniz yaklaşımı markanıza, içeriğinize ve çalışma şeklinize göre yeniden tasarlayalım.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
            {["Birebir hazır şablon değil", "Mobil uyumlu", "Markanıza göre özelleştirilir"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item}
              </span>
            ))}
          </div>
          <a href="#katalog" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
            Tasarımları keşfet <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section id="katalog" className="scroll-mt-24 px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <CatalogFilters
            projects={projects}
            sectors={sectors.map(({ name, slug }) => ({ name, slug }))}
          />
        </div>
      </section>
    </main>
  );
}
