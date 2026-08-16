"use client";

import AnimatedBrand from "@/components/AnimatedBrand";
import SupportChatWidget from "@/components/SupportChatWidget";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import BlogMediaCard from "@/components/blog/BlogMediaCard";
import HeroShowcase from "@/components/home/HeroShowcase";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQSection from "@/components/sections/FAQSection";
import type { BlogPost } from "@/lib/blog-data";
import { getSiteExampleDisplay } from "@/lib/site-example-display";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import {
  QrCode,
  Smartphone,
  BarChart3,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Code2,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
  Layers,
  Cpu,
  Lock,
  Palette,
  RefreshCw,
  MessageSquare,
  Wifi,
  DollarSign,
  Package,
  ExternalLink,
  Sparkles,
  MonitorSmartphone,
  BookOpen,
  Wrench,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const QR_FEATURES = [
  {
    icon: Smartphone,
    title: "Mobil Öncelikli Tasarım",
    description: "Her cihazda mükemmel görünen, dokunmatik optimize edilmiş dijital menü deneyimi.",
    color: "#7c3aed",
  },
  {
    icon: RefreshCw,
    title: "Anlık Güncelleme",
    description: "Fiyat ve içerik değişikliklerini saniyeler içinde yayınlayın. Baskı maliyeti sıfır.",
    color: "#06b6d4",
  },
  {
    icon: BarChart3,
    title: "Detaylı Analitik",
    description: "Hangi ürünlerin okunduğunu, sipariş örüntülerini ve zirve saatlerini takip edin.",
    color: "#10b981",
  },
  {
    icon: Globe,
    title: "Çoklu Dil Desteği",
    description: "Otomatik çeviri ile yabancı müşterilere kendi dillerinde hizmet sunun.",
    color: "#f59e0b",
  },
  {
    icon: Palette,
    title: "Tam Özelleştirme",
    description: "Markanızın renkleri, fontları ve görselleriyle tamamen kişiselleştirilmiş tasarım.",
    color: "#ec4899",
  },
  {
    icon: Wifi,
    title: "Çevrimdışı Modu",
    description: "İnternet kesintisinde bile menünüz erişilebilir kalır. Müşterilerinizi asla kaybetmeyin.",
    color: "#8b5cf6",
  },
];

const SERVICE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Palette,
  Shield,
  Code2,
  Zap,
  Lock,
  Wrench,
};

type DbService = {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
};

type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryButton: string;
  heroSecondaryButton: string;
  homepageIntro: string;
  whyChooseUsTitle: string;
  whyChooseUsText: string;
  homepageCTA: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: "Restoranınız İçin|Akıllı Dijital Menü Sistemi",
  heroSubtitle:
    "QR kod ile anında erişilen, anlık güncellenebilen, çok dilli dijital menü çözümü. Müşteri deneyimini dönüştürün, maliyetleri azaltın.",
  heroPrimaryButton: "Demo Talep Et",
  heroSecondaryButton: "Tüm Hizmetler",
  homepageIntro:
    "Web'den mobile, backend'den UI/UX tasarımına — uçtan uca dijital dönüşüm hizmetleri.",
  whyChooseUsTitle: "QR Menü Sistemi ile|Restoranınızı Dönüştürün",
  whyChooseUsText:
    "Masaya QR kodu koyun, müşterileriniz menüye anında ulaşsın. Baskı masrafı yok, güncelleme zahmeti yok.",
  homepageCTA: "Projenizi Birlikte|Netleştirelim",
};

const QR_PLAN_FEATURES = [
  "Sınırsız ürün ve kategori",
  "QR kod + NFC desteği",
  "Anlık menü güncelleme",
  "Çoklu şube yönetimi",
  "Gerçek zamanlı analitik",
  "Çoklu dil (10+ dil)",
  "Özel domain desteği",
  "7/24 teknik destek",
];


// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const heroEase = [0.2, 0.8, 0.2, 1] as const;

const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: heroEase },
  },
};

const heroStagger: Variants = {
  visible: { transition: { staggerChildren: 0.11 } },
};

const heroBenefitStagger: Variants = {
  visible: { transition: { staggerChildren: 0.07 } },
};

const heroVisualIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: heroEase, delay: 0.48 },
  },
};

// ─────────────────────────────────────────────
// Helper: Animated Section
// ─────────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  variants = stagger,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof stagger;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function renderGradientText(text: string) {
  const parts = text.split("|");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <span className="gradient-text">{parts[1]}</span>
      {parts[2] ?? ""}
    </>
  );
}

