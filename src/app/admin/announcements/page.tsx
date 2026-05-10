'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useTransition } from 'react';
import { Save, Plus, Pencil, Trash2, ChevronLeft } from 'lucide-react';
import {
  getCampaignBars,
  getCampaignBarById,
  createCampaignBar,
  updateCampaignBar,
  deleteCampaignBar,
  toggleCampaignBar,
  type AnnouncementConfig,
  type CampaignBarSummary,
} from '@/lib/announcement-actions';

// ── Types ──────────────────────────────────────────────────────────────────

type ViewState =
  | { view: 'list' }
  | { view: 'form'; editingId: string | null };

// ── Default form values ────────────────────────────────────────────────────

const DEFAULT_FORM: Omit<AnnouncementConfig, 'id' | 'updatedAt'> = {
  name: '',
  priority: 0,
  enabled: false,
  text: '',
  description: null,
  backgroundColor: '#dc2626',
  textColor: '#ffffff',
  dismissible: false,
  countdownEnabled: false,
  countdownMode: 'fixed',
  startsAt: null,
  expiresAt: null,
  dailyResetHour: 0,
  dailyResetMinute: 0,
  scrollEnabled: false,
  scrollSpeed: 'normal',
  targetMode: 'all',
  targetRoutes: [],
};

// ── Helpers ────────────────────────────────────────────────────────────────

const localToISO = (val: string): string | null =>
  val ? new Date(val).toISOString() : null;

const isoToLocal = (iso: string | null): string =>
  iso ? new Date(iso).toISOString().slice(0, 16) : '';

const formatDate = (iso: string | null): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ── Main page ──────────────────────────────────────────────────────────────

