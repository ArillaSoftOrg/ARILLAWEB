import { prisma } from '@/lib/prisma';
import { generateSlots, isSlotAvailable } from '@/lib/availability';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const date = url.searchParams.get('date'); // YYYY-MM-DD
    const service = url.searchParams.get('service') || 'all';

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Check if date is in the past
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return NextResponse.json({ slots: [] });
    }

    // Get day of week
    const dayOfWeek = new Date(date + 'T00:00:00').getDay();

    // Load all necessary data
    const [rules, blockedSlots, appointments] = await Promise.all([
      prisma.availabilityRule.findMany({
        where: { dayOfWeek },
      }),
      prisma.blockedTimeSlot.findMany({
        where: { date },
      }),
      prisma.appointmentRequest.findMany({
        where: { date },
      }),
    ]);

    // Determine effective rule (service-specific wins over "all")
    const serviceSpecificRule = rules.find((r) => r.service === service);
    const allRule = rules.find((r) => r.service === 'all');
    const effectiveRule = serviceSpecificRule || allRule;

    // If no rule or day is closed, return empty slots
    if (!effectiveRule || !effectiveRule.isOpen) {
      return NextResponse.json({ slots: [] });
    }

    // Generate slots for this day
    const slots = generateSlots(
      effectiveRule.startTime,
      effectiveRule.endTime,
      effectiveRule.slotDuration
    );

    // Get booked slots for this service
    const bookedSlotsForService = appointments
      .filter((appt) => appt.service === service && appt.date === date)
      .map((appt) => appt.time);

    // Compute status for each slot
    const result = slots.map((time) => {
      const status = isSlotAvailable(time, date, service, bookedSlotsForService, blockedSlots, rules);
      return { time, status };
    });

    return NextResponse.json({ slots: result });
  } catch (error) {
    console.error('Error in /api/availability/slots:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
