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
  const isTurkish = locale === 'tr';
  const title = isTurkish ? t('title') : `${t('title')} (Turkish)`;
  const description = isTurkish ? t('description') : `${t('description')} Turkish archive.`;
  return {
    title,
    description,
    robots: isTurkish ? undefined : { index: false, follow: true },
    alternates: {
      canonical: '/tr/kurumsal/blog',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${isTurkish ? 'tr' : locale}/kurumsal/blog`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
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
