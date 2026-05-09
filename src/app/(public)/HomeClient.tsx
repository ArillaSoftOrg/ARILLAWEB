"use client";

import AnimatedBrand from "@/components/AnimatedBrand";
import SupportChatWidget from "@/components/SupportChatWidget";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import HomeBlogPreview from "@/components/HomeBlogPreview";
import HeroBookingForm from "@/components/hero/HeroBookingForm";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  Clock,
  DollarSign,
  Package,
  ExternalLink,
  Sparkles,
  MonitorSmartphone,
  Calendar,
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
    "Web'den mobilye, backend'den UI/UX tasarımına — uçtan uca dijital dönüşüm hizmetleri.",
  whyChooseUsTitle: "QR Menü Sistemi ile|Restoranınızı Dönüştürün",
  whyChooseUsText:
    "Masaya QR kodu koyun, müşterileriniz menüye anında ulaşsın. Baskı masrafı yok, güncelleme zahmeti yok.",
  homepageCTA: "Dijital Dönüşümünüzü|Bugün Başlatın",
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
// Hero Section
// ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "clip",
        paddingTop: "68px",
        background: "#F4FAF7",
      }}
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14 lg:py-20">

        {/* Left: Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 items-start text-left"
        >
          {/* Headline */}
<motion.div
  variants={fadeUp}
  className="flex flex-col items-start"
>
  <h2
    style={{
      fontSize: "clamp(28px, 4.5vw, 46px)",
      fontWeight: 700,
      color: "#050505",
      lineHeight: 1.15,
      maxWidth: "100%",
    }}
  >
    Kişisel ya da kurumsal dijital çözümünüzü bugün hayata geçirin.
  </h2>
</motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              color: "#64748b",
              maxWidth: "480px",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.65,
              margin: 0,
              marginBottom: "24px",
            }}
          >
            Arilla Soft; kişisel ve kurumsal ihtiyaçlara özel web siteleri, yazılımlar ve yönetim sistemleri geliştirir. Daha profesyonel görünmenizi, daha düzenli çalışmanızı ve dijital süreçlerinizi daha kolay yönetmenizi sağlar.
          </motion.p>

          {/* Value items */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row sm:gap-6 sm:flex-wrap w-full lg:mx-0"
          >
            {[
              "İhtiyaca Özel Sistemler",
              "Verimli İş Süreçleri",
              "Güvenilir Dijital Altyapı",
            ].map((title) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 size={15} color="#7c3aed" strokeWidth={2.5} />
                <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>{title}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-start">
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                color: "white",
                background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
              }}
            >
              Ön Görüşme Al <ArrowRight size={14} />
            </Link>
            <Link
              href="/kurumsal/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                color: "#1e293b",
                background: "#ffffff",
                border: "1.5px solid #cbd5e1",
              }}
            >
              Hizmetleri İncele <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Booking form — both mobile and desktop */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center w-full"
        >
          <HeroBookingForm />
        </motion.div>
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
    title: "Kurumsal Web Sitesi",
    description: "Profesyonel, hızlı ve SEO dostu kurumsal web siteleri geliştiriyoruz. İşletmenizi çevrimiçi dünyada en iyi şekilde sunuyoruz.",
    icon: "Globe",
  },
  {
    id: "2",
    title: "Özel Yazılım Geliştirme",
    description: "İşletmenize özel, ölçeklenebilir yazılım çözümleri tasarlarız. Masaüstü, mobil veya web uygulaması — her türü yapabiliriz.",
    icon: "Code2",
  },
  {
    id: "3",
    title: "Dijital Sistemler ve Otomasyon",
    description: "İş süreçlerinizi otomatikleştiren akıllı sistemler kurarız. Verimliliği artırın, maliyetleri azaltın, hataları elimine edin.",
    icon: "Zap",
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
    description: "Salon, klinik ve konsultasyon işletmeleri için müşteri randevu yönetimi, otomatik hatırlatma ve ödeme entegrasyonu.",
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
  return (
    <section style={{ position: "relative" }} className="py-16 sm:py-20 lg:py-28">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }} className="px-5 sm:px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.25)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#22d3ee",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <Layers size={12} />
              Hizmetlerimiz
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 5vw, 48px)",
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-1px",
                lineHeight: 1.15,
                margin: "0 0 16px 0",
                wordBreak: "break-word",
              }}
            >
              Her İhtiyacınız İçin{" "}
              <span style={{ color: "#00f0ff", fontWeight: 900 }}>Yazılım Çözümü</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 17px)",
                color: "#64748b",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {settings.homepageIntro}
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
            {MAIN_SERVICES.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
              return (
                <motion.div key={service.id} variants={fadeUp}>
                  <div
                    className="p-6 sm:p-8 lg:p-10"
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
                      el.style.borderColor = "rgba(34,211,238,0.35)";
                      el.style.background = "rgba(22, 26, 36, 0.98)";
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(34,211,238,0.1)";
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
                        background: "rgba(6,182,212,0.12)",
                        border: "1px solid rgba(6,182,212,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <Icon size={24} color="#22d3ee" />
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: "12px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0, flex: 1 }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
            <Link
              href="/hizmetler"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 32px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#a78bfa",
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
                textDecoration: "none",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.18)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Tüm Hizmetleri Gör <ArrowRight size={15} />
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Sectoral Software Section
// ─────────────────────────────────────────────
function SectoralSoftwareSection() {
  return (
    <section style={{ position: "relative" }} className="py-16 sm:py-20 lg:py-28">
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
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "64px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#6ee7b7",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <QrCode size={12} />
              Sektörel Yazılımlar
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 5vw, 48px)",
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-1px",
                lineHeight: 1.15,
                margin: "0 0 16px 0",
                wordBreak: "break-word",
              }}
            >
              Sektörünüze Özel{" "}
              <span style={{ color: "#00ffb3", fontWeight: 900 }}>Yazılım Çözümleri</span>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 17px)",
                color: "#64748b",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Restoranlar, salonlar, klinikler ve farklı sektörlerin ihtiyaçlarına özel tasarlanmış, hemen kullanıma hazır yazılım çözümleri.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
            {SECTORAL_SOFTWARE.map((service) => {
              const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
              return (
                <motion.div key={service.id} variants={fadeUp}>
                  <div
                    className="p-6 sm:p-8 lg:p-10"
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
                        marginBottom: "24px",
                      }}
                    >
                      <Icon size={24} color="#6ee7b7" />
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: "12px",
                        letterSpacing: "-0.3px",
                      }}
                    >
                      {service.title}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.8, margin: 0, flex: 1 }}>
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 32px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
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
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.35)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#a78bfa",
                  letterSpacing: "0.05em",
                  marginBottom: "28px",
                }}
              >
                <Zap size={12} />
                Ücretsiz Danışmanlık
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 52px)",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  letterSpacing: "-1px",
                  lineHeight: 1.15,
                  marginBottom: "16px",
                  wordBreak: "break-word",
                }}
              >
                {renderGradientText(settings.homepageCTA)}
              </h2>

              <p
                style={{
                  fontSize: "clamp(15px, 2.5vw, 18px)",
                  color: "#64748b",
                  maxWidth: "500px",
                  margin: "0 auto 32px",
                  lineHeight: 1.7,
                }}
              >
                Projenizi bizimle paylaşın. 24 saat içinde size özel teklifimizi hazırlayalım.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                <Link
                  href="/kurumsal/iletisim"
                  className="inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all"
                  style={{
                    padding: "12px 24px",
                    fontSize: "clamp(14px, 2vw, 16px)",
                    textDecoration: "none",
                    background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <Sparkles size={15} />
                  Ücretsiz Teklif Al
                </Link>
                <Link
                  href="/kurumsal/iletisim"
                  className="inline-flex items-center gap-2 rounded-xl font-semibold transition-all"
                  style={{
                    padding: "12px 24px",
                    fontSize: "clamp(14px, 2vw, 16px)",
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
type HomeBlogPost = {
  slug: string; gradient: string; accentColor: string; emoji: string;
  categoryColor: string; categoryBg: string; categoryBorder: string;
  category: string; date: string; readTime: string; title: string; description: string;
};

const FALLBACK_BLOG_POSTS: HomeBlogPost[] = [
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
  },
];

function BlogSection() {
  const [posts, setPosts] = useState<HomeBlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.slice(0, 3)))
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
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#a78bfa",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <BookOpen size={12} />
                Blog
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 5vw, 52px)",
                  fontWeight: 800,
                  color: "#f1f5f9",
                  letterSpacing: "-1px",
                  lineHeight: 1.15,
                  margin: "0 0 14px 0",
                }}
              >
                Son <span style={{ color: "#d8b4fe", fontWeight: 900 }}>Yazılar</span>
              </h2>
              <p
                style={{
                  fontSize: "clamp(15px, 2vw, 17px)",
                  color: "#64748b",
                  lineHeight: 1.7,
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
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#a78bfa",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.22)",
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
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {(posts.length > 0 ? posts : FALLBACK_BLOG_POSTS).map((post, i) => (
            <motion.div
              key={post.slug}
              variants={scaleIn}
              custom={i}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/kurumsal/blog/${post.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div
                  className="group"
                  style={{
                    borderRadius: "20px",
                    background: "rgba(17, 18, 25, 0.85)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                    e.currentTarget.style.boxShadow = `0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(124,58,237,0.15)`;
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  {/* Cover image — gradient illustration */}
                  <div
                    style={{
                      position: "relative",
                      height: "190px",
                      background: post.gradient,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {/* Decorative circles */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        right: "-30px",
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${post.accentColor}22 0%, transparent 70%)`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        left: "-20px",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${post.accentColor}15 0%, transparent 70%)`,
                      }}
                    />
                    {/* Grid overlay */}
                    <div
                      className="grid-bg"
                      style={{ position: "absolute", inset: 0, opacity: 0.4 }}
                    />
                    {/* Big emoji */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "56px",
                        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                      }}
                    >
                      {post.emoji}
                    </div>
                    {/* Category badge on image */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: post.categoryColor,
                        background: post.categoryBg,
                        border: `1px solid ${post.categoryBorder}`,
                        backdropFilter: "blur(8px)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {post.category}
                    </div>
                  </div>

                  {/* Card body */}
                  <div
                    style={{
                      padding: "22px 24px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "12px",
                        color: "#475569",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span
                        style={{
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background: "#334155",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={12} />
                        {post.readTime} okuma
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        lineHeight: 1.45,
                        margin: 0,
                        letterSpacing: "-0.2px",
                        transition: "color 0.2s",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        lineHeight: 1.75,
                        margin: 0,
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.description}
                    </p>

                    {/* Read more */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: post.accentColor,
                        marginTop: "4px",
                        transition: "gap 0.2s",
                      }}
                    >
                      Devamını Oku
                      <ArrowRight
                        size={14}
                        style={{ transition: "transform 0.2s" }}
                        className="group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatedSection>

        {/* View all — mobile */}
        <AnimatedSection className="flex justify-center sm:hidden">
          <motion.div variants={fadeUp}>
            <Link
              href="/kurumsal/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                borderRadius: "100px",
                fontSize: "14px",
                fontWeight: 600,
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
export default function HomeClient() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

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
      <SectoralSoftwareSection />
      <BlogSection />
      <CTASection settings={settings} />
      <SupportChatWidget />
    </div>
  );
}
