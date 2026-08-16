import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
