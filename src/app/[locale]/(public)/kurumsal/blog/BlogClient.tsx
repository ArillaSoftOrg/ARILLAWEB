"use client";

import BlogMediaCard from "@/components/blog/BlogMediaCard";
import { BlogPost } from "@/lib/blog-data";

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

      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(28px, 6vw, 40px) 20px 96px" }}>
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
              columnGap: "clamp(16px, 2.5vw, 24px)",
              rowGap: "clamp(16px, 2.5vw, 24px)",
            }}
          >
            {posts.map((post) => (
              <BlogMediaCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
