import { z } from 'zod';

export const appointmentSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  name: z.string().min(1, 'Name is required'),
  contact: z.string().min(1, 'Contact is required'),
  message: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
