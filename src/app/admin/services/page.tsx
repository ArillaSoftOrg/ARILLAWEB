"use client";

import { useState, useEffect, useTransition, startTransition } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Wrench,
  Clock,
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Palette,
  Shield,
  Code2,
  Zap,
  Lock,
  Search,
} from "lucide-react";
import {
  getAdminServices,
  updateService,
  deleteService,
  type AdminService,
  type ServiceDraft,
} from "@/lib/service-actions";

/* ─── Icon map ───────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
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

const ICON_OPTIONS = Object.keys(ICON_MAP);

/* ─── Edit Modal ─────────────────────────────── */
function EditModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ServiceDraft;
  onSave: (draft: ServiceDraft) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<ServiceDraft>(initial);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const inputStyle: React.CSSProperties = {
    background: "#08090d",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    padding: "10px 14px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };
  const errorBorder: React.CSSProperties = { borderColor: "rgba(248,113,113,0.55)" };
  const errorText: React.CSSProperties = { color: "#f87171", fontSize: 11, marginTop: 5 };

  const set =
    (key: keyof ServiceDraft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setDraft((prev) => ({ ...prev, [key]: value }));
      if (key === "title" && errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
      if (key === "description" && errors.description)
        setErrors((prev) => ({ ...prev, description: undefined }));
    };

  function validate(): boolean {
    const next: typeof errors = {};
    if (!draft.title.trim()) next.title = "Başlık zorunludur.";
    if (!draft.description.trim()) next.description = "Açıklama zorunludur.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const IconPreview = ICON_MAP[draft.icon] ?? Code2;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh]"
        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2">
            <Wrench size={16} style={{ color: "#22d3ee" }} />
            <h2 className="text-base font-semibold" style={{ color: "#f1f5f9" }}>
              Servisi Düzenle
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "#64748b" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
              Başlık *
            </label>
            <input
              value={draft.title}
              onChange={set("title")}
              placeholder="Servis adı..."
              style={{ ...inputStyle, ...(errors.title ? errorBorder : {}) }}
            />
            {errors.title && <p style={errorText}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
              Açıklama *
            </label>
            <textarea
              value={draft.description}
              onChange={set("description")}
              placeholder="Kısa bir açıklama..."
              rows={3}
              style={{ ...inputStyle, resize: "none", ...(errors.description ? errorBorder : {}) }}
            />
            {errors.description && <p style={errorText}>{errors.description}</p>}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
              İkon
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
              >
                <IconPreview size={18} color="#22d3ee" />
              </div>
              <select value={draft.icon} onChange={set("icon")} style={{ ...inputStyle }}>
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748b" }}>
              Durum
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, published: true }))}
                className="flex-1 py-2 text-xs rounded-lg transition-all"
                style={
                  draft.published
                    ? { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.35)" }
                    : { background: "rgba(255,255,255,0.03)", color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                Yayında
              </button>
              <button
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, published: false }))}
                className="flex-1 py-2 text-xs rounded-lg transition-all"
                style={
                  !draft.published
                    ? { background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.35)" }
                    : { background: "rgba(255,255,255,0.03)", color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                Taslak
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#64748b" }}
          >
            İptal
          </button>
          <button
            onClick={() => {
              if (validate()) onSave(draft);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff" }}
          >
            <Save size={14} />
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete Dialog ──────────────────────────── */
function DeleteDialog({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-6"
        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <Trash2 size={20} style={{ color: "#ef4444" }} />
        </div>
        <h3 className="text-base font-semibold mb-2" style={{ color: "#f1f5f9" }}>
          Servisi Sil
        </h3>
        <p className="text-sm mb-6" style={{ color: "#64748b" }}>
          <span style={{ color: "#94a3b8" }}>&quot;{title}&quot;</span> servisini silmek
          istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90"
            style={{ background: "#ef4444", color: "#fff" }}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────── */
export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [editTarget, setEditTarget] = useState<AdminService | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  async function loadServices() {
    const data = await getAdminServices();
    setServices(data);
  }

  useEffect(() => {
    startTransition(() => {
      loadServices();
    });
  }, []);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(draft: ServiceDraft) {
    if (!editTarget) return;
    startTransition(async () => {
      await updateService(editTarget.id, draft);
      await loadServices();
      setEditTarget(null);
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteService(deleteTarget.id);
      await loadServices();
      setDeleteTarget(null);
    });
  }

  return (
    <div className="p-6 space-y-6">
      {editTarget && (
        <EditModal
          initial={{
            title: editTarget.title,
            description: editTarget.description,
            icon: editTarget.icon,
            published: editTarget.published,
          }}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
            Servis Yönetimi
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            {services.length} servis &middot; {filtered.length} gösteriliyor
            {isPending && " · Kaydediliyor..."}
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 self-start sm:self-auto"
          style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff" }}
        >
          <Plus size={16} />
          Yeni Servis
        </Link>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.07)" }}
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
            placeholder="Servis ara..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg"
            style={{
              background: "#08090d",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f1f5f9",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-xl"
          style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <Wrench size={24} style={{ color: "#334155" }} />
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "#475569" }}>
            Servis bulunamadı
          </p>
          <p className="text-xs" style={{ color: "#334155" }}>
            Arama kriterini değiştirin veya yeni servis ekleyin
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "#111219", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Table header */}
          <div
            className="hidden sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: "#475569",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span />
            <span>Başlık</span>
            <span>Durum</span>
            <span>Tarih</span>
            <span>İşlemler</span>
          </div>

          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {filtered.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Code2;
              const date = new Date(service.createdAt).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <div
                  key={service.id}
                  className="flex flex-col sm:grid sm:grid-cols-[auto_1fr_auto_auto_auto] sm:items-center gap-3 sm:gap-4 px-6 py-4 hover:bg-white/[0.015] transition-colors"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.15)" }}
                  >
                    <Icon size={18} color="#22d3ee" />
                  </div>

                  {/* Title + desc */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: "#f1f5f9" }}>
                      {service.title}
                    </p>
                    <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#475569" }}>
                      {service.description}
                    </p>
                    {/* Mobile badges */}
                    <div className="flex items-center gap-2 mt-1.5 sm:hidden flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={
                          service.published
                            ? { background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }
                            : { background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }
                        }
                      >
                        {service.published ? "Yayında" : "Taslak"}
                      </span>
                      <span className="text-xs" style={{ color: "#475569" }}>
                        {date}
                      </span>
                    </div>
                  </div>

                  {/* Status — desktop */}
                  <span
                    className="hidden sm:inline-block text-xs px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={
                      service.published
                        ? { background: "rgba(16,185,129,0.12)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }
                        : { background: "rgba(245,158,11,0.12)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }
                    }
                  >
                    {service.published ? "Yayında" : "Taslak"}
                  </span>

                  {/* Date — desktop */}
                  <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
                    <Clock size={12} style={{ color: "#334155" }} />
                    <span className="text-xs" style={{ color: "#475569" }}>
                      {date}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => setEditTarget(service)}
                      disabled={isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                      style={{
                        background: "rgba(124,58,237,0.12)",
                        color: "#a78bfa",
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                    >
                      <Pencil size={12} />
                      <span className="hidden sm:inline">Düzenle</span>
                    </button>
                    <button
                      onClick={() => setDeleteTarget(service)}
                      disabled={isPending}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.2)",
                      }}
                    >
                      <Trash2 size={12} />
                      <span className="hidden sm:inline">Sil</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
