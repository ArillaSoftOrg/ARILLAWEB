"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar, Clock } from "lucide-react";

type HomeBlogPost = {
    slug: string;
    title: string;
    description?: string;
    excerpt?: string;
    date?: string;
    publishedAt?: string;
    readTime?: string;
    category?: string;
};

function formatDate(value?: string) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function HomeBlogPreview() {
    const [posts, setPosts] = useState<HomeBlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadPosts() {
            try {
                const res = await fetch("/api/blog", { cache: "no-store" });
                if (!res.ok) throw new Error("Blog verileri alınamadı.");
                const data = await res.json();

                const items = Array.isArray(data) ? data : data?.posts ?? data?.data ?? [];
                if (!active) return;

                setPosts(items.slice(0, 3));
            } catch (error) {
                console.error("HomeBlogPreview error:", error);
                if (active) setPosts([]);
            } finally {
                if (active) setLoading(false);
            }
        }

        loadPosts();

        return () => {
            active = false;
        };
    }, []);

    if (!loading && posts.length === 0) return null;

    return (
        <section
            style={{
                position: "relative",
                padding: "88px 24px 96px",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "end",
                        justifyContent: "space-between",
                        gap: "20px",
                        marginBottom: "36px",
                    }}
                >
                    <div style={{ maxWidth: "680px" }}>
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "7px",
                                padding: "6px 16px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "#a78bfa",
                                background: "rgba(124,58,237,0.1)",
                                border: "1px solid rgba(124,58,237,0.2)",
                                marginBottom: "18px",
                            }}
                        >
                            ✦ Blog
                        </span>

                        <h2
                            style={{
                                fontSize: "clamp(28px, 5vw, 44px)",
                                fontWeight: 800,
                                lineHeight: 1.12,
                                letterSpacing: "-1px",
                                color: "#f1f5f9",
                                margin: "0 0 14px",
                            }}
                        >
                            Son Yazılar
                        </h2>

                        <p
                            style={{
                                fontSize: "16px",
                                lineHeight: 1.75,
                                color: "#94a3b8",
                                margin: 0,
                                maxWidth: "720px",
                            }}
                        >
                            Yazılım, teknoloji ve dijital dönüşüm dünyasındaki gelişmeleri; işletmelere etkileriyle birlikte paylaşıyoruz.
                        </p>
                    </div>

                    <Link
                        href="/kurumsal/blog"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 18px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            color: "#e2e8f0",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            fontSize: "14px",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                        }}
                    >
                        Tüm Blog Yazıları
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {loading
                        ? [1, 2, 3].map((item) => (
                            <div
                                key={item}
                                style={{
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.03)",
                                    padding: "22px",
                                    minHeight: "220px",
                                }}
                            />
                        ))
                        : posts.map((post) => {
                            const summary = post.description || post.excerpt || "";
                            const published = formatDate(post.publishedAt || post.date);

                            return (
                                <Link
                                    key={post.slug}
                                    href={`/kurumsal/blog/${post.slug}`}
                                    style={{
                                        textDecoration: "none",
                                        display: "block",
                                    }}
                                >
                                    <article
                                        style={{
                                            height: "100%",
                                            borderRadius: "20px",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            background: "rgba(255,255,255,0.03)",
                                            padding: "22px",
                                            transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-4px)";
                                            e.currentTarget.style.borderColor = "rgba(124,58,237,0.18)";
                                            e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.32)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                gap: "12px",
                                                fontSize: "12px",
                                                color: "#64748b",
                                                marginBottom: "14px",
                                            }}
                                        >
                                            {post.category ? (
                                                <span
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        padding: "5px 12px",
                                                        borderRadius: "999px",
                                                        fontSize: "11px",
                                                        fontWeight: 700,
                                                        letterSpacing: "0.04em",
                                                        color: "#67e8f9",
                                                        background: "rgba(6,182,212,0.08)",
                                                        border: "1px solid rgba(6,182,212,0.16)",
                                                    }}
                                                >
                                                    {post.category}
                                                </span>
                                            ) : null}

                                            {published ? (
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                                    <Calendar size={12} />
                                                    {published}
                                                </span>
                                            ) : null}

                                            {post.readTime ? (
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                                                    <Clock size={12} />
                                                    {post.readTime} dk
                                                </span>
                                            ) : null}
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: "20px",
                                                lineHeight: 1.35,
                                                fontWeight: 700,
                                                color: "#f8fafc",
                                                margin: "0 0 12px",
                                                letterSpacing: "-0.3px",
                                            }}
                                        >
                                            {post.title}
                                        </h3>

                                        <p
                                            style={{
                                                fontSize: "14px",
                                                lineHeight: 1.8,
                                                color: "#94a3b8",
                                                margin: 0,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {summary}
                                        </p>

                                        <div
                                            style={{
                                                marginTop: "18px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                color: "#22d3ee",
                                                fontSize: "14px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            Yazıyı Oku
                                            <ArrowRight size={15} />
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </section>
    );
}