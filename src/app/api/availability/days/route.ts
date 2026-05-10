import { prisma } from '@/lib/prisma';
import { getDayStatus, generateSlots } from '@/lib/availability';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const month = url.searchParams.get('month'); // YYYY-MM
    const service = url.searchParams.get('service') || 'all';

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { error: 'Invalid month format. Use YYYY-MM' },
        { status: 400 }
      );
    }

    // Parse month
    const [yearStr, monthStr] = month.split('-');
    const year = Number(yearStr);
    const monthNum = Number(monthStr) - 1; // 0-indexed

    // Get number of days in this month
    const lastDay = new Date(year, monthNum + 1, 0).getDate();

    // Load all necessary data from DB
    const [rules, blockedDates, blockedSlots, appointments] = await Promise.all([
      prisma.availabilityRule.findMany(),
      prisma.blockedDate.findMany(),
      prisma.blockedTimeSlot.findMany(),
      prisma.appointmentRequest.findMany({
        where: {
          date: {
            gte: `${month}-01`,
            lte: `${month}-${String(lastDay).padStart(2, '0')}`,
          },
        },
      }),
    ]);

    // Build response
    const result: Record<string, string> = {};

    for (let day = 1; day <= lastDay; day++) {
      const dateStr = `${month}-${String(day).padStart(2, '0')}`;

      // Get booked slots for this date and service
      const bookedSlots = appointments
        .filter((appt) => appt.date === dateStr && appt.service === service)
        .map((appt) => appt.time);

      // Get relevant rules for this day of week
      const dayOfWeek = new Date(dateStr + 'T00:00:00').getDay();
      const dayRules = rules.filter((r) => r.dayOfWeek === dayOfWeek);

      // Determine effective rule (service-specific wins over "all")
      const serviceSpecificRule = dayRules.find((r) => r.service === service);
      const allRule = dayRules.find((r) => r.service === 'all');
      const effectiveRule = serviceSpecificRule || allRule;

      // Generate slots if open
      let generatedSlots: string[] = [];
      if (effectiveRule?.isOpen) {
        generatedSlots = generateSlots(
          effectiveRule.startTime,
          effectiveRule.endTime,
          effectiveRule.slotDuration
        );
      }

      // Get blocked dates and slots for this date
      const dayBlockedDates = blockedDates.filter((bd) => bd.date === dateStr);
      const dayBlockedSlots = blockedSlots.filter((bs) => bs.date === dateStr);

      // Compute day status
      const status = getDayStatus(
        dateStr,
        service,
        bookedSlots,
        dayBlockedDates,
        dayRules,
        generatedSlots,
        dayBlockedSlots
      );

      result[dateStr] = status;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/availability/days:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
