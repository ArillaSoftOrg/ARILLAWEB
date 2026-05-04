import { z } from 'zod';

export const teklifAlSchema = z.object({
  fullName: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır').max(100),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası girin').max(20),
  company: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır').max(100),
  solution: z.enum([
    'QR_MENU',
    'RANDEVU_SISTEMI',
    'KUAFOR_RANDEVU',
    'KLINIK_RANDEVU',
    'GUZELLIK_RANDEVU',
    'WEB_GELISTIRME',
    'MOBIL_UYGULAMA',
    'OZEL_YAZILIM',
  ], { required_error: 'Lütfen ilgilenilen çözümü seçiniz' }),
  message: z.string().min(20, 'Proje detayı en az 20 karakter olmalıdır').max(2000),
});

export type TeklifAlFormValues = z.infer<typeof teklifAlSchema>;
