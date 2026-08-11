import type { DesignColor } from "@/lib/design-dna";

export default function ColorPalette({ colors }: { colors: DesignColor[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color) => (
        <div key={`${color.name}-${color.value}`} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <span
            className="h-12 w-12 shrink-0 rounded-md border border-black/10"
            style={{ backgroundColor: color.value }}
            aria-label={`${color.name} renk örneği`}
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-slate-950">{color.name}</span>
            <span className="block font-mono text-xs font-bold uppercase text-slate-500">{color.value}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
