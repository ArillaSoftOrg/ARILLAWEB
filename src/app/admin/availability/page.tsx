'use client';

import { useState, useEffect } from 'react';
import {
  getAvailabilityConfig,
  upsertAvailabilityRule,
  initializeDefaultSchedule,
  blockDate,
  unblockDate,
  blockTimeSlot,
  unblockTimeSlot,
} from '@/lib/availability-actions';
import type { AvailabilityRuleRecord, BlockedDateRecord, BlockedTimeSlotRecord } from '@/lib/availability';
import { SERVICE_SLUGS, SERVICE_LABELS, getServicesForForm } from '@/lib/services';

const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const DAY_NUMS = [0, 1, 2, 3, 4, 5, 6];
const SERVICES_FOR_FORM = getServicesForForm(true);

interface DayRowProps {
  dayNum: number;
  rule: AvailabilityRuleRecord | undefined;
  onSave: (dayOfWeek: number, isOpen: boolean, startTime: string, endTime: string, slotDuration: number) => void;
}

function DayRow({ dayNum, rule, onSave }: DayRowProps) {
  const [startTime, setStartTime] = useState(rule?.startTime || '09:00');
  const [endTime, setEndTime] = useState(rule?.endTime || '18:00');
  const [slotDuration, setSlotDuration] = useState(rule?.slotDuration || 30);
  const [isOpen, setIsOpen] = useState(rule?.isOpen ?? true);

  return (
    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <td style={{ padding: '12px' }}>{DAYS[dayNum]}</td>
      <td style={{ padding: '12px' }}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ color: isOpen ? '#10b981' : '#ef5350' }}>
            {isOpen ? 'Açık' : 'Kapalı'}
          </span>
        </label>
      </td>
      <td style={{ padding: '12px' }}>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          disabled={!isOpen}
          className="px-2 py-1 rounded text-sm"
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            border: '1px solid rgba(0,0,0,0.1)',
            cursor: isOpen ? 'text' : 'not-allowed',
            opacity: isOpen ? 1 : 0.5,
          }}
        />
      </td>
      <td style={{ padding: '12px' }}>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          disabled={!isOpen}
          className="px-2 py-1 rounded text-sm"
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            border: '1px solid rgba(0,0,0,0.1)',
            cursor: isOpen ? 'text' : 'not-allowed',
            opacity: isOpen ? 1 : 0.5,
          }}
        />
      </td>
      <td style={{ padding: '12px' }}>
        <select
          value={slotDuration}
          onChange={(e) => setSlotDuration(Number(e.target.value))}
          disabled={!isOpen}
          className="px-2 py-1 rounded text-sm"
          style={{
            background: '#f1f5f9',
            color: '#0f172a',
            border: '1px solid rgba(0,0,0,0.1)',
            cursor: isOpen ? 'pointer' : 'not-allowed',
            opacity: isOpen ? 1 : 0.5,
          }}
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>
      </td>
      <td style={{ padding: '12px' }}>
        <button
          onClick={() => onSave(dayNum, isOpen, startTime, endTime, slotDuration)}
          className="px-3 py-1 rounded text-sm font-semibold"
          style={{ background: '#3b82f6', color: '#fff' }}
        >
          Kaydet
        </button>
      </td>
    </tr>
  );
}

