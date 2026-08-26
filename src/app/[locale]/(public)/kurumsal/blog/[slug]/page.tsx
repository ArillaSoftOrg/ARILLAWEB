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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      seoTitle: true,
      seoDescription: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
      category: {
        select: { name: true },
      },
    },
  });
  if (!post) return { title: "Yazı Bulunamadı" };

  const metaTitle = post.seoTitle ?? post.title;
  const metaDescription = post.seoDescription ?? post.excerpt;
  const isTurkish = locale === 'tr';
  const title = isTurkish ? metaTitle : `${metaTitle} (Turkish)`;
  const description = isTurkish ? metaDescription : `${metaDescription} Turkish archive.`;
  const images = post.coverImage
    ? [{ url: post.coverImage, width: 1200, height: 630, alt: title }]
    : [];

  return {
    title,
    description,
    robots: isTurkish ? undefined : { index: false, follow: true },
    alternates: {
      canonical: `/tr/kurumsal/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      type: "article",
      url: `${SITE_URL}/${isTurkish ? 'tr' : locale}/kurumsal/blog/${slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      section: post.category?.name,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
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