export default function AnnouncementsPage() {
  const [viewState, setViewState] = useState<ViewState>({ view: 'list' });
  const [bars, setBars] = useState<CampaignBarSummary[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [isPendingToggle, startToggleTransition] = useTransition();

  const loadList = () => {
    setLoadingList(true);
    getCampaignBars().then((data) => {
      setBars(data);
      setLoadingList(false);
    });
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleToggle = (id: string, currentEnabled: boolean) => {
    setTogglingId(id);
    startToggleTransition(async () => {
      await toggleCampaignBar(id, !currentEnabled);
      loadList();
      setTogglingId(null);
    });
  };

  const handleDeleteConfirm = (id: string) => {
    startDeleteTransition(async () => {
      await deleteCampaignBar(id);
      setDeleteConfirm(null);
      loadList();
    });
  };

  const goToForm = (editingId: string | null) => {
    setViewState({ view: 'form', editingId });
  };

  const goToList = () => {
    setViewState({ view: 'list' });
    loadList();
  };

  // ── Render: Form view ──────────────────────────────────────────────────────

  if (viewState.view === 'form') {
    return (
      <CampaignForm
        editingId={viewState.editingId}
        onSaved={goToList}
        onCancel={goToList}
      />
    );
  }

  // ── Render: List view ──────────────────────────────────────────────────────

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ background: '#f8fafc' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>
              Duyurular & Kampanya Çubuğu
            </h1>
            <p style={{ color: '#475569' }}>
              Site genelinde gösterilecek kampanya çubuklarını yönetin
            </p>
          </div>
          <button
            onClick={() => goToForm(null)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#7c3aed' }}
          >
            <Plus size={18} />
            Yeni Kampanya
          </button>
        </div>

        {/* Campaign list */}
        {loadingList ? (
          <div className="p-8 text-center rounded-lg" style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b' }}>
            Yükleniyor...
          </div>
        ) : bars.length === 0 ? (
          <div className="p-12 text-center rounded-lg" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <p className="text-lg font-medium mb-2" style={{ color: '#0f172a' }}>Henüz kampanya yok</p>
            <p className="mb-6" style={{ color: '#64748b' }}>İlk kampanya çubuğunuzu oluşturmak için "Yeni Kampanya" butonuna tıklayın.</p>
            <button
              onClick={() => goToForm(null)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white mx-auto transition-opacity hover:opacity-90"
              style={{ background: '#7c3aed' }}
            >
              <Plus size={18} />
              Yeni Kampanya
            </button>
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th className="text-left px-5 py-3 text-sm font-semibold" style={{ color: '#475569' }}>Kampanya Adı</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold" style={{ color: '#475569' }}>Durum</th>
                  <th className="text-center px-4 py-3 text-sm font-semibold" style={{ color: '#475569' }}>Öncelik</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold hidden lg:table-cell" style={{ color: '#475569' }}>Başlangıç</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold hidden lg:table-cell" style={{ color: '#475569' }}>Bitiş</th>
                  <th className="text-right px-5 py-3 text-sm font-semibold" style={{ color: '#475569' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {bars.map((bar, idx) => (
                  <React.Fragment key={bar.id}>
                    <tr
                      style={{
                        background: '#ffffff',
                        borderTop: idx > 0 ? '1px solid #f1f5f9' : undefined,
                      }}
                    >
                      <td className="px-5 py-4">
                        <span className="font-medium" style={{ color: '#0f172a' }}>{bar.name}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => handleToggle(bar.id, bar.enabled)}
                          disabled={togglingId === bar.id || isPendingToggle}
                          className="relative inline-flex items-center w-11 h-6 rounded-full transition-colors focus:outline-none disabled:opacity-60"
                          style={{ background: bar.enabled ? '#7c3aed' : '#cbd5e1' }}
                          title={bar.enabled ? 'Aktif — kapat' : 'Pasif — aç'}
                        >
                          <span
                            className="inline-block w-4 h-4 bg-white rounded-full shadow transition-transform"
                            style={{ transform: bar.enabled ? 'translateX(24px)' : 'translateX(4px)' }}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-mono" style={{ color: '#475569' }}>{bar.priority}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-sm" style={{ color: '#64748b' }}>{formatDate(bar.startsAt)}</span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-sm" style={{ color: '#64748b' }}>{formatDate(bar.expiresAt)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => goToForm(bar.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                            style={{ background: '#ede9fe', color: '#6d28d9' }}
                          >
                            <Pencil size={14} />
                            Düzenle
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(bar.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                            style={{ background: '#fee2e2', color: '#dc2626' }}
                          >
                            <Trash2 size={14} />
                            Sil
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Inline delete confirm row */}
                    {deleteConfirm === bar.id && (
                      <tr style={{ background: '#fef2f2', borderTop: '1px solid #fecaca' }}>
                        <td colSpan={6} className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium" style={{ color: '#7f1d1d' }}>
                              <strong>{bar.name}</strong> kampanyasını silmek istediğinizden emin misiniz?
                            </span>
                            <div className="flex gap-2 ml-auto">
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                                style={{ background: '#f1f5f9', color: '#475569' }}
                              >
                                İptal
                              </button>
                              <button
                                onClick={() => handleDeleteConfirm(bar.id)}
                                disabled={isPendingDelete}
                                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                                style={{ background: '#dc2626' }}
                              >
                                {isPendingDelete ? 'Siliniyor...' : 'Sil'}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CampaignForm sub-component ─────────────────────────────────────────────

function CampaignForm({
  editingId,
  onSaved,
  onCancel,
}: {
  editingId: string | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  type FormState = Omit<AnnouncementConfig, 'id' | 'updatedAt'>;

  const [form, setForm] = useState<FormState | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (editingId) {
      getCampaignBarById(editingId).then((config) => {
        if (config) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, updatedAt, ...rest } = config;
          setForm(rest);
        }
      });
    } else {
      setForm({ ...DEFAULT_FORM });
    }
  }, [editingId]);

  const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : null));
    if (errors[key]) {
      setErrors((e) => {
        const newE = { ...e };
        delete newE[key];
        return newE;
      });
    }
  };

  const handleTargetRouteAdd = (route: string) => {
    if (!route.trim() || !form) return;
    const updated = Array.from(new Set([...form.targetRoutes, route.trim()]));
    handleChange('targetRoutes', updated);
  };

  const handleTargetRouteRemove = (index: number) => {
    if (!form) return;
    handleChange('targetRoutes', form.targetRoutes.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!form) return;
    startTransition(async () => {
      const payload = {
        name: String(form.name ?? ''),
        priority: Number(form.priority ?? 0),
        enabled: Boolean(form.enabled),
        text: String(form.text ?? ''),
        description: form.description != null ? String(form.description) : null,
        backgroundColor: String(form.backgroundColor ?? '#dc2626'),
        textColor: String(form.textColor ?? '#ffffff'),
        dismissible: Boolean(form.dismissible),
        countdownEnabled: Boolean(form.countdownEnabled),
        countdownMode: form.countdownMode,
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
        dailyResetHour: Number(form.dailyResetHour ?? 0),
        dailyResetMinute: Number(form.dailyResetMinute ?? 0),
        scrollEnabled: Boolean(form.scrollEnabled),
        scrollSpeed: form.scrollSpeed,
        targetMode: form.targetMode,
        targetRoutes: Array.isArray(form.targetRoutes) ? form.targetRoutes : [],
      };

      const result = editingId
        ? await updateCampaignBar(editingId, payload)
        : await createCampaignBar(payload);

      if (result.success) {
        setSaved(true);
        setTimeout(() => {
          onSaved();
        }, 800);
      } else {
        setErrors(result.errors ?? {});
      }
    });
  };

  const getFieldError = (field: string): string | undefined => {
    const errs = errors[field];
    return errs && errs.length > 0 ? errs[0] : undefined;
  };

  const inputStyle = (field: string) => ({
    borderColor: getFieldError(field) ? '#ef4444' : '#e2e8f0',
    '--tw-ring-color': '#7c3aed',
  } as React.CSSProperties);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ background: '#f8fafc' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-sm mb-4 hover:opacity-70 transition-opacity"
            style={{ color: '#7c3aed' }}
          >
            <ChevronLeft size={16} />
            Kampanya listesine dön
          </button>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>
            {editingId ? 'Kampanyayı Düzenle' : 'Yeni Kampanya'}
          </h1>
          <p style={{ color: '#475569' }}>
            {editingId ? 'Kampanya çubuğunu güncelleyin' : 'Yeni bir kampanya çubuğu oluşturun'}
          </p>
        </div>

        {/* Save success */}
        {saved && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}
          >
            ✓ Kampanya kaydedildi
          </div>
        )}

        {form ? (
          <div className="space-y-8">
            {/* Section 1: Campaign identity */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Kimlik & Öncelik
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Kampanya Adı *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={inputStyle('name')}
                    placeholder="Örn: Yaz İndirimi 2026"
                  />
                  {getFieldError('name') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('name')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Öncelik (0–9999)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    value={form.priority}
                    onChange={(e) => handleChange('priority', Math.min(9999, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={inputStyle('priority')}
                  />
                  <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                    Yüksek sayı = daha öncelikli gösterim. Birden fazla kampanya aynı sayfayı hedefliyorsa en yüksek öncelikli gösterilir.
                  </p>
                  {getFieldError('priority') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('priority')}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Section 2: Status & Content */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Durum & İçerik
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.enabled}
                      onChange={(e) => handleChange('enabled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span style={{ color: '#475569' }}>Duyuruyu aktifleştir</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Duyuru Metni *
                  </label>
                  <input
                    type="text"
                    value={form.text}
                    onChange={(e) => handleChange('text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={inputStyle('text')}
                    placeholder="Örn: Yeni yıl %20 indirim kampanyası!"
                  />
                  {getFieldError('text') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('text')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Açıklama (İsteğe Bağlı)
                  </label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => handleChange('description', e.target.value || null)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={inputStyle('description')}
                    rows={3}
                    placeholder="Ek bilgi veya açıklama..."
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Appearance */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Görünüm
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Arka Plan Rengi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={form.backgroundColor}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={form.backgroundColor}
                      onChange={(e) => handleChange('backgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={inputStyle('backgroundColor')}
                      placeholder="#dc2626"
                    />
                  </div>
                  {getFieldError('backgroundColor') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('backgroundColor')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Metin Rengi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={form.textColor}
                      onChange={(e) => handleChange('textColor', e.target.value)}
                      className="w-12 h-10 rounded border"
                    />
                    <input
                      type="text"
                      value={form.textColor}
                      onChange={(e) => handleChange('textColor', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={inputStyle('textColor')}
                      placeholder="#ffffff"
                    />
                  </div>
                  {getFieldError('textColor') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('textColor')}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Section 4: Scrolling */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Kaydırma (Marquee)
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.scrollEnabled}
                      onChange={(e) => handleChange('scrollEnabled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span style={{ color: '#475569' }}>Metni kaydırma olarak göster</span>
                  </label>
                  <p className="text-xs mt-2" style={{ color: '#64748b' }}>
                    Kaydırma aktifken metin, açıklama ve geri sayım birlikte kayar.
                  </p>
                </div>

                {form.scrollEnabled && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                      Kaydırma Hızı
                    </label>
                    <select
                      value={form.scrollSpeed}
                      onChange={(e) => handleChange('scrollSpeed', e.target.value as 'slow' | 'normal' | 'fast')}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                      style={inputStyle('scrollSpeed')}
                    >
                      <option value="slow">Yavaş (30 saniye)</option>
                      <option value="normal">Normal (18 saniye)</option>
                      <option value="fast">Hızlı (10 saniye)</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Section 5: Countdown */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Geri Sayım
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.countdownEnabled}
                      onChange={(e) => handleChange('countdownEnabled', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span style={{ color: '#475569' }}>Geri sayımı göster</span>
                  </label>
                </div>

                {form.countdownEnabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                        Geri Sayım Modu
                      </label>
                      <select
                        value={form.countdownMode}
                        onChange={(e) => handleChange('countdownMode', e.target.value as 'fixed' | 'daily')}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={inputStyle('countdownMode')}
                      >
                        <option value="fixed">Sabit Bitiş (Belirli bir tarihe kadar)</option>
                        <option value="daily">Günlük Sıfırlama (Her gün saat ayarına kadar)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                        Başlama Tarihi (İsteğe Bağlı)
                      </label>
                      <input
                        type="datetime-local"
                        value={isoToLocal(form.startsAt)}
                        onChange={(e) => handleChange('startsAt', localToISO(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={inputStyle('startsAt')}
                      />
                      <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                        Tarihler yerel saatinize göre girilir
                      </p>
                      {getFieldError('startsAt') && (
                        <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('startsAt')}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                        Bitiş Tarihi {form.countdownMode === 'fixed' && '*'}
                      </label>
                      <input
                        type="datetime-local"
                        value={isoToLocal(form.expiresAt)}
                        onChange={(e) => handleChange('expiresAt', localToISO(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={inputStyle('expiresAt')}
                      />
                      {form.countdownMode === 'daily' && (
                        <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                          Günlük modu için isteğe bağlı: Son kampanya bitiş tarihi
                        </p>
                      )}
                      {getFieldError('expiresAt') && (
                        <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('expiresAt')}</p>
                      )}
                    </div>

                    {form.countdownMode === 'daily' && (
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                            Saat (0–23)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={form.dailyResetHour}
                            onChange={(e) => handleChange('dailyResetHour', Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={inputStyle('dailyResetHour')}
                          />
                          {getFieldError('dailyResetHour') && (
                            <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('dailyResetHour')}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                            Dakika (0–59)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={form.dailyResetMinute}
                            onChange={(e) => handleChange('dailyResetMinute', Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={inputStyle('dailyResetMinute')}
                          />
                          {getFieldError('dailyResetMinute') && (
                            <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('dailyResetMinute')}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {form.countdownMode === 'daily' && (
                      <p className="text-xs p-3 rounded-lg" style={{ background: '#eff6ff', color: '#0c4a6e', border: '1px solid #7dd3fc' }}>
                        Her gün belirtilen saatte sıfırlanır (ziyaretçinin yerel saatine göre).
                      </p>
                    )}
                  </>
                )}
              </div>
            </section>

            {/* Section 6: Targeting */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Hedefleme
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Nerede Gösterilsin?
                  </label>
                  <select
                    value={form.targetMode}
                    onChange={(e) => handleChange('targetMode', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={inputStyle('targetMode')}
                  >
                    <option value="all">Tüm sayfalarda</option>
                    <option value="sectoral">Sektörel yazılımlar sayfalarında</option>
                    <option value="selected">Seçilen sayfalarda</option>
                    <option value="exclude">Seçilen sayfalar hariç</option>
                  </select>
                  {getFieldError('targetMode') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>{getFieldError('targetMode')}</p>
                  )}
                </div>

                {(form.targetMode === 'selected' || form.targetMode === 'exclude') && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                      Sayfalar (Rotalar) *
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="route-input"
                          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                          style={inputStyle('targetRoutes')}
                          placeholder="/kurumsal/blog"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              handleTargetRouteAdd(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById('route-input') as HTMLInputElement;
                            handleTargetRouteAdd(input.value);
                            input.value = '';
                          }}
                          className="px-4 py-2 rounded-lg font-medium transition-colors"
                          style={{ background: '#7c3aed', color: '#ffffff' }}
                        >
                          Ekle
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {form.targetRoutes.map((route, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-1 rounded-full"
                            style={{ background: '#ede9fe', border: '1px solid #d8b4fe' }}
                          >
                            <span style={{ color: '#6d28d9', fontSize: '0.875rem' }}>{route}</span>
                            <button
                              onClick={() => handleTargetRouteRemove(idx)}
                              className="flex-shrink-0 hover:opacity-70"
                              style={{ color: '#a78bfa' }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {getFieldError('targetRoutes') && (
                      <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>{getFieldError('targetRoutes')}</p>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Section 7: Interaction */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Etkileşim
              </h2>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.dismissible}
                    onChange={(e) => handleChange('dismissible', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span style={{ color: '#475569' }}>Kullanıcılar duyuruyu kapatabilsin (× butonu göster)</span>
                </label>
              </div>
            </section>

            {/* Footer buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={onCancel}
                className="px-6 py-3 rounded-lg font-semibold transition-colors hover:opacity-80"
                style={{ background: '#f1f5f9', color: '#475569' }}
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
                style={{ background: '#7c3aed' }}
              >
                <Save size={18} />
                {isPending ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center" style={{ color: '#64748b' }}>Form yükleniyor...</div>
        )}
      </div>
    </div>
  );
}
