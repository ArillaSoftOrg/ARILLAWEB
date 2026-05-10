import { z } from 'zod';

// Phone regex for Turkish phone numbers (05XX XXX XX XX)
const phoneRegex = /^(\+90|0)?5\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const appointmentSchema = z
  .object({
    service: z.string().min(1, 'Hizmet seçiniz'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Geçersiz tarih formatı'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Geçersiz saat formatı'),
    name: z.string().min(1, 'Ad soyad zorunludur'),
    phone: z.string().optional().refine((val) => !val || phoneRegex.test(val), 'Geçerli telefon numarası giriniz'),
    email: z.string().optional().refine((val) => !val || emailRegex.test(val), 'Geçerli e-posta adresi giriniz'),
    message: z.string().optional(),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Telefon veya e-postadan en az biri zorunludur',
    path: ['contact'], // General error path
  });

export type AppointmentInput = z.infer<typeof appointmentSchema>;
