"use client";

import { useState, useEffect, useTransition } from "react";
import { Save, Settings, Info } from "lucide-react";
import {
    getSiteSettings,
    updateSiteSettings,
    type SiteSettingsData,
} from "@/lib/settings-actions";

const FIELD_META: {
    key: keyof SiteSettingsData;
    label: string;
    hint?: string;
    multiline?: boolean;
}[] = [
    {
        key: "heroTitle",
        label: "Hero Başlık",
        hint: "Gradient vurgu için | kullanın. Örn: Başlık|Vurgulanan Kısım",
    },
    {
        key: "heroSubtitle",
        label: "Hero Alt Metin",
        multiline: true,
    },
    {
        key: "heroPrimaryButton",
        label: "Birincil Buton Metni",
        hint: "Ana CTA butonu (mor/gradient)",
    },
    {
        key: "heroSecondaryButton",
        label: "İkincil Buton Metni",
        hint: "İkinci CTA butonu (şeffaf)",
    },
    {
        key: "homepageIntro",
        label: "Hizmetler Bölümü Giriş Metni",
        multiline: true,
    },
    {
        key: "whyChooseUsTitle",
        label: "Ana Ürün Bölümü Başlığı",
        hint: "Gradient vurgu için | kullanın. Örn: Başlık|Vurgulanan Kısım",
    },
    {
        key: "whyChooseUsText",
        label: "Ana Ürün Bölümü Açıklaması",
        multiline: true,
    },
    {
        key: "homepageCTA",
        label: "CTA Bölümü Başlığı",
        hint: "Gradient vurgu için | kullanın. Örn: Başlık|Vurgulanan Kısım",
    },
];

const inputBase: React.CSSProperties = {
    background: "#08090d",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 8,
    color: "#f1f5f9",
    padding: "10px 14px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
};

export default function AdminSettingsPage() {
    const [form, setForm] = useState<SiteSettingsData | null>(null);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        getSiteSettings().then(setForm).catch(() => setError(true));
    }, []);

    function setField(key: keyof SiteSettingsData, value: string) {
        setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
        setSaved(false);
    }

    function handleSave() {
        if (!form) return;
        startTransition(async () => {
            try {
                await updateSiteSettings(form);
                setSaved(true);
                setError(false);
            } catch {
                setError(true);
            }
        });
    }

    return (
        <div className="p-6 space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
                        Site Ayarları
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "#64748b" }}>
                        Ana sayfanın temel metin içeriklerini buradan düzenleyin.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isPending || !form}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50 self-start sm:self-auto"
                    style={{
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        color: "#fff",
                    }}
                >
                    <Save size={15} />
                    {isPending ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>

            {/* Status messages */}
            {saved && (
                <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}
                >
                    Değişiklikler kaydedildi ve ana sayfa güncellendi.
                </div>
            )}
            {error && (
                <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
                >
                    Bir hata oluştu. Lütfen tekrar deneyin.
                </div>
            )}

            {/* Gradient hint banner */}
            <div
                className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}
            >
                <Info size={15} className="mt-0.5 flex-shrink-0" />
                <span>
                    Başlıklarda gradient (renk geçişli) vurgu için <code className="px-1 py-0.5 rounded text-xs" style={{ background: "rgba(124,58,237,0.2)" }}>|</code> karakterini ayraç olarak kullanın.{" "}
                    Örneğin: <code className="px-1 py-0.5 rounded text-xs" style={{ background: "rgba(124,58,237,0.2)" }}>Başlık Metni|Vurgulanan Kısım</code>
                </span>
            </div>

            {/* Form */}
            {!form ? (
                <div
                    className="rounded-xl py-16 text-center text-sm"
                    style={{ background: "#111219", border: "1px solid rgba(0,0,0,0.05)", color: "#475569" }}
                >
                    Yükleniyor...
                </div>
            ) : (
                <div
                    className="rounded-xl divide-y"
                    style={{
                        background: "#111219",
                        border: "1px solid rgba(0,0,0,0.05)",
                        borderColor: "rgba(0,0,0,0.05)",
                    }}
                >
                    {FIELD_META.map(({ key, label, hint, multiline }, i) => (
                        <div
                            key={key}
                            className="px-6 py-5"
                            style={{ borderColor: "rgba(0,0,0,0.05)" }}
                        >
                            <div className="flex items-start gap-3 mb-2">
                                <div className="flex-1">
                                    <label
                                        htmlFor={key}
                                        className="block text-sm font-medium"
                                        style={{ color: "#e2e8f0" }}
                                    >
                                        {label}
                                    </label>
                                    {hint && (
                                        <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                                            {hint}
                                        </p>
                                    )}
                                </div>
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: "rgba(124,58,237,0.1)" }}
                                >
                                    <Settings size={13} style={{ color: "#a78bfa" }} />
                                </div>
                            </div>

                            {multiline ? (
                                <textarea
                                    id={key}
                                    value={form[key]}
                                    onChange={(e) => setField(key, e.target.value)}
                                    rows={3}
                                    style={{ ...inputBase, resize: "vertical" }}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                                />
                            ) : (
                                <input
                                    id={key}
                                    type="text"
                                    value={form[key]}
                                    onChange={(e) => setField(key, e.target.value)}
                                    style={inputBase}
                                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.5)")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.1)")}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Save button — bottom */}
            {form && (
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 disabled:opacity-50"
                        style={{
                            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                            color: "#fff",
                        }}
                    >
                        <Save size={15} />
                        {isPending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </div>
            )}
        </div>
    );
}
