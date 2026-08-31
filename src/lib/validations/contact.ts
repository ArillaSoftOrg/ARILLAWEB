import { z } from 'zod';

// Messages below are translation keys (see `forms.contact.errors` in
// messages/{tr,en}.json), not display strings — the form resolves them via
// next-intl at render time so error copy respects the active locale.
export const contactSchema = z.object({
  fullName: z.string().min(2, 'fullNameMin').max(100, 'fullNameMax'),
  email: z.string().email('emailInvalid'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, 'subjectMin').max(200, 'subjectMax'),
  message: z.string().min(10, 'messageMin').max(5000, 'messageMax'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
