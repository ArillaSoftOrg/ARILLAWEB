import { z } from 'zod';

export const quoteSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır').max(100),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.enum([
    'WEB_APPLICATION',
    'MOBILE_APPLICATION',
    'CUSTOM_SOFTWARE',
    'UI_UX_DESIGN',
    'BACKEND_API',
    'ECOMMERCE',
    'SAAS',
    'OTHER',
  ]).describe('Proje türü seçiniz'),
  budgetRange: z.enum([
    'UNDER_10K',
    'RANGE_10K_25K',
    'RANGE_25K_50K',
    'RANGE_50K_100K',
    'ABOVE_100K',
    'UNDECIDED',
  ]).describe('Bütçe aralığı seçiniz'),
  targetPlatform: z.enum([
    'WEB',
    'IOS',
    'ANDROID',
    'BOTH_MOBILE',
    'DESKTOP',
    'ALL_PLATFORMS',
  ]).describe('Hedef platform seçiniz'),
  deliveryExpectation: z.string().optional(),
  description: z.string().min(20, 'Proje açıklaması en az 20 karakter olmalıdır').max(5000),
  integrations: z.string().optional(),
  hasExistingSystem: z.boolean(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
