'use server';

import { prisma } from './prisma';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';

// ── Constants ──────────────────────────────────────────────────────────────

const SINGLETON_ID = 'default';

// ── Types ──────────────────────────────────────────────────────────────────

export type AnnouncementDebugData = {
  enabled: boolean;
  text: string;
  description: string | null;
  countdownEnabled: boolean;
  countdownMode: string;
  startsAt: string | null;
  expiresAt: string | null;
  scrollEnabled: boolean;
  scrollSpeed: string;
  targetMode: string;
  targetRoutes: string[];
  dismissible: boolean;
  updatedAt: string;
};

export type AnnouncementConfig = {
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
};

// ── Zod Validation Schema ──────────────────────────────────────────────────

// Field-level validation only — no superRefine so .partial() is safe to call on this
const announcementBaseSchema = z.object({
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

// Full save schema — adds cross-field rules on top of the base
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

// ── Singleton migration ────────────────────────────────────────────────────
//
// Ensures there is exactly one AnnouncementBar row with id = SINGLETON_ID.
// On first call after deploy, promotes the most-recently-updated legacy row
// and deletes all others.

async function getSingleton() {
  const row = await prisma.announcementBar.findUnique({ where: { id: SINGLETON_ID } });
  if (row) return row;

  // Find all legacy rows ordered by most recently updated
  const legacyRows = await prisma.announcementBar.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  if (legacyRows.length === 0) {
    // No rows at all — create fresh singleton with schema defaults
    return await prisma.announcementBar.create({ data: { id: SINGLETON_ID } });
  }

  const latest = legacyRows[0];

  // Create the canonical singleton from the most-recent legacy row's data
  const singleton = await prisma.announcementBar.create({
    data: {
      id: SINGLETON_ID,
      enabled: latest.enabled,
      text: latest.text,
      description: latest.description,
      backgroundColor: latest.backgroundColor,
      textColor: latest.textColor,
      dismissible: latest.dismissible,
      countdownEnabled: latest.countdownEnabled,
      countdownMode: latest.countdownMode,
      startsAt: latest.startsAt,
      expiresAt: latest.expiresAt,
      dailyResetHour: latest.dailyResetHour,
      dailyResetMinute: latest.dailyResetMinute,
      scrollEnabled: latest.scrollEnabled,
      scrollSpeed: latest.scrollSpeed,
      targetMode: latest.targetMode,
      targetRoutes: latest.targetRoutes,
    },
  });

  // Delete all legacy rows
  await prisma.announcementBar.deleteMany({
    where: { id: { in: legacyRows.map((r) => r.id) } },
  });

  console.log(`[AnnouncementBar] Migrated ${legacyRows.length} legacy row(s) into singleton "${SINGLETON_ID}"`);

  return singleton;
}

// ── Read ───────────────────────────────────────────────────────────────────

export async function getAnnouncementDebugData(): Promise<AnnouncementDebugData | null> {
  noStore();
  const row = await prisma.announcementBar.findUnique({ where: { id: SINGLETON_ID } });
  if (!row) return null;
  return {
    enabled: row.enabled,
    text: row.text,
    description: row.description,
    countdownEnabled: row.countdownEnabled,
    countdownMode: row.countdownMode,
    startsAt: row.startsAt?.toISOString() ?? null,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    scrollEnabled: row.scrollEnabled,
    scrollSpeed: row.scrollSpeed,
    targetMode: row.targetMode,
    targetRoutes: row.targetRoutes,
    dismissible: row.dismissible,
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function getAnnouncementConfig(): Promise<AnnouncementConfig> {
  noStore();
  const row = await getSingleton();
  return {
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
  };
}

// ── Write ──────────────────────────────────────────────────────────────────

type UpdateResult =
  | { success: true; data?: AnnouncementDebugData }
  | {
      success: false;
      errors?: Record<string, string[]>;
      formErrors?: string[];
      debugMessage?: string;
      prismaCode?: string;
    };

export async function updateAnnouncementConfig(
  data: Partial<AnnouncementConfig>
): Promise<UpdateResult> {
  try {
    const parsed = announcementSaveSchema.safeParse(data);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      console.error('[AnnouncementBar Save Error] Zod validation failed:', JSON.stringify(flat));
      return {
        success: false,
        errors: flat.fieldErrors as Record<string, string[]>,
        formErrors: flat.formErrors,
      };
    }

    const { startsAt, expiresAt, ...rest } = parsed.data;

    const dbData = {
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

    await prisma.announcementBar.upsert({
      where: { id: SINGLETON_ID },
      update: dbData,
      create: { id: SINGLETON_ID, ...dbData },
    });

    revalidatePath('/');
    revalidatePath('/sektorel-yazilimlar');
    revalidatePath('/hizmetler');
    revalidatePath('/admin/announcements');

    const savedRow = await prisma.announcementBar.findUnique({ where: { id: SINGLETON_ID } });
    const savedConfig: AnnouncementDebugData | undefined = savedRow
      ? {
          enabled: savedRow.enabled,
          text: savedRow.text,
          description: savedRow.description,
          countdownEnabled: savedRow.countdownEnabled,
          countdownMode: savedRow.countdownMode,
          startsAt: savedRow.startsAt?.toISOString() ?? null,
          expiresAt: savedRow.expiresAt?.toISOString() ?? null,
          scrollEnabled: savedRow.scrollEnabled,
          scrollSpeed: savedRow.scrollSpeed,
          targetMode: savedRow.targetMode,
          targetRoutes: savedRow.targetRoutes,
          dismissible: savedRow.dismissible,
          updatedAt: savedRow.updatedAt.toISOString(),
        }
      : undefined;

    return { success: true, data: savedConfig };
  } catch (error) {
    const err = error as any;
    console.error(JSON.stringify({
      message: '[AnnouncementBar Save Error]',
      name: err?.name || 'Unknown',
      errorMessage: err?.message || 'Unknown error',
      ...(err?.code && { prismaCode: err.code }),
    }));

    return {
      success: false,
      errors: { _form: ['Duyuru ayarları kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.'] },
      debugMessage: err?.message || 'Unknown error',
      ...(err?.code && { prismaCode: err.code }),
    };
  }
}
