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

  const dbPost = await prisma.blogPost.findUnique({
    where: { slug },
    select: { publishedAt: true, updatedAt: true, createdAt: true },
  });

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // author: Organization (schema.org permits a non-Person author) — the
  // BlogPost model has no author field/system, so a Person author would
  // require a Prisma migration that's out of scope here.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.coverImage ?? undefined,
    datePublished: (dbPost?.publishedAt ?? dbPost?.createdAt)?.toISOString(),
    dateModified: dbPost?.updatedAt?.toISOString(),
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/tr/kurumsal/blog/${slug}`,
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: 'Anasayfa', href: '/' },
          { label: 'Blog', href: '/kurumsal/blog' },
          { label: post.title },
        ]}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogDetailClient post={post} related={related} />
    </>
  );
}