// ─────────────────────────────────────────────
// Why Us Section
// ─────────────────────────────────────────────
function WhyUsSection() {
  const items = [
    {
      title: "İhtiyaca göre özel geliştirme",
      description:
        "Her proje sıfırdan, işletmenizin gerçek ihtiyaçlarına göre tasarlanır.",
      icon: Wrench,
    },
    {
      title: "Büyümeye uygun ölçeklenebilir altyapı",
      description:
        "İşletmeniz büyüdükçe yeni modül ve entegrasyonlarla genişleyebilen bir mimari üzerine kuruyoruz.",
      icon: Cpu,
    },
    {
      title: "Yönetilebilir panel altyapısı",
      description:
        "Teknik bilgiye ihtiyaç duymadan yönetebileceğiniz sistemler kuruyoruz.",
      icon: Layers,
    },
    {
      title: "Yayın sonrası teknik destek",
      description:
        "Projeniz yayına geçtikten sonra da yanınızda olmaya devam ediyoruz.",
      icon: RefreshCw,
    },
  ];

  return (
    <section
      style={{ position: "relative" }}
      className="py-16 sm:py-20 lg:py-28"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
        }}
        className="px-5 sm:px-6"
      >
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            style={{
              textAlign: "center",
              marginBottom: "64px",
            }}
          >
            <h2
              className="text-role-section-heading"
              style={{
                margin: "0 0 16px 0",
              }}
            >
              Neden Arilla Soft?
            </h2>
            <p
              className="text-role-body-lg"
              style={{
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Kurumlar ve işletmeler için özel tasarlanmış, güvenilir yazılım çözümleri.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Icon size={24} color="#7c3aed" strokeWidth={2} />
                  <h3
                    className="text-role-subheading"
                    style={{
                      margin: "0",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-role-body"
                    style={{
                      margin: "0",
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
const SITE_EXAMPLES = [
  {
    title: "Pet Kuaförü — Modern Dönüşüm",
    sector: "Pet Kuaförü ve Pet Hizmetleri",
    designCode: "PET-01",
    href: "/site-ornekleri/pet-kuaforu-pet-hizmetleri/pet-kuaforu-modern-donusum",
  },
  {
    title: "Kuaför — Modern Dönüşüm",
    sector: "Kuaför ve Berber",
    designCode: "KUA-01",
    href: "/site-ornekleri/kuafor-berber/kuafor-modern-donusum",
  },
  {
    title: "Güzellik — Modern Dönüşüm",
    sector: "Güzellik ve Bakım Merkezi",
    designCode: "GUZ-01",
    href: "/site-ornekleri/guzellik-bakim-merkezi/guzellik-modern-donusum",
  },
  {
    title: "Diş Kliniği — Modern Dönüşüm",
    sector: "Diş Kliniği ve Özel Klinik",
    designCode: "KLI-01",
    href: "/site-ornekleri/dis-klinigi-ozel-klinik/dis-klinigi-modern-donusum",
  },
  {
    title: "Restoran — Modern Dönüşüm",
    sector: "Restoran ve Kafe",
    designCode: "RES-01",
    href: "/site-ornekleri/restoran-kafe/restoran-modern-donusum",
  },
  {
    title: "Emlak — Modern Dönüşüm",
    sector: "Emlak Danışmanlığı",
    designCode: "EML-01",
    href: "/site-ornekleri/emlak-danismanligi/emlak-danismanligi-modern-donusum",
  },
  {
    title: "Otomotiv — Modern Dönüşüm",
    sector: "Otomotiv Servisi ve Araç Bakım",
    designCode: "OTO-01",
    href: "/site-ornekleri/otomotiv-servisi-arac-bakim/otomotiv-servisi-modern-donusum",
  },
  {
    title: "Mimarlık — Modern Dönüşüm",
    sector: "Mimarlık, Dekorasyon ve İnşaat",
    designCode: "MIM-01",
    href: "/site-ornekleri/mimarlik-dekorasyon-insaat/mimarlik-dekorasyon-modern-donusum",
  },
] as const;

function SiteExampleTile({ example, hidden = false }: { example: (typeof SITE_EXAMPLES)[number]; hidden?: boolean }) {
  const display = getSiteExampleDisplay({ ...example, summary: "" });
  if (!display.previewSrc) return null;

  return (
    <Link
      href={example.href}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group block w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:w-[320px] lg:w-[380px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={display.previewSrc}
          alt={`${display.title} site önizlemesi`}
          fill
          loading="lazy"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          Demo / Konsept
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-slate-950">{display.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{display.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          Tasarımı incele <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SiteExamplesPreviewSection() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        <AnimatedSection className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Demo Tasarımlar</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Sektörünüze Uygun Site Konseptlerini İnceleyin
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Aşağıdaki tasarımlar canlı demo ve konsept çalışmalarıdır, gerçek müşteri projesi değildir; beğendiğiniz yaklaşımı işletmenize göre uyarlayabiliriz.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link
              href="/site-ornekleri"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white"
            >
              Tüm tasarımları gör <ArrowRight size={15} />
            </Link>
          </motion.div>
        </AnimatedSection>

      </div>

      {reducedMotion ? (
        <AnimatedSection className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {SITE_EXAMPLES.map((example) => (
            <motion.div key={example.designCode} variants={scaleIn}>
              <SiteExampleTile example={example} />
            </motion.div>
          ))}
        </AnimatedSection>
      ) : (
        <AnimatedSection className="w-full overflow-hidden">
          <motion.div variants={fadeUp}>
            <div
              className="site-examples-track flex w-max gap-5"
              style={paused ? { animationPlayState: "paused" } : undefined}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
              onTouchCancel={() => setPaused(false)}
            >
              {SITE_EXAMPLES.map((example) => (
                <SiteExampleTile key={example.designCode} example={example} />
              ))}
              {SITE_EXAMPLES.map((example) => (
                <SiteExampleTile key={`${example.designCode}-clone`} example={example} hidden />
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// Testimonials marquee (homepage, above footer)
// ─────────────────────────────────────────────
const TESTIMONIALS_ROW_1 = TESTIMONIALS.slice(0, 12);
const TESTIMONIALS_ROW_2 = TESTIMONIALS.slice(12, 24);

function TestimonialCard({
  testimonial,
  hidden = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex w-[280px] flex-shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[320px] lg:w-[380px]"
    >
      <div aria-hidden="true" className="flex gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < testimonial.rating ? "currentColor" : "none"}
            className={i < testimonial.rating ? "" : "text-slate-300"}
          />
        ))}
      </div>
      <span className="sr-only">{`5 üzerinden ${testimonial.rating}`}</span>
      <blockquote className="mt-4 line-clamp-6 text-sm leading-6 text-slate-600">
        “{testimonial.quote}”
      </blockquote>
      <div className="mt-auto pt-5">
        <p className="text-sm font-bold text-slate-950">{testimonial.name}</p>
        <p className="text-xs text-slate-500">
          {testimonial.company} · {testimonial.service}
        </p>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        <AnimatedSection className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
            Müşteri Deneyimleri
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            variants={fadeUp}
            className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl"
          >
            Müşterilerimiz Ne Diyor?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-7 text-slate-600">
            Web sitelerinden özel iş yazılımlarına kadar geliştirdiğimiz sistemlerle çalışan müşterilerimizin deneyimleri.
          </motion.p>
        </AnimatedSection>
      </div>

      {reducedMotion ? (
        <AnimatedSection
          aria-labelledby="testimonials-heading"
          className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.id} variants={scaleIn}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </AnimatedSection>
      ) : (
        <AnimatedSection
          aria-labelledby="testimonials-heading"
          className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <div
              className="testimonials-row"
              onTouchStart={() => setRow1Paused(true)}
              onTouchEnd={() => setRow1Paused(false)}
              onTouchCancel={() => setRow1Paused(false)}
            >
              <div
                className="testimonials-track flex w-max gap-5"
                style={row1Paused ? { animationPlayState: "paused" } : undefined}
              >
                {TESTIMONIALS_ROW_1.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
                {TESTIMONIALS_ROW_1.map((testimonial) => (
                  <TestimonialCard key={`${testimonial.id}-clone`} testimonial={testimonial} hidden />
                ))}
              </div>
            </div>
            <div
              className="testimonials-row"
              onTouchStart={() => setRow2Paused(true)}
              onTouchEnd={() => setRow2Paused(false)}
              onTouchCancel={() => setRow2Paused(false)}
            >
              <div
                className="testimonials-track testimonials-track--reverse flex w-max gap-5"
                style={row2Paused ? { animationPlayState: "paused" } : undefined}
              >
                {TESTIMONIALS_ROW_2.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
                {TESTIMONIALS_ROW_2.map((testimonial) => (
                  <TestimonialCard key={`${testimonial.id}-clone`} testimonial={testimonial} hidden />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      )}
    </section>
  );
}

function HeroSection() {
  return (
    <section
      className="max-[768px]:!min-h-0 max-[768px]:!bg-[#0B0F17]"
      style={{
        position: "relative",
        minHeight: "calc(100dvh - var(--bar-h, 0px))",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "clip",
        paddingTop: "var(--header-h)",
        background: "#F4FAF7",
      }}
      >
        <div
          className="relative w-full max-w-[1360px] mx-auto flex flex-col xl:grid xl:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] items-center gap-9 max-[768px]:gap-5 xl:gap-10 px-4 sm:px-6 lg:px-8 pt-6 max-[768px]:!min-h-0 max-[768px]:overflow-hidden max-[768px]:pt-3 pb-10 sm:pt-8 sm:pb-14 xl:py-8"
          style={{
            minHeight: "calc(100dvh - var(--header-h) - var(--bar-h, 0px))",
          }}
        >

        {/* Left: Text */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full max-w-[640px] flex-col items-start text-left"
        >
          {/* Headline */}
          <motion.div
            variants={heroFadeUp}
            className="flex flex-col items-start"
          >
            <h1
              className="text-role-hero max-[768px]:!text-[#F8F7F4]"
              style={{
                maxWidth: "100%",
              }}
            >
              İş süreçlerinizi dijitalleştiren özel yazılım ve web çözümleri geliştiriyoruz.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={heroFadeUp}
            className="text-role-body-lg max-[768px]:!text-[#C4CAD5]"
            style={{
              maxWidth: "520px",
              margin: "18px 0 0",
            }}
          >
            Kurumsal web sitelerinden yönetim panellerine, randevu sistemlerinden özel iş yazılımlarına kadar ihtiyacınıza göre tasarlanan dijital sistemleri geliştiriyor, yayına alıyor ve teknik desteğini sağlıyoruz.
          </motion.p>

          {/* Value items */}
          <motion.div
            variants={heroBenefitStagger}
            className="mt-[18px] flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 xl:mx-0"
          >
            {[
              "İhtiyaca Özel Sistemler",
              "Verimli İş Süreçleri",
              "Güvenilir Dijital Altyapı",
            ].map((title) => (
              <motion.div
                key={title}
                variants={heroFadeUp}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2
                  size={15}
                  color="#7c3aed"
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:scale-[1.07]"
                />
                <span className="font-body max-[768px]:!text-[#DDE2EA]" style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>{title}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={heroFadeUp}
            className="mt-[22px] flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-start"
          >
            <Link
              href="/randevual"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 24px",
                minHeight: "54px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "white",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
                whiteSpace: "nowrap",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              className="group w-full sm:w-auto text-role-button"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 26px rgba(124,58,237,0.42)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.35)";
              }}
            >
              Ücretsiz Keşif Görüşmesi{" "}
              <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                <ArrowRight size={14} />
              </span>
            </Link>
            <Link
              href="/site-ornekleri"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px 24px",
                minHeight: "54px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#1e293b",
                background: "#ffffff",
                border: "1.5px solid #cbd5e1",
                whiteSpace: "nowrap",
                transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              className="group w-full sm:w-auto text-role-button max-[768px]:!border max-[768px]:!border-white/[0.18] max-[768px]:!bg-white/[0.04] max-[768px]:!text-[#F1F5F9] max-[768px]:hover:!bg-white/[0.08] max-[768px]:active:!bg-white/[0.08]"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.48)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(15,23,42,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Projelerimizi İncele{" "}
              <span className="inline-flex transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>

          {/* Trust note */}
          <motion.p
            variants={heroFadeUp}
            className="font-body max-[768px]:!text-[#8993A4]"
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              margin: "10px 0 0",
              lineHeight: 1.5,
            }}
          >
            15 dakikalık ücretsiz keşif görüşmesi. Projeniz için net ihtiyaç ve kapsam belirlenir.
          </motion.p>
        </motion.div>

        {/* Right: Product showcase visual */}
        <motion.div
          variants={heroVisualIn}
          initial="hidden"
          animate="visible"
          className="flex w-full items-center justify-center max-[768px]:pointer-events-none max-[768px]:absolute max-[768px]:inset-0 max-[768px]:z-0 max-[768px]:overflow-hidden xl:justify-start"
        >
          <div className="w-full max-[768px]:absolute max-[768px]:inset-0 max-[768px]:max-w-none max-[768px]:opacity-[0.95] max-[768px]:[filter:saturate(0.85)_contrast(1.05)]">
            <HeroShowcase />
          </div>
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden max-[768px]:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,15,23,0.96) 0%, rgba(11,15,23,0.84) 45%, rgba(11,15,23,0.45) 100%)",
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, transparent, #cbd5e1)" }} />
        <div
          style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#7c3aed" }}
          className="pulse-glow"
        />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Services Section
// ─────────────────────────────────────────────
const MAIN_SERVICES = [
  {
    id: "1",
    number: "01",
    title: "Kurumsal Web ve Web Uygulamaları",
    shortTitle: "Web & Uygulama",
    description: "Hızlı, SEO uyumlu ve ölçeklenebilir web siteleri ile web uygulamaları geliştiriyoruz.",
    tags: ["Next.js", "React", "Node.js"],
    icon: "Globe",
    href: "/hizmetler/web-uygulama-gelistirme",
  },
  {
    id: "2",
    number: "02",
    title: "Özel Yazılım Geliştirme",
    shortTitle: "Özel Yazılım",
    description: "İşletmenizin süreçlerine uyumlanan, verimli ve ölçeklenebilir yazılım çözümleri tasarlarız.",
    tags: [".NET", "Python", "Bulut"],
    icon: "Code2",
    href: "/hizmetler/ozel-yazilim-gelistirme",
  },
  {
    id: "3",
    number: "03",
    title: "Entegrasyon ve Otomasyon",
    shortTitle: "Entegrasyon & Otomasyon",
    description: "Sistemlerinizi birbirine bağlayan, veri akışını ve iş süreçlerini otomatikleştiren çözümler kurarız.",
    tags: ["API", "Backend", "ERP"],
    icon: "Zap",
    href: "/hizmetler/backend-ve-api-gelistirme",
  },
  {
    id: "4",
    number: "04",
    title: "Bakım ve Sürekli Geliştirme",
    shortTitle: "Bakım & Geliştirme",
    description: "Yayın sonrası güncelleme, performans izleme, teknik destek ve sürekli iyileştirme sağlarız.",
    tags: ["Destek", "Güncelleme", "İzleme"],
    icon: "Wrench",
    href: "/hizmetler/bakim-ve-teknik-destek",
  },
];

const SECTORAL_SOFTWARE = [
  {
    id: "1",
    title: "QR Menü Sistemi",
    description: "Restoranlar ve kafe işletmeleri için QR kod ile anlık güncellenebilen, çoklu dil desteği olan dijital menü sistemi.",
    icon: "QrCode",
  },
  {
    id: "2",
    title: "Randevu Yönetim Sistemi",
    description: "Salon, klinik ve güzellik merkezi işletmeleri için müşteri randevu yönetimi, otomatik hatırlatma ve ödeme entegrasyonu.",
    icon: "Calendar",
  },
  {
    id: "3",
    title: "İşletmeye Özel Dijital Sistemler",
    description: "Perakende, lojistik, imalat veya hizmet sektörüne özel tasarlanmış, iş akışını optimize eden yazılım çözümleri.",
    icon: "Layers",
  },
];

function ServicesSection({ settings }: { settings: SiteSettings }) {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = MAIN_SERVICES[activeServiceIndex] ?? MAIN_SERVICES[0];
  const ActiveIcon = SERVICE_ICON_MAP[activeService.icon] ?? Code2;

  return (
    <section style={{ position: "relative", background: "var(--paper-alt)" }} className="pt-14 pb-16 md:pt-16 md:pb-20 lg:pt-16 lg:pb-24">
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderTop: "1px solid rgba(226,232,240,0.7)",
          borderBottom: "1px solid rgba(226,232,240,0.7)",
        }}
      />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }} className="px-5 sm:px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-10 text-center sm:mb-12 lg:mb-14">
            <div
              className="text-role-eyebrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.35)",
                marginBottom: "20px",
              }}
            >
              <Layers size={12} />
              Hizmetlerimiz
            </div>
            <h2
              className="text-role-section-heading"
              style={{
                margin: "0 0 16px 0",
                wordBreak: "break-word",
              }}
            >
              Her İhtiyacınız İçin{" "}
              <span style={{ color: "#0891b2", fontWeight: 900 }}>Yazılım Çözümü</span>
            </h2>
            <p
              className="text-role-body-lg"
              style={{
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              {settings.homepageIntro}
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="hidden items-stretch gap-10 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-12">
            <div className="home-service-index" aria-label="Hizmet listesi">
              {MAIN_SERVICES.map((service, index) => {
                const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
                const isActive = index === activeServiceIndex;

                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`home-service-index__row ${isActive ? "is-active" : ""}`}
                    aria-pressed={isActive}
                    aria-controls="home-service-detail-panel"
                    onMouseEnter={() => setActiveServiceIndex(index)}
                    onFocus={() => setActiveServiceIndex(index)}
                    onClick={() => setActiveServiceIndex(index)}
                  >
                    <span className="home-service-index__number">{service.number}</span>
                    <span className="home-service-index__title">{service.shortTitle}</span>
                    <span className="home-service-index__icon" aria-hidden="true">
                      <Icon size={20} color="currentColor" />
                    </span>
                    <ChevronRight className="home-service-index__arrow" aria-hidden="true" size={18} />
                  </button>
                );
              })}
            </div>

            <div
              id="home-service-detail-panel"
              className="home-service-detail"
              aria-live="polite"
              style={{
                borderRadius: "20px",
                background: "#F4FAF7",
                border: "1px solid var(--hairline)",
                boxShadow: "none",
              }}
            >
              <div key={activeService.id} className="home-service-detail__content">
                <div className="mb-6 flex items-center gap-4">
                  <span className="home-service-detail__icon" aria-hidden="true">
                    <ActiveIcon size={24} color="currentColor" />
                  </span>
                  <h3
                    className="text-role-subheading"
                    style={{
                      margin: 0,
                      fontSize: "clamp(31px, 2.7vw, 42px)",
                      lineHeight: 1.05,
                      textWrap: "balance",
                    }}
                  >
                    {activeService.number}/ {activeService.shortTitle}
                  </h3>
                </div>

                <p
                  className="text-role-body-lg"
                  style={{
                    maxWidth: "520px",
                    margin: "18px 0 0",
                    lineHeight: 1.6,
                  }}
                >
                  {activeService.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeService.tags.map((tag) => (
                    <span key={tag} className="home-service-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={activeService.href}
                  className="home-service-detail__link text-role-button"
                  aria-label={`${activeService.shortTitle} detaylarını incele`}
                >
                  Detayları İncele
                  <ArrowRight className="home-service-detail__arrow h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="home-service-accordion lg:hidden">
            {MAIN_SERVICES.map((service, index) => {
              const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
              const isActive = index === activeServiceIndex;
              const contentId = `home-service-accordion-${service.id}`;

              return (
                <div key={service.id} className="home-service-accordion__item">
                  <button
                    type="button"
                    className={`home-service-accordion__trigger ${isActive ? "is-active" : ""}`}
                    aria-expanded={isActive}
                    aria-controls={contentId}
                    onClick={() => setActiveServiceIndex(index)}
                  >
                    <span className="home-service-accordion__number">{service.number}</span>
                    <span className="home-service-accordion__title">{service.shortTitle}</span>
                    <span className="home-service-accordion__icon" aria-hidden="true">
                      <Icon size={18} color="currentColor" />
                    </span>
                    <span className="home-service-accordion__state" aria-hidden="true">
                      {isActive ? "×" : "+"}
                    </span>
                  </button>

                  <div id={contentId} hidden={!isActive} className="home-service-accordion__content">
                    <p className="text-role-body" style={{ margin: 0, lineHeight: 1.7 }}>
                      {service.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="home-service-tag home-service-tag--light">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className="home-service-accordion__link text-role-button"
                      aria-label={`${service.shortTitle} detaylarını incele`}
                    >
                      Detayları İncele
                      <ArrowRight className="home-service-detail__arrow h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// How We Work Section
// ─────────────────────────────────────────────
const HOW_WE_WORK_STEPS = [
  {
    number: 1,
    title: "Keşif",
    description: "İhtiyaçlarınızı, hedeflerinizi ve mevcut süreçlerinizi birlikte netleştiriyoruz.",
  },
  {
    number: 2,
    title: "Planlama ve Tasarım",
    description: "Kapsamı, teknik yaklaşımı ve arayüz tasarımını belirleyip yol haritasını çıkarıyoruz.",
  },
  {
    number: 3,
    title: "Geliştirme ve Test",
    description: "Sprint döngüleriyle geliştiriyor, her aşamada test ederek kaliteyi güvence altına alıyoruz.",
  },
  {
    number: 4,
    title: "Yayın ve Destek",
    description: "Projenizi yayına alıyor, sonrasında güncelleme ve teknik destekle yanınızda kalıyoruz.",
  },
];

function HowWeWorkSection() {
  return (
    <HowItWorks
      title="Nasıl Çalışıyoruz?"
      description="Projenizi netleştirmekten yayına almaya kadar dört adımlık şeffaf bir süreç izliyoruz."
      steps={HOW_WE_WORK_STEPS}
      accentColor="#7c3aed"
      darkMode={false}
      layout="horizontal"
      variant="process"
    />
  );
}

// ─────────────────────────────────────────────
// Industry Products Section
// ─────────────────────────────────────────────
function IndustryProductsSection() {
  return (
    <section style={{ position: "relative" }} className="pt-14 pb-16 md:pt-16 md:pb-20 lg:pt-16 lg:pb-24">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }} className="px-5 sm:px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-10 text-center sm:mb-12 lg:mb-14">
            <div
              className="text-role-eyebrow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.40)",
                marginBottom: "20px",
              }}
            >
              <QrCode size={12} />
              Sektörel Yazılımlar
            </div>
            <h2
              className="text-role-section-heading"
              style={{
                margin: "0 0 16px 0",
                wordBreak: "break-word",
              }}
            >
              Sektörünüze Özel{" "}
              <span style={{ color: "#059669", fontWeight: 900 }}>Yazılım Çözümleri</span>
            </h2>
            <p
              className="text-role-body-lg"
              style={{
                maxWidth: "520px",
                margin: "0 auto 8px",
              }}
            >
              Hazır altyapı üzerine işletmeye göre yapılandırılan sektörel sistemler.
            </p>
            <p
              className="text-role-body-lg"
              style={{
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Restoranlar, salonlar, klinikler ve farklı sektörlerin ihtiyaçlarına özel tasarlanmış, hemen kullanıma hazır yazılım çözümleri.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mb-10 grid grid-cols-1 gap-5 sm:gap-6 lg:mb-11 lg:grid-cols-3">
            {SECTORAL_SOFTWARE.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
              return (
                <motion.div key={service.id} variants={fadeUp}>
                  <div
                    className="p-6 sm:p-8 lg:p-9"
                    style={{
                      borderRadius: "20px",
                      background: "rgba(17, 18, 25, 0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      cursor: "default",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(16,185,129,0.35)";
                      el.style.background = "rgba(22, 26, 36, 0.98)";
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(16,185,129,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.background = "rgba(17, 18, 25, 0.95)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "14px",
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "28px",
                      }}
                    >
                      <Icon size={24} color="#6ee7b7" />
                    </div>
                    <h3
                      className="text-role-subheading text-role-subheading--on-dark"
                      style={{
                        marginBottom: "16px",
                        textWrap: "balance",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-role-body text-role-body--on-dark" style={{ margin: 0, flex: 1 }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <Link
              href="/sektorel-yazilimlar"
              className="text-role-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 32px",
                borderRadius: "12px",
                color: "#6ee7b7",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(16,185,129,0.18)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(16,185,129,0.1)";
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Tüm Sektörel Yazılımları Gör <ArrowRight size={15} />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────
function CTASection({ settings }: { settings: SiteSettings }) {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="px-5 sm:px-6">
        <AnimatedSection>
          <motion.div
            variants={fadeUp}
            style={{
              borderRadius: "28px",
              background: "linear-gradient(135deg, #0f0a1e 0%, #0a1628 50%, #0a0f1e 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
            className="px-6 py-14 sm:px-10 sm:py-16 md:px-16 md:py-20"
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "600px",
                height: "600px",
                background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30%",
                right: "10%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <div
                className="text-role-eyebrow text-role-eyebrow--on-dark"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  marginBottom: "28px",
                }}
              >
                <Zap size={12} />
                Ücretsiz Keşif Görüşmesi
              </div>

              <h2
                className="text-role-section-heading text-role-section-heading--on-dark"
                style={{
                  marginBottom: "16px",
                  wordBreak: "break-word",
                }}
              >
                {renderGradientText(settings.homepageCTA)}
              </h2>

              <p
                className="text-role-body-lg text-role-body-lg--on-dark"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto 32px",
                }}
              >
                Projenizi bizimle paylaşın. Ücretsiz keşif görüşmesinde ihtiyacınızı ve kapsamı birlikte netleştirelim.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  href="/randevual"
                  className="inline-flex items-center gap-2 rounded-xl text-white transition-all text-role-button"
                  style={{
                    padding: "12px 24px",
                    textDecoration: "none",
                    background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Sparkles size={15} />
                  Ücretsiz Keşif Görüşmesi
                </Link>
                <Link
                  href="/kurumsal/iletisim"
                  className="inline-flex items-center gap-2 rounded-xl transition-all text-role-button"
                  style={{
                    padding: "12px 24px",
                    textDecoration: "none",
                    color: "#e2e8f0",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <MessageSquare size={15} />
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Blog Section
// ─────────────────────────────────────────────
const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    slug: "dijital-donusum-neden-onemlidir",
    title: "İşletmeler İçin Dijital Dönüşüm Neden Önemlidir?",
    description: "Dijital dönüşüm artık isteğe bağlı değil, zorunludur. İşletmenizi nasıl dönüştürebilir ve rekabetçi avantaj sağlayabilirsiniz?",
    category: "Dijital Dönüşüm",
    date: "2024-12-01",
    readTime: "5 dk",
    emoji: "🚀",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accentColor: "#667eea",
    categoryColor: "#a78bfa",
    categoryBg: "rgba(102, 126, 234, 0.1)",
    categoryBorder: "rgba(102, 126, 234, 0.3)",
    content: [],
  },
  {
    slug: "kurumsal-web-sitesi-neden-gerekli",
    title: "Kurumsal Web Sitesi İşletmeye Ne Kazandırır?",
    description: "Profesyonel bir web sitesi, müşteri güveni, marka imajı ve satışları arttırır. İşletmeniz için neden gerekli olduğunu öğrenin.",
    category: "Web Tasarımı",
    date: "2024-11-25",
    readTime: "6 dk",
    emoji: "💻",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    accentColor: "#f093fb",
    categoryColor: "#f472b6",
    categoryBg: "rgba(240, 147, 251, 0.1)",
    categoryBorder: "rgba(240, 147, 251, 0.3)",
    content: [],
  },
  {
    slug: "ozel-yazilim-ne-zaman-gerekli",
    title: "Özel Yazılım Ne Zaman Gerekli Hale Gelir?",
    description: "Off-the-shelf çözümler her zaman yeterli olmayabilir. Özel yazılıma ihtiyacınız olduğunu nasıl anlayabilirsiniz?",
    category: "Yazılım Geliştirme",
    date: "2024-11-18",
    readTime: "7 dk",
    emoji: "⚙️",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    accentColor: "#4facfe",
    categoryColor: "#06b6d4",
    categoryBg: "rgba(79, 172, 254, 0.1)",
    categoryBorder: "rgba(79, 172, 254, 0.3)",
    content: [],
  },
];

function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => { });
  }, []);

  return (
    <section
      style={{ position: "relative", overflow: "hidden" }}
      className="py-16 sm:py-20 lg:py-28"
      id="blog"
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="px-5 sm:px-6">
        {/* Section header */}
        <AnimatedSection className="mb-10 sm:mb-14">
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              {/* Label */}
              <div
                className="text-role-eyebrow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.40)",
                  marginBottom: "20px",
                }}
              >
                <BookOpen size={12} />
                Blog
              </div>
              <h2
                className="text-role-section-heading"
                style={{
                  margin: "0 0 14px 0",
                }}
              >
                Son <span style={{ color: "#7c3aed", fontWeight: 900 }}>Yazılar</span>
              </h2>
              <p
                className="text-role-body-lg"
                style={{
                  margin: 0,
                  maxWidth: "520px",
                }}
              >
                Yazılım, teknoloji ve dijital dönüşüm dünyasındaki gelişmeleri paylaşıyoruz.
              </p>
            </div>

            {/* View all — desktop */}
            <div className="hidden sm:block">
              <Link
                href="/kurumsal/blog"
                className="text-role-button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  color: "#7c3aed",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.16)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.08)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.22)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Tüm Yazılar <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Cards grid */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {(posts.length > 0 ? posts : FALLBACK_BLOG_POSTS).map((post, i) => (
            <motion.div
              key={post.slug}
              variants={scaleIn}
              custom={i}
              transition={{ delay: i * 0.08 }}
            >
              <BlogMediaCard post={post} />
            </motion.div>
          ))}
        </AnimatedSection>
        {/* View all — mobile */}
        <AnimatedSection className="flex justify-center sm:hidden">
          <motion.div variants={fadeUp}>
            <Link
              href="/kurumsal/blog"
              className="text-role-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "100px",
                color: "#a78bfa",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.22)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Tüm Yazıları Gör <ArrowRight size={14} />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
type HomeFaq = { question: string; answer: string };

export default function HomeClient({ faqs = [] }: { faqs?: HomeFaq[] }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === "object") {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => { });
  }, []);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#0f172a", overflowX: "hidden" }}>
      <HeroSection />
      <ServicesSection settings={settings} />
      <div ref={howItWorksRef}>
        <HowWeWorkSection />
      </div>
      <IndustryProductsSection />
      <SiteExamplesPreviewSection />
      <WhyUsSection />
      {faqs.length > 0 && (
        <FAQSection
          title="Sıkça Sorulan Sorular"
          description="Projeye başlamadan önce merak edilenler."
          faqs={faqs}
          accentColor="#7c3aed"
          darkMode={false}
        />
      )}
      <CTASection settings={settings} />
      <BlogSection />
      <TestimonialsSection />
      <SupportChatWidget triggerRef={howItWorksRef} />
    </div>
  );
}
