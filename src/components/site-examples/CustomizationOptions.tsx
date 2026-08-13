import type { DesignDna } from "@/lib/design-dna";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import Eyebrow from "./primitives/Eyebrow";
import NumberedRow from "./primitives/NumberedRow";

export default function CustomizationOptions({ dna }: { dna: DesignDna }) {
  return (
    <section className="mt-20 rounded-[14px] bg-[#F1F0ED] px-6 py-10 sm:px-10" aria-labelledby="customization-options">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow label={SECTION_EYEBROWS.customization} accent={dna.contextualAccent} />
          <h2 id="customization-options" className="mt-3 text-[30px] font-extrabold tracking-[-0.03em] text-[#0B1220]">
            Tasarım <em className="font-[family-name:var(--font-se-serif)] italic">başlangıç</em> noktasıdır.
          </h2>
        </div>
        <div>
          {dna.customizationOptions.map((option, index) => (
            <NumberedRow
              key={option.title}
              index={index + 1}
              title={option.title}
              description={option.description}
              accent={dna.contextualAccent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
