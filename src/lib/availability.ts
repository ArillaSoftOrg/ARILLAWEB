// Pure utility functions for availability logic
// No Prisma dependencies — can be used on both server and client

export type DayStatus = 'available' | 'closed' | 'fully_booked' | 'blocked' | 'past';
export type SlotStatus = 'available' | 'booked' | 'blocked';

export interface BlockedDateRecord {
  id: string;
  date: string;
  service: string; // "all" or specific service
  reason?: string | null;
}

export interface BlockedTimeSlotRecord {
  id: string;
  date: string;
  time: string;
  service: string; // "all" or specific service
  reason?: string | null;
}

export interface AvailabilityRuleRecord {
  id: string;
  dayOfWeek: number; // 0=Sun, 1=Mon, ..., 6=Sat
  isOpen: boolean;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  slotDuration: number; // minutes
  service: string; // "all" or specific service
}

/**
 * Generate time slots between startTime and endTime with given duration.
 * Example: generateSlots("09:00", "18:00", 30) => ["09:00", "09:30", ..., "17:30"]
 * The last slot's END time must be at or before endTime.
 */
export function generateSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number
): string[] {
  const slots: string[] = [];

  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  let currentMinutes = startHour * 60 + startMin;
  const endTotalMinutes = endHour * 60 + endMin;

  while (currentMinutes + durationMinutes <= endTotalMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const min = currentMinutes % 60;
    slots.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
    currentMinutes += durationMinutes;
  }

  return slots;
}

/**
 * Check if a slot is available, booked, or blocked.
 * Service-specific blocks override "all" blocks.
 */
export function isSlotAvailable(
  slot: string,
  date: string,
  service: string,
  bookedSlots: string[],
  blockedSlots: BlockedTimeSlotRecord[],
  rules: AvailabilityRuleRecord[]
): SlotStatus {
  // Check if slot is booked
  if (bookedSlots.includes(slot)) {
    return 'booked';
  }

  // Check if slot is blocked (service-specific first, then "all")
  const serviceSpecificBlock = blockedSlots.find(
    (bs) => bs.date === date && bs.time === slot && bs.service === service
  );
  if (serviceSpecificBlock) {
    return 'blocked';
  }

  const allBlock = blockedSlots.find(
    (bs) => bs.date === date && bs.time === slot && bs.service === 'all'
  );
  if (allBlock) {
    return 'blocked';
  }

  return 'available';
}

/**
 * Determine the status of an entire day.
 * Resolution order:
 * 1. Past date → 'past'
 * 2. Blocked (service-specific or "all") → 'blocked'
 * 3. Closed (no open rule) → 'closed'
 * 4. All slots are booked/blocked → 'fully_booked'
 * 5. Otherwise → 'available'
 */
export function getDayStatus(
  dateStr: string,
  service: string,
  bookedSlots: string[], // slots booked for this date
  blockedDates: BlockedDateRecord[],
  rules: AvailabilityRuleRecord[],
  generatedSlots: string[], // slots that would be available if day were open
  blockedTimeSlots?: BlockedTimeSlotRecord[] // blocked time slots for this date
): DayStatus {
  // Check if date is in the past
  const today = new Date().toISOString().split('T')[0];
  if (dateStr < today) {
    return 'past';
  }

  // Check if date is blocked (service-specific first, then "all")
  const serviceSpecificBlock = blockedDates.find(
    (bd) => bd.date === dateStr && bd.service === service
  );
  if (serviceSpecificBlock) {
    return 'blocked';
  }

  const allBlock = blockedDates.find(
    (bd) => bd.date === dateStr && bd.service === 'all'
  );
  if (allBlock) {
    return 'blocked';
  }

  // Determine if day is open or closed (service-specific rule wins over "all")
  const serviceSpecificRule = rules.find(
    (r) => r.dayOfWeek === new Date(dateStr + 'T00:00:00').getDay() && r.service === service
  );
  const allRule = rules.find(
    (r) => r.dayOfWeek === new Date(dateStr + 'T00:00:00').getDay() && r.service === 'all'
  );

  const effectiveRule = serviceSpecificRule || allRule;
  if (!effectiveRule || !effectiveRule.isOpen) {
    return 'closed';
  }

  // Check if all slots are booked or blocked
  if (generatedSlots.length === 0) {
    return 'closed'; // no slots generated (shouldn't happen if day is open)
  }

  const availableSlots = generatedSlots.filter(
    (slot) =>
      isSlotAvailable(slot, dateStr, service, bookedSlots, blockedTimeSlots || [], rules) === 'available'
  );

  if (availableSlots.length === 0) {
    return 'fully_booked';
  }

  return 'available';
}
