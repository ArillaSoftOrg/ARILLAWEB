import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

const STATIC_LAST_MODIFIED = new Date('2026-05-06T00:00:00+03:00');

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
    // Database unavailable during build is expected.
    // Static routes are always present; dynamic routes load when DB is available.
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/hizmetler`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar/qr-menu`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kurumsal/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kurumsal/hakkimizda`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kurumsal/kariyer`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/kurumsal/iletisim`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/teklif-al`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/kurumsal/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/hizmetler/${service.slug}`,
    lastModified: service.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [...staticRoutes, ...blogRoutes, ...serviceRoutes];

  return Array.from(
    new Map(routes.map((route) => [route.url, route])).values()
  );
}
