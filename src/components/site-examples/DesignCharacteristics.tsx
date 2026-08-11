import { CheckCircle2, LayoutGrid, MousePointerClick, Smartphone } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";

export default function DesignCharacteristics({ dna }: { dna: DesignDna }) {
  return (
    <section className="mt-20" aria-labelledby="design-characteristics">
      <SectionIntro
        eyebrow="Key Design Characteristics"
        title="Sayfanın öne çıkan tasarım kararları"
        description="Bu bölüm eski genel özellik kartlarının yerine, seçilen Framer referansının gerçek arayüz karakterini açıklar."
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <CharacteristicGroup title="Arayüz" items={dna.uiCharacteristics} icon={CheckCircle2} />
        <CharacteristicGroup title="Yerleşim" items={dna.layoutCharacteristics} icon={LayoutGrid} />
        <div className="grid gap-5">
          <CompactCharacteristic title="Etkileşim" body={dna.interactionStyle} icon={MousePointerClick} />
          <CharacteristicGroup title="Mobil" items={dna.mobileCharacteristics} icon={Smartphone} compact />
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">{eyebrow}</p>
      <h2 id="design-characteristics" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function CharacteristicGroup({
  title,
  items,
  icon: Icon,
  compact = false,
}: {
  title: string;
  items: string[];
  icon: typeof CheckCircle2;
  compact?: boolean;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <Icon className="h-5 w-5 text-blue-600" />
      <h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3>
      <ul className={`${compact ? "mt-4" : "mt-5"} space-y-3`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CompactCharacteristic({ title, body, icon: Icon }: { title: string; body: string; icon: typeof MousePointerClick }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <Icon className="h-5 w-5 text-blue-600" />
      <h3 className="mt-4 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}
