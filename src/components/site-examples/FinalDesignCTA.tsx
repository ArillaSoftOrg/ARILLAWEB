import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FINAL_CTA_CONTENT } from "@/lib/site-example-constants";

export default function FinalDesignCTA({ title }: { title: string }) {
  return (
    <section
      className="mt-20 rounded-[16px] bg-[#0B1220] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10"
      style={{
        backgroundImage:
          "radial-gradient(80% 120% at 15% 0%, rgba(43,75,242,0.22), transparent 55%), radial-gradient(70% 100% at 100% 100%, rgba(107,59,240,0.22), transparent 60%)",
      }}
    >
      <div>
        <p className="text-sm font-bold text-[#8CA0FF]">{FINAL_CTA_CONTENT.eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">
          {title} yaklaşımını işletmenize göre birlikte uyarlayalım.
        </h2>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/70">
          {FINAL_CTA_CONTENT.bullets.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 font-[family-name:var(--font-se-mono)] text-xs uppercase tracking-[0.08em] text-white/40">
          {FINAL_CTA_CONTENT.responseTime}
        </p>
      </div>
      <a
        href="#tasarim-talebi"
        className="mt-7 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[11px] bg-white px-6 text-sm font-black text-[#0B1220] transition hover:bg-[#EDEFF5] lg:mt-0"
      >
        Tasarım için bilgi al <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}
