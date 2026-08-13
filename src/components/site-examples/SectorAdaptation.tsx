import { ArrowRight } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import Eyebrow from "./primitives/Eyebrow";
import ModuleCard from "./primitives/ModuleCard";
import StickyColumn from "./primitives/StickyColumn";

export default function SectorAdaptation({ dna, sector }: { dna: DesignDna; sector: string }) {
  return (
    <section id="uyarlama" className="mt-20 scroll-mt-28 border-t border-black/10 pt-14" aria-labelledby="sector-adaptation">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <StickyColumn>
          <Eyebrow label={SECTION_EYEBROWS.adaptation} accent={dna.contextualAccent} />
          <h2 id="sector-adaptation" className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] text-[#0B1220] sm:text-[44px]">
            {sector} için nasıl uyarlanır?
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#39415A]">
            Referans tasarım birebir kopyalanmaz; sektörünüzün içerik, hizmet ve dönüşüm ihtiyaçlarına göre yeniden düzenlenir.
          </p>
          <a
            href="#tasarim-talebi"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1220] underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
          >
            Kapsamı birlikte belirleyelim <ArrowRight className="h-4 w-4" />
          </a>
        </StickyColumn>

        <div className="grid gap-3 sm:grid-cols-2">
          {dna.sectorFeatures.map((feature, index) => (
            <ModuleCard
              key={feature.title}
              index={index + 1}
              tag={feature.title.split(" ")[0]?.toUpperCase() ?? ""}
              title={feature.title}
              description={feature.description}
              accent={dna.contextualAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
