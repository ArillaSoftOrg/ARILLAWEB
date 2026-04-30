"use client";

import AnimatedBrand from "@/components/AnimatedBrand";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HomeBlogPreview from "@/components/HomeBlogPreview";
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
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Sparkles,
  MonitorSmartphone,
  Calendar,
  BookOpen,
  Wrench,
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

const STATS = [
  { value: "150+", label: "Tamamlanan Proje", icon: Package },
  { value: "98%", label: "Müşteri Memnuniyeti", icon: Star },
  { value: "50+", label: "Aktif Müşteri", icon: Users },
  { value: "5+", label: "Yıllık Deneyim", icon: TrendingUp },
];

const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", ".NET",
  "Python", "PostgreSQL", "MongoDB", "React Native", "Flutter",
  "AWS", "Docker", "Redis", "Kubernetes", "GraphQL",
];

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
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
// QR Phone Mockup
// ─────────────────────────────────────────────
function QRPhoneMockup() {
  const cards = [
    { title: "Web Geliştirme", text: "Modern, hızlı ve ölçeklenebilir web projeleri.", Icon: Globe, accent: "#7c3aed" },
    { title: "Mobil Uygulama", text: "iOS ve Android uyumlu kullanıcı odaklı deneyimler.", Icon: Smartphone, accent: "#06b6d4" },
    { title: "Özel Yazılım", text: "İşletmenize özel operasyon ve yönetim sistemleri.", Icon: Code2, accent: "#7c3aed" },
    { title: "API & Altyapı", text: "Güvenli, performanslı ve sürdürülebilir backend yapıları.", Icon: Zap, accent: "#06b6d4" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "520px" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.15)",
          color: "#7c3aed",
          fontSize: "12px",
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        Web • Mobil • Özel Yazılım
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              borderRadius: "16px",
              padding: "22px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.09)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: `${card.accent}0d`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <card.Icon size={19} color={card.accent} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: 0, letterSpacing: "-0.2px" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#64748b", margin: 0 }}>
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "clip",
        paddingTop: "68px",
        background: "#ffffff",
      }}
    >
      {/* Subtle grid overlay */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Very soft violet tint — top-left only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(300px, 50vw, 640px)",
          height: "clamp(300px, 50vw, 640px)",
          background: "radial-gradient(ellipse at top left, rgba(124,58,237,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:grid lg:grid-cols-2 items-center gap-10 lg:gap-20 px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:py-28">

        {/* Left: Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(124,58,237,0.06)",
                border: "1px solid rgba(124,58,237,0.18)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#7c3aed",
                letterSpacing: "0.04em",
              }}
            >
              ✦ Türkiye&apos;nin Dijital Yazılım Ortağı
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center lg:items-start"
          >
            <AnimatedBrand />
            <h2
              style={{
                fontSize: "clamp(20px, 3vw, 38px)",
                fontWeight: 500,
                color: "#475569",
                marginTop: "16px",
                lineHeight: 1.45,
                maxWidth: "520px",
              }}
            >
              İşinizi Dijitale Taşıyan{" "}
              <span style={{ color: "#0f172a", fontWeight: 700 }}>
                Akıllı Yazılım Çözümleri
              </span>
            </h2>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              color: "#64748b",
              maxWidth: "480px",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Web siteleri, özel yazılımlar ve dijital sistemlerle işletmenizi
            daha hızlı, daha güçlü ve daha profesyonel hale getiriyoruz.
          </motion.p>

          {/* Feature bullets */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mx-auto lg:mx-0"
          >
            {[
              { title: "Hızlı Teslim", text: "İhtiyacınıza uygun çözümleri hızlı şekilde yayına alıyoruz." },
              { title: "Güçlü Altyapı", text: "Modern, güvenli ve ölçeklenebilir yazılım sistemleri." },
              { title: "İş Odaklı", text: "İşletmenize değer katan sistemler geliştiriyoruz." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  padding: "14px 16px",
                }}
              >
                <p style={{ color: "#0f172a", fontWeight: 600, fontSize: "13px", margin: "0 0 4px 0" }}>{item.title}</p>
                <p style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link
              href="/projects"
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
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
                boxShadow: "0 4px 14px rgba(124,58,237,0.25)",
              }}
            >
              Projelerimizi İncele <ArrowRight size={14} />
            </Link>
            <Link
              href="/iletisim"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                color: "#475569",
                background: "transparent",
                border: "1px solid #e2e8f0",
              }}
            >
              Teklif Al <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Service cards */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="flex justify-center items-center w-full"
        >
          <QRPhoneMockup />
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
// Stats Bar
// ─────────────────────────────────────────────
function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 20px" }} className="sm:px-6 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4px",
                }}
              >
                <stat.icon size={20} color="#a78bfa" />
              </div>
              <div
                style={{
                  fontSize: "clamp(26px, 5vw, 36px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
                className="gradient-text"
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// QR Menu Feature Section
// ─────────────────────────────────────────────
function QRMenuSection({ settings }: { settings: SiteSettings }) {
  return (
    <section
      style={{ position: "relative", overflow: "hidden" }}
      className="py-16 sm:py-20 lg:py-28"
      id="qr-menu"
    >
      {/* Bg glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="px-5 sm:px-6">
        {/* Section header */}
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <motion.div variants={fadeUp} style={{ marginBottom: "40px", textAlign: "center" }}>
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
              <QrCode size={12} />
              Ana Ürünümüz
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 5vw, 52px)",
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-1px",
                lineHeight: 1.15,
                margin: "0 0 16px 0",
                wordBreak: "break-word",
              }}
            >
              {renderGradientText(settings.whyChooseUsTitle)}
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 18px)",
                color: "#64748b",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {settings.whyChooseUsText}
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Features grid */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {QR_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="p-5 sm:p-7"
                style={{
                  borderRadius: "16px",
                  background: "rgba(22, 24, 32, 0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                whileHover={{
                  y: -4,
                  borderColor: `${feature.color}40`,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${feature.color}20`,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <feature.icon size={22} color={feature.color} />
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#f1f5f9",
                    marginBottom: "8px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom CTA card */}
        <AnimatedSection className="mt-10 sm:mt-14 lg:mt-16">
          <motion.div variants={fadeUp}>
            <div
              style={{
                borderRadius: "24px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.08) 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                alignItems: "center",
              }}
              className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-6 sm:gap-8 lg:gap-10 p-6 sm:p-8 lg:p-12"
            >
              <div>
                <h3
                  style={{
                    fontSize: "clamp(20px, 4vw, 28px)",
                    fontWeight: 800,
                    color: "#f1f5f9",
                    marginBottom: "12px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  QR Menü ile neler elde edersiniz?
                </h3>
                <div
                  style={{ marginTop: "16px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {QR_PLAN_FEATURES.map((feat) => (
                    <div key={feat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <CheckCircle size={15} color="#a78bfa" />
                      <span style={{ fontSize: "14px", color: "#94a3b8" }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
                <Link
                  href="/services"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "15px",
                    textDecoration: "none",
                    color: "white",
                    background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                    boxShadow: "0 0 30px rgba(124,58,237,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <QrCode size={16} />
                  Hemen Başlayın
                </Link>
                <Link
                  href="/iletisim"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "13px 28px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    color: "#a78bfa",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Fiyat Teklifi Al
                  <ArrowRight size={14} />
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
// Services Section
// ─────────────────────────────────────────────
function ServicesSection({ settings }: { settings: SiteSettings }) {
  const [services, setServices] = useState<DbService[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch(() => { });
  }, []);

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
              <span style={{ color: "#22d3ee" }}>Yazılım Çözümü</span>
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

        {services.length > 0 && (
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {services.map((service) => {
                const Icon = SERVICE_ICON_MAP[service.icon] ?? Code2;
                return (
                  <motion.div key={service.id} variants={fadeUp}>
                    <Link
                      href={`/services/${service.slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="p-5 sm:p-7"
                        style={{
                          borderRadius: "16px",
                          background: "rgba(17, 18, 25, 0.9)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          height: "100%",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "rgba(34,211,238,0.25)";
                          el.style.background = "rgba(22, 26, 36, 0.95)";
                          el.style.transform = "translateY(-3px)";
                          el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.borderColor = "rgba(255,255,255,0.07)";
                          el.style.background = "rgba(17, 18, 25, 0.9)";
                          el.style.transform = "translateY(0)";
                          el.style.boxShadow = "none";
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "11px",
                            background: "rgba(6,182,212,0.1)",
                            border: "1px solid rgba(6,182,212,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "16px",
                          }}
                        >
                          <Icon size={20} color="#22d3ee" />
                        </div>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#f1f5f9",
                            marginBottom: "8px",
                            letterSpacing: "-0.3px",
                          }}
                        >
                          {service.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: "0 0 16px 0" }}>
                          {service.shortDescription}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "13px",
                            color: "#22d3ee",
                            fontWeight: 600,
                          }}
                        >
                          Detaylar <ChevronRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Tech Stack Section
