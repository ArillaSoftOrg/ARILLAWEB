import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { appointmentSchema } from '@/lib/validations/appointment';
import { generateSlots } from '@/lib/availability';

const CONFLICT_ERROR = 'Seçtiğiniz saat artık uygun değil. Lütfen farklı bir saat seçiniz.';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 1. Check if date is past
    const today = new Date().toISOString().split('T')[0];
    if (data.date < today) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // 2. Check BlockedDate — check service-specific first, then "all"
    const blockedDate = await prisma.blockedDate.findFirst({
      where: {
        date: data.date,
        service: { in: [data.service, 'all'] },
      },
    });
    if (blockedDate) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // 3. Check BlockedTimeSlot — service-specific first, then "all"
    const blockedSlot = await prisma.blockedTimeSlot.findFirst({
      where: {
        date: data.date,
        time: data.time,
        service: { in: [data.service, 'all'] },
      },
    });
    if (blockedSlot) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // 4. Check AvailabilityRule — resolve effective rule with service-specific precedence
    const dayOfWeek = new Date(data.date + 'T00:00:00').getDay();
    const rules = await prisma.availabilityRule.findMany({
      where: {
        dayOfWeek,
        service: { in: [data.service, 'all'] },
      },
    });
    // Service-specific rule wins over "all"
    const effectiveRule = rules.find((r) => r.service === data.service) ?? rules.find((r) => r.service === 'all');
    if (!effectiveRule || !effectiveRule.isOpen) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // 5. Check if time is a valid generated slot
    const slots = generateSlots(effectiveRule.startTime, effectiveRule.endTime, effectiveRule.slotDuration);
    if (!slots.includes(data.time)) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // 6. Check if slot is already booked
    const existing = await prisma.appointmentRequest.findFirst({
      where: {
        date: data.date,
        time: data.time,
        service: data.service,
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: CONFLICT_ERROR },
        { status: 409 }
      );
    }

    // All checks passed — create the appointment
    await prisma.appointmentRequest.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
