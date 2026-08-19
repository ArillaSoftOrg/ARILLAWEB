import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = newsletterSchema.parse(body);

        try {
            await prisma.newsletterSubscriber.create({ data: { email } });
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
                await prisma.newsletterSubscriber.update({
                    where: { email },
                    data: { isActive: true, unsubscribedAt: null },
                });
            } else {
                throw err;
            }
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
        }
        return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }
}
