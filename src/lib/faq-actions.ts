"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface FaqDraft {
  question: string;
  answer: string;
  page: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
  page: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const FAQ_PAGES: { value: string; label: string }[] = [
  { value: "global", label: "Tüm Sayfalar" },
  { value: "home", label: "Anasayfa" },
  { value: "qr-menu", label: "QR Menü" },
  { value: "randevu", label: "Randevu Sistemi" },
  { value: "klinik-randevu", label: "Klinik Randevu Sistemi" },
  { value: "kuafor-randevu", label: "Kuaför Randevu Sistemi" },
  { value: "guzellik-merkezi", label: "Güzellik Merkezi Randevu" },
  { value: "teklif-al", label: "Teklif Al" },
  { value: "iletisim", label: "İletişim" },
];

export function getPageLabel(page: string): string {
  return FAQ_PAGES.find((p) => p.value === page)?.label ?? page;
}

export async function getAdminFaqs(): Promise<AdminFaq[]> {
  const faqs = await prisma.fAQ.findMany({
    orderBy: [{ page: "asc" }, { sortOrder: "asc" }],
  });
  return (faqs as Array<{ id: string; question: string; answer: string; category: string; page: string; sortOrder: number; isActive: boolean; createdAt: Date; updatedAt: Date }>).map((f) => ({
    ...f,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
  }));
}

export async function getFaqsByPage(
  page: string
): Promise<{ question: string; answer: string }[]> {
  return prisma.fAQ.findMany({
    where: {
      isActive: true,
      OR: [{ page }, { page: "global" }],
    },
    orderBy: { sortOrder: "asc" },
    select: { question: true, answer: true },
  });
}

export async function createFaq(draft: FaqDraft): Promise<void> {
  await prisma.fAQ.create({ data: draft });
  revalidatePath("/", "layout");
}

export async function updateFaq(id: string, draft: FaqDraft): Promise<void> {
  await prisma.fAQ.update({ where: { id }, data: draft });
  revalidatePath("/", "layout");
}

export async function deleteFaq(id: string): Promise<void> {
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/", "layout");
}
