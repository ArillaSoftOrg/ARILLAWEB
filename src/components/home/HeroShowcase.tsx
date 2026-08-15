import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getSiteExamplePreviewSrc } from "@/lib/site-example-display";

const FEATURED_EXAMPLE = {
  designCode: "RES-01",
  title: "Restoran — Modern Dönüşüm",
  href: "/site-ornekleri/restoran-kafe/restoran-modern-donusum",
};

export default function HeroShowcase() {
  return (
    <div className="relative w-full max-w-[480px]">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] blur-2xl"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
      />

      <Link
        href={FEATURED_EXAMPLE.href}
        className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 border border-slate-200">
            arillasoft.com/site-ornekleri
          </span>
        </div>

        {/* Preview image */}
        <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
          <Image
            src={getSiteExamplePreviewSrc(FEATURED_EXAMPLE.designCode)}
            alt={`${FEATURED_EXAMPLE.title} site önizlemesi`}
            fill
            priority
            className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 90vw, 480px"
          />
          <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            Demo / Konsept
          </span>
        </div>
      </Link>

      <p className="mt-3 text-center text-xs text-slate-500">
        Örnek proje arayüzü — sektörünüze özel tasarımları{" "}
        <Link href="/site-ornekleri" className="font-semibold text-violet-600 underline underline-offset-2">
          inceleyin
        </Link>
      </p>
    </div>
  );
}
