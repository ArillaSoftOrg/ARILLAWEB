import type { ReactNode } from "react";
import type { ExampleKind } from "./ExampleKindBadge";
import ExampleKindBadge from "./ExampleKindBadge";
import { HERO_CONTENT } from "@/lib/site-example-constants";

type HeroSectionProps = {
  kind: ExampleKind;
  sectorName: string;
  designCode: string;
  title: string;
  summary: string;
  styleName: string;
  accent: string;
  children: ReactNode;
};

export default function HeroSection({
  kind,
  sectorName,
  designCode,
  title,
  summary,
  styleName,
  accent,
  children,
}: HeroSectionProps) {
  const [titleLead, titleAccent] = title.includes(" — ") ? title.split(" — ") : [title, ""];

  return (
    <section className="grid items-start gap-10 pb-16 pt-4 lg:grid-cols-[1.12fr_0.88fr] lg:gap-[72px]">
      <div>
        <p className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
          Tasarım Referansları / {sectorName} / {styleName}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <ExampleKindBadge kind={kind} />
          <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-[#39415A]">
            {sectorName}
          </span>
          <span className="rounded-[6px] bg-[#0B1220] px-2.5 py-1 font-[family-name:var(--font-se-mono)] text-xs font-bold text-white">
            {designCode}
          </span>
        </div>

        <h1 className="mt-5 max-w-2xl text-[48px] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#0B1220] sm:text-[76px]">
          {titleLead}
          {titleAccent && (
            <>
              {" — "}
              <em className="font-[family-name:var(--font-se-serif)] italic">{titleAccent}</em>
            </>
          )}
        </h1>

        <p className="mt-5 max-w-xl text-[17px] leading-[1.62] text-[#39415A]">{summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={HERO_CONTENT.primaryCtaHref}
            className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-[#0B1220] px-6 text-[15px] font-semibold text-white shadow-[0_8px_24px_-12px_rgba(11,18,32,0.55)] transition hover:bg-[#1B2540]"
          >
            {HERO_CONTENT.primaryCtaLabel}
          </a>
          <a
            href={HERO_CONTENT.secondaryCtaHref}
            className="inline-flex h-[50px] items-center justify-center rounded-[10px] border border-black/10 bg-white px-6 text-[15px] font-semibold text-[#0B1220] transition hover:border-black/25"
          >
            {HERO_CONTENT.secondaryCtaLabel}
          </a>
        </div>

        <p className="mt-4 max-w-md text-xs leading-5 text-[#6C7486]">{HERO_CONTENT.disclaimer}</p>

        <div className="mt-8 flex flex-wrap gap-8 border-t border-black/10 pt-6">
          <Stat label={HERO_CONTENT.stats.styleLabel} value={styleName} accent={accent} />
          <Stat label={HERO_CONTENT.stats.adaptationDurationLabel} value={HERO_CONTENT.stats.adaptationDuration} accent={accent} />
          <Stat label={HERO_CONTENT.stats.platformLabel} value={HERO_CONTENT.stats.platform} accent={accent} />
        </div>
      </div>

      {children}
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div>
      <p
        className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--se-accent)]"
        style={{ "--se-accent": accent } as React.CSSProperties}
      >
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-bold text-[#0B1220]">{value}</p>
    </div>
  );
}
