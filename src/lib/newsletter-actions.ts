"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export type AdminNewsletterSubscriber = {
    id: string;
    email: string;
    isActive: boolean;
    unsubscribedAt: string | null;
    createdAt: string;
};

export async function getSubscribers(): Promise<AdminNewsletterSubscriber[]> {
    const subs = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
    });
    return subs.map((s) => ({
        id: s.id,
        email: s.email,
        isActive: s.isActive,
        unsubscribedAt: s.unsubscribedAt ? s.unsubscribedAt.toISOString() : null,
        createdAt: s.createdAt.toISOString(),
    }));
}

export async function toggleSubscriberActive(id: string, isActive: boolean): Promise<void> {
    await prisma.newsletterSubscriber.update({
        where: { id },
        data: {
            isActive,
            unsubscribedAt: isActive ? null : new Date(),
        },
    });
    revalidatePath("/admin/newsletter");
}

export async function deleteSubscriber(id: string): Promise<void> {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    revalidatePath("/admin/newsletter");
}
