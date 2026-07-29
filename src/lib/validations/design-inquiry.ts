import { z } from "zod";

export const designInquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalıdır.").max(100),
    company: z.string().trim().min(2, "İşletme adı en az 2 karakter olmalıdır.").max(120),
    phone: z.string().trim().max(24).optional().or(z.literal("")),
    email: z.string().trim().email("Geçerli bir e-posta adresi girin.").max(160).optional().or(z.literal("")),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
    projectId: z.string().cuid(),
    designCode: z.string().trim().min(3).max(40),
    sector: z.string().trim().min(2).max(120),
  })
  .refine((data) => Boolean(data.phone || data.email), {
    message: "Telefon veya e-posta bilgilerinden en az birini girin.",
    path: ["phone"],
  });

export type DesignInquiryValues = z.infer<typeof designInquirySchema>;
