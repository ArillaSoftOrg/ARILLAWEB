import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { routing } from '@/i18n/routing';
import { INDUSTRIES, SERVICES } from '@/lib/en-site-data';

// EN-only routes (locale-gated to `en`, they 404 under `/tr`) — listed once, not looped
// across routing.locales like STATIC_PATHS below.
const EN_ONLY_PATHS = [
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  ...SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/sectoral-software', priority: 0.9, changeFrequency: 'weekly' as const },
  ...INDUSTRIES.map((industry) => ({
    path: `/sectoral-software/${industry.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/web-design-examples', priority: 0.8, changeFrequency: 'weekly' as const },
];

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
  { path: '/kurumsal/hakkimizda', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/kurumsal/kariyer', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/kurumsal/iletisim', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/teklif-al', priority: 0.7, changeFrequency: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date }[] = [];
  let services: { slug: string; updatedAt: Date }[] = [];
  let catalogSectors: { slug: string }[] = [];
  let catalogProjects: {
    slug: string;
    updatedAt: Date;
    category: { slug: string } | null;
  }[] = [];

  try {
    const [blogPosts, publishedServices, sectors, projects] = await prisma.$transaction([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.projectCategory.findMany({
        where: { isCatalogSector: true },
        select: { slug: true },
      }),
      prisma.project.findMany({
        where: {
          published: true,
          designCode: { not: null },
          category: { isCatalogSector: true },
        },
        select: {
          slug: true,
          updatedAt: true,
          category: { select: { slug: true } },
        },
      }),
    ]);
    posts = blogPosts;
    services = publishedServices;
    catalogSectors = sectors;
    catalogProjects = projects;
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

  entries.push({
    url: `${SITE_URL}/tr/kurumsal/blog`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // EN-only routes (Sectoral Software / Services / Web Design Examples) — not looped across
  // locales since they 404 under /tr.
  for (const { path, priority, changeFrequency } of EN_ONLY_PATHS) {
    entries.push({
      url: `${SITE_URL}/en${path}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency,
      priority,
    });
  }

  // Dynamic blog posts
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/tr/kurumsal/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  // Dynamic service pages
  for (const service of services) {
    entries.push({
      url: `${SITE_URL}/tr/hizmetler/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  entries.push({
    url: `${SITE_URL}/tr/site-ornekleri`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  for (const sector of catalogSectors) {
    entries.push({
      url: `${SITE_URL}/tr/site-ornekleri/${sector.slug}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  for (const project of catalogProjects) {
    if (!project.category) continue;
    entries.push({
      url: `${SITE_URL}/tr/site-ornekleri/${project.category.slug}/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return Array.from(new Map(entries.map((e) => [e.url, e])).values());
}
