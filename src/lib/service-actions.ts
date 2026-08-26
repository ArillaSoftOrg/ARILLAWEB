"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type ServiceDraft = {
  title: string;
  description: string;
  icon: string;
  published: boolean;
};

export type AdminService = {
  id: string;
  title: string;
  description: string;
  icon: string;
  published: boolean;
  createdAt: string;
};

export type PublicService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  icon: string;
  isFeatured: boolean;
};

export async function getAdminServices(): Promise<AdminService[]> {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
  return services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.shortDescription,
    icon: s.icon,
    published: s.published,
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getPublishedServices(): Promise<AdminService[]> {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.shortDescription,
    icon: s.icon,
    published: s.published,
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getPublishedServicesForPublic(): Promise<PublicService[]> {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  return services.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    content: s.content,
    icon: s.icon,
    isFeatured: s.isFeatured,
  }));
}

export async function getServiceBySlug(slug: string): Promise<PublicService | null> {
  const s = await prisma.service.findFirst({
    where: { slug, published: true },
  });
  if (!s) return null;
  return {
    id: s.id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    content: s.content,
    icon: s.icon,
    isFeatured: s.isFeatured,
  };
}

export async function createService(draft: ServiceDraft): Promise<void> {
  const base = slugify(draft.title) || `service-${Date.now()}`;
  const existing = await prisma.service.findUnique({ where: { slug: base } });
  const slug = existing ? `${base}-${Date.now()}` : base;

  await prisma.service.create({
    data: {
      title: draft.title,
      slug,
      shortDescription: draft.description,
      content: draft.description,
      icon: draft.icon,
      published: draft.published,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function updateService(id: string, draft: ServiceDraft): Promise<void> {
  await prisma.service.update({
    where: { id },
    data: {
      title: draft.title,
      shortDescription: draft.description,
      content: draft.description,
      icon: draft.icon,
      published: draft.published,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function deleteService(id: string): Promise<void> {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}
