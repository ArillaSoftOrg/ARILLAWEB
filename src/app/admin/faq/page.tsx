"use client";

import { useState, useEffect, useTransition } from "react";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react";
import {
  getAdminFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  type AdminFaq,
  type FaqDraft,
} from "@/lib/faq-actions";
import { FAQ_PAGES, getPageLabel } from "@/lib/faq-constants";

// ── Helpers ──────────────────────────────────────────────
const emptyDraft = (): FaqDraft => ({
  question: "",
  answer: "",
  page: "global",
  sortOrder: 0,
  isActive: true,
});

// ── Modal ─────────────────────────────────────────────────
function FaqModal({
  faq,
  onClose,
  onSaved,
}: {
  faq: AdminFaq | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<FaqDraft>(
    faq
      ? {
          question: faq.question,
          answer: faq.answer,
          page: faq.page,
          sortOrder: faq.sortOrder,
          isActive: faq.isActive,
        }
      : emptyDraft()
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const set = (k: keyof FaqDraft, v: FaqDraft[typeof k]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const handleSave = () => {
    if (!draft.question.trim() || !draft.answer.trim()) {
      setError("Soru ve cevap alanları zorunludur.");
      return;
    }
    startTransition(async () => {
      if (faq) {
        await updateFaq(faq.id, draft);
      } else {
        await createFaq(draft);
      }
      onSaved();
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#1a1d27",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "10px 12px",
    color: "#f1f5f9",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#111219",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#f1f5f9", marginBottom: "24px" }}>
          {faq ? "SSS Düzenle" : "Yeni SSS"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Sayfa */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px" }}>
              Sayfa
            </label>
            <select
              value={draft.page}
              onChange={(e) => set("page", e.target.value)}
              style={inputStyle}
            >
              {FAQ_PAGES.map((p) => (
                <option key={p.value} value={p.value} style={{ background: "#1a1d27" }}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Soru */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px" }}>
              Soru
            </label>
            <input
              value={draft.question}
              onChange={(e) => set("question", e.target.value)}
              placeholder="Soru metnini girin"
              style={inputStyle}
            />
          </div>

          {/* Cevap */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px" }}>
              Cevap
            </label>
            <textarea
              value={draft.answer}
              onChange={(e) => set("answer", e.target.value)}
              placeholder="Cevap metnini girin"
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Sıralama + Durum */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px" }}>
                Sıralama
              </label>
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#94a3b8", marginBottom: "6px" }}>
                Durum
              </label>
              <button
                onClick={() => set("isActive", !draft.isActive)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: draft.isActive ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
                  color: draft.isActive ? "#4ade80" : "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {draft.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {draft.isActive ? "Aktif" : "Pasif"}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#f87171" }}>{error}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirm ────────────────────────────────────────
function DeleteDialog({
  faq,
  onClose,
  onDeleted,
}: {
  faq: AdminFaq;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#111219",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "28px",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "12px" }}>
          SSS Silinsin mi?
        </h3>
        <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "24px" }}>
          &ldquo;{faq.question}&rdquo; sorusu kalıcı olarak silinecek.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "transparent",
              color: "#94a3b8",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            İptal
          </button>
          <button
            onClick={() => startTransition(async () => { await deleteFaq(faq.id); onDeleted(); })}
            disabled={isPending}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<AdminFaq[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPage, setFilterPage] = useState("all");
  const [editingFaq, setEditingFaq] = useState<AdminFaq | null | undefined>(undefined);
  const [deletingFaq, setDeletingFaq] = useState<AdminFaq | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await getAdminFaqs();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const visible = filterPage === "all" ? faqs : faqs.filter((f) => f.page === filterPage);

  const grouped = visible.reduce<Record<string, AdminFaq[]>>((acc, f) => {
    const key = f.page;
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <div style={{ padding: "32px", background: "#08090d", minHeight: "100vh", color: "#f1f5f9" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, margin: 0 }}>SSS Yönetimi</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            {faqs.length} soru · {faqs.filter((f) => f.isActive).length} aktif
          </p>
        </div>
        <button
          onClick={() => setEditingFaq(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={15} />
          Yeni SSS
        </button>
      </div>

      {/* Page filter */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {[{ value: "all", label: "Tümü" }, ...FAQ_PAGES].map((p) => (
          <button
            key={p.value}
            onClick={() => setFilterPage(p.value)}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid",
              borderColor: filterPage === p.value ? "#7c3aed" : "rgba(255,255,255,0.08)",
              background: filterPage === p.value ? "rgba(124,58,237,0.15)" : "transparent",
              color: filterPage === p.value ? "#a78bfa" : "#64748b",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p style={{ color: "#64748b" }}>Yükleniyor...</p>
      ) : visible.length === 0 ? (
        <div
          style={{
            background: "#111219",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px",
            padding: "48px 24px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          Bu filtre için SSS bulunamadı.
        </div>
      ) : (
        Object.entries(grouped).map(([page, items]) => (
          <div key={page} style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#475569",
                marginBottom: "10px",
              }}
            >
              {getPageLabel(page)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map((faq) => (
                <div
                  key={faq.id}
                  style={{
                    background: "#111219",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  {/* Sort order indicator */}
                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "2px",
                      marginTop: "2px",
                    }}
                  >
                    <ChevronUp size={12} style={{ color: "#334155" }} />
                    <span style={{ fontSize: "11px", color: "#475569", fontWeight: 700 }}>
                      {faq.sortOrder}
                    </span>
                    <ChevronDown size={12} style={{ color: "#334155" }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9", margin: 0 }}>
                        {faq.question}
                      </p>
                      {!faq.isActive && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "999px",
                            background: "rgba(100,116,139,0.15)",
                            color: "#64748b",
                          }}
                        >
                          Pasif
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                      {faq.answer.length > 120 ? faq.answer.slice(0, 120) + "…" : faq.answer}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <button
                      onClick={() => setEditingFaq(faq)}
                      style={{
                        padding: "7px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "transparent",
                        color: "#64748b",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeletingFaq(faq)}
                      style={{
                        padding: "7px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "transparent",
                        color: "#f87171",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Modals */}
      {editingFaq !== undefined && (
        <FaqModal
          faq={editingFaq}
          onClose={() => setEditingFaq(undefined)}
          onSaved={() => { setEditingFaq(undefined); load(); }}
        />
      )}
      {deletingFaq && (
        <DeleteDialog
          faq={deletingFaq}
          onClose={() => setDeletingFaq(null)}
          onDeleted={() => { setDeletingFaq(null); load(); }}
        />
      )}
    </div>
  );
}
