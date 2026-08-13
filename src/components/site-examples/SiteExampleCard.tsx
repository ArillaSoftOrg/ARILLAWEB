import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ExampleKindBadge, { type ExampleKind } from "./ExampleKindBadge";

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

export default function SiteExampleCard({ project }: { project: CatalogCardProject }) {
  if (!project.category || !project.designCode) return null;

  return (
    <Link
      href={`/site-ornekleri/${project.category.slug}/${project.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
    >
      <div className="relative overflow-hidden">
        <div className="relative aspect-[16/10] bg-slate-100">
          <Image
            src={`/site-example-previews/${project.designCode}.webp`}
            alt={`${project.title} site önizlemesi`}
            fill
            loading="lazy"
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute left-4 top-4">
          <ExampleKindBadge kind={project.kind} />
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-blue-600">{project.category.name}</span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-bold text-slate-600">
            {project.designCode}
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-950 transition group-hover:text-blue-700">
          {project.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.styleTags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          Tasarımı incele
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
