export default function ModuleCard({
  index,
  tag,
  title,
  description,
  accent,
}: {
  index: number;
  tag: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <article
      className="rounded-[14px] border border-black/10 bg-white p-6 transition hover:bg-[#FBFBFA]"
      style={accent ? ({ "--se-accent": accent } as React.CSSProperties) : undefined}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[var(--se-accent,#2B4BF2)]/10 font-[family-name:var(--font-se-mono)] text-[11px] font-semibold text-[var(--se-accent,#2B4BF2)]">
        {String(index).padStart(2, "0")}
      </span>
      <p className="mt-3 font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
        {tag}
      </p>
      <h3 className="mt-1.5 text-[16px] font-bold tracking-[-0.01em] text-[#0B1220]">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-[#39415A]">{description}</p>
    </article>
  );
}
