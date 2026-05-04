"use client";

import Link from "next/link";
import { FolderKanban, Plus, Pencil, Trash2, Star } from "lucide-react";
import { getAdminProjects, deleteProject } from "@/lib/project-actions";
import { useState, useEffect, startTransition } from "react";

type Project = Awaited<ReturnType<typeof getAdminProjects>>[number];

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

    async function loadProjects() {
        const data = await getAdminProjects();
        setProjects(data);
    }

    useEffect(() => {
        startTransition(() => {
            loadProjects();
        });
    }, []);

    async function handleDelete() {
        if (!deleteTarget) return;

        await deleteProject(deleteTarget.id);
        setDeleteTarget(null);
        await loadProjects();
        alert("Proje silindi");
    }

    return (
        <>
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.7)" }}
                >
                    <div
                        className="rounded-xl p-6"
                        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        <p className="mb-4 text-white">
                            &quot;{deleteTarget.title}&quot; silinsin mi?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 bg-gray-700 text-white rounded"
                            >
                                İptal
                            </button>

                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Proje Yönetimi</h1>
                        <p className="mt-2 text-sm text-slate-400">
                            {projects.length} proje • {projects.length} gösteriliyor
                        </p>
                    </div>

                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" />
                        Yeni Proje
                    </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="grid grid-cols-12 gap-4 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                        <div className="col-span-6">Başlık</div>
                        <div className="col-span-2">Durum</div>
                        <div className="col-span-2">Tarih</div>
                        <div className="col-span-2 text-right">İşlemler</div>
                    </div>

                    <div className="divide-y divide-white/10">
                        {projects.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <FolderKanban className="h-8 w-8 text-slate-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Henüz proje yok</h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        İlk projeni ekleyerek başlayabilirsin.
                                    </p>
                                </div>
                                <Link
                                    href="/admin/projects/new"
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-sm font-medium text-white"
                                >
                                    <Plus className="h-4 w-4" />
                                    Yeni Proje Ekle
                                </Link>
                            </div>
                        ) : (
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="grid grid-cols-12 gap-4 px-4 py-5 text-sm text-slate-300"
                                >
                                    <div className="col-span-6 flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10">
                                            <FolderKanban className="h-5 w-5 text-cyan-300" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="truncate text-base font-semibold text-white">
                                                    {project.title}
                                                </h3>
                                                {project.isFeatured && (
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                                                        <Star className="h-3 w-3" />
                                                        Öne Çıkan
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                                                {project.summary}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-span-2 flex items-center">
                                        {project.published ? (
                                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                                Yayında
                                            </span>
                                        ) : (
                                            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                                                Taslak
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-span-2 flex items-center text-slate-400">
                                        {new Date(project.createdAt).toLocaleDateString("tr-TR")}
                                    </div>

                                    <div className="col-span-2 flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-300 transition hover:bg-violet-500/20"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Düzenle
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => setDeleteTarget(project)}
                                            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-500/20"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}