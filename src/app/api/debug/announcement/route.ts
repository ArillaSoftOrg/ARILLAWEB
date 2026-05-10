import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  noStore();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const rows = id
      ? await prisma.announcementBar.findMany({ where: { id } })
      : await prisma.announcementBar.findMany({
          where: { enabled: true },
          orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
        });

    const bars = rows.map((row) => ({
      id: row.id,
      name: row.name,
      priority: row.priority,
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
    }));

    return NextResponse.json({ found: bars.length > 0, bars });
  } catch (error) {
    const err = error as Error & { code?: string };
    return NextResponse.json(
      { error: err?.message ?? 'Unknown error', code: err?.code ?? null },
      { status: 500 }
    );
  }
}
