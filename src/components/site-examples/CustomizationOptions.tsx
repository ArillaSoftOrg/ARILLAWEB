import { SlidersHorizontal } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";

export default function CustomizationOptions({ dna }: { dna: DesignDna }) {
  return (
    <section className="mt-20 rounded-lg bg-blue-50 px-6 py-10 sm:px-10" aria-labelledby="customization-options">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Customization Options</p>
      <h2 id="customization-options" className="mt-3 text-3xl font-black tracking-tight text-slate-950">
        Tasarım başlangıç noktasıdır.
      </h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dna.customizationOptions.map((option) => (
          <div key={option} className="flex items-center gap-3 rounded-lg bg-white p-4 text-sm font-bold text-slate-700">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-blue-600" />
            {option}
          </div>
        ))}
      </div>
    </section>
  );
}