export default function AvailabilityPage() {
  const [rules, setRules] = useState<AvailabilityRuleRecord[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDateRecord[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedTimeSlotRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState<string>(SERVICE_SLUGS.ALL);

  // Block date form state
  const [blockDateInput, setBlockDateInput] = useState<{ date: string; service: string; reason: string }>({ date: '', service: SERVICE_SLUGS.ALL, reason: '' });
  // Block slot form state
  const [blockSlotInput, setBlockSlotInput] = useState<{ date: string; time: string; service: string; reason: string }>({ date: '', time: '', service: SERVICE_SLUGS.ALL, reason: '' });

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      setLoading(true);
      const data = await getAvailabilityConfig();
      setRules(data.rules);
      setBlockedDates(data.blockedDates);
      setBlockedSlots(data.blockedSlots);
      setError('');
    } catch (err) {
      setError('Müsaitlik yapılandırması yüklenemedi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleInitializeDefaults() {
    try {
      await initializeDefaultSchedule();
      await loadConfig();
    } catch (err) {
      setError('Varsayılanlar başlatılamadı');
      console.error(err);
    }
  }

  async function handleSaveRule(
    dayOfWeek: number,
    isOpen: boolean,
    startTime: string,
    endTime: string,
    slotDuration: number
  ) {
    try {
      await upsertAvailabilityRule({
        dayOfWeek,
        isOpen,
        startTime,
        endTime,
        slotDuration,
        service: selectedService,
      });
      await loadConfig();
    } catch (err) {
      setError('Kural kaydedilemedi');
      console.error(err);
    }
  }

  async function handleBlockDate() {
    if (!blockDateInput.date) {
      setError('Lütfen bir tarih seçin');
      return;
    }
    try {
      await blockDate({
        date: blockDateInput.date,
        service: blockDateInput.service,
        reason: blockDateInput.reason || undefined,
      });
      setBlockDateInput({ date: '', service: SERVICE_SLUGS.ALL, reason: '' });
      await loadConfig();
    } catch (err) {
      setError('Tarih engellenemedi');
      console.error(err);
    }
  }

  async function handleUnblockDate(id: string) {
    try {
      await unblockDate(id);
      await loadConfig();
    } catch (err) {
      setError('Tarih engeli kaldırılamadı');
      console.error(err);
    }
  }

  async function handleBlockSlot() {
    if (!blockSlotInput.date || !blockSlotInput.time) {
      setError('Lütfen tarih ve saat seçin');
      return;
    }
    try {
      await blockTimeSlot({
        date: blockSlotInput.date,
        time: blockSlotInput.time,
        service: blockSlotInput.service,
        reason: blockSlotInput.reason || undefined,
      });
      setBlockSlotInput({ date: '', time: '', service: SERVICE_SLUGS.ALL, reason: '' });
      await loadConfig();
    } catch (err) {
      setError('Saat dilimi engellenemedi');
      console.error(err);
    }
  }

  async function handleUnblockSlot(id: string) {
    try {
      await unblockTimeSlot(id);
      await loadConfig();
    } catch (err) {
      setError('Saat dilimi engeli kaldırılamadı');
      console.error(err);
    }
  }

  function getRuleForDay(dayOfWeek: number): AvailabilityRuleRecord | undefined {
    return rules.find((r) => r.dayOfWeek === dayOfWeek && r.service === selectedService);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div style={{ color: '#475569' }}>Yükleniyor...</div>
      </div>
    );
  }

  const hasRules = rules.length > 0;

  return (
    <div className="p-6" style={{ background: '#f8fafc', color: '#0f172a' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Müsaitlik Yönetimi</h1>
          <p style={{ color: '#475569' }}>Randevu müsaitlik yapılandırması</p>
        </div>

        {error && (
          <div
            className="p-4 rounded-lg"
            style={{ background: 'rgba(220,38,38,0.05)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}
          >
            {error}
          </div>
        )}

        {!hasRules && (
          <div
            className="p-6 rounded-lg flex items-center justify-between"
            style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            <div>
              <p className="font-semibold">Müsaitlik kuralı tanımlanmamış</p>
              <p style={{ color: '#475569' }}>Başlamak için varsayılan takvimi başlatın</p>
            </div>
            <button
              onClick={handleInitializeDefaults}
              className="px-4 py-2 rounded-lg font-semibold transition-colors"
              style={{ background: '#3b82f6', color: '#fff' }}
            >
              Varsayılanları Başlat
            </button>
          </div>
        )}

        {/* Service selector */}
        <div>
          <label className="block text-sm font-semibold mb-2">Hizmet</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
          >
            {SERVICES_FOR_FORM.map((svc) => (
              <option key={svc.slug} value={svc.slug}>
                {svc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Section 1: Weekly Schedule */}
        {hasRules && (
          <div>
            <h2 className="text-xl font-bold mb-4">Haftalık Program</h2>
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#475569' }}>Gün</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#475569' }}>Durum</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#475569' }}>Başlangıç Saati</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#475569' }}>Bitiş Saati</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#475569' }}>Dilim Süresi (dk)</th>
                  </tr>
                </thead>
                <tbody>
                  {DAY_NUMS.map((dayNum) => {
                    const rule = getRuleForDay(dayNum);
                    return (
                      <DayRow
                        key={`${dayNum}-${selectedService}`}
                        dayNum={dayNum}
                        rule={rule}
                        onSave={handleSaveRule}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 2: Block Full Date */}
        <div
          className="p-6 rounded-lg"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <h2 className="text-xl font-bold mb-4">Tüm Günü Engelle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Tarih</label>
              <input
                type="date"
                value={blockDateInput.date}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Hizmet</label>
              <select
                value={blockDateInput.service}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, service: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              >
                {SERVICES_FOR_FORM.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {svc.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sebep (isteğe bağlı)</label>
              <input
                type="text"
                value={blockDateInput.reason}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, reason: e.target.value })}
                placeholder="örn. Tatil, Bakım"
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleBlockDate}
                className="w-full px-4 py-2 rounded-lg font-semibold"
                style={{ background: '#ef5350', color: '#fff' }}
              >
                Günü Engelle
              </button>
            </div>
          </div>

          {blockedDates.length > 0 && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-sm font-semibold mb-3">Engelli Günler</p>
              <div className="space-y-2">
                {blockedDates.map((bd) => (
                  <div
                    key={bd.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'rgba(239,83,80,0.05)' }}
                  >
                    <div>
                      <p className="text-sm font-semibold">{bd.date}</p>
                      <p style={{ fontSize: '12px', color: '#475569' }}>
                        {SERVICE_LABELS[bd.service as keyof typeof SERVICE_LABELS] || bd.service} {bd.reason && `· ${bd.reason}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnblockDate(bd.id)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ background: 'rgba(0,0,0,0.05)', color: '#ef5350' }}
                    >
                      Engeli Kaldır
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Block Time Slot */}
        <div
          className="p-6 rounded-lg"
          style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.05)' }}
        >
          <h2 className="text-xl font-bold mb-4">Saat Dilimi Engelle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Tarih</label>
              <input
                type="date"
                value={blockSlotInput.date}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Saat</label>
              <input
                type="time"
                value={blockSlotInput.time}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, time: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Hizmet</label>
              <select
                value={blockSlotInput.service}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, service: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              >
                {SERVICES_FOR_FORM.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {svc.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sebep (isteğe bağlı)</label>
              <input
                type="text"
                value={blockSlotInput.reason}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, reason: e.target.value })}
                placeholder="örn. Öğle molası"
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleBlockSlot}
                className="w-full px-4 py-2 rounded-lg font-semibold"
                style={{ background: '#ef5350', color: '#fff' }}
              >
                Saati Engelle
              </button>
            </div>
          </div>

          {blockedSlots.length > 0 && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <p className="text-sm font-semibold mb-3">Engelli Saatler</p>
              <div className="space-y-2">
                {blockedSlots.map((bs) => (
                  <div
                    key={bs.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'rgba(239,83,80,0.05)' }}
                  >
                    <div>
                      <p className="text-sm font-semibold">{bs.date} - {bs.time}</p>
                      <p style={{ fontSize: '12px', color: '#475569' }}>
                        {SERVICE_LABELS[bs.service as keyof typeof SERVICE_LABELS] || bs.service} {bs.reason && `· ${bs.reason}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnblockSlot(bs.id)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ background: 'rgba(0,0,0,0.05)', color: '#ef5350' }}
                    >
                      Engeli Kaldır
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
