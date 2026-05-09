'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

async function assertAdminAuth() {
  const token = (await cookies()).get('admin-auth')?.value;
  if (!token) throw new Error('Unauthorized');
  await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET!)
  );
}

export async function getAppointmentRequests() {
  await assertAdminAuth();
  const records = await prisma.appointmentRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return records.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function setAppointmentRead(id: string, isRead: boolean) {
  await assertAdminAuth();
  await prisma.appointmentRequest.update({
    where: { id },
    data: { isRead },
  });
  revalidatePath('/admin/appointments');
}

export async function deleteAppointmentRequest(id: string) {
  await assertAdminAuth();
  await prisma.appointmentRequest.delete({ where: { id } });
  revalidatePath('/admin/appointments');
}
