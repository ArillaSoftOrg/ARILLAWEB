// Non-text structural data for the redesigned homepage sections: icon
// mappings, stable IDs, and placeholder figures. All user-facing copy lives
// in messages/{tr,en}.json under pages.home.sections.* — nothing here is
// rendered as a string directly.
import {
  Search,
  ArrowLeftRight,
  Link2,
  LayoutDashboard,
  Building2,
  ShoppingCart,
  AppWindow,
  Rocket,
  CalendarCheck,
  BedDouble,
  Users,
  Settings2,
  Gauge,
  Workflow,
  Stethoscope,
  Hotel,
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  Truck,
  MessageCircle,
  UserCheck,
  Bot,
  BarChart3,
  Webhook,
  Mail,
  Link as LinkIcon,
  ListChecks,
  LayoutTemplate,
  Palette,
  Code2,
  Server,
  Megaphone,
  Bug,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export const BUSINESS_TOOL_CONCEPT_ICONS: Record<string, LucideIcon> = {
  discover: Search,
  convert: ArrowLeftRight,
  connect: Link2,
  manage: LayoutDashboard,
};

// Dashboard screenshots for the WebsiteAsBusinessTool right-side visual —
// one per concept, all 1536x1024 (3:2). Sourced from /public/Ekran{1-4}.png.
export const BUSINESS_TOOL_CONCEPT_IMAGES: Record<string, string> = {
  discover: "/Ekran1.png",
  convert: "/Ekran2.png",
  connect: "/Ekran3.png",
  manage: "/Ekran4.png",
};

export const WEB_COMMERCE_SOLUTION_ICONS: Record<string, LucideIcon> = {
  corporate: Building2,
  ecommerce: ShoppingCart,
  webapps: AppWindow,
  landing: Rocket,
};

// HowWeWork stacked process cards — one icon per project stage, keyed by
// the same stable step `id` used in messages/{tr,en}.json.
export const HOW_WE_WORK_STEP_ICONS: Record<string, LucideIcon> = {
  kesif: Search,
  kapsam: ListChecks,
  "yapi-ux": LayoutTemplate,
  "gorsel-tasarim": Palette,
  frontend: Code2,
  "sistemler-entegrasyonlar": Server,
  "icerik-gorunurluk": Megaphone,
  "test-revizyon": Bug,
  "yayin-destek": Rocket,
};

export const BUSINESS_SYSTEMS_CAPABILITY_ICONS: Record<string, LucideIcon> = {
  appointments: CalendarCheck,
  reservations: BedDouble,
  crm: Users,
  admin: Settings2,
  dashboards: Gauge,
  workflows: Workflow,
};

// Central "system core" node icon for the BusinessSystems module-builder
// diagram — distinct from the 6 module icons above.
export const BUSINESS_SYSTEMS_CORE_ICON: LucideIcon = Cpu;

// Radial positions (percent of the diagram container, and matching
// coordinates in the 600x480 connector-line SVG viewBox) for the 6 module
// nodes around the core, in the same clockwise order as the capabilities
// array: appointments (top) -> reservations -> crm -> admin -> dashboards
// (bottom-left) -> workflows (top-left) -> back to appointments. This order
// also drives the first-view assembly sequence.
export const BUSINESS_SYSTEMS_NODE_POSITIONS = [
  { xPct: 50, yPct: 14.6, xSvg: 300, ySvg: 70 },
  { xPct: 81.7, yPct: 32.3, xSvg: 490, ySvg: 155 },
  { xPct: 81.7, yPct: 67.7, xSvg: 490, ySvg: 325 },
  { xPct: 50, yPct: 85.4, xSvg: 300, ySvg: 410 },
  { xPct: 18.3, yPct: 67.7, xSvg: 110, ySvg: 325 },
  { xPct: 18.3, yPct: 32.3, xSvg: 110, ySvg: 155 },
] as const;

export const BUSINESS_SYSTEMS_CORE_POSITION = { xPct: 50, yPct: 50, xSvg: 300, ySvg: 240 } as const;

export const INDUSTRY_SECTOR_ICONS: Record<string, LucideIcon> = {
  clinic: Stethoscope,
  hotel: Hotel,
  restaurant: UtensilsCrossed,
  ecommerce: ShoppingBag,
};

export const AUTOMATION_PIPELINE_ICONS: LucideIcon[] = [
  ShoppingCart,
  CreditCard,
  Truck,
  MessageCircle,
  UserCheck,
];

export const AUTOMATION_CAPABILITY_ICONS: LucideIcon[] = [
  MessageCircle,
  CreditCard,
  Truck,
  LinkIcon,
  Webhook,
  Mail,
  Users,
  BarChart3,
];

export const GROWTH_FOUNDATION_ICONS: Record<string, LucideIcon> = {
  seo: Search,
  geo: Bot,
  performance: Gauge,
  analytics: BarChart3,
};

// TEMPORARY PLACEHOLDER — replace with real pricing before launch.
// Values are structured (amount + ISO currency), never pre-formatted
// strings, so display formatting can follow the active locale via
// Intl.NumberFormat.
export const PLACEHOLDER_PRICING: Record<string, { amount: number; currency: string } | null> = {
  discovery: null,
  starter: { amount: 19900, currency: "TRY" },
  business: { amount: 39900, currency: "TRY" },
  custom: null,
};

// Pricing card CTA destinations. Free Discovery routes to the contact page
// (booking a conversation); the paid/custom plans route to the quote form.
export const PRICING_CTA_HREFS: Record<string, string> = {
  discovery: "/kurumsal/iletisim",
  starter: "/teklif-al",
  business: "/teklif-al",
  custom: "/teklif-al",
};

// Visual treatment per plan: Free Discovery stays neutral/low-friction,
// Business is the featured lime-accent plan, Custom feels premium on a
// dark surface rather than a fourth commodity package.
export const PRICING_PLAN_VISUALS: Record<
  string,
  { surface: "light" | "neutral" | "dark" | "accent"; buttonVariant: "dark" | "lime" | "secondary" }
> = {
  discovery: { surface: "neutral", buttonVariant: "secondary" },
  starter: { surface: "light", buttonVariant: "secondary" },
  business: { surface: "accent", buttonVariant: "dark" },
  custom: { surface: "dark", buttonVariant: "lime" },
};
