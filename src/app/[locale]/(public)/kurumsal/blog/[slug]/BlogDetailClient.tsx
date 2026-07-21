"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, Sun, Moon } from "lucide-react";
import BlogMediaCard from "@/components/blog/BlogMediaCard";
import { BlogPost, BlogSection } from "@/lib/blog-data";
import styles from "./BlogDetail.module.css";

// Offset used both for the sticky TOC and for anchor scroll targets so
// headings don't slide under the fixed navbar (h-[92px] on desktop).
const HEADING_SCROLL_OFFSET = "calc(92px + var(--bar-h, 0px) + 16px)";

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
// Heading id generation — deterministic & unique
// ─────────────────────────────────────────────
// Turkish letters, upper first (İ→i avoids the combining-dot that a raw
// toLowerCase() would otherwise produce), then lower.
const TR_CHAR_MAP: Record<string, string> = {
  İ: "i", I: "i", Ç: "c", Ğ: "g", Ö: "o", Ş: "s", Ü: "u",
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u",
};

function slugify(text: string): string {
  return text
    .replace(/[İIÇĞÖŞÜçğıöşü]/g, (ch) => TR_CHAR_MAP[ch] ?? ch)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Walk the body sections once, assigning a stable, unique id to every
 * heading. Duplicate heading text gets a numeric suffix (`slug`, `slug-2`).
 * Returns the id map (keyed by body-array index) and the ordered TOC list.
 */
function buildHeadingIds(sections: BlogSection[]) {
  const counts = new Map<string, number>();
  const idByIndex = new Map<number, string>();
  const toc: TocEntry[] = [];

  sections.forEach((section, index) => {
    if (section.type !== "heading2" && section.type !== "heading3") return;
    const text = section.text ?? "";
    const base = slugify(text) || "baslik";
    const seen = (counts.get(base) ?? 0) + 1;
    counts.set(base, seen);
    const id = seen === 1 ? base : `${base}-${seen}`;
    idByIndex.set(index, id);
    toc.push({ id, text, level: section.type === "heading2" ? 2 : 3 });
  });

  return { idByIndex, toc };
}

// ─────────────────────────────────────────────
// Scroll-spy for the desktop TOC. Only drives the
// active highlight — content is always rendered.
// ─────────────────────────────────────────────
function useActiveHeading(toc: TocEntry[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;
    const elements = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return activeId;
}

// ─────────────────────────────────────────────
// Content Renderer
// ─────────────────────────────────────────────
function ContentBlock({
  section,
  accentColor,
  headingId,
}: {
  section: BlogSection;
  accentColor: string;
  headingId?: string;
}) {
  if (section.type === "heading2") {
    return (
      <h2
        id={headingId}
        style={{
          fontSize: "clamp(20px, 3vw, 26px)",
          fontWeight: 700,
          color: "var(--blog-h2)",
          margin: "clamp(32px, 5vw, 48px) 0 14px",
          lineHeight: 1.3,
          paddingBottom: "12px",
          borderBottom: "1px solid var(--blog-border)",
          scrollMarginTop: HEADING_SCROLL_OFFSET,
        }}
      >
        {section.text}
      </h2>
    );
  }

  if (section.type === "heading3") {
    return (
      <h3
        id={headingId}
        style={{
          fontSize: "clamp(17px, 2.5vw, 20px)",
          fontWeight: 600,
          color: "var(--blog-h3)",
          margin: "clamp(24px, 4vw, 36px) 0 10px",
          lineHeight: 1.4,
          scrollMarginTop: HEADING_SCROLL_OFFSET,
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
// Table of contents (desktop only via CSS)
// ─────────────────────────────────────────────
function TableOfContents({
  toc,
  activeId,
}: {
  toc: TocEntry[];
  activeId: string;
}) {
  if (toc.length === 0) return null;
  return (
    <aside className={styles.tocCol}>
      <nav aria-label="İçindekiler">
        <p className={styles.tocTitle}>İçindekiler</p>
        <ul className={styles.tocList}>
          {toc.map((entry) => {
            const linkClass = [
              styles.tocLink,
              entry.level === 3 ? styles.tocLevel3 : "",
              entry.id === activeId ? styles.tocActive : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className={linkClass}
                  aria-current={entry.id === activeId ? "true" : undefined}
                >
                  {entry.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
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

  // Lead summary: keep the first paragraph, and drop ONLY that exact index
  // from the body. No text-equality / excerpt comparison.
  const leadIndex = post.content.findIndex(
    (section) => section.type === "paragraph" && !!section.text?.trim()
  );
  const leadText =
    leadIndex >= 0 ? post.content[leadIndex].text?.trim() ?? "" : "";
  const bodyContent = useMemo(
    () => post.content.filter((_, i) => i !== leadIndex),
    [post.content, leadIndex]
  );

  const { idByIndex, toc } = useMemo(
    () => buildHeadingIds(bodyContent),
    [bodyContent]
  );
  const activeId = useActiveHeading(toc);

  const hasCover =
    typeof post.coverImage === "string" && post.coverImage.trim().length > 0;

  return (
    <main
      data-blog-theme={theme}
      className={styles.main}
      style={
        {
          "--post-accent": post.accentColor,
        } as React.CSSProperties
      }
    >
      <div className={`grid-bg ${styles.gridBg}`} />
      <div
        className={styles.glow}
        style={{
          background: `radial-gradient(ellipse, ${post.accentColor}14 0%, rgba(6,182,212,0.04) 50%, transparent 70%)`,
        }}
      />

      <div className={styles.content}>
        <div className={styles.shell}>
          <div className={styles.article}>
            {/* Back button */}
            <Link href="/kurumsal/blog" className={styles.backTop}>
              <ArrowLeft size={15} />
              Blog&apos;a Dön
            </Link>

            {/* Header */}
            <header className={styles.fadeIn}>
              <h1 className={styles.title}>{post.title}</h1>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <Calendar size={13} />
                  {post.date}
                </span>
                <span className={styles.metaDot} />
                <span className={styles.metaItem}>
                  <Clock size={13} />
                  {post.readTime} okuma
                </span>
                <button
                  type="button"
                  onClick={toggle}
                  title="Okuma modunu değiştir"
                  aria-label={
                    theme === "dark"
                      ? "Açık okuma moduna geç"
                      : "Koyu okuma moduna geç"
                  }
                  aria-pressed={theme === "light"}
                  className={styles.toggle}
                >
                  {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                  {theme === "dark" ? "Açık" : "Koyu"}
                </button>
              </div>

              {/* Optional cover hero — only for a valid coverImage */}
              {hasCover && (
                <div className={styles.hero}>
                  <Image
                    src={post.coverImage as string}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className={styles.heroImg}
                  />
                </div>
              )}

              {leadText && (
                <div
                  className={styles.summary}
                  style={
                    {
                      "--summary-border": post.categoryBorder,
                      "--summary-accent": post.categoryColor,
                    } as React.CSSProperties
                  }
                >
                  <p className={styles.summaryText}>{leadText}</p>
                </div>
              )}
            </header>

            <div className={styles.divider} />

            {/* Article body */}
            <article>
              {bodyContent.map((section, i) => (
                <ContentBlock
                  key={i}
                  section={section}
                  accentColor={post.accentColor}
                  headingId={idByIndex.get(i)}
                />
              ))}
            </article>

            {/* Bottom back button */}
            <div className={styles.backFooter}>
              <Link href="/kurumsal/blog" className={styles.backBottom}>
                <ArrowLeft size={16} />
                Blog&apos;a Geri Dön
              </Link>
            </div>
          </div>

          <TableOfContents toc={toc} activeId={activeId} />
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className={styles.related}>
            <div className={styles.relatedInner}>
              <div className={styles.relatedHead}>
                <span className={styles.relatedBadge}>✦ İlgili Yazılar</span>
                <h2 className={styles.relatedTitle}>
                  İlginizi Çekebilecek Diğer Yazılar
                </h2>
              </div>

              <div className={styles.relatedGrid}>
                {related.map((rel) => (
                  <BlogMediaCard key={rel.slug} post={rel} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
