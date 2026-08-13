export default function TagChips({ items, accent }: { items: string[]; accent?: string }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      style={accent ? ({ "--se-accent": accent } as React.CSSProperties) : undefined}
    >
      {items.map((item) => (
        <span
          key={item}
          className="rounded-[7px] border border-black/10 px-[11px] py-[6px] text-[13px] font-semibold text-[#0B1220] transition hover:border-[var(--se-accent,#0B1220)]/40"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
