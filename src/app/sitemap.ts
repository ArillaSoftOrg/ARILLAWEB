import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { routing } from '@/i18n/routing';

const STATIC_LAST_MODIFIED = new Date('2026-05-06T00:00:00+03:00');

const STATIC_PATHS = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/hizmetler', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/sektorel-yazilimlar', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/sektorel-yazilimlar/qr-menu', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/sektorel-yazilimlar/randevu-sistemi', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/kurumsal/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/kurumsal/hakkimizda', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/kurumsal/kariyer', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/kurumsal/iletisim', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/teklif-al', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date }[] = [];
  let services: { slug: string; updatedAt: Date }[] = [];

  try {
    const [blogPosts, publishedServices] = await prisma.$transaction([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
    posts = blogPosts;
    services = publishedServices;
  } catch {
    // Database unavailable during build — static routes still present
  }

  const entries: MetadataRoute.Sitemap = [];

  // Static routes — one entry per locale
  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency,
        priority,
      });
    }
  }

  // Dynamic blog posts
  for (const post of posts) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/kurumsal/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  // Dynamic service pages
  for (const service of services) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/hizmetler/${service.slug}`,
        lastModified: service.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return Array.from(new Map(entries.map((e) => [e.url, e])).values());
}
