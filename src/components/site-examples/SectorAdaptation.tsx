import { ArrowRight, Building2 } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";

export default function SectorAdaptation({ dna, sector }: { dna: DesignDna; sector: string }) {
  return (
    <section className="mt-20" aria-labelledby="sector-adaptation">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Sector Adaptation</p>
          <h2 id="sector-adaptation" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            {sector} için nasıl uyarlanır?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Referans tasarım birebir kopyalanmaz; sektörünüzün içerik, hizmet ve dönüşüm ihtiyaçlarına göre yeniden düzenlenir.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {dna.sectorFeatures.map((feature) => (
            <article key={feature} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-5">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <h3 className="text-sm font-black text-slate-950">{feature}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Marka içeriğiniz ve çalışma şeklinizle uyumlu hale getirilir.
                </p>
              </div>
              <ArrowRight className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
