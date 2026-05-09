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

export async function getAvailabilityConfig() {
  await assertAdminAuth();

  const [rules, blockedDates, blockedSlots] = await Promise.all([
    prisma.availabilityRule.findMany({
      orderBy: [{ dayOfWeek: 'asc' }, { service: 'asc' }],
    }),
    prisma.blockedDate.findMany({
      orderBy: { date: 'asc' },
    }),
    prisma.blockedTimeSlot.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    }),
  ]);

  return { rules, blockedDates, blockedSlots };
}

interface UpsertRuleData {
  dayOfWeek: number;
  isOpen: boolean;
  startTime: string;
  endTime: string;
  slotDuration: number;
  service: string;
}

export async function upsertAvailabilityRule(data: UpsertRuleData) {
  await assertAdminAuth();

  const result = await prisma.availabilityRule.upsert({
    where: {
      dayOfWeek_service: {
        dayOfWeek: data.dayOfWeek,
        service: data.service,
      },
    },
    update: {
      isOpen: data.isOpen,
      startTime: data.startTime,
      endTime: data.endTime,
      slotDuration: data.slotDuration,
      updatedAt: new Date(),
    },
    create: {
      dayOfWeek: data.dayOfWeek,
      isOpen: data.isOpen,
      startTime: data.startTime,
      endTime: data.endTime,
      slotDuration: data.slotDuration,
      service: data.service,
    },
  });

  revalidatePath('/admin/availability');
  return result;
}

export async function deleteAvailabilityRule(id: string) {
  await assertAdminAuth();

  await prisma.availabilityRule.delete({
    where: { id },
  });

  revalidatePath('/admin/availability');
}

interface BlockDateData {
  date: string;
  service: string;
  reason?: string;
}

export async function blockDate(data: BlockDateData) {
  await assertAdminAuth();

  const result = await prisma.blockedDate.upsert({
    where: {
      date_service: {
        date: data.date,
        service: data.service,
      },
    },
    update: {
      reason: data.reason,
    },
    create: {
      date: data.date,
      service: data.service,
      reason: data.reason,
    },
  });

  revalidatePath('/admin/availability');
  return result;
}

export async function unblockDate(id: string) {
  await assertAdminAuth();

  await prisma.blockedDate.delete({
    where: { id },
  });

  revalidatePath('/admin/availability');
}

interface BlockSlotData {
  date: string;
  time: string;
  service: string;
  reason?: string;
}

export async function blockTimeSlot(data: BlockSlotData) {
  await assertAdminAuth();

  const result = await prisma.blockedTimeSlot.upsert({
    where: {
      date_time_service: {
        date: data.date,
        time: data.time,
        service: data.service,
      },
    },
    update: {
      reason: data.reason,
    },
    create: {
      date: data.date,
      time: data.time,
      service: data.service,
      reason: data.reason,
    },
  });

  revalidatePath('/admin/availability');
  return result;
}

export async function unblockTimeSlot(id: string) {
  await assertAdminAuth();

  await prisma.blockedTimeSlot.delete({
    where: { id },
  });

  revalidatePath('/admin/availability');
}

/**
 * Initialize default availability schedule (idempotent).
 * Monday-Friday: 09:00-18:00, 30-min slots, service="all"
 * Saturday-Sunday: closed, service="all"
 *
 * Uses upsert on [dayOfWeek, service] unique key, so safe to call multiple times.
 */
export async function initializeDefaultSchedule() {
  await assertAdminAuth();

  const defaults = [
    // Sunday (0) - closed
    {
      dayOfWeek: 0,
      isOpen: false,
      startTime: '00:00',
      endTime: '00:00',
      slotDuration: 30,
      service: 'all',
    },
    // Monday (1) - open 09:00-18:00
    {
      dayOfWeek: 1,
      isOpen: true,
      startTime: '09:00',
      endTime: '18:00',
      slotDuration: 30,
      service: 'all',
    },
    // Tuesday (2)
    {
      dayOfWeek: 2,
      isOpen: true,
      startTime: '09:00',
      endTime: '18:00',
      slotDuration: 30,
      service: 'all',
    },
    // Wednesday (3)
    {
      dayOfWeek: 3,
      isOpen: true,
      startTime: '09:00',
      endTime: '18:00',
      slotDuration: 30,
      service: 'all',
    },
    // Thursday (4)
    {
      dayOfWeek: 4,
      isOpen: true,
      startTime: '09:00',
      endTime: '18:00',
      slotDuration: 30,
      service: 'all',
    },
    // Friday (5)
    {
      dayOfWeek: 5,
      isOpen: true,
      startTime: '09:00',
      endTime: '18:00',
      slotDuration: 30,
      service: 'all',
    },
    // Saturday (6) - closed
    {
      dayOfWeek: 6,
      isOpen: false,
      startTime: '00:00',
      endTime: '00:00',
      slotDuration: 30,
      service: 'all',
    },
  ];

  // Upsert each default rule
  await Promise.all(
    defaults.map((rule) =>
      prisma.availabilityRule.upsert({
        where: {
          dayOfWeek_service: {
            dayOfWeek: rule.dayOfWeek,
            service: rule.service,
          },
        },
        update: {
          isOpen: rule.isOpen,
          startTime: rule.startTime,
          endTime: rule.endTime,
          slotDuration: rule.slotDuration,
        },
        create: rule,
      })
    )
  );

  revalidatePath('/admin/availability');
}
