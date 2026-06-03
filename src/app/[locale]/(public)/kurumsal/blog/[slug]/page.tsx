import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog-db";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { prisma } from "@/lib/prisma";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
      category: {
        select: { name: true },
      },
    },
  });
  if (!post) return { title: "Yazı Bulunamadı" };

  const images = post.coverImage
    ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
    : [];

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/kurumsal/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      type: "article",
      url: `${SITE_URL}/kurumsal/blog/${slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      section: post.category?.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Anasayfa', href: '/' },
          { label: 'Blog', href: '/kurumsal/blog' },
          { label: post.title },
        ]}
      />
      <BlogDetailClient post={post} related={related} />
    </>
  );
}
