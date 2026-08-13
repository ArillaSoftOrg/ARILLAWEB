import type { DesignDna } from "@/lib/design-dna";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import Eyebrow from "./primitives/Eyebrow";
import NumberedCard from "./primitives/NumberedCard";

export default function SuitableFor({ dna }: { dna: DesignDna }) {
  return (
    <section className="mt-20 border-t border-black/10 pt-14" aria-labelledby="suitable-for">
      <div className="max-w-3xl">
        <Eyebrow label={SECTION_EYEBROWS.suitableFor} accent={dna.contextualAccent} />
        <h2 id="suitable-for" className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] text-[#0B1220] sm:text-[38px]">
          Bu tasarım kimlere uygun?
        </h2>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dna.suitableFor.map((item, index) => (
          <NumberedCard
            key={item.title}
            index={index + 1}
            title={item.title}
            description={item.description}
            accent={dna.contextualAccent}
          />
        ))}
      </div>
    </section>
  );
}
