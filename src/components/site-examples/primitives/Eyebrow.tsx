export default function Eyebrow({ label, accent }: { label: string; accent?: string }) {
  return (
    <p
      className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--se-accent,#6C7486)]"
      style={accent ? ({ "--se-accent": accent } as React.CSSProperties) : undefined}
    >
      {label}
    </p>
  );
}
