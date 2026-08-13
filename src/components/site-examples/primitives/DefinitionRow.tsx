export default function DefinitionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-black/10 py-[18px] first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="w-[120px] shrink-0 font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
        {label}
      </span>
      <span className="text-[15px] leading-6 text-[#0B1220]">{value}</span>
    </div>
  );
}
