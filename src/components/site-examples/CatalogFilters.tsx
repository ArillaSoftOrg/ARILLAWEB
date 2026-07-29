"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import SiteExampleCard, { type CatalogCardProject } from "./SiteExampleCard";

type SectorOption = { name: string; slug: string };

export default function CatalogFilters({
  projects,
  sectors,
  initialSector = "all",
}: {
  projects: CatalogCardProject[];
  sectors: SectorOption[];
  initialSector?: string;
}) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState(initialSector);
  const [kind, setKind] = useState("all");
  const [style, setStyle] = useState("all");

  const styles = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.styleTags))).sort(),
    [projects],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
    return projects.filter((project) => {
      const searchable = [
        project.title,
        project.summary,
        project.designCode ?? "",
        project.category?.name ?? "",
        ...project.styleTags,
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (sector === "all" || project.category?.slug === sector) &&
        (kind === "all" || project.kind === kind) &&
        (style === "all" || project.styleTags.includes(style))
      );
    });
  }, [kind, projects, query, sector, style]);

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
          <SlidersHorizontal className="h-4 w-4 text-blue-600" />
          İşletmenize uygun tasarımı bulun
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">Tasarım ara</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Sektör, stil veya tasarım kodu ara"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label="Sektör filtresi"
          >
            <option value="all">Tüm sektörler</option>
            {sectors.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label="Tasarım türü filtresi"
          >
            <option value="all">Tüm içerik türleri</option>
            <option value="LIVE_DEMO">Canlı Demo</option>
            <option value="DESIGN_CONCEPT">Tasarım Konsepti</option>
            <option value="CLIENT_PROJECT">Yayınlanmış Proje</option>
          </select>
          <select
            value={style}
            onChange={(event) => setStyle(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label="Stil filtresi"
          >
            <option value="all">Tüm stiller</option>
            {styles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <p className="mb-5 text-sm text-slate-500">{filtered.length} tasarım gösteriliyor</p>
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => <SiteExampleCard key={project.id} project={project} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="font-bold text-slate-900">Bu filtrelerle eşleşen tasarım bulunamadı.</h2>
          <p className="mt-2 text-sm text-slate-500">Arama kelimesini veya filtreleri değiştirebilirsiniz.</p>
        </div>
      )}
    </div>
  );
}
