"use server";

import { prisma } from "@/lib/prisma";
import type { ProjectKind } from "@prisma/client";

export type ProjectFormData = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage?: string;
    gallery?: string[];
    videoUrl?: string;
    projectUrl?: string;
    clientName?: string;
    sector?: string;
    technologies?: string[];
    resultMetrics?: string;
    kind?: ProjectKind;
    designCode?: string;
    styleTags?: string[];
    recommendedPages?: string[];
    featureHighlights?: string[];
    customizationNote?: string;
    sourceDesignUrl?: string;
    sortOrder?: number;
    isFeatured?: boolean;
    published?: boolean;
    categoryId?: string | null;
};

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export async function getAdminProjects() {
    return prisma.project.findMany({
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getPublishedProjects() {
    return prisma.project.findMany({
        where: {
            published: true,
        },
        include: {
            category: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
    });
}

export async function getFeaturedProjects() {
    return prisma.project.findMany({
        where: {
            published: true,
            isFeatured: true,
        },
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getProjectBySlug(slug: string) {
    return prisma.project.findUnique({
        where: { slug },
        include: {
            category: true,
        },
    });
}

export async function getProjectCategories() {
    return prisma.projectCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
}

export async function getCatalogSectors() {
    return prisma.projectCategory.findMany({
        where: { isCatalogSector: true },
        include: {
            projects: {
                where: {
                    published: true,
                    designCode: { not: null },
                },
                orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
            },
        },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
}

export async function getCatalogProjects() {
    return prisma.project.findMany({
        where: {
            published: true,
            designCode: { not: null },
            category: { isCatalogSector: true },
        },
        include: { category: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
}

export async function getCatalogSectorBySlug(slug: string) {
    return prisma.projectCategory.findFirst({
        where: {
            slug,
            isCatalogSector: true,
        },
        include: {
            projects: {
                where: {
                    published: true,
                    designCode: { not: null },
                },
                orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
            },
        },
    });
}

export async function getCatalogProject(sectorSlug: string, projectSlug: string) {
    return prisma.project.findFirst({
        where: {
            slug: projectSlug,
            published: true,
            designCode: { not: null },
            category: {
                slug: sectorSlug,
                isCatalogSector: true,
            },
        },
        include: { category: true },
    });
}

export async function createProject(data: ProjectFormData) {
    const finalSlug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);

    const existingProject = await prisma.project.findUnique({
        where: { slug: finalSlug },
    });

    if (existingProject) {
        throw new Error("Bu slug zaten kullanılıyor. Lütfen farklı bir slug gir.");
    }

    return prisma.project.create({
        data: {
            title: data.title,
            slug: finalSlug,
            summary: data.summary,
            content: data.content,
            coverImage: data.coverImage || null,
            gallery: data.gallery || [],
            videoUrl: data.videoUrl || null,
            projectUrl: data.projectUrl || null,
            clientName: data.clientName || null,
            sector: data.sector || null,
            technologies: data.technologies || [],
            resultMetrics: data.resultMetrics || null,
            kind: data.kind ?? "CLIENT_PROJECT",
            designCode: data.designCode?.trim() || null,
            styleTags: data.styleTags || [],
            recommendedPages: data.recommendedPages || [],
            featureHighlights: data.featureHighlights || [],
            customizationNote: data.customizationNote || null,
            sourceDesignUrl: data.sourceDesignUrl || null,
            sortOrder: data.sortOrder ?? 0,
            isFeatured: data.isFeatured ?? false,
            published: data.published ?? false,
            categoryId: data.categoryId || null,
        },
    });
}

export async function updateProject(id: string, data: ProjectFormData) {
    const finalSlug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);

    return prisma.project.update({
        where: { id },
        data: {
            title: data.title,
            slug: finalSlug,
            summary: data.summary,
            content: data.content,
            coverImage: data.coverImage || null,
            gallery: data.gallery || [],
            videoUrl: data.videoUrl || null,
            projectUrl: data.projectUrl || null,
            clientName: data.clientName || null,
            sector: data.sector || null,
            technologies: data.technologies || [],
            resultMetrics: data.resultMetrics || null,
            kind: data.kind ?? "CLIENT_PROJECT",
            designCode: data.designCode?.trim() || null,
            styleTags: data.styleTags || [],
            recommendedPages: data.recommendedPages || [],
            featureHighlights: data.featureHighlights || [],
            customizationNote: data.customizationNote || null,
            sourceDesignUrl: data.sourceDesignUrl || null,
            sortOrder: data.sortOrder ?? 0,
            isFeatured: data.isFeatured ?? false,
            published: data.published ?? false,
            categoryId: data.categoryId || null,
        },
    });
}

export async function deleteProject(id: string) {
    return prisma.project.delete({
        where: { id },
    });
}
