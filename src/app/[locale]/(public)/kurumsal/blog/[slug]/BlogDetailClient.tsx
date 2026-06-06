"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Sun, Moon } from "lucide-react";
import { BlogPost, BlogSection } from "@/lib/blog-data";

// ─────────────────────────────────────────────
// Blog Reading Theme
// ─────────────────────────────────────────────
function useBlogTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("blog-reading-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);
  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("blog-reading-theme", next);
      return next;
    });
  };
  return { theme, toggle };
}

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// ─────────────────────────────────────────────
// Animated Section
// ─────────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  variants = stagger,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: typeof stagger;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Content Renderer
// ─────────────────────────────────────────────
function ContentBlock({ section, accentColor }: { section: BlogSection; accentColor: string }) {
  if (section.type === "heading2") {
    return (
      <h2
        style={{
          fontSize: "clamp(20px, 3vw, 26px)",
          fontWeight: 700,
          color: "var(--blog-h2)",
          margin: "48px 0 16px",
          lineHeight: 1.3,
          paddingBottom: "12px",
          borderBottom: "1px solid var(--blog-border)",
        }}
      >
        {section.text}
      </h2>
    );
  }

  if (section.type === "heading3") {
    return (
      <h3
        style={{
          fontSize: "clamp(17px, 2.5vw, 20px)",
          fontWeight: 600,
          color: "var(--blog-h3)",
          margin: "36px 0 12px",
          lineHeight: 1.4,
        }}
      >
        <span style={{ color: accentColor, marginRight: "8px" }}>/</span>
        {section.text}
      </h3>
    );
  }

  if (section.type === "paragraph") {
    return (
      <p
        style={{
          fontSize: "17px",
          color: "var(--blog-text)",
          lineHeight: 1.85,
          margin: "0 0 20px",
        }}
      >
        {section.text}
      </p>
    );
  }

  if (section.type === "list" && section.items) {
    return (
      <ul
        style={{
          margin: "20px 0 24px",
          paddingLeft: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {section.items.map((item, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              fontSize: "16px",
              color: "var(--blog-text)",
              lineHeight: 1.7,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                marginTop: "6px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 8px ${accentColor}55`,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

// ─────────────────────────────────────────────
// Related Post Card
// ─────────────────────────────────────────────
function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <motion.div variants={scaleIn}>
      <Link
        href={`/kurumsal/blog/${post.slug}`}
        aria-label={`${post.title} yazısını incele`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="group"
          style={{
            borderRadius: "18px",
            background: "transparent",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              borderRadius: "18px",
              background: post.gradient,
              boxShadow: "0 16px 36px rgba(0,0,0,0.22)",
            }}
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "clamp(38px, 12vw, 52px)",
                  fontWeight: 800,
                }}
              >
                {post.title.charAt(0)}
              </div>
            )}
            <span
              className="transition-all duration-200 group-hover:opacity-100"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.02em",
                background: "rgba(3, 99, 95, 0.86)",
                border: "1px solid rgba(255,255,255,0.24)",
                borderRadius: "999px",
                padding: "5px 8px",
                boxShadow: "0 10px 24px rgba(15,23,42,0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              İncele
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
// ─────────────────────────────────────────────
// Blog Detail Client
// ─────────────────────────────────────────────
export default function BlogDetailClient({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const { theme, toggle } = useBlogTheme();
  const firstParagraph =
    post.content.find(
      (section) => section.type === "paragraph" && section.text
    )?.text?.trim() ?? "";

  const remainingContent = post.content.filter((section) => {
    if (section.type !== "paragraph") return true;
    return (section.text?.trim() ?? "") !== firstParagraph;
  });
  return (
    <main
      data-blog-theme={theme}
      style={{
        minHeight: "100vh",
        background: "var(--blog-bg)",
        color: "var(--blog-title)",
        transition: "background 0.25s ease, color 0.25s ease",
      }}
    >
      <div
        className="grid-bg"
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "-300px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "700px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${post.accentColor}18 0%, rgba(6,182,212,0.05) 50%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── Article container ── */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "clamp(36px, 7vw, 72px) 24px 120px",
          }}
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: "32px", marginBottom: "36px" }}
          >
            <Link
              href="/kurumsal/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#64748b",
                textDecoration: "none",
                padding: "8px 14px 8px 10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f1f5f9";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <ArrowLeft size={15} />
              Blog&apos;a Dön
            </Link>
          </motion.div>

          {/* ── Post header ── */}
          <AnimatedSection variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: "20px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: post.categoryColor,
                  background: post.categoryBg,
                  border: `1px solid ${post.categoryBorder}`,
                }}
              >
                {post.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(28px, 5vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                color: "var(--blog-title)",
                margin: "0 0 20px",
              }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                fontSize: "13px",
                color: "var(--blog-meta)",
                marginBottom: "28px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={13} />
                {post.date}
              </span>
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#334155",
                  flexShrink: 0,
                }}
              />
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={13} />
                {post.readTime} dk okuma
              </span>
              <button
                onClick={toggle}
                title="Okuma modunu değiştir"
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--blog-divider)",
                  background: "var(--blog-card-bg)",
                  color: "var(--blog-meta)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                {theme === "dark" ? "Açık" : "Koyu"}
              </button>
            </motion.div>


            <motion.div
              variants={fadeUp}
              style={{
                padding: "20px 24px",
                borderRadius: "14px",
                background: "var(--blog-card-bg)",
                border: `1px solid ${post.categoryBorder}`,
                borderLeft: `3px solid ${post.categoryColor}`,
                marginBottom: "48px",
              }}
            >
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--blog-h3)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {firstParagraph}
              </p>
            </motion.div>

          </AnimatedSection>

          <div
            style={{
              borderTop: "1px solid var(--blog-divider)",
              marginBottom: "48px",
            }}
          />

          {/* ── Article content ── */}
          <AnimatedSection variants={stagger}>
            {remainingContent.map((section, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ContentBlock section={section} accentColor={post.accentColor} />
              </motion.div>
            ))}
          </AnimatedSection>

          {/* ── Bottom back button ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: "64px",
              paddingTop: "40px",
              borderTop: "1px solid var(--blog-divider)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              href="/kurumsal/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#e2e8f0",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.09)";
                el.style.borderColor = "rgba(255,255,255,0.18)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.05)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.transform = "translateY(0)";
              }}
            >
              <ArrowLeft size={16} />
              Blog&apos;a Geri Dön
            </Link>
          </motion.div>
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <section
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "80px 24px 100px",
            }}
          >
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <AnimatedSection variants={stagger}>
                <motion.div
                  variants={fadeUp}
                  style={{ textAlign: "center", marginBottom: "48px" }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 16px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#a78bfa",
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      marginBottom: "16px",
                    }}
                  >
                    ✦ İlgili Yazılar
                  </span>
                  <h2
                    style={{
                      fontSize: "clamp(24px, 4vw, 36px)",
                      fontWeight: 700,
                      color: "#f1f5f9",
                      letterSpacing: "-0.5px",
                      margin: 0,
                    }}
                  >
                    İlginizi Çekebilecek Diğer Yazılar
                  </h2>
                </motion.div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "clamp(16px, 2.5vw, 24px)",
                  }}
                >
                  {related.map((rel) => (
                    <RelatedCard key={rel.slug} post={rel} />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
