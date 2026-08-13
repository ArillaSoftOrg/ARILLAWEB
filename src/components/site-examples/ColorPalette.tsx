import type { DesignColor } from "@/lib/design-dna";

export default function ColorPalette({ colors }: { colors: DesignColor[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {colors.map((color) => (
        <div key={`${color.name}-${color.value}`}>
          <span
            className="block h-[132px] w-full rounded-[10px] border border-black/10"
            style={{ backgroundColor: color.value }}
            aria-label={`${color.name} renk örneği`}
          />
          <span className="mt-2 block font-[family-name:var(--font-se-mono)] text-[11.5px] font-medium uppercase text-[#0B1220]">
            {color.value}
          </span>
          <span className="block text-xs text-[#6C7486]">{color.name}</span>
        </div>
      ))}
    </div>
  );
}
