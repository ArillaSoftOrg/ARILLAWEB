"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import type { BlogSection } from "./blog-data";

const CATEGORY_META: Record<string, { gradient: string; accentColor: string }> = {
  "QR Menü": {
    gradient: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 40%, #0c4a6e 100%)",
    accentColor: "#a78bfa",
  },
  "Yazılım": {
    gradient: "linear-gradient(135deg, #042f2e 0%, #083344 40%, #172554 100%)",
    accentColor: "#22d3ee",
  },
  "Tasarım": {
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 40%, #1c1917 100%)",
    accentColor: "#34d399",
  },
  "Yapay Zeka": {
    gradient: "linear-gradient(135deg, #451a03 0%, #78350f 40%, #1c1917 100%)",
    accentColor: "#fbbf24",
  },
  "SEO": {
    gradient: "linear-gradient(135deg, #500724 0%, #831843 40%, #1e1b4b 100%)",
    accentColor: "#f472b6",
  },
  "Mobil": {
    gradient: "linear-gradient(135deg, #2e1065 0%, #3b0764 40%, #0c4a6e 100%)",
    accentColor: "#c4b5fd",
  },
};

const DEFAULT_META = {
  gradient: "linear-gradient(135deg, #1e1b4b 0%, #0c4a6e 100%)",
  accentColor: "#94a3b8",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function upsertCategory(name: string): Promise<string> {
  const slug = slugify(name) || "genel";
  const cat = await prisma.blogCategory.upsert({
    where: { slug },
    create: { name, slug },
    update: {},
  });
  return cat.id;
}

export type PostDraft = {
  title: string;
  slug: string;
  description: string;
  category: string;
  readTime: string;
  emoji: string;
  published: boolean;
  publishDate: string;
  coverImage: string;
  sections: BlogSection[];
  seoTitle: string;
  seoDescription: string;
  seoFocusKeyword: string;
  seoSecondaryKeywords: string[];
};

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readingTime: number;
  published: boolean;
  publishedAt: string | null;
  coverImage: string | null;
  createdAt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  category: { name: string } | null;
};

export async function getAdminPosts(): Promise<AdminPost[]> {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    readingTime: p.readingTime,
    published: p.published,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    coverImage: p.coverImage,
    createdAt: p.createdAt.toISOString(),
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    category: p.category ? { name: p.category.name } : null,
  }));
}

export async function createPost(draft: PostDraft): Promise<void> {
  const slug = slugify(draft.slug || draft.title) || `post-${Date.now()}`;
  const categoryId = await upsertCategory(draft.category);
  const meta = CATEGORY_META[draft.category] ?? DEFAULT_META;
  const readingTime = parseInt(draft.readTime) || 5;
  const publishedAt = draft.publishDate ? new Date(`${draft.publishDate}T12:00:00`) : new Date();

  await prisma.blogPost.create({
    data: {
      title: draft.title,
      slug,
      excerpt: draft.description,
      content: JSON.stringify({
        emoji: draft.emoji || "📝",
        gradient: meta.gradient,
        accentColor: meta.accentColor,
        sections: draft.sections.length > 0
          ? draft.sections
          : [{ type: "paragraph", text: draft.description }],
        ...(draft.seoFocusKeyword ? { seoFocusKeyword: draft.seoFocusKeyword } : {}),
        ...(draft.seoSecondaryKeywords.length > 0 ? { seoSecondaryKeywords: draft.seoSecondaryKeywords } : {}),
      }),
      readingTime,
      published: draft.published,
      publishedAt: draft.published ? publishedAt : null,
      coverImage: draft.coverImage || null,
      seoTitle: draft.seoTitle || null,
      seoDescription: draft.seoDescription || null,
      categoryId,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/");
}

export async function updatePost(id: string, draft: PostDraft): Promise<void> {
  const categoryId = await upsertCategory(draft.category);
  const meta = CATEGORY_META[draft.category] ?? DEFAULT_META;
  const readingTime = parseInt(draft.readTime) || 5;
  const publishedAt = draft.publishDate ? new Date(`${draft.publishDate}T12:00:00`) : new Date();

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: draft.title,
      excerpt: draft.description,
      content: JSON.stringify({
        emoji: draft.emoji || "📝",
        gradient: meta.gradient,
        accentColor: meta.accentColor,
        sections: draft.sections.length > 0
          ? draft.sections
          : [{ type: "paragraph", text: draft.description }],
        ...(draft.seoFocusKeyword ? { seoFocusKeyword: draft.seoFocusKeyword } : {}),
        ...(draft.seoSecondaryKeywords.length > 0 ? { seoSecondaryKeywords: draft.seoSecondaryKeywords } : {}),
      }),
      readingTime,
      published: draft.published,
      publishedAt: draft.published ? publishedAt : null,
      coverImage: draft.coverImage || null,
      seoTitle: draft.seoTitle || null,
      seoDescription: draft.seoDescription || null,
      categoryId,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/");
}

export async function deletePost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/");
}
