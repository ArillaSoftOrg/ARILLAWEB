"use client";

import { useState, useEffect, useTransition, startTransition } from "react";
import {
    Mail,
    MailOpen,
    Trash2,
    ChevronDown,
    ChevronUp,
    Phone,
    Building2,
    Clock,
    Inbox,
    Search,
} from "lucide-react";
import {
    getContactMessages,
    setMessageRead,
    deleteContactMessage,
    type AdminContactMessage,
} from "@/lib/contact-actions";

type Filter = "all" | "unread" | "read";

export default function AdminContactPage() {
    const [messages, setMessages] = useState<AdminContactMessage[]>([]);
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AdminContactMessage | null>(null);
    const [isPending, startTransition] = useTransition();

    async function load() {
        const data = await getContactMessages();
        setMessages(data);
    }

    useEffect(() => {
        startTransition(() => {
            load();
        });
    }, []);

    const unreadCount = messages.filter((m) => !m.isRead).length;

    const filtered = messages.filter((m) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "unread" && !m.isRead) ||
            (filter === "read" && m.isRead);
        const q = search.toLowerCase();
        const matchesSearch =
            !q ||
            m.fullName.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q) ||
            m.subject.toLowerCase().includes(q) ||
            m.message.toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
    });

    function toggleExpand(id: string, isRead: boolean) {
        setExpanded((prev) => (prev === id ? null : id));
        if (!isRead) {
            startTransition(async () => {
                await setMessageRead(id, true);
                await load();
            });
        }
    }

    function handleToggleRead(e: React.MouseEvent, msg: AdminContactMessage) {
        e.stopPropagation();
        startTransition(async () => {
            await setMessageRead(msg.id, !msg.isRead);
            await load();
        });
    }

    function handleDelete(e: React.MouseEvent, msg: AdminContactMessage) {
        e.stopPropagation();
        setDeleteTarget(msg);
    }

    function confirmDelete() {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        setDeleteTarget(null);
        startTransition(async () => {
            await deleteContactMessage(id);
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
                            Mesajı Sil
                        </h3>
                        <p className="text-sm mb-6" style={{ color: "#64748b" }}>
                            <span style={{ color: "#94a3b8" }}>{deleteTarget.fullName}</span>{" "}
                            kişisinden gelen mesaj silinecek. Bu işlem geri alınamaz.
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
                        İletişim Mesajları
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                        {messages.length} mesaj
                        {unreadCount > 0 && (
                            <span
                                className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                                style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.25)" }}
                            >
                                {unreadCount} okunmamış
                            </span>
                        )}
                        {isPending && <span className="ml-2">· Güncelleniyor...</span>}
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div
                className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
                style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)" }}
            >
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#475569" }}
                    />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Ad, e-posta veya konu ara..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg"
                        style={{
                            background: "#08090d",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#f1f5f9",
                            outline: "none",
                        }}
                    />
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1 rounded-lg p-1" style={{ background: "#08090d", border: "1px solid rgba(0,0,0,0.05)" }}>
                    {(["all", "unread", "read"] as Filter[]).map((f) => {
                        const labels: Record<Filter, string> = { all: "Tümü", unread: "Okunmamış", read: "Okunmuş" };
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
                                {f === "unread" && unreadCount > 0 && (
                                    <span
                                        className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                                        style={{ background: "rgba(6,182,212,0.2)", color: "#22d3ee" }}
                                    >
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Message list */}
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
                        {search || filter !== "all" ? "Sonuç bulunamadı" : "Henüz mesaj yok"}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#334155" }}>
                        {search || filter !== "all"
                            ? "Arama kriterini veya filtreyi değiştirin"
                            : "İletişim formundan gelen mesajlar burada görünecek"}
                    </p>
                </div>
            ) : (
                <div
                    className="rounded-xl overflow-hidden divide-y"
                    style={{
                        background: "#111219",
                        border: "1px solid rgba(0,0,0,0.05)",
                        borderColor: "rgba(0,0,0,0.05)",
                        // divide color via CSS:
                    }}
                >
                    {filtered.map((msg) => {
                        const isExpanded = expanded === msg.id;
                        return (
                            <div
                                key={msg.id}
                                className="transition-colors"
                                style={{ borderColor: "rgba(0,0,0,0.04)" }}
                            >
                                {/* Row header — always visible */}
                                <div
                                    className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-white/[0.015] transition-colors"
                                    onClick={() => toggleExpand(msg.id, msg.isRead)}
                                >
                                    {/* Unread indicator + icon */}
                                    <div className="flex flex-col items-center gap-1.5 pt-0.5">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={
                                                msg.isRead
                                                    ? { background: "rgba(0,0,0,0.04)" }
                                                    : { background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }
                                            }
                                        >
                                            {msg.isRead ? (
                                                <MailOpen size={16} style={{ color: "#475569" }} />
                                            ) : (
                                                <Mail size={16} style={{ color: "#22d3ee" }} />
                                            )}
                                        </div>
                                        {!msg.isRead && (
                                            <div
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ background: "#22d3ee" }}
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                            <span
                                                className="text-sm font-semibold"
                                                style={{ color: msg.isRead ? "#94a3b8" : "#f1f5f9" }}
                                            >
                                                {msg.fullName}
                                            </span>
                                            <span className="text-xs" style={{ color: "#475569" }}>
                                                {msg.email}
                                            </span>
                                            {msg.phone && (
                                                <span className="hidden sm:inline-flex items-center gap-1 text-xs" style={{ color: "#475569" }}>
                                                    <Phone size={10} />
                                                    {msg.phone}
                                                </span>
                                            )}
                                            {msg.company && (
                                                <span className="hidden sm:inline-flex items-center gap-1 text-xs" style={{ color: "#475569" }}>
                                                    <Building2 size={10} />
                                                    {msg.company}
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            className="mt-1 text-sm font-medium"
                                            style={{ color: msg.isRead ? "#64748b" : "#cbd5e1" }}
                                        >
                                            {msg.subject}
                                        </p>
                                        {!isExpanded && (
                                            <p className="mt-0.5 text-xs line-clamp-1" style={{ color: "#475569" }}>
                                                {msg.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right side: date + actions */}
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <div className="flex items-center gap-1 text-xs" style={{ color: "#475569" }}>
                                            <Clock size={11} />
                                            <span className="hidden sm:inline">{formatDate(msg.createdAt)}</span>
                                            <span className="sm:hidden">
                                                {new Date(msg.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={(e) => handleToggleRead(e, msg)}
                                                disabled={isPending}
                                                title={msg.isRead ? "Okunmamış işaretle" : "Okundu işaretle"}
                                                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
                                                style={{ color: "#475569" }}
                                            >
                                                {msg.isRead ? <Mail size={13} /> : <MailOpen size={13} />}
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, msg)}
                                                disabled={isPending}
                                                title="Sil"
                                                className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                style={{ color: "#ef4444" }}
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                            <span style={{ color: "#334155" }}>
                                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded message body */}
                                {isExpanded && (
                                    <div
                                        className="px-5 pb-5"
                                        style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}
                                    >
                                        <div
                                            className="mt-4 rounded-xl p-5 space-y-4"
                                            style={{ background: "#08090d", border: "1px solid rgba(0,0,0,0.05)" }}
                                        >
                                            {/* Meta row */}
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: "#64748b" }}>
                                                <span>
                                                    <span className="uppercase tracking-wider mr-1" style={{ color: "#475569" }}>E-posta:</span>
                                                    <a href={`mailto:${msg.email}`} className="hover:text-cyan-400 transition-colors" style={{ color: "#94a3b8" }}>
                                                        {msg.email}
                                                    </a>
                                                </span>
                                                {msg.phone && (
                                                    <span>
                                                        <span className="uppercase tracking-wider mr-1" style={{ color: "#475569" }}>Tel:</span>
                                                        <span style={{ color: "#94a3b8" }}>{msg.phone}</span>
                                                    </span>
                                                )}
                                                {msg.company && (
                                                    <span>
                                                        <span className="uppercase tracking-wider mr-1" style={{ color: "#475569" }}>Şirket:</span>
                                                        <span style={{ color: "#94a3b8" }}>{msg.company}</span>
                                                    </span>
                                                )}
                                                <span>
                                                    <span className="uppercase tracking-wider mr-1" style={{ color: "#475569" }}>Tarih:</span>
                                                    <span style={{ color: "#94a3b8" }}>{formatDate(msg.createdAt)}</span>
                                                </span>
                                            </div>

                                            {/* Message body */}
                                            <p className="text-sm leading-7 whitespace-pre-line" style={{ color: "#cbd5e1" }}>
                                                {msg.message}
                                            </p>

                                            {/* Reply action */}
                                            <a
                                                href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all hover:opacity-90"
                                                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff" }}
                                            >
                                                <Mail size={12} />
                                                Yanıtla
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
