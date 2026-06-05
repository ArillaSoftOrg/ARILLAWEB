import { prisma } from "./prisma";
import type { BlogPost, BlogSection } from "./blog-data";

const CATEGORY_META: Record<string, {
  color: string; bg: string; border: string;
  gradient: string; accentColor: string;
}> = {
  "QR Menü": {
    color: "#7c3aed", bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.25)",
    gradient: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 40%, #0c4a6e 100%)",
    accentColor: "#a78bfa",
  },
  "Yazılım": {
    color: "#06b6d4", bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.25)",
    gradient: "linear-gradient(135deg, #042f2e 0%, #083344 40%, #172554 100%)",
    accentColor: "#22d3ee",
  },
  "Tasarım": {
    color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #1c1917 100%)",
    accentColor: "#34d399",
  },
  "Yapay Zeka": {
    color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)",
    gradient: "linear-gradient(135deg, #451a03 0%, #78350f 40%, #1c1917 100%)",
    accentColor: "#fbbf24",
  },
  "SEO": {
    color: "#ec4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)",
    gradient: "linear-gradient(135deg, #500724 0%, #831843 40%, #1e1b4b 100%)",
    accentColor: "#f472b6",
  },
  "Mobil": {
    color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)",
    gradient: "linear-gradient(135deg, #2e1065 0%, #3b0764 40%, #0c4a6e 100%)",
    accentColor: "#c4b5fd",
  },
};

const DEFAULT_META = {
  color: "#64748b", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.25)",
  gradient: "linear-gradient(135deg, #1e1b4b 0%, #0c4a6e 100%)",
  accentColor: "#94a3b8",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

type DbPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readingTime: number;
  publishedAt: Date | null;
  createdAt: Date;
  coverImage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  category: { name: string } | null;
};

export function dbPostToUiPost(post: DbPost): BlogPost {
  const catName = post.category?.name ?? "Genel";
  const meta = CATEGORY_META[catName] ?? DEFAULT_META;

  let contentData: {
    emoji?: string;
    sections?: BlogSection[];
    seoFocusKeyword?: string;
    seoSecondaryKeywords?: string[];
  } = {};
  try {
    contentData = JSON.parse(post.content);
  } catch {
    contentData = {};
  }

  return {
    slug: post.slug,
    category: catName,
    categoryColor: meta.color,
    categoryBg: meta.bg,
    categoryBorder: meta.border,
    title: post.title,
    description: post.excerpt,
    date: formatDate(post.publishedAt ?? post.createdAt),
    readTime: `${post.readingTime} dk`,
    gradient: meta.gradient,
    accentColor: meta.accentColor,
    emoji: contentData.emoji ?? "📝",
    coverImage: post.coverImage,
    content: contentData.sections ?? [{ type: "paragraph", text: post.excerpt }],
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    seoFocusKeyword: contentData.seoFocusKeyword ?? undefined,
    seoSecondaryKeywords: contentData.seoSecondaryKeywords ?? undefined,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return posts.map(dbPostToUiPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!post || !post.published) return null;
  return dbPostToUiPost(post);
}
