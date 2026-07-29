import { ArrowUpRight, CalendarDays } from "lucide-react";

type SiteExampleVisualProps = {
  title: string;
  sector: string;
  designCode: string;
  variant?: "card" | "desktop" | "mobile";
};

const PALETTES: Record<string, { background: string; accent: string; surface: string; text: string }> = {
  PET: { background: "#fff7ed", accent: "#f97316", surface: "#ffffff", text: "#431407" },
  KUA: { background: "#f8fafc", accent: "#0f172a", surface: "#ffffff", text: "#0f172a" },
  GUZ: { background: "#fdf2f8", accent: "#db2777", surface: "#ffffff", text: "#500724" },
  KLI: { background: "#ecfeff", accent: "#0891b2", surface: "#ffffff", text: "#164e63" },
  RES: { background: "#1c1917", accent: "#f59e0b", surface: "#292524", text: "#fff7ed" },
  EML: { background: "#eff6ff", accent: "#2563eb", surface: "#ffffff", text: "#172554" },
  OTO: { background: "#111827", accent: "#ef4444", surface: "#1f2937", text: "#f9fafb" },
  MIM: { background: "#f5f5f4", accent: "#78716c", surface: "#ffffff", text: "#1c1917" },
};

export default function SiteExampleVisual({
  title,
  sector,
  designCode,
  variant = "card",
}: SiteExampleVisualProps) {
  const prefix = designCode.split("-")[0];
  const palette = PALETTES[prefix] ?? PALETTES.EML;
  const isMobile = variant === "mobile";
  const isCard = variant === "card";
  const dark = ["RES", "OTO"].includes(prefix);

  return (
    <div
      className={`relative overflow-hidden ${isMobile ? "aspect-[9/16] rounded-[2rem]" : isCard ? "aspect-[16/10]" : "aspect-[16/9] rounded-2xl"}`}
      style={{ background: palette.background, color: palette.text }}
      role="img"
      aria-label={`${title} için temsili ${isMobile ? "mobil" : "masaüstü"} tasarım önizlemesi`}
    >
      <div className={`flex items-center justify-between border-b px-[5%] ${isCard ? "py-2" : "py-3"}`} style={{ borderColor: `${palette.accent}22` }}>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          )}
          <span className={`${isCard ? "text-[8px]" : "text-xs"} font-bold tracking-[0.16em]`}>
            {designCode}
          </span>
        </div>
        <div className={`flex gap-3 ${isCard ? "text-[6px]" : "text-[10px]"} font-semibold opacity-60`}>
          <span>Hizmetler</span>
          {!isMobile && <span>Hakkımızda</span>}
          <span>İletişim</span>
        </div>
      </div>

      <div className={`grid h-[66%] items-center ${isMobile ? "grid-cols-1 px-[10%]" : "grid-cols-[1.12fr_.88fr] px-[7%]"}`}>
        <div className={isMobile ? "pt-8" : ""}>
          <p className={`${isCard ? "text-[7px]" : "text-[10px]"} mb-2 font-bold uppercase tracking-[0.2em]`} style={{ color: palette.accent }}>
            {sector}
          </p>
          <h3 className={`${isMobile ? "text-2xl" : isCard ? "text-lg" : "text-4xl"} max-w-xl font-black leading-[1.03] tracking-[-0.04em]`}>
            {title.split("—")[0]}
            <span className="block opacity-60">için yeni bir dijital başlangıç.</span>
          </h3>
          <p className={`${isCard ? "mt-2 text-[7px]" : "mt-4 text-xs"} max-w-sm leading-relaxed opacity-60`}>
            Markanıza göre özelleştirilen, hızlı ve mobil uyumlu web deneyimi.
          </p>
          <div className={`${isCard ? "mt-3" : "mt-5"} flex items-center gap-2`}>
            <span
              className={`${isCard ? "px-2 py-1 text-[7px]" : "px-4 py-2 text-xs"} inline-flex items-center gap-1 rounded-full font-bold text-white`}
              style={{ background: palette.accent }}
            >
              Bilgi Al <ArrowUpRight className={isCard ? "h-2 w-2" : "h-3 w-3"} />
            </span>
            <span className={`${isCard ? "text-[7px]" : "text-xs"} inline-flex items-center gap-1 font-semibold opacity-60`}>
              <CalendarDays className={isCard ? "h-2 w-2" : "h-3 w-3"} /> Randevu
            </span>
          </div>
        </div>

        {!isMobile && (
          <div className="relative flex h-[78%] items-center justify-center">
            <div
              className="absolute h-[80%] w-[72%] rotate-6 rounded-[28%_42%_35%_45%]"
              style={{ background: `${palette.accent}20` }}
            />
            <div
              className={`relative grid h-[72%] w-[66%] place-items-center rounded-[2rem] border shadow-xl ${dark ? "shadow-black/20" : "shadow-slate-400/20"}`}
              style={{ background: palette.surface, borderColor: `${palette.accent}33` }}
            >
              <span className={`${isCard ? "text-3xl" : "text-6xl"} font-black opacity-15`}>
                {prefix}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-x-[6%] bottom-[5%] grid grid-cols-3 gap-2">
        {["Hızlı", "Mobil", "Size özel"].map((label) => (
          <div
            key={label}
            className={`${isCard ? "rounded-md px-2 py-1 text-[6px]" : "rounded-xl px-3 py-2 text-[10px]"} border font-semibold`}
            style={{ background: `${palette.surface}aa`, borderColor: `${palette.accent}22` }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
