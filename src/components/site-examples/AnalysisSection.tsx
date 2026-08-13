import type { DesignDna } from "@/lib/design-dna";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import Eyebrow from "./primitives/Eyebrow";
import NumberedRow from "./primitives/NumberedRow";

export default function AnalysisSection({ dna }: { dna: DesignDna }) {
  const midpoint = Math.ceil(dna.keyDecisions.length / 2);
  const columnA = dna.keyDecisions.slice(0, midpoint);
  const columnB = dna.keyDecisions.slice(midpoint);

  return (
    <section className="mt-20 border-t border-black/10 pt-14" aria-labelledby="analysis-section">
      <Eyebrow label={SECTION_EYEBROWS.analysis} accent={dna.contextualAccent} />
      <h2 id="analysis-section" className="mt-3 max-w-3xl text-[34px] font-extrabold tracking-[-0.03em] text-[#0B1220] sm:text-[46px]">
        Sayfanın öne çıkan tasarım kararları
      </h2>
      <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#39415A]">
        {dna.keyDecisions.length} karar, bu sayfanın neden özenli göründüğünü açıklıyor.
      </p>

      <div className="mt-8 grid gap-x-12 lg:grid-cols-2">
        <div>
          {columnA.map((decision, index) => (
            <NumberedRow
              key={decision.title}
              index={index + 1}
              title={decision.title}
              description={decision.description}
              accent={dna.contextualAccent}
            />
          ))}
        </div>
        <div>
          {columnB.map((decision, index) => (
            <NumberedRow
              key={decision.title}
              index={midpoint + index + 1}
              title={decision.title}
              description={decision.description}
              accent={dna.contextualAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
