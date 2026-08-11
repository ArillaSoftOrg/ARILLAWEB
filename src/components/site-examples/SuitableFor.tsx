import { UsersRound } from "lucide-react";
import type { DesignDna } from "@/lib/design-dna";

export default function SuitableFor({ dna }: { dna: DesignDna }) {
  return (
    <section className="mt-20" aria-labelledby="suitable-for">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Suitable For</p>
        <h2 id="suitable-for" className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Bu tasarım kimlere uygun?
        </h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dna.suitableFor.map((item) => (
          <article key={item} className="rounded-lg border border-slate-200 bg-white p-5">
            <UsersRound className="h-5 w-5 text-blue-600" />
            <h3 className="mt-4 text-base font-black text-slate-950">{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
