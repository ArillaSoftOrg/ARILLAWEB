import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date }[] = [];
  let services: { slug: string; updatedAt: Date }[] = [];

  try {
    const result = await prisma.$transaction([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
    posts = result[0];
    services = result[1];
  } catch {
    // Database unavailable — return static routes only
  }

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                              lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/hizmetler`,                                                                        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/sektorel-yazilimlar`,                                                              lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/sektorel-yazilimlar/qr-menu`,                                                     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi`,                                              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/kurumsal/blog`,           lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE_URL}/kurumsal/hakkimizda`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/kurumsal/kariyer`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/kurumsal/iletisim`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/teklif-al`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/kurumsal/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/hizmetler/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...serviceRoutes];
}
