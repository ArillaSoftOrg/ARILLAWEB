export default function NumberedRow({
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
    <div className="flex gap-6 border-t border-black/10 py-[26px] first:border-t-0 first:pt-0">
      <span
        className="w-[34px] shrink-0 font-[family-name:var(--font-se-mono)] text-[13px] font-medium text-[var(--se-accent,#2B4BF2)]"
        style={accent ? ({ "--se-accent": accent } as React.CSSProperties) : undefined}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0B1220]">{title}</h3>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-[#39415A]">{description}</p>
      </div>
    </div>
  );
}
