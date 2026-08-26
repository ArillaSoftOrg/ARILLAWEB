import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, CheckCircle2, Images } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCatalogSectors } from "@/lib/project-actions";
import { getSiteExampleDisplay } from "@/lib/site-example-display";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Sektörel Site Örnekleri",
  description: "İşletmenizin sektörüne uygun canlı web sitesi demolarını ve özgün tasarım konseptlerini inceleyin.",
  alternates: {
    canonical: "/tr/site-ornekleri",
  },
};

export default async function SiteExamplesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  const sectors = await getCatalogSectors();
  const totalDesignCount = sectors.reduce((total, sector) => total + sector.projects.length, 0);

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
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Sektör kataloğu</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Önce sektörünüzü seçin.
              </h2>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {sectors.length} sektör, {totalDesignCount} tasarım alternatifi
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sectors.map((sector) => {
              const previewProjects = sector.projects.slice(0, 3);

              return (
                <Link
                  key={sector.id}
                  href={`/site-ornekleri/${sector.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    {previewProjects.length > 0 ? (
                      <div className="grid h-full grid-cols-[1.35fr_1fr] gap-1 p-1">
                        {previewProjects.map((project, index) => {
                          const display = getSiteExampleDisplay(project);
                          if (!display.previewSrc) return null;

                          return (
                            <div
                              key={project.id}
                              className={index === 0 ? "relative row-span-2 overflow-hidden rounded-xl" : "relative overflow-hidden rounded-xl"}
                            >
                              <Image
                                src={display.previewSrc}
                                alt={`${display.title} site önizlemesi`}
                                fill
                                loading="lazy"
                                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-300">
                        <Images className="h-10 w-10" />
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {sector.projects.length} tasarım
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-black tracking-tight text-slate-950 transition group-hover:text-blue-700">
                      {sector.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {sector.description}
                    </p>
                    <span className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition group-hover:bg-blue-700">
                      Bu sektördeki tasarımları gör
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
