'use server';

import { prisma } from './prisma';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';

// ── Types ──────────────────────────────────────────────────────────────────

export type AnnouncementConfig = {
  id: string;
  name: string;
  priority: number;
  enabled: boolean;
  text: string;
  description: string | null;
  backgroundColor: string;
  textColor: string;
  dismissible: boolean;
  countdownEnabled: boolean;
  countdownMode: 'fixed' | 'daily';
  startsAt: string | null;
  expiresAt: string | null;
  dailyResetHour: number;
  dailyResetMinute: number;
  scrollEnabled: boolean;
  scrollSpeed: 'slow' | 'normal' | 'fast';
  targetMode: string;
  targetRoutes: string[];
  updatedAt: string;
};

export type CampaignBarSummary = {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  startsAt: string | null;
  expiresAt: string | null;
  updatedAt: string;
};

export type ActionResult =
  | { success: true }
  | { success: false; errors?: Record<string, string[]>; formErrors?: string[]; message?: string };

// ── Zod Validation Schema ──────────────────────────────────────────────────

const announcementBaseSchema = z.object({
  name: z.string().min(1, 'Kampanya adı gereklidir').max(100),
  priority: z.number().int().min(0).max(9999),
  enabled: z.boolean(),
  text: z.string().min(1, 'Duyuru metni gereklidir'),
  description: z.string().nullable().optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Geçerli hex rengi girin'),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Geçerli hex rengi girin'),
  dismissible: z.boolean(),
  countdownEnabled: z.boolean(),
  countdownMode: z.enum(['fixed', 'daily']),
  startsAt: z.string().datetime({ offset: true }).nullable().optional(),
  expiresAt: z.string().datetime({ offset: true }).nullable().optional(),
  dailyResetHour: z.number().int().min(0).max(23),
  dailyResetMinute: z.number().int().min(0).max(59),
  scrollEnabled: z.boolean(),
  scrollSpeed: z.enum(['slow', 'normal', 'fast']),
  targetMode: z.enum(['all', 'sectoral', 'selected', 'exclude']),
  targetRoutes: z.array(z.string()),
});

const announcementSaveSchema = announcementBaseSchema.superRefine((data, ctx) => {
  if (data.startsAt && data.expiresAt) {
    if (new Date(data.expiresAt) <= new Date(data.startsAt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır',
        path: ['expiresAt'],
      });
    }
  }

  if (data.countdownEnabled && data.countdownMode === 'fixed' && !data.expiresAt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Sabit bitiş modu için bitiş tarihi zorunludur',
      path: ['expiresAt'],
    });
  }

  if (
    (data.targetMode === 'selected' || data.targetMode === 'exclude') &&
    data.targetRoutes.length === 0
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Bu hedefleme modu için en az bir rota gereklidir',
      path: ['targetRoutes'],
    });
  }
});

// ── Private mapper ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToConfig(row: any): AnnouncementConfig {
  return {
    id: row.id,
    name: row.name,
    priority: row.priority,
    enabled: row.enabled,
    text: row.text,
    description: row.description,
    backgroundColor: row.backgroundColor,
    textColor: row.textColor,
    dismissible: row.dismissible,
    countdownEnabled: row.countdownEnabled,
    countdownMode: row.countdownMode as 'fixed' | 'daily',
    startsAt: row.startsAt?.toISOString() ?? null,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    dailyResetHour: row.dailyResetHour,
    dailyResetMinute: row.dailyResetMinute,
    scrollEnabled: row.scrollEnabled,
    scrollSpeed: row.scrollSpeed as 'slow' | 'normal' | 'fast',
    targetMode: row.targetMode,
    targetRoutes: row.targetRoutes,
    updatedAt: row.updatedAt.toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToSummary(row: any): CampaignBarSummary {
  return {
    id: row.id,
    name: row.name,
    enabled: row.enabled,
    priority: row.priority,
    startsAt: row.startsAt?.toISOString() ?? null,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

function revalidateAll() {
  revalidatePath('/', 'layout');
  revalidatePath('/admin/announcements');
}

// ── Read ───────────────────────────────────────────────────────────────────

export async function getCampaignBars(): Promise<CampaignBarSummary[]> {
  noStore();
  const rows = await prisma.announcementBar.findMany({
    orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
  });
  return rows.map(rowToSummary);
}

export async function getCampaignBarById(id: string): Promise<AnnouncementConfig | null> {
  noStore();
  const row = await prisma.announcementBar.findUnique({ where: { id } });
  if (!row) return null;
  return rowToConfig(row);
}

export async function getActiveCampaignBars(): Promise<AnnouncementConfig[]> {
  noStore();
  const rows = await prisma.announcementBar.findMany({
    where: { enabled: true },
    orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
  });
  return rows.map(rowToConfig);
}

// ── Write ──────────────────────────────────────────────────────────────────

function buildDbData(parsed: z.infer<typeof announcementBaseSchema>) {
  const { startsAt, expiresAt, ...rest } = parsed;
  return {
    name: rest.name,
    priority: rest.priority,
    enabled: rest.enabled,
    text: rest.text,
    description: rest.description ?? null,
    backgroundColor: rest.backgroundColor,
    textColor: rest.textColor,
    dismissible: rest.dismissible,
    countdownEnabled: rest.countdownEnabled,
    countdownMode: rest.countdownMode,
    dailyResetHour: rest.dailyResetHour,
    dailyResetMinute: rest.dailyResetMinute,
    scrollEnabled: rest.scrollEnabled,
    scrollSpeed: rest.scrollSpeed,
    targetMode: rest.targetMode,
    targetRoutes: rest.targetRoutes,
    startsAt: startsAt ? new Date(startsAt) : null,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  };
}

export async function createCampaignBar(data: unknown): Promise<ActionResult> {
  try {
    const parsed = announcementSaveSchema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return {
        success: false,
        errors: flat.fieldErrors as Record<string, string[]>,
        formErrors: flat.formErrors,
      };
    }
    await prisma.announcementBar.create({ data: buildDbData(parsed.data) });
    revalidateAll();
    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err?.message ?? 'Bilinmeyen hata' };
  }
}

export async function updateCampaignBar(id: string, data: unknown): Promise<ActionResult> {
  try {
    const parsed = announcementSaveSchema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return {
        success: false,
        errors: flat.fieldErrors as Record<string, string[]>,
        formErrors: flat.formErrors,
      };
    }
    await prisma.announcementBar.update({ where: { id }, data: buildDbData(parsed.data) });
    revalidateAll();
    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err?.message ?? 'Bilinmeyen hata' };
  }
}

export async function deleteCampaignBar(id: string): Promise<ActionResult> {
  try {
    await prisma.announcementBar.delete({ where: { id } });
    revalidateAll();
    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err?.message ?? 'Bilinmeyen hata' };
  }
}

export async function toggleCampaignBar(id: string, enabled: boolean): Promise<ActionResult> {
  try {
    await prisma.announcementBar.update({ where: { id }, data: { enabled } });
    revalidateAll();
    return { success: true };
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err?.message ?? 'Bilinmeyen hata' };
  }
}
