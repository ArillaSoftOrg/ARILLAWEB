export default function NumberedCard({
  index,
  title,
  description,
  accent,
}: {
  index: number;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <article className="rounded-[10px] border border-black/10 bg-white p-5">
      <span
        className="font-[family-name:var(--font-se-mono)] text-[13px] font-medium text-[var(--se-accent,#2B4BF2)]"
        style={accent ? ({ "--se-accent": accent } as React.CSSProperties) : undefined}
      >
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-[16px] font-bold tracking-[-0.01em] text-[#0B1220]">{title}</h3>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[#39415A]">{description}</p>
    </article>
  );
}
