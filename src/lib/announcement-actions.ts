'use server';

import { prisma } from './prisma';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';

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

// ── Defaults ───────────────────────────────────────────────────────────────

const DEFAULTS: AnnouncementConfig = {
  enabled: false,
  text: '',
  description: null,
  backgroundColor: '#dc2626',
  textColor: '#ffffff',
  dismissible: false,
  countdownEnabled: false,
  countdownMode: 'fixed',
  startsAt: null,
  expiresAt: null,
  dailyResetHour: 0,
  dailyResetMinute: 0,
  scrollEnabled: false,
  scrollSpeed: 'normal',
  targetMode: 'all',
  targetRoutes: [],
};

// ── Zod Validation Schema ──────────────────────────────────────────────────

const announcementSchema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    // expiresAt must be after startsAt when both exist
    if (data.startsAt && data.expiresAt) {
      if (new Date(data.expiresAt) <= new Date(data.startsAt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır',
          path: ['expiresAt'],
        });
      }
    }

    // expiresAt required when countdownEnabled AND countdownMode is "fixed"
    if (data.countdownEnabled && data.countdownMode === 'fixed' && !data.expiresAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Sabit bitiş modu için bitiş tarihi zorunludur',
        path: ['expiresAt'],
      });
    }

    // targetRoutes non-empty when mode is selected/exclude
    if ((data.targetMode === 'selected' || data.targetMode === 'exclude') &&
        data.targetRoutes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bu hedefleme modu için en az bir rota gereklidir',
        path: ['targetRoutes'],
      });
    }
  });

// ── Read ───────────────────────────────────────────────────────────────────

export async function getAnnouncementDebugData(): Promise<AnnouncementDebugData | null> {
  noStore();
  const row = await prisma.announcementBar.findFirst();
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
  let row = await prisma.announcementBar.findFirst();
  if (!row) {
    row = await prisma.announcementBar.create({ data: {} });
  }
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

export async function updateAnnouncementConfig(
  data: Partial<AnnouncementConfig>
): Promise<{ success: boolean; savedConfig?: AnnouncementDebugData; errors?: Record<string, string[]> }> {
  try {
    const parsed = announcementSchema.partial().safeParse(data);
    if (!parsed.success) {
      const flatErrors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
      console.error('[AnnouncementBar Save Error] Zod validation failed:', flatErrors);
      return {
        success: false,
        errors: flatErrors,
      };
    }

    const { startsAt, expiresAt, ...rest } = parsed.data;
    const existing = await prisma.announcementBar.findFirst();

    const dbData = {
      ...rest,
      ...(startsAt !== undefined ? { startsAt: startsAt ? new Date(startsAt) : null } : {}),
      ...(expiresAt !== undefined ? { expiresAt: expiresAt ? new Date(expiresAt) : null } : {}),
    };

    if (existing) {
      await prisma.announcementBar.update({ where: { id: existing.id }, data: dbData });
    } else {
      await prisma.announcementBar.create({ data: dbData as any });
    }

    revalidatePath('/');
    revalidatePath('/sektorel-yazilimlar');
    revalidatePath('/hizmetler');
    revalidatePath('/admin/announcements');

    const savedConfig = await getAnnouncementDebugData();
    return { success: true, savedConfig: savedConfig ?? undefined };
  } catch (error) {
    const err = error as any;
    const errorLog = {
      message: '[AnnouncementBar Save Error]',
      name: err?.name || 'Unknown',
      errorMessage: err?.message || 'Unknown error',
      ...(err?.code && { prismaCode: err.code }),
    };

    console.error(JSON.stringify(errorLog));

    return {
      success: false,
      errors: {
        _form: ['Duyuru ayarları kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.'],
      },
    };
  }
}
