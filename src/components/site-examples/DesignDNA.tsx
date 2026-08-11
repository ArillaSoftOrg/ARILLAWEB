import { Layers3, MousePointer2, Palette, Smartphone, Type, WandSparkles } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";
import ColorPalette from "./ColorPalette";

export default function DesignDNA({ dna }: { dna: DesignDna }) {
  const facts = [
    { label: "Stil", value: dna.styleName, icon: WandSparkles },
    { label: "Tipografi", value: dna.typographyStyle, icon: Type },
    { label: "Görsel yön", value: dna.visualDirection, icon: Palette },
    { label: "Yerleşim", value: dna.layoutCharacteristics.slice(0, 2).join(" · "), icon: Layers3 },
    { label: "Etkileşim", value: dna.interactionStyle, icon: MousePointer2 },
    { label: "Mobil", value: dna.mobileCharacteristics.slice(0, 2).join(" · "), icon: Smartphone },
  ];

  return (
    <section className="mt-20 scroll-mt-28" aria-labelledby="design-dna">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Design DNA</p>
        <h2 id="design-dna" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Referans tasarımın dili
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Canlı Framer referansındaki görsel kararlar, işletmenize uyarlanırken korunacak temel tasarım omurgasıdır.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {facts.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-slate-200 bg-white p-5">
            <Icon className="h-5 w-5 text-blue-600" />
            <h3 className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-slate-500">{label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-black text-slate-950">Renk paleti</h3>
        <ColorPalette colors={dna.colorPalette} />
      </div>
    </section>
  );
}
