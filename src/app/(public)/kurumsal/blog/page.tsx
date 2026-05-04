import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-db";
import BlogClient from "./BlogClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

type BlogPost = Awaited<ReturnType<typeof getAllPosts>>[number];

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
    url: `${SITE_URL}/kurumsal/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Yazılım, dijital dönüşüm, QR Menü ve teknoloji hakkında güncel içerikler.",
  },
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    // Database unavailable or Prisma error - render empty state
  }
  return <BlogClient posts={posts} />;
}
