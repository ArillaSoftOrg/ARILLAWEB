"use client";

import AnimatedBrand from "@/components/AnimatedBrand";
import SupportChatWidget from "@/components/SupportChatWidget";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroMotionVisual from "@/components/home/HeroMotionVisual";
import { getSiteExampleDisplay } from "@/lib/site-example-display";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "@/components/home/ui/AnimatedSection";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { fadeUp, stagger, scaleIn, EASE_PREMIUM } from "@/components/home/motion";
import CapabilityStrip from "@/components/home/sections/CapabilityStrip";
import WebsiteAsBusinessTool from "@/components/home/sections/WebsiteAsBusinessTool";
import WebCommerce from "@/components/home/sections/WebCommerce";
import BusinessSystems from "@/components/home/sections/BusinessSystems";
import IndustrySolutions from "@/components/home/sections/IndustrySolutions";
import AutomationIntegrations from "@/components/home/sections/AutomationIntegrations";
import SeoGeoPerformance from "@/components/home/sections/SeoGeoPerformance";
import HowWeWork from "@/components/home/sections/HowWeWork";
import Pricing from "@/components/home/sections/Pricing";
import Faq from "@/components/home/sections/Faq";
import FinalCta from "@/components/home/sections/FinalCta";
import "@/lib/home-fonts";
import {
  Smartphone,
  BarChart3,
  Globe,
  ArrowRight,
  Star,
  Palette,
  RefreshCw,
  Wifi,
  Check,
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

type DbService = {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
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
const heroFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_PREMIUM },
  },
};

// Restrained: H1 -> body -> benefit row -> CTA group, ~70ms apart. The
// video visual (heroVisualIn) is the primary animated element here and
// isn't gated by this — it plays immediately regardless.
const heroStagger: Variants = {
  visible: { transition: { staggerChildren: 0.07 } },
};

const heroVisualIn: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: EASE_PREMIUM, delay: 0.48 },
  },
};

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

const SITE_EXAMPLES = [
  {
    title: "Pet Kuaförü — Modern Dönüşüm",
    sector: "Pet Kuaförü ve Pet Hizmetleri",
    designCode: "PET-01",
    href: "/tr/site-ornekleri/pet-kuaforu-pet-hizmetleri/pet-kuaforu-modern-donusum",
  },
  {
    title: "Kuaför — Modern Dönüşüm",
    sector: "Kuaför ve Berber",
    designCode: "KUA-01",
    href: "/tr/site-ornekleri/kuafor-berber/kuafor-modern-donusum",
  },
  {
    title: "Güzellik — Modern Dönüşüm",
    sector: "Güzellik ve Bakım Merkezi",
    designCode: "GUZ-01",
    href: "/tr/site-ornekleri/guzellik-bakim-merkezi/guzellik-modern-donusum",
  },
  {
    title: "Diş Kliniği — Modern Dönüşüm",
    sector: "Diş Kliniği ve Özel Klinik",
    designCode: "KLI-01",
    href: "/tr/site-ornekleri/dis-klinigi-ozel-klinik/dis-klinigi-modern-donusum",
  },
  {
    title: "Restoran — Modern Dönüşüm",
    sector: "Restoran ve Kafe",
    designCode: "RES-01",
    href: "/tr/site-ornekleri/restoran-kafe/restoran-modern-donusum",
  },
  {
    title: "Emlak — Modern Dönüşüm",
    sector: "Emlak Danışmanlığı",
    designCode: "EML-01",
    href: "/tr/site-ornekleri/emlak-danismanligi/emlak-danismanligi-modern-donusum",
  },
  {
    title: "Otomotiv — Modern Dönüşüm",
    sector: "Otomotiv Servisi ve Araç Bakım",
    designCode: "OTO-01",
    href: "/tr/site-ornekleri/otomotiv-servisi-arac-bakim/otomotiv-servisi-modern-donusum",
  },
  {
    title: "Mimarlık — Modern Dönüşüm",
    sector: "Mimarlık, Dekorasyon ve İnşaat",
    designCode: "MIM-01",
    href: "/tr/site-ornekleri/mimarlik-dekorasyon-insaat/mimarlik-dekorasyon-modern-donusum",
  },
] as const;

