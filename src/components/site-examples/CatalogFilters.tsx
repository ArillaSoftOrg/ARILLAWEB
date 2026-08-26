"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import SiteExampleCard, { type CatalogCardProject } from "./SiteExampleCard";

type SectorOption = { name: string; slug: string };

type CatalogFiltersLabels = {
  panelTitle: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  allSectors: string;
  sectorAriaLabel: string;
  allKinds: string;
  kindAriaLabel: string;
  kindLiveDemo: string;
  kindDesignConcept: string;
  kindClientProject: string;
  allStyles: string;
  styleAriaLabel: string;
  /** Plain string template containing a literal "{count}" token — kept as a string rather than
   * a function so a Server Component page can pass label overrides without crossing the
   * server/client boundary with a non-serializable function value. */
  resultsCountTemplate: string;
  emptyTitle: string;
  emptyDescription: string;
};

const DEFAULT_LABELS: CatalogFiltersLabels = {
  panelTitle: "İşletmenize uygun tasarımı bulun",
  searchPlaceholder: "Sektör, stil veya tasarım kodu ara",
  searchAriaLabel: "Tasarım ara",
  allSectors: "Tüm sektörler",
  sectorAriaLabel: "Sektör filtresi",
  allKinds: "Tüm içerik türleri",
  kindAriaLabel: "Tasarım türü filtresi",
  kindLiveDemo: "Canlı Demo",
  kindDesignConcept: "Tasarım Konsepti",
  kindClientProject: "Yayınlanmış Proje",
  allStyles: "Tüm stiller",
  styleAriaLabel: "Stil filtresi",
  resultsCountTemplate: "{count} tasarım gösteriliyor",
  emptyTitle: "Bu filtrelerle eşleşen tasarım bulunamadı.",
  emptyDescription: "Arama kelimesini veya filtreleri değiştirebilirsiniz.",
};

export default function CatalogFilters({
  projects,
  sectors,
  initialSector = "all",
  linkLocale,
  labels,
}: {
  projects: CatalogCardProject[];
  sectors: SectorOption[];
  initialSector?: string;
  /** Forwarded to each SiteExampleCard — see its own doc comment. */
  linkLocale?: "tr" | "en";
  /** Override the (Turkish-language) default UI copy, e.g. for an English-locale page. */
  labels?: Partial<CatalogFiltersLabels>;
}) {
  const t = { ...DEFAULT_LABELS, ...labels };
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
          {t.panelTitle}
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">{t.searchAriaLabel}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label={t.sectorAriaLabel}
          >
            <option value="all">{t.allSectors}</option>
            {sectors.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label={t.kindAriaLabel}
          >
            <option value="all">{t.allKinds}</option>
            <option value="LIVE_DEMO">{t.kindLiveDemo}</option>
            <option value="DESIGN_CONCEPT">{t.kindDesignConcept}</option>
            <option value="CLIENT_PROJECT">{t.kindClientProject}</option>
          </select>
          <select
            value={style}
            onChange={(event) => setStyle(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400"
            aria-label={t.styleAriaLabel}
          >
            <option value="all">{t.allStyles}</option>
            {styles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <p className="mb-5 text-sm text-slate-500">{t.resultsCountTemplate.replace('{count}', String(filtered.length))}</p>
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => <SiteExampleCard key={project.id} project={project} linkLocale={linkLocale} />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="font-bold text-slate-900">{t.emptyTitle}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.emptyDescription}</p>
        </div>
      )}
    </div>
  );
}
