'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useTransition } from 'react';
import { Save } from 'lucide-react';
import {
  getAnnouncementConfig,
  getAnnouncementDebugData,
  updateAnnouncementConfig,
  type AnnouncementConfig,
  type AnnouncementDebugData,
} from '@/lib/announcement-actions';

type SaveStatus = {
  success: boolean;
  hasData: boolean;
  updatedAt: string | null;
};

export default function AnnouncementsPage() {
  const [form, setForm] = useState<AnnouncementConfig | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dbConfig, setDbConfig] = useState<AnnouncementDebugData | null>(null);
  const [isReloading, setIsReloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);

  // ── Load on mount ──────────────────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      const [config, debug] = await Promise.all([
        getAnnouncementConfig(),
        getAnnouncementDebugData(),
      ]);
      setForm(config);
      setDbConfig(debug);
    };
    load();
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const localToISO = (val: string): string | null => {
    return val ? new Date(val).toISOString() : null;
  };

  const isoToLocal = (iso: string | null): string => {
    return iso ? new Date(iso).toISOString().slice(0, 16) : '';
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleChange = <K extends keyof AnnouncementConfig>(
    key: K,
    value: AnnouncementConfig[K]
  ) => {
    setForm((prev) => prev ? { ...prev, [key]: value } : null);
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
    const updated = form.targetRoutes.filter((_, i) => i !== index);
    handleChange('targetRoutes', updated);
  };

  const handleSave = () => {
    if (!form) return;
    startTransition(async () => {
      const result = await updateAnnouncementConfig({
        ...form,
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      });
      if (result.success) {
        setSaved(true);
        setErrors({});
        setTimeout(() => setSaved(false), 3000);
        // Re-fetch from DB to update both form and debug panel
        const [freshConfig, freshDebug] = await Promise.all([
          getAnnouncementConfig(),
          getAnnouncementDebugData(),
        ]);
        setForm(freshConfig);
        setDbConfig(freshDebug);
        setSaveStatus({
          success: true,
          hasData: freshDebug !== null,
          updatedAt: freshDebug?.updatedAt ?? null,
        });
      } else {
        setErrors(result.errors ?? {});
        setSaveStatus({ success: false, hasData: false, updatedAt: null });
      }
    });
  };

  const getFieldError = (field: string): string | undefined => {
    const errs = errors[field];
    return errs && errs.length > 0 ? errs[0] : undefined;
  };

  const handleReloadDebug = async () => {
    setIsReloading(true);
    const data = await getAnnouncementDebugData();
    setDbConfig(data);
    setIsReloading(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ background: '#f8fafc' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>
            Duyurular & Kampanya Çubuğu
          </h1>
          <p style={{ color: '#475569' }}>
            Site genelinde gösterilecek duyuru ve kampanya ayarları
          </p>
        </div>

        {/* Save status */}
        {saved && (
          <div
            className="mb-6 p-4 rounded-lg"
            style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' }}
          >
            ✓ Ayarlar kaydedildi
          </div>
        )}

        {/* Form */}
        {form ? (
          <div className="space-y-8">
            {/* Section 1: Status & Content */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Durum & İçerik
              </h2>
              <div className="space-y-6">
                {/* Enabled */}
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

                {/* Text */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Duyuru Metni *
                  </label>
                  <input
                    type="text"
                    value={form.text}
                    onChange={(e) => handleChange('text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      borderColor: getFieldError('text') ? '#ef4444' : '#e2e8f0',
                      '--tw-ring-color': '#7c3aed',
                    } as any}
                    placeholder="Örn: Yeni yıl %20 indirim kampanyası!"
                  />
                  {getFieldError('text') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                      {getFieldError('text')}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0f172a' }}>
                    Açıklama (İsteğe Bağlı)
                  </label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => handleChange('description', e.target.value || null)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      borderColor: '#e2e8f0',
                      '--tw-ring-color': '#7c3aed',
                    } as any}
                    rows={3}
                    placeholder="Ek bilgi veya açıklama..."
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Appearance */}
            <section style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h2 className="text-xl font-semibold mb-6" style={{ color: '#0f172a' }}>
                Görünüm
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Background Color */}
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
                      style={{
                        borderColor: getFieldError('backgroundColor') ? '#ef4444' : '#e2e8f0',
                        '--tw-ring-color': '#7c3aed',
                      } as any}
                      placeholder="#dc2626"
                    />
                  </div>
                  {getFieldError('backgroundColor') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                      {getFieldError('backgroundColor')}
                    </p>
                  )}
                </div>

                {/* Text Color */}
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
                      style={{
                        borderColor: getFieldError('textColor') ? '#ef4444' : '#e2e8f0',
                        '--tw-ring-color': '#7c3aed',
                      } as any}
                      placeholder="#ffffff"
                    />
                  </div>
                  {getFieldError('textColor') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                      {getFieldError('textColor')}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Section 3: Scrolling */}
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
                    Kaydırma aktifken yalnızca metin kayar, sayaç sabit kalır.
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
                      style={{
                        borderColor: '#e2e8f0',
                        '--tw-ring-color': '#7c3aed',
                      } as any}
                    >
                      <option value="slow">Yavaş (30 saniye)</option>
                      <option value="normal">Normal (18 saniye)</option>
                      <option value="fast">Hızlı (10 saniye)</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Section 4: Countdown */}
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
                        style={{
                          borderColor: '#e2e8f0',
                          '--tw-ring-color': '#7c3aed',
                        } as any}
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
                        style={{
                          borderColor: getFieldError('startsAt') ? '#ef4444' : '#e2e8f0',
                          '--tw-ring-color': '#7c3aed',
                        } as any}
                      />
                      <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                        Tarihler yerel saatinize göre girilir
                      </p>
                      {getFieldError('startsAt') && (
                        <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                          {getFieldError('startsAt')}
                        </p>
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
                        style={{
                          borderColor: getFieldError('expiresAt') ? '#ef4444' : '#e2e8f0',
                          '--tw-ring-color': '#7c3aed',
                        } as any}
                      />
                      {form.countdownMode === 'daily' && (
                        <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                          Günlük modu için isteğe bağlı: Son kampanya bitiş tarihi
                        </p>
                      )}
                      {getFieldError('expiresAt') && (
                        <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                          {getFieldError('expiresAt')}
                        </p>
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
                            style={{
                              borderColor: getFieldError('dailyResetHour') ? '#ef4444' : '#e2e8f0',
                              '--tw-ring-color': '#7c3aed',
                            } as any}
                          />
                          {getFieldError('dailyResetHour') && (
                            <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                              {getFieldError('dailyResetHour')}
                            </p>
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
                            style={{
                              borderColor: getFieldError('dailyResetMinute') ? '#ef4444' : '#e2e8f0',
                              '--tw-ring-color': '#7c3aed',
                            } as any}
                          />
                          {getFieldError('dailyResetMinute') && (
                            <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                              {getFieldError('dailyResetMinute')}
                            </p>
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

            {/* Section 5: Targeting */}
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
                    style={{
                      borderColor: getFieldError('targetMode') ? '#ef4444' : '#e2e8f0',
                      '--tw-ring-color': '#7c3aed',
                    } as any}
                  >
                    <option value="all">Tüm sayfalarda</option>
                    <option value="sectoral">Sektörel yazılımlar sayfalarında</option>
                    <option value="selected">Seçilen sayfalarda</option>
                    <option value="exclude">Seçilen sayfalar hariç</option>
                  </select>
                  {getFieldError('targetMode') && (
                    <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
                      {getFieldError('targetMode')}
                    </p>
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
                          style={{
                            borderColor: '#e2e8f0',
                            '--tw-ring-color': '#7c3aed',
                          } as any}
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
                      <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>
                        {getFieldError('targetRoutes')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Section 6: Interaction */}
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

            {/* Save button */}
            <div className="flex justify-end gap-3">
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

        {/* DEBUG PANEL — always visible, remove after investigation */}
        <div className="mt-8 space-y-4">
          {/* Son kayıt durumu */}
          <section style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', border: '2px solid #f59e0b' }}>
            <h2 className="text-base font-bold mb-3" style={{ color: '#f59e0b' }}>
              [DEBUG] Son Kayıt Durumu
            </h2>
            {saveStatus ? (
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <td className="py-1 pr-4 font-mono" style={{ color: '#64748b', width: '160px' }}>success</td>
                    <td className="py-1 font-mono font-bold" style={{ color: saveStatus.success ? '#4ade80' : '#f87171' }}>
                      {String(saveStatus.success)}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <td className="py-1 pr-4 font-mono" style={{ color: '#64748b' }}>returned data exists</td>
                    <td className="py-1 font-mono font-bold" style={{ color: saveStatus.hasData ? '#4ade80' : '#f87171' }}>
                      {String(saveStatus.hasData)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-mono" style={{ color: '#64748b' }}>updatedAt</td>
                    <td className="py-1 font-mono" style={{ color: '#e2e8f0' }}>
                      {saveStatus.updatedAt ?? '(null)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-sm font-mono" style={{ color: '#475569' }}>Henüz kayıt yapılmadı.</p>
            )}
          </section>

          {/* Kayıtlı DB verisi */}
          <section style={{ background: '#0f172a', padding: '24px', borderRadius: '8px', border: '2px solid #f59e0b' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: '#f59e0b' }}>
                [DEBUG] Kayıtlı Duyuru Verisi
              </h2>
              <button
                onClick={handleReloadDebug}
                disabled={isReloading}
                className="px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                style={{ background: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}
              >
                {isReloading ? 'Yükleniyor...' : 'Yeniden Yükle'}
              </button>
            </div>
            {dbConfig ? (
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  {(
                    [
                      ['enabled', String(dbConfig.enabled)],
                      ['text', dbConfig.text || '(boş)'],
                      ['description', dbConfig.description ?? '(null)'],
                      ['dismissible', String(dbConfig.dismissible)],
                      ['countdownEnabled', String(dbConfig.countdownEnabled)],
                      ['countdownMode', dbConfig.countdownMode],
                      ['startsAt', dbConfig.startsAt ?? '(null)'],
                      ['expiresAt', dbConfig.expiresAt ?? '(null)'],
                      ['scrollEnabled', String(dbConfig.scrollEnabled)],
                      ['scrollSpeed', dbConfig.scrollSpeed],
                      ['targetMode', dbConfig.targetMode],
                      ['targetRoutes', JSON.stringify(dbConfig.targetRoutes)],
                      ['updatedAt', dbConfig.updatedAt],
                    ] as [string, string][]
                  ).map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td className="py-1 pr-4 font-mono" style={{ color: '#64748b', width: '160px' }}>{key}</td>
                      <td className="py-1 font-mono" style={{ color: '#e2e8f0' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm font-mono" style={{ color: '#475569' }}>
                {form === null ? 'Yükleniyor...' : 'DB\'de kayıt bulunamadı.'}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
