import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function FinalDesignCTA({ title }: { title: string }) {
  return (
    <section className="mt-20 rounded-lg bg-slate-950 px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
      <div>
        <p className="text-sm font-bold text-cyan-300">Bu tasarım yönü size uygun mu?</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight">
          {title} yaklaşımını işletmenize göre birlikte uyarlayalım.
        </h2>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
          {["Ücretsiz ilk görüşme", "Markanıza özel uyarlama", "Mevcut referansa sadık tasarım dili"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <a
        href="#tasarim-talebi"
        className="mt-7 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-black text-slate-950 transition hover:bg-slate-100 lg:mt-0"
      >
        Tasarım için bilgi al <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}
