import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { appointmentSchema } from '@/lib/validations/appointment';

export async function POST(req: Request) {
  const body = await req.json();
  const result = appointmentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 }
    );
  }

  await prisma.appointmentRequest.create({ data: result.data });
  return NextResponse.json({ ok: true });
}
