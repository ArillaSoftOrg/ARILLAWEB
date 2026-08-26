import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getSiteExampleDisplay } from "@/lib/site-example-display";
import type { ExampleKind } from "./ExampleKindBadge";

export type CatalogCardProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  kind: ExampleKind;
  designCode: string | null;
  styleTags: string[];
  category: {
    name: string;
    slug: string;
  } | null;
};

export default function SiteExampleCard({
  project,
  linkLocale,
}: {
  project: CatalogCardProject;
  /** Force the detail-page link to this locale. Used when this card renders on a page whose
   * own locale doesn't have a site-ornekleri implementation (e.g. the EN design-examples gallery,
   * which always links back to the TR detail pages). Defaults to the current locale. */
  linkLocale?: 'tr' | 'en';
}) {
  if (!project.category || !project.designCode) return null;
  const display = getSiteExampleDisplay(project);
  if (!display.previewSrc) return null;

  return (
    <Link
      href={`/site-ornekleri/${project.category.slug}/${project.slug}`}
      locale={linkLocale}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={display.previewSrc}
          alt={`${display.title} site önizlemesi`}
          fill
          loading="lazy"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-blue-700">
          {display.title}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">
          {display.description}
        </p>
        <span className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition group-hover:bg-blue-700">
          Tasarımı İncele
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
