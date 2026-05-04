"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { BlogPost, BlogSection } from "@/lib/blog-data";

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
          color: "#f1f5f9",
          margin: "48px 0 16px",
          letterSpacing: "-0.4px",
          lineHeight: 1.3,
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
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
          color: "#e2e8f0",
          margin: "36px 0 12px",
          letterSpacing: "-0.2px",
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
          color: "#94a3b8",
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
              color: "#94a3b8",
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
      <Link href={`/kurumsal/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          className="group"
          style={{
            borderRadius: "16px",
            background: "rgba(17, 18, 25, 0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          <div
            style={{
              height: "120px",
              background: post.gradient,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
            <span style={{ position: "relative", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}>
              {post.emoji}
            </span>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                padding: "3px 10px",
                borderRadius: "100px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: post.categoryColor,
                background: post.categoryBg,
                border: `1px solid ${post.categoryBorder}`,
                backdropFilter: "blur(8px)",
              }}
            >
              {post.category}
            </div>
          </div>

          <div style={{ padding: "16px 18px 18px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#475569",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Calendar size={10} />
              {post.date}
              <span style={{ color: "#334155" }}>·</span>
              <Clock size={10} />
              {post.readTime}
            </div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
                lineHeight: 1.45,
                margin: "0 0 10px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h4>

            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginTop: "6px",
              }}
            >
              Yazılım & teknoloji kategorisinde bilgilendirici içerik
            </p>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: post.accentColor,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Oku <ChevronRight size={12} />
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
      style={{
        minHeight: "100vh",
        background: "#08090d",
        color: "#f1f5f9",
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
        {/* ── Hero / Cover ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(320px, 50vh, 520px)",
            background: post.gradient,
            overflow: "hidden",
          }}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <>
              <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />

              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  right: "-80px",
                  width: "400px",
                  height: "400px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${post.accentColor}28 0%, transparent 65%)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-60px",
                  left: "-60px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${post.accentColor}18 0%, transparent 65%)`,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(80px, 14vw, 130px)",
                  filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.5))",
                  userSelect: "none",
                }}
              >
                {post.emoji}
              </div>
            </>
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(8,9,13,0.12), rgba(8,9,13,0.45))",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #08090d)",
            }}
          />
        </div>

        {/* ── Article container ── */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "0 24px 120px",
          }}
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                color: "#f1f5f9",
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
                color: "#475569",
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
            </motion.div>


            <motion.div
              variants={fadeUp}
              style={{
                padding: "20px 24px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${post.categoryBorder}`,
                borderLeft: `3px solid ${post.categoryColor}`,
                marginBottom: "48px",
              }}
            >
              <p
                style={{
                  fontSize: "17px",
                  color: "#cbd5f5",
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
              borderTop: "1px solid rgba(255,255,255,0.06)",
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
              borderTop: "1px solid rgba(255,255,255,0.06)",
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
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "24px",
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
