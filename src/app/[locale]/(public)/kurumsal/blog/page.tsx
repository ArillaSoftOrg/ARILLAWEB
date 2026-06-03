import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from "@/lib/blog-db";
import BlogClient from "./BlogClient";
import { SITE_URL } from "@/lib/constants";

type BlogPost = Awaited<ReturnType<typeof getAllPosts>>[number];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/kurumsal/blog`,
      languages: { tr: '/tr/kurumsal/blog', en: '/en/kurumsal/blog', 'x-default': '/tr/kurumsal/blog' },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}/kurumsal/blog`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    // Database unavailable or Prisma error - render empty state
  }
  return <BlogClient posts={posts} />;
}
