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
            aspectRatio: "2 / 1",
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
                fontSize: "clamp(38px, 12vw, 52px)",
                fontWeight: 800,
              }}
            >
              {post.title.charAt(0)}
            </div>
          )}
        </div>

        <div style={{ padding: "clamp(18px, 5vw, 24px)" }}>
          <time
            style={{
              display: "block",
              color: "#9ca3af",
              fontSize: "12px",
              fontWeight: 700,
              textAlign: "right",
              marginBottom: "12px",
            }}
          >
            {post.date}
          </time>

          <h2
            style={{
              color: "#111827",
              fontSize: "clamp(18px, 5vw, 23px)",
              lineHeight: 1.24,
              fontWeight: 800,
              margin: "0 0 10px",
              letterSpacing: "0",
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: 1.6,
              margin: "0 0 20px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
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
              gap: "8px",
              color: "#03635f",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.06em",
            }}
          >
            DEVAMINI OKU
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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
          minHeight: "44px",
          padding: "10px 20px 12px",
          background: "linear-gradient(135deg, #013f3e 0%, #07515b 58%, #0f172a 100%)",
          color: "#fff",
          overflow: "hidden",
          position: "relative",
          textAlign: "center",
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
              fontSize: "clamp(24px, 5vw, 34px)",
              lineHeight: 1,
              fontWeight: 900,
              margin: 0,
              letterSpacing: "0",
            }}
          >
            Blog
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "clamp(32px, 7vw, 48px) 20px 96px" }}>
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
              gap: "clamp(24px, 4vw, 32px)",
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
