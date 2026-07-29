"use server";

import { prisma } from "@/lib/prisma";

export async function getDesignInquiries() {
  return prisma.designInquiry.findMany({
    include: {
      project: {
        select: {
          title: true,
          slug: true,
          category: { select: { slug: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function markDesignInquiryRead(id: string, isRead = true) {
  return prisma.designInquiry.update({
    where: { id },
    data: { isRead },
  });
}
