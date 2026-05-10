import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  noStore();
  try {
    const row = await prisma.announcementBar.findUnique({ where: { id: 'default' } });
    if (!row) {
      return NextResponse.json({ found: false });
    }
    return NextResponse.json({
      found: true,
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
    });
  } catch (error) {
    const err = error as any;
    return NextResponse.json(
      { error: err?.message ?? 'Unknown error', code: err?.code ?? null },
      { status: 500 }
    );
  }
}
