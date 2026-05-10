"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Wrench,
  ArrowLeft,
  Save,
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
import { createService, type ServiceDraft } from "@/lib/service-actions";

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

export default function NewServicePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState<ServiceDraft>({
    title: "",
    description: "",
    icon: "Code2",
    published: true,
  });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const inputStyle: React.CSSProperties = {
    background: "#08090d",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    padding: "10px 14px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };
  const errorBorder: React.CSSProperties = { borderColor: "rgba(248,113,113,0.55)" };
  const errorText: React.CSSProperties = { color: "#f87171", fontSize: 12, marginTop: 5 };

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

  function handleSubmit() {
    if (!validate()) return;
    startTransition(async () => {
      await createService(draft);
      router.push("/admin/services");
    });
  }

  const IconPreview = ICON_MAP[draft.icon] ?? Code2;

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/services")}
          className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
          style={{ color: "#64748b" }}
        >
          <ArrowLeft size={16} />
          Geri
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
            Yeni Servis
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            Yeni bir servis oluşturun
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div
          className="flex items-center gap-2 px-6 py-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        >
          <Wrench size={16} style={{ color: "#22d3ee" }} />
          <h2 className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
            Servis Bilgileri
          </h2>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
              BAŞLIK *
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
            <label className="block text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
              AÇIKLAMA *
            </label>
            <textarea
              value={draft.description}
              onChange={set("description")}
              placeholder="Servisi kısaca açıklayın..."
              rows={4}
              style={{ ...inputStyle, resize: "none", ...(errors.description ? errorBorder : {}) }}
            />
            {errors.description && <p style={errorText}>{errors.description}</p>}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
              İKON
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
              >
                <IconPreview size={22} color="#22d3ee" />
              </div>
              <select value={draft.icon} onChange={set("icon")} style={inputStyle}>
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
            <label className="block text-xs font-semibold mb-2" style={{ color: "#64748b" }}>
              DURUM
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDraft((prev) => ({ ...prev, published: true }))}
                className="flex-1 py-2.5 text-sm rounded-lg transition-all"
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
                className="flex-1 py-2.5 text-sm rounded-lg transition-all"
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
          className="flex items-center justify-end gap-3 px-6 py-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => router.push("/admin/services")}
            className="px-4 py-2 text-sm rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "#64748b" }}
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff" }}
          >
            <Save size={14} />
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