// ─────────────────────────────────────────────
function TechSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="px-5 sm:px-6">
        <AnimatedSection>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
            <p
              style={{
                fontSize: "13px",
                color: "#475569",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              Kullandığımız Teknolojiler
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {TECH_STACK.map((tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#64748b",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#a78bfa";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
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
                  href="/iletisim"
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
                  href="/iletisim"
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
                Son <span className="gradient-text">Yazılar</span>
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
                href="/blog"
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
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={scaleIn}
              custom={i}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
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
        <AnimatedSection className="mt-10 flex justify-center sm:hidden">
          <motion.div variants={fadeUp}>
            <Link
              href="/blog"
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
// Footer
// ─────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="px-5 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={16} color="white" />
              </div>
              <span style={{ fontWeight: 700, fontSize: "17px", color: "#f1f5f9" }}>
                Arilla<span style={{ color: "#8b5cf6" }}>soft</span>
              </span>
            </Link>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.8, marginBottom: "20px" }}>
              Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz. Web, mobil ve kurumsal yazılım geliştirme.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { icon: Linkedin, href: "https://linkedin.com/company/arillasoft" },
                { icon: Github, href: "https://github.com/arillasoft" },
                { icon: Instagram, href: "https://instagram.com/arillasoft" },
                { icon: Twitter, href: "https://twitter.com/arillasoft" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#475569",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#a78bfa";
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
                    e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "14px", color: "#e2e8f0", marginBottom: "16px" }}>
              Hizmetler
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Web Geliştirme", href: "/services/web-uygulama-gelistirme" },
                { label: "Mobil Uygulama", href: "/services/mobil-uygulama-gelistirme" },
                { label: "QR Menü Sistemi", href: "/services/qr-menu" },
                { label: "UI/UX Tasarımı", href: "/services/ui-ux-tasarimi" },
                { label: "Backend & API", href: "/services/backend-ve-api-gelistirme" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: "14px", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "14px", color: "#e2e8f0", marginBottom: "16px" }}>
              Şirket
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Hakkımızda", href: "/hakkimizda" },
                { label: "Projeler", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Kariyer", href: "/kariyer" },
                { label: "İletişim", href: "/iletisim" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ fontSize: "14px", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "14px", color: "#e2e8f0", marginBottom: "16px" }}>
              İletişim
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Mail size={14} color="#7c3aed" style={{ marginTop: "2px", flexShrink: 0 }} />
                <a
                  href="mailto:iletisim@arillasoft.com"
                  style={{ fontSize: "13px", color: "#475569", textDecoration: "none" }}
                >
                  iletisim@arillasoft.com
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Phone size={14} color="#7c3aed" style={{ marginTop: "2px", flexShrink: 0 }} />
                <a
                  href="tel:+902125550101"
                  style={{ fontSize: "13px", color: "#475569", textDecoration: "none" }}
                >
                  +90 (212) 555 01 01
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={14} color="#7c3aed" style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6 }}>
                  Maslak, Büyükdere Cad.<br />
                  Sarıyer / İstanbul
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: "48px",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#334155" }}>
            © {year} Arillasoft. Tüm hakları saklıdır.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
              { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ fontSize: "13px", color: "#334155", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#64748b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function HomePage() {
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
      <Navbar />
      <HeroSection />
      <StatsSection />
      <QRMenuSection settings={settings} />
      <ServicesSection settings={settings} />
      <TechSection />
      <BlogSection />
      <CTASection settings={settings} />
      <Footer />
    </div>
  );
}
