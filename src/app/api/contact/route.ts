import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { clientIp, rateLimit, TOO_MANY_REQUESTS } from "@/lib/rate-limit";

export async function POST(req: Request) {
    if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 10 * 60_000)) {
        return NextResponse.json(TOO_MANY_REQUESTS, { status: 429 });
    }
    let data;
    try {
        data = contactSchema.parse(await req.json());
    } catch {
        return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
    }

    try {
        await prisma.contactMessage.create({ data });
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("contact submit failed", err);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
