"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

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
// Animated Section
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

// ─────────────────────────────────────────────
// Blog Card
// ─────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div variants={scaleIn} custom={index} transition={{ delay: index * 0.08 }}>
      <Link href={`/kurumsal/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
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
          {/* Cover image */}
          <div
            style={{
              position: "relative",
              height: "190px",
              overflow: "hidden",
              flexShrink: 0,
              background: post.gradient,
            }}
          >
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <>
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
                <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
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
              </>
            )}

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
                zIndex: 2,
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                color: post.accentColor,
                marginTop: "4px",
              }}
            >
              Devamını Oku
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Blog Client
// ─────────────────────────────────────────────
export default function BlogClient({ posts }: { posts: BlogPost[] }) {
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
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <section
          style={{
            paddingTop: "120px",
            paddingBottom: "64px",
            textAlign: "center",
            padding: "120px 24px 64px",
          }}
        >
          <AnimatedSection variants={stagger} className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 18px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#a78bfa",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  marginBottom: "24px",
                }}
              >
                ✦ Makaleler &amp; İçgörüler
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                margin: "0 0 20px",
              }}
            >
              <span className="gradient-text">Blog</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "18px",
                color: "#94a3b8",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Yazılım, teknoloji ve dijital dönüşüm dünyasındaki gelişmeleri; işletmelere etkileriyle birlikte paylaşıyoruz.
            </motion.p>
          </AnimatedSection>
        </section>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "64px",
          }}
        />

        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 120px",
          }}
        >
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#475569",
                fontSize: "16px",
              }}
            >
              Henüz blog yazısı yok.
            </div>
          ) : (
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </AnimatedSection>
          )}
        </section>
      </div>
    </main>
  );
}
