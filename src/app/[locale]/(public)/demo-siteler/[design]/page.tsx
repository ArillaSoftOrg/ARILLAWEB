import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Menu, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import SiteExampleVisual from "@/components/site-examples/SiteExampleVisual";

type Props = { params: Promise<{ locale: string; design: string }> };

export default async function LiveDemoPage({ params }: Props) {
  const { locale, design } = await params;
  if (locale !== "tr") notFound();

  const project = await prisma.project.findFirst({
    where: {
      slug: design,
      kind: "LIVE_DEMO",
      published: true,
      designCode: { not: null },
      category: { isCatalogSector: true },
    },
    include: { category: true },
  });
  if (!project || !project.category || !project.designCode) notFound();

  return (
    <main className="min-h-screen bg-[#fbfcff] text-slate-950">
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur">
        ArillaSoft canlı demo · {project.designCode}
      </div>

      <header className="border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <span className="text-xl font-black tracking-[-0.04em]">{project.category.name.split(" ve ")[0]}</span>
            <span className="ml-2 text-xs font-bold text-blue-600">STUDIO</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            {project.recommendedPages.slice(0, 4).map((page) => <a key={page} href={`#${page}`}>{page}</a>)}
          </nav>
          <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white">
            <span className="hidden sm:inline">Bilgi Al</span>
            <Menu className="h-4 w-4 sm:hidden" />
          </button>
        </div>
      </header>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Size özel dijital deneyim</p>
            <h1 className="mt-5 text-5xl font-black leading-[.98] tracking-[-0.055em] sm:text-7xl">
              İşinizi dijitalde güçlü gösterin.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {project.category.description} Bu demo; içerik, renk, görsel ve özellikleriyle işletmenize göre yeniden hazırlanır.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white">
                Hemen görüşelim <ArrowRight className="h-4 w-4" />
              </button>
              <button className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700">Hizmetleri incele</button>
            </div>
          </div>
          <SiteExampleVisual title={project.title} sector={project.category.name} designCode={project.designCode} variant="desktop" />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Sparkles className="h-7 w-7 text-blue-600" />
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">İşletmeniz için gereken temel özellikler</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.featureHighlights.map((feature, index) => (
              <article key={feature} className="rounded-2xl border border-slate-200 p-6">
                <span className="text-xs font-black text-blue-600">0{index + 1}</span>
                <h3 className="mt-5 font-black">{feature}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Markanız ve operasyon şekliniz doğrultusunda özelleştirilir.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-slate-950 p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold text-cyan-300">Bu tasarımı beğendiniz mi?</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">İşletmenize göre birlikte uyarlayalım.</h2>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
              {["Ücretsiz ilk görüşme", "Şeffaf kapsam", "Markanıza özel tasarım"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" />{item}</span>
              ))}
            </div>
          </div>
          <a href={`/tr/site-ornekleri/${project.category.slug}/${project.slug}#tasarim-talebi`} className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-slate-950">
            Tasarım için bilgi al
          </a>
        </div>
      </section>
    </main>
  );
}
