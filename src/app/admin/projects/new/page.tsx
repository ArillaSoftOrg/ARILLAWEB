"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { createProject } from "@/lib/project-actions";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import CloudinaryGalleryUpload from "@/components/admin/CloudinaryGalleryUpload";

export default function NewProjectPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        coverImage: "",
        gallery: [] as string[],
        videoUrl: "",
        projectUrl: "",
        clientName: "",
        sector: "",
        technologies: "",
        resultMetrics: "",
        isFeatured: false,
        published: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState<string | null>(null);

    function updateField(
        field: string,
        value: string | boolean
    ) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await createProject({
                title: form.title,
                slug: form.slug,
                summary: form.summary,
                content: form.content,
                coverImage: form.coverImage || undefined,
                gallery: form.gallery,
                videoUrl: form.videoUrl || undefined,
                projectUrl: form.projectUrl || undefined,
                clientName: form.clientName || undefined,
                sector: form.sector || undefined,
                resultMetrics: form.resultMetrics || undefined,
                technologies: form.technologies
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                isFeatured: form.isFeatured,
                published: form.published,
            });

            setToast("Proje başarıyla oluşturuldu");
            setTimeout(() => {
                router.push("/admin/projects");
                router.refresh();
            }, 800);
        } catch (err) {
            console.error(err);
            setError("Proje eklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#08090d] px-6 py-8 text-slate-100">
            {toast && (
                <div
                    className="fixed bottom-6 right-6 px-4 py-3 rounded-lg text-sm font-medium shadow-lg z-50"
                    style={{
                        background: "rgba(16,185,129,0.15)",
                        color: "#34d399",
                        border: "1px solid rgba(16,185,129,0.3)",
                    }}
                >
                    {toast}
                </div>
            )}
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href="/admin/projects"
                            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Projelere Dön
                        </Link>

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
                                <FolderKanban className="h-5 w-5 text-cyan-300" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Yeni Proje</h1>
                                <p className="mt-1 text-sm text-slate-600">
                                    Yeni bir proje ekleyerek portföyünü genişlet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl border border-slate-200 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Proje Başlığı
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => updateField("title", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="Örn: Arilla CRM Platformu"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => updateField("slug", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="arilla-crm-platformu"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Kısa Açıklama
                        </label>
                        <textarea
                            value={form.summary}
                            onChange={(e) => updateField("summary", e.target.value)}
                            className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                            placeholder="Projenin kısa özeti..."
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Proje İçeriği
                        </label>
                        <textarea
                            value={form.content}
                            onChange={(e) => updateField("content", e.target.value)}
                            className="min-h-[180px] w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                            placeholder="Projenin detaylı açıklamasını yaz..."
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Kapak Görseli
                        </label>
                        <CloudinaryUpload
                            value={form.coverImage}
                            onChange={(url) => updateField("coverImage", url)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Müşteri / Marka
                        </label>
                        <input
                            type="text"
                            value={form.clientName}
                            onChange={(e) => updateField("clientName", e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                            placeholder="Örn: Tart Cafe"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Galeri Görselleri
                        </label>
                        <CloudinaryGalleryUpload
                            value={form.gallery}
                            onChange={(urls) => setForm((prev) => ({ ...prev, gallery: urls }))}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Video URL
                            </label>
                            <input
                                type="text"
                                value={form.videoUrl}
                                onChange={(e) => updateField("videoUrl", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Proje URL
                            </label>
                            <input
                                type="text"
                                value={form.projectUrl}
                                onChange={(e) => updateField("projectUrl", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="https://proje-sitesi.com"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Sektör
                            </label>
                            <input
                                type="text"
                                value={form.sector}
                                onChange={(e) => updateField("sector", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="Örn: Restoran / SaaS / E-Ticaret"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Sonuç / Metrikler
                            </label>
                            <input
                                type="text"
                                value={form.resultMetrics}
                                onChange={(e) => updateField("resultMetrics", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                                placeholder="Örn: %40 hız artışı"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Teknolojiler
                        </label>
                        <input
                            type="text"
                            value={form.technologies}
                            onChange={(e) => updateField("technologies", e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                            placeholder="Next.js, Prisma, PostgreSQL, Tailwind"
                        />
                        <p className="mt-2 text-xs text-slate-500">
                            Virgülle ayırarak yaz.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3">
                            <input
                                type="checkbox"
                                checked={form.isFeatured}
                                onChange={(e) => updateField("isFeatured", e.target.checked)}
                            />
                            <span className="text-sm text-slate-300">Öne çıkan proje</span>
                        </label>

                        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#0b0d12] px-4 py-3">
                            <input
                                type="checkbox"
                                checked={form.published}
                                onChange={(e) => updateField("published", e.target.checked)}
                            />
                            <span className="text-sm text-slate-300">Yayında</span>
                        </label>
                    </div>

                    {error && (
                        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Link
                            href="/admin/projects"
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5"
                        >
                            İptal
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Kaydediliyor..." : "Projeyi Kaydet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}