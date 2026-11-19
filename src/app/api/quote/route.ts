import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/lib/validations/quote';
import { teklifAlSchema } from '@/lib/validations/teklif-al';
import { clientIp, rateLimit, TOO_MANY_REQUESTS } from '@/lib/rate-limit';

// Two forms post here: the detailed QuoteForm (quoteSchema) and the short /teklif-al form
// (teklifAlSchema). Both are stored as a QuoteRequest row.

const SOLUTION_MAP = {
  QR_MENU: { label: 'QR Menü Sistemi', projectType: 'SAAS', targetPlatform: 'WEB' },
  RANDEVU_SISTEMI: { label: 'Online Randevu Sistemi', projectType: 'SAAS', targetPlatform: 'WEB' },
  KUAFOR_RANDEVU: { label: 'Kuaför Randevu Sistemi', projectType: 'SAAS', targetPlatform: 'WEB' },
  KLINIK_RANDEVU: { label: 'Klinik Randevu Sistemi', projectType: 'SAAS', targetPlatform: 'WEB' },
  GUZELLIK_RANDEVU: { label: 'Güzellik Merkezi Randevu Sistemi', projectType: 'SAAS', targetPlatform: 'WEB' },
  WEB_GELISTIRME: { label: 'Web Geliştirme', projectType: 'WEB_APPLICATION', targetPlatform: 'WEB' },
  MOBIL_UYGULAMA: { label: 'Mobil Uygulama', projectType: 'MOBILE_APPLICATION', targetPlatform: 'BOTH_MOBILE' },
  OZEL_YAZILIM: { label: 'Özel Yazılım', projectType: 'CUSTOM_SOFTWARE', targetPlatform: 'ALL_PLATFORMS' },
} as const;

export async function POST(req: Request) {
  if (!rateLimit(`quote:${clientIp(req.headers)}`, 5, 10 * 60_000)) {
    return NextResponse.json(TOO_MANY_REQUESTS, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
  }

  const detailed = quoteSchema.safeParse(body);
  const short = detailed.success ? null : teklifAlSchema.safeParse(body);

  if (!detailed.success && !short?.success) {
    return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 });
  }

  try {
    if (detailed.success) {
      const d = detailed.data;
      await prisma.quoteRequest.create({
        data: {
          fullName: d.fullName,
          email: d.email,
          phone: d.phone || null,
          company: d.company || null,
          projectType: d.projectType,
          budgetRange: d.budgetRange,
          targetPlatform: d.targetPlatform,
          deliveryExpectation: d.deliveryExpectation || null,
          description: d.description,
          integrations: d.integrations || null,
          hasExistingSystem: d.hasExistingSystem,
        },
      });
    } else if (short?.success) {
      const d = short.data;
      const solution = SOLUTION_MAP[d.solution];
      await prisma.quoteRequest.create({
        data: {
          fullName: d.fullName,
          email: d.email,
          phone: d.phone,
          company: d.company,
          projectType: solution.projectType,
          budgetRange: 'UNDECIDED',
          targetPlatform: solution.targetPlatform,
          description: `[${solution.label}] ${d.message}`,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('quote submit failed', err);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