function SiteExampleTile({ example, hidden = false }: { example: (typeof SITE_EXAMPLES)[number]; hidden?: boolean }) {
  const display = getSiteExampleDisplay({ ...example, summary: "" });
  if (!display.previewSrc) return null;

  return (
    <a
      href={example.href}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="font-home-sans group block w-[280px] flex-shrink-0 overflow-hidden rounded-home-lg border border-home-border bg-home-bg shadow-sm transition-[transform,border-color] duration-200 ease-home-premium hover:-translate-y-[3px] hover:border-home-border-strong sm:w-[320px] lg:w-[380px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-home-surface">
        <Image
          src={display.previewSrc}
          alt={`${display.title} site önizlemesi`}
          fill
          loading="lazy"
          className="object-cover object-top transition duration-200 ease-home-premium group-hover:contrast-[1.05] group-hover:brightness-[1.02]"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
        />
        <span className="absolute left-3 top-3 rounded-home-full bg-home-fg/80 px-3 py-1 text-[11px] font-medium text-home-text-inverse backdrop-blur-sm">
          Demo / Konsept
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-home-fg">{display.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-home-text-secondary">{display.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-home-fg">
          Tasarımı incele <ArrowRight size={14} className="text-home-primary-active transition group-hover:translate-x-1" />
        </span>
      </div>
    </a>
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
    <section className="bg-home-surface py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6">
        <AnimatedSection className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <h2 className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]">
              Sektörünüze Uygun Site Konseptlerini İnceleyin
            </h2>
            <p className="font-home-sans mt-4 text-base leading-7 text-home-text-secondary">
              Aşağıdaki tasarımlar canlı demo ve konsept çalışmalarıdır, gerçek müşteri projesi değildir; beğendiğiniz yaklaşımı işletmenize göre uyarlayabiliriz.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <a
              href="/tr/site-ornekleri"
              className="font-home-sans inline-flex items-center gap-2 rounded-home-full bg-home-fg px-6 py-3 text-sm font-medium text-home-text-inverse transition-colors hover:bg-home-surface-dark-elevated"
            >
              Tüm tasarımları gör <ArrowRight size={15} />
            </a>
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
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
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
  const t = useTranslations("pages.home.sections.hero");
  const prefersReducedMotion = usePrefersReducedMotion();
  const benefits = t.raw("benefits") as string[];

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100svh - var(--bar-h, 0px))",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "clip",
        paddingTop: "var(--header-h)",
        background: "var(--home-surface-warm)",
      }}
      >
        <div
          className="relative mx-auto flex w-full max-w-[1360px] flex-col items-center gap-6 px-4 pt-5 pb-12 sm:gap-8 sm:px-6 sm:pt-8 sm:pb-14 lg:grid lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-10 lg:px-8 lg:py-8"
          style={{
            minHeight: "calc(100svh - var(--header-h) - var(--bar-h, 0px))",
          }}
        >

        {/* Left: Text */}
          <motion.div
            variants={heroStagger}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            className="relative z-10 flex w-full max-w-[640px] flex-col items-start text-left"
          >
            <motion.h1
              variants={heroFadeUp}
              className="font-home-sans text-[40px] font-semibold leading-[44px] tracking-[-0.02em] text-home-fg sm:text-[56px] sm:leading-[60px] sm:tracking-[-0.03em]"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              variants={heroFadeUp}
              className="font-home-sans mt-5 max-w-[50ch] text-[17px] leading-[26px] text-home-text-secondary sm:mt-6 sm:text-[18px] sm:leading-[28px] sm:tracking-[-0.005em]"
            >
              {t("body")}
            </motion.p>

            <motion.ul
              variants={heroFadeUp}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-7"
            >
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="font-home-sans flex items-center gap-2 text-[14px] font-medium leading-[18px] text-home-fg"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-4 w-4 flex-none items-center justify-center rounded-home-full bg-home-primary"
                  >
                    <Check size={11} strokeWidth={3} className="text-home-primary-foreground" />
                  </span>
                  {benefit}
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={heroFadeUp}
              className="mt-8 flex w-full flex-col items-start gap-4 sm:mt-9"
            >
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <HomeButton variant="primary" asChild className="w-full sm:w-auto">
                  <Link href="/teklif-al">
                    {t("ctaPrimary")}
                    <ArrowRight size={16} />
                  </Link>
                </HomeButton>
                <HomeButton variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/site-ornekleri">
                    {t("ctaSecondary")}
                    <ArrowRight size={16} />
                  </Link>
                </HomeButton>
              </div>
              <p className="font-home-sans max-w-[38ch] text-[13px] leading-[18px] text-home-text-muted">
                {t("microcopy")}
              </p>
            </motion.div>
        </motion.div>

        {/* Right: Product showcase visual */}
        <motion.div
          variants={heroVisualIn}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex w-full items-center justify-center lg:justify-start"
        >
          <div className="w-full">
            <HeroMotionVisual />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        aria-label="Aşağı kaydır ve Hizmetlerimiz bölümüne git"
        onClick={(event) => {
          event.preventDefault();
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document.getElementById("services")?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="home-hero-scroll-cue"
      >
        <span className="home-hero-scroll-cue__mouse" aria-hidden="true">
          <span className="home-hero-scroll-cue__wheel" />
        </span>
        <span className="home-hero-scroll-cue__label">Aşağı Kaydır</span>
      </motion.a>
    </section>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function HomeClient() {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#0f172a" }}>
      <HeroSection />
      <CapabilityStrip />
      <WebsiteAsBusinessTool />
      <WebCommerce />
      <SiteExamplesPreviewSection />
      <BusinessSystems />
      <IndustrySolutions />
      <AutomationIntegrations />
      <SeoGeoPerformance />
      <div ref={howItWorksRef}>
        <HowWeWork />
      </div>
      <TestimonialsSection />
      <Pricing />
      <Faq />
      <FinalCta />
      <SupportChatWidget triggerRef={howItWorksRef} />
    </div>
  );
}
