/**
 * Structural copy shared by every design on the Site Örnekleri detail route.
 * Nothing here is sector- or design-specific — per-design content lives in
 * `DesignDna` (src/lib/design-dna.ts) instead. Centralized here so it's
 * edited once rather than duplicated across 24 seed entries.
 */

export const SECTION_EYEBROWS = {
  preview: "02 — ÖNİZLEME",
  dna: "03 — TASARIM DNA",
  analysis: "04 — ANALİZ",
  adaptation: "05 — UYARLAMA",
  customization: "06 — ÖZELLEŞTİRME",
  suitableFor: "07 — UYGUNLUK",
} as const;

export const HERO_CONTENT = {
  primaryCtaLabel: "Canlı tasarımı incele ↓",
  primaryCtaHref: "#onizleme",
  secondaryCtaLabel: "Tasarım dilini gör",
  secondaryCtaHref: "#dna",
  disclaimer: "Bu referans bir başlangıç noktasıdır; içerik ve marka kimliğiniz doğrultusunda yeniden uyarlanır.",
  stats: {
    adaptationDurationLabel: "UYARLAMA SÜRESİ",
    adaptationDuration: "7-10 Gün",
    platformLabel: "PLATFORM",
    platform: "Özel geliştirme",
    styleLabel: "STİL",
  },
} as const;

export const FINAL_CTA_CONTENT = {
  eyebrow: "Bu tasarım yönünü beğendiniz mi?",
  bullets: ["Ücretsiz ilk görüşme", "Markanıza özel uyarlama", "Mevcut referansa sadık tasarım dili"],
  responseTime: "Ortalama yanıt süresi: 1 iş günü",
} as const;
