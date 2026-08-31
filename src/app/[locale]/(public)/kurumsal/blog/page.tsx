import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from "@/lib/blog-db";
import { SITE_URL } from "@/lib/constants";
import { CorporatePageHero } from "@/components/corporate/CorporatePageHero";
import { ArticleGrid } from "@/components/corporate/blog/ArticleGrid";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

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

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });

  let posts: BlogPost[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    // Database unavailable or Prisma error - render empty state
  }

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Anasayfa', href: '/' }, { label: 'Blog' }]} />

      <CorporatePageHero title={t('title')} description={t('description')} />

      <section className="bg-home-bg py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <ArticleGrid posts={posts} emptyState={{ title: 'Henüz blog yazısı yok.' }} />
        </div>
      </section>
    </>
  );
}
