"use client";

import { useState, useEffect, useTransition } from "react";
import { Mail, MailX, Trash2, Inbox, Search, Send } from "lucide-react";
import {
    getSubscribers,
    toggleSubscriberActive,
    deleteSubscriber,
    type AdminNewsletterSubscriber,
} from "@/lib/newsletter-actions";

type Filter = "all" | "active" | "unsubscribed";

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<AdminNewsletterSubscriber[]>([]);
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<AdminNewsletterSubscriber | null>(null);
    const [isPending, startTransition] = useTransition();

    async function load() {
        const data = await getSubscribers();
        setSubscribers(data);
    }

    useEffect(() => {
        startTransition(() => {
            load();
        });
    }, []);

    const activeCount = subscribers.filter((s) => s.isActive).length;

    const filtered = subscribers.filter((s) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "active" && s.isActive) ||
            (filter === "unsubscribed" && !s.isActive);
        const q = search.toLowerCase();
        const matchesSearch = !q || s.email.toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
    });

    function handleToggleActive(s: AdminNewsletterSubscriber) {
        startTransition(async () => {
            await toggleSubscriberActive(s.id, !s.isActive);
            await load();
        });
    }

    function confirmDelete() {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        setDeleteTarget(null);
        startTransition(async () => {
            await deleteSubscriber(id);
            await load();
        });
    }

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="p-6 space-y-6">
            {/* Delete confirm dialog */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.75)" }}
                >
                    <div
                        className="w-full max-w-sm rounded-xl p-6"
                        style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.1)" }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                            style={{ background: "rgba(239,68,68,0.1)" }}
                        >
                            <Trash2 size={20} style={{ color: "#ef4444" }} />
                        </div>
                        <h3 className="text-base font-semibold mb-2" style={{ color: "#f1f5f9" }}>
                            Aboneyi Sil
                        </h3>
                        <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                            <span style={{ color: "#94a3b8" }}>{deleteTarget.email}</span>{" "}
                            kalıcı olarak silinecek. Bu işlem geri alınamaz.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors"
                                style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                                İptal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2 text-sm font-semibold rounded-lg hover:opacity-90 transition-all"
                                style={{ background: "#ef4444", color: "#fff" }}
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                        Bülten Aboneleri
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                        {subscribers.length} kayıt
                        <span
                            className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.25)" }}
                        >
                            {activeCount} aktif
                        </span>
                        {isPending && <span className="ml-2">· Güncelleniyor...</span>}
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div
                className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
                style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)" }}
            >
                <div className="relative flex-1">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#475569" }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="E-posta ara..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg"
                        style={{
                            background: "#08090d",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#f1f5f9",
                            outline: "none",
                        }}
                    />
                </div>

                <div className="flex gap-1 rounded-lg p-1" style={{ background: "#08090d", border: "1px solid rgba(0,0,0,0.05)" }}>
                    {(["all", "active", "unsubscribed"] as Filter[]).map((f) => {
                        const labels: Record<Filter, string> = {
                            all: "Tümü",
                            active: "Aktif",
                            unsubscribed: "Abonelikten Çıkmış",
                        };
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="px-3 py-1.5 text-xs rounded-md transition-all"
                                style={
                                    filter === f
                                        ? { background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }
                                        : { color: "#64748b" }
                                }
                            >
                                {labels[f]}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Subscriber list */}
            {filtered.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center py-20 rounded-xl"
                    style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)" }}
                >
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(0,0,0,0.04)" }}
                    >
                        <Inbox size={24} style={{ color: "#334155" }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: "#475569" }}>
                        {search || filter !== "all" ? "Sonuç bulunamadı" : "Henüz abone yok"}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#334155" }}>
                        {search || filter !== "all"
                            ? "Arama kriterini veya filtreyi değiştirin"
                            : "Bülten formundan gelen kayıtlar burada görünecek"}
                    </p>
                </div>
            ) : (
                <div
                    className="rounded-xl overflow-hidden divide-y"
                    style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)", borderColor: "rgba(0,0,0,0.05)" }}
                >
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.015] transition-colors"
                            style={{ borderColor: "rgba(0,0,0,0.04)" }}
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={
                                    s.isActive
                                        ? { background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }
                                        : { background: "rgba(0,0,0,0.04)" }
                                }
                            >
                                {s.isActive ? (
                                    <Send size={16} style={{ color: "#22d3ee" }} />
                                ) : (
                                    <MailX size={16} style={{ color: "#475569" }} />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <span className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                                    {s.email}
                                </span>
                                <p className="mt-0.5 text-xs" style={{ color: "#475569" }}>
                                    {formatDate(s.createdAt)}
                                    {!s.isActive && s.unsubscribedAt && (
                                        <> · Çıkış: {formatDate(s.unsubscribedAt)}</>
                                    )}
                                </p>
                            </div>

                            <span
                                className="px-2 py-0.5 rounded-full text-xs font-semibold shrink-0"
                                style={
                                    s.isActive
                                        ? { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }
                                        : { background: "rgba(148,163,184,0.1)", color: "#94a3b8", border: "1px solid rgba(148,163,184,0.2)" }
                                }
                            >
                                {s.isActive ? "Aktif" : "Abonelikten Çıkmış"}
                            </span>

                            <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                    onClick={() => handleToggleActive(s)}
                                    disabled={isPending}
                                    title={s.isActive ? "Abonelikten çıkar" : "Yeniden aktifleştir"}
                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
                                    style={{ color: "#475569" }}
                                >
                                    {s.isActive ? <MailX size={13} /> : <Mail size={13} />}
                                </button>
                                <button
                                    onClick={() => setDeleteTarget(s)}
                                    disabled={isPending}
                                    title="Sil"
                                    className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                    style={{ color: "#ef4444" }}
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
