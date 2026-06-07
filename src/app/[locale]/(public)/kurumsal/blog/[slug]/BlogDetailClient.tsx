"use client";

import React, { useRef, useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Sun, Moon } from "lucide-react";
import BlogMediaCard from "@/components/blog/BlogMediaCard";
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
          margin: "clamp(32px, 5vw, 48px) 0 14px",
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
          margin: "clamp(24px, 4vw, 36px) 0 10px",
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
      <BlogMediaCard post={post} />
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
            padding: "clamp(20px, 5vw, 64px) 24px clamp(64px, 10vw, 96px)",
          }}
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "28px" }}
          >
            <Link
              href="/kurumsal/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--blog-btn-color)",
                textDecoration: "none",
                padding: "8px 14px 8px 10px",
                borderRadius: "10px",
                background: "var(--blog-btn-bg)",
                border: "1px solid var(--blog-btn-border)",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--blog-btn-hover-color)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--blog-btn-hover-bg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--blog-btn-color)";
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--blog-btn-bg)";
              }}
            >
              <ArrowLeft size={15} />
              Blog&apos;a Dön
            </Link>
          </motion.div>

          {/* ── Post header ── */}
          <AnimatedSection variants={stagger}>
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(26px, 5vw, 44px)",
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
                  background: "var(--blog-meta-dot)",
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
                marginBottom: "clamp(28px, 5vw, 48px)",
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
              marginBottom: "clamp(24px, 4vw, 48px)",
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
                background: "var(--blog-btn-bg)",
                border: "1px solid var(--blog-btn-border)",
                fontSize: "15px",
                fontWeight: 600,
                color: "var(--blog-btn-color)",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--blog-btn-hover-bg)";
                el.style.borderColor = "var(--blog-btn-border)";
                el.style.color = "var(--blog-btn-hover-color)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--blog-btn-bg)";
                el.style.borderColor = "var(--blog-btn-border)";
                el.style.color = "var(--blog-btn-color)";
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
              borderTop: "1px solid var(--blog-section-border)",
              padding: "clamp(48px, 8vw, 80px) 24px clamp(64px, 10vw, 100px)",
            }}
          >
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
              <AnimatedSection variants={stagger}>
                <motion.div
                  variants={fadeUp}
                  style={{ textAlign: "center", marginBottom: "clamp(28px, 5vw, 48px)" }}
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
                      color: "var(--blog-related-title)",
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
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
