'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminSecret } from '@/lib/admin-secret';

async function assertAdminAuth() {
  const token = (await cookies()).get('admin-auth')?.value;
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(token, getAdminSecret());
}

export type AdminQuoteRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string;
  budgetRange: string;
  targetPlatform: string;
  deliveryExpectation: string | null;
  description: string;
  integrations: string | null;
  hasExistingSystem: boolean;
  isRead: boolean;
  createdAt: string;
};

export async function getQuoteRequests(): Promise<AdminQuoteRequest[]> {
  await assertAdminAuth();
  const rows = await prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map((r) => ({
    id: r.id,
    fullName: r.fullName,
    email: r.email,
    phone: r.phone,
    company: r.company,
    projectType: r.projectType,
    budgetRange: r.budgetRange,
    targetPlatform: r.targetPlatform,
    deliveryExpectation: r.deliveryExpectation,
    description: r.description,
    integrations: r.integrations,
    hasExistingSystem: r.hasExistingSystem,
    isRead: r.isRead,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function setQuoteRead(id: string, isRead: boolean): Promise<void> {
  await assertAdminAuth();
  await prisma.quoteRequest.update({ where: { id }, data: { isRead } });
  revalidatePath('/admin/quotes');
}

export async function deleteQuoteRequest(id: string): Promise<void> {
  await assertAdminAuth();
  await prisma.quoteRequest.delete({ where: { id } });
  revalidatePath('/admin/quotes');
}
