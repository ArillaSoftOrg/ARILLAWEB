import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { designInquirySchema } from "@/lib/validations/design-inquiry";

export async function POST(request: Request) {
  try {
    const parsed = designInquirySchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Form alanlarını kontrol edin.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const project = await prisma.project.findFirst({
      where: {
        id: parsed.data.projectId,
        designCode: parsed.data.designCode,
        published: true,
        category: { isCatalogSector: true },
      },
      select: {
        id: true,
        designCode: true,
        category: { select: { name: true } },
      },
    });

    if (!project || !project.designCode) {
      return NextResponse.json({ error: "Tasarım bulunamadı." }, { status: 404 });
    }

    const inquiry = await prisma.designInquiry.create({
      data: {
        fullName: parsed.data.fullName,
        company: parsed.data.company,
        phone: parsed.data.phone || null,
        email: parsed.data.email || null,
        message: parsed.data.message || null,
        projectId: project.id,
        designCode: project.designCode,
        sector: project.category?.name ?? parsed.data.sector,
        source: "FORM",
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Design inquiry could not be created", error);
    return NextResponse.json(
      { error: "Talebiniz şu anda gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
