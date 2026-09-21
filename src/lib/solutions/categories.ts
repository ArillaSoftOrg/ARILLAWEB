import { Globe, Search, LayoutDashboard, Workflow, Store, type LucideIcon } from "lucide-react";
import type { SolutionCategory, SolutionCategoryId } from "./types";

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: "web-commerce",
    name: { tr: "Web & Ticaret", en: "Web & Commerce" },
    shortDescription: {
      tr: "Kurumsal siteler, e-ticaret ve özel web uygulamaları.",
      en: "Corporate sites, e-commerce, and custom web applications.",
    },
  },
  {
    id: "seo-geo",
    name: { tr: "SEO & GEO", en: "SEO & GEO" },
    shortDescription: {
      tr: "Arama motorları ve yapay zekâ arama sistemlerinde görünürlük.",
      en: "Visibility in search engines and AI-powered search systems.",
    },
  },
  {
    id: "business-systems",
    name: { tr: "İş Sistemleri", en: "Business Systems" },
    shortDescription: {
      tr: "Randevu, rezervasyon, müşteri yönetimi ve yönetim panelleri.",
      en: "Appointments, reservations, customer management, and admin panels.",
    },
  },
  {
    id: "automation-integrations",
    name: { tr: "Otomasyon & Entegrasyon", en: "Automation & Integrations" },
    shortDescription: {
      tr: "WhatsApp, ödeme, kargo, CRM ve API entegrasyonları.",
      en: "WhatsApp, payments, shipping, CRM, and API integrations.",
    },
  },
  {
    id: "sector-solutions",
    name: { tr: "Sektörel Çözümler", en: "Sector Solutions" },
    shortDescription: {
      tr: "QR menüden klinik ve otel sistemlerine sektöre özel çözümler.",
      en: "From QR menus to clinic and hotel systems — solutions built for your sector.",
    },
  },
];

export const SOLUTION_CATEGORY_ICONS: Record<SolutionCategoryId, LucideIcon> = {
  "web-commerce": Globe,
  "seo-geo": Search,
  "business-systems": LayoutDashboard,
  "automation-integrations": Workflow,
  "sector-solutions": Store,
};

export function getCategoryById(id: SolutionCategoryId): SolutionCategory {
  const category = SOLUTION_CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown solution category: ${id}`);
  return category;
}
