import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Star,
    Wrench,
    Globe,
    Smartphone,
    Cpu,
    Layers,
    Palette,
    Shield,
    Code2,
    Zap,
    Lock,
} from "lucide-react";
import { getServiceBySlug } from "@/lib/service-actions";
import type { LucideProps } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    let service = null;
    try {
        service = await getServiceBySlug(slug);
    } catch {
        // Database unavailable
    }
    if (!service) return { title: "Hizmet Bulunamadı" };

    return {
        title: service.title,
        description: service.shortDescription,
        alternates: {
            canonical: `/hizmetler/${slug}`,
        },
        openGraph: {
            title: `${service.title} | ${SITE_NAME}`,
            description: service.shortDescription,
            url: `${SITE_URL}/hizmetler/${slug}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${service.title} | ${SITE_NAME}`,
            description: service.shortDescription,
        },
    };
}

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
    Globe,
    Smartphone,
    Cpu,
    Layers,
    Palette,
    Shield,
    Code2,
    Zap,
    Lock,
    Wrench,
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    let service = null;
    try {
        service = await getServiceBySlug(slug);
    } catch {
        // Database unavailable — treat as not found
    }

    if (!service) {
        notFound();
    }

    const Icon = ICON_MAP[service.icon] ?? Wrench;

    return (
        <main className="min-h-screen bg-[#08090d] px-5 pt-28 pb-16 text-slate-100 sm:px-6 sm:pt-32 sm:pb-20">
            <BreadcrumbJsonLd
                items={[
                    { label: 'Anasayfa', href: '/' },
                    { label: 'Hizmetler', href: '/hizmetler' },
                    { label: service.title },
                ]}
            />
            <ServiceJsonLd
                name={service.title}
                description={service.shortDescription}
                url={`/hizmetler/${slug}`}
            />
            <div className="mx-auto max-w-4xl">
                {/* Back link */}
                <div className="mb-10">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200 backdrop-blur transition hover:bg-white/[0.1]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Hizmetlere Dön
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                    {/* Hero banner */}
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-5 border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 px-8 py-12 text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
                            <Icon className="h-11 w-11 text-cyan-300" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {service.isFeatured && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                        <Star className="h-3 w-3" />
                                        Öne Çıkan
                                    </span>
                                )}
                            </div>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                                {service.title}
                            </h1>
                            <div className="mt-4 max-w-2xl rounded-2xl border border-cyan-500/15 bg-cyan-500/5 px-5 py-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
                                    Kısa Özet
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
                                    {service.shortDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                        <h2 className="mb-4 text-lg font-semibold text-white">
                            Bu Hizmet Neleri Kapsar?
                        </h2>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                            <div className="space-y-5 whitespace-pre-line leading-[1.95] text-slate-300">
                                {service.content}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">
                                Sonraki Adım
                            </p>
                            <h3 className="mt-3 text-xl font-semibold text-white">
                                Bu hizmet sizin için uygunsa birlikte planlayalım
                            </h3>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                                İhtiyacınıza uygun kapsamı belirleyelim, size en doğru çözümü birlikte oluşturalım.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-4">
                                <Link
                                    href="/kurumsal/iletisim"
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    Teklif Al
                                </Link>
                                <Link
                                    href="/hizmetler"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                                >
                                    Diğer Hizmetler
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
