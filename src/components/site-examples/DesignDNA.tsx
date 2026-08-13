import type { DesignDna } from "@/lib/design-dna";
import { SECTION_EYEBROWS } from "@/lib/site-example-constants";
import ColorPalette from "./ColorPalette";
import DefinitionRow from "./primitives/DefinitionRow";
import Eyebrow from "./primitives/Eyebrow";
import TagChips from "./primitives/TagChips";

export default function DesignDNA({ dna }: { dna: DesignDna }) {
  return (
    <section id="dna" className="mt-20 scroll-mt-28 border-t border-black/10 pt-14" aria-labelledby="design-dna">
      <Eyebrow label={SECTION_EYEBROWS.dna} accent={dna.contextualAccent} />
      <h2 id="design-dna" className="mt-3 text-[34px] font-extrabold tracking-[-0.03em] text-[#0B1220] sm:text-[46px]">
        Referans tasarımın dili
      </h2>
      <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#39415A]">
        Canlı Framer referansındaki görsel kararlar, işletmenize uyarlanırken korunacak temel tasarım omurgasıdır.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <DefinitionRow label="STİL" value={dna.styleName} />
          <DefinitionRow label="TİPOGRAFİ" value={dna.typographyStyle} />
          <DefinitionRow label="MOTION" value={dna.interactionStyle} />
        </div>
        <div>
          <p className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
            Renk paleti
          </p>
          <div className="mt-4">
            <ColorPalette colors={dna.colorPalette} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
            Görsel yön
          </p>
          <p className="mt-3 text-[15px] leading-7 text-[#39415A]">{dna.visualDirection}</p>
        </div>
        <div>
          <p className="font-[family-name:var(--font-se-mono)] text-[11px] font-medium uppercase tracking-[0.1em] text-[#6C7486]">
            UI karakteri
          </p>
          <div className="mt-3">
            <TagChips items={dna.uiCharacteristics} accent={dna.contextualAccent} />
          </div>
        </div>
      </div>
    </section>
  );
}
