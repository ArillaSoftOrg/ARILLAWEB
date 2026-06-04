"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/kurumsal/blog/${post.slug}`}
      className="group block"
      style={{ textDecoration: "none" }}
    >
      <article
        style={{
          background: "#fff",
          borderRadius: "18px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 18px 38px rgba(15,23,42,0.1)";
          e.currentTarget.style.borderColor = "#d1d5db";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 28px rgba(15,23,42,0.06)";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            background: post.gradient,
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
                fontSize: "56px",
                fontWeight: 800,
              }}
            >
              {post.title.charAt(0)}
            </div>
          )}
        </div>

        <div style={{ padding: "24px 26px 28px" }}>
          <time
            style={{
              display: "block",
              color: "#9ca3af",
              fontSize: "13px",
              fontWeight: 700,
              textAlign: "right",
              marginBottom: "14px",
            }}
          >
            {post.date}
          </time>

          <h2
            style={{
              color: "#111827",
              fontSize: "clamp(20px, 2.8vw, 25px)",
              lineHeight: 1.18,
              fontWeight: 800,
              margin: "0 0 12px",
              letterSpacing: "0",
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "15px",
              lineHeight: 1.7,
              margin: "0 0 24px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.description}
          </p>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#03635f",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.08em",
            }}
          >
            DEVAMINI OKU
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", color: "#111827" }}>
      <section
        style={{
          padding: "132px 20px 34px",
          background: "linear-gradient(135deg, #013f3e 0%, #07515b 58%, #0f172a 100%)",
          color: "#fff",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(110deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            opacity: 0.22,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1120px", margin: "0 auto", position: "relative" }}>
          <h1
            style={{
              fontSize: "clamp(38px, 8vw, 72px)",
              lineHeight: 1,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "0",
            }}
          >
            ArillaSoft <span style={{ color: "rgba(255,255,255,0.62)", fontWeight: 500 }}>Blog</span>
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "48px 20px 96px" }}>
        {posts.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "52px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Henüz blog yazısı yok.
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            style={{
              gap: "32px",
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
