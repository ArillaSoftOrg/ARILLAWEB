import type { Locale } from "@/lib/solutions";
import "@/lib/home-fonts";

const COPY: Record<Locale, string> = {
  tr: "Gösterilen fiyat, teslim süresi ve revizyon hakları geçici örnek değerlerdir; kesin teklif proje kapsamına göre birlikte belirlenir.",
  en: "The price, delivery time, and revision count shown are temporary placeholder estimates; final terms are set together based on project scope.",
};

export function PriceDisclaimer({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <p className={`font-home-sans text-xs leading-5 text-home-text-muted ${className}`}>{COPY[locale]}</p>
  );
}
