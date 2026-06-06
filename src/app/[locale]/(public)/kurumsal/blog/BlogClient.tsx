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
      aria-label={`${post.title} yazısını oku`}
      style={{ textDecoration: "none" }}
    >
      <article
        style={{
          background: "transparent",
          borderRadius: "18px",
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
            boxShadow: "0 16px 36px rgba(15,23,42,0.12)",
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

        <div style={{ padding: "8px 2px 0" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "#03635f",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.02em",
            }}
          >
            İncele
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
              columnGap: "clamp(24px, 4vw, 32px)",
              rowGap: "clamp(28px, 4vw, 36px)",
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
