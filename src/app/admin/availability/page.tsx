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

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_NUMS = [0, 1, 2, 3, 4, 5, 6];
const SERVICES = ['all', 'Web Geliştirme', 'Mobil Uygulama', 'Özel Yazılım', 'API & Backend', 'QR Menü Sistemi', 'Randevu Yönetim Sistemi', 'Bakım & Destek'];

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
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <td style={{ padding: '12px' }}>{DAYS[dayNum]}</td>
      <td style={{ padding: '12px' }}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={(e) => setIsOpen(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <span style={{ color: isOpen ? '#86efac' : '#ef5350' }}>
            {isOpen ? 'Open' : 'Closed'}
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
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
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
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
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
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.1)',
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
          Save
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
  const [selectedService, setSelectedService] = useState('all');

  // Block date form state
  const [blockDateInput, setBlockDateInput] = useState({ date: '', service: 'all', reason: '' });
  // Block slot form state
  const [blockSlotInput, setBlockSlotInput] = useState({ date: '', time: '', service: 'all', reason: '' });

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
      setError('Failed to load availability config');
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
      setError('Failed to initialize defaults');
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
      setError('Failed to save rule');
      console.error(err);
    }
  }

  async function handleBlockDate() {
    if (!blockDateInput.date) {
      setError('Please select a date');
      return;
    }
    try {
      await blockDate({
        date: blockDateInput.date,
        service: blockDateInput.service,
        reason: blockDateInput.reason || undefined,
      });
      setBlockDateInput({ date: '', service: 'all', reason: '' });
      await loadConfig();
    } catch (err) {
      setError('Failed to block date');
      console.error(err);
    }
  }

  async function handleUnblockDate(id: string) {
    try {
      await unblockDate(id);
      await loadConfig();
    } catch (err) {
      setError('Failed to unblock date');
      console.error(err);
    }
  }

  async function handleBlockSlot() {
    if (!blockSlotInput.date || !blockSlotInput.time) {
      setError('Please select a date and time');
      return;
    }
    try {
      await blockTimeSlot({
        date: blockSlotInput.date,
        time: blockSlotInput.time,
        service: blockSlotInput.service,
        reason: blockSlotInput.reason || undefined,
      });
      setBlockSlotInput({ date: '', time: '', service: 'all', reason: '' });
      await loadConfig();
    } catch (err) {
      setError('Failed to block slot');
      console.error(err);
    }
  }

  async function handleUnblockSlot(id: string) {
    try {
      await unblockTimeSlot(id);
      await loadConfig();
    } catch (err) {
      setError('Failed to unblock slot');
      console.error(err);
    }
  }

  function getRuleForDay(dayOfWeek: number): AvailabilityRuleRecord | undefined {
    return rules.find((r) => r.dayOfWeek === dayOfWeek && r.service === selectedService);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div style={{ color: '#94a3b8' }}>Loading...</div>
      </div>
    );
  }

  const hasRules = rules.length > 0;

  return (
    <div className="p-6" style={{ background: '#08090d', color: '#f1f5f9' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Müsaitlik Yönetimi</h1>
          <p style={{ color: '#94a3b8' }}>Appointment availability configuration</p>
        </div>

        {error && (
          <div
            className="p-4 rounded-lg"
            style={{ background: 'rgba(220,38,38,0.1)', color: '#fca5a5', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            {error}
          </div>
        )}

        {!hasRules && (
          <div
            className="p-6 rounded-lg flex items-center justify-between"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}
          >
            <div>
              <p className="font-semibold">No availability rules configured</p>
              <p style={{ color: '#94a3b8' }}>Initialize default schedule to get started</p>
            </div>
            <button
              onClick={handleInitializeDefaults}
              className="px-4 py-2 rounded-lg font-semibold transition-colors"
              style={{ background: '#3b82f6', color: '#fff' }}
            >
              Initialize Defaults
            </button>
          </div>
        )}

        {/* Service selector */}
        <div>
          <label className="block text-sm font-semibold mb-2">Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {SERVICES.map((svc) => (
              <option key={svc} value={svc}>
                {svc === 'all' ? 'All Services' : svc}
              </option>
            ))}
          </select>
        </div>

        {/* Section 1: Weekly Schedule */}
        {hasRules && (
          <div>
            <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>Day</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>Start Time</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>End Time</th>
                    <th style={{ textAlign: 'left', padding: '12px', color: '#94a3b8' }}>Slot Duration (min)</th>
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
          style={{ background: '#111219', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <h2 className="text-xl font-bold mb-4">Block a Full Date</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                value={blockDateInput.date}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Service</label>
              <select
                value={blockDateInput.service}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, service: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {SERVICES.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc === 'all' ? 'All Services' : svc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Reason (optional)</label>
              <input
                type="text"
                value={blockDateInput.reason}
                onChange={(e) => setBlockDateInput({ ...blockDateInput, reason: e.target.value })}
                placeholder="e.g., Holiday, Maintenance"
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleBlockDate}
                className="w-full px-4 py-2 rounded-lg font-semibold"
                style={{ background: '#ef5350', color: '#fff' }}
              >
                Block Date
              </button>
            </div>
          </div>

          {blockedDates.length > 0 && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-sm font-semibold mb-3">Blocked Dates</p>
              <div className="space-y-2">
                {blockedDates.map((bd) => (
                  <div
                    key={bd.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'rgba(239,83,80,0.1)' }}
                  >
                    <div>
                      <p className="text-sm font-semibold">{bd.date}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {bd.service === 'all' ? 'All Services' : bd.service} {bd.reason && `· ${bd.reason}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnblockDate(bd.id)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#f87171' }}
                    >
                      Unblock
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
          style={{ background: '#111219', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <h2 className="text-xl font-bold mb-4">Block a Time Slot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                value={blockSlotInput.date}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Time</label>
              <input
                type="time"
                value={blockSlotInput.time}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, time: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Service</label>
              <select
                value={blockSlotInput.service}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, service: e.target.value })}
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {SERVICES.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc === 'all' ? 'All Services' : svc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Reason (optional)</label>
              <input
                type="text"
                value={blockSlotInput.reason}
                onChange={(e) => setBlockSlotInput({ ...blockSlotInput, reason: e.target.value })}
                placeholder="e.g., Lunch break"
                className="w-full px-4 py-2 rounded-lg"
                style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleBlockSlot}
                className="w-full px-4 py-2 rounded-lg font-semibold"
                style={{ background: '#ef5350', color: '#fff' }}
              >
                Block Slot
              </button>
            </div>
          </div>

          {blockedSlots.length > 0 && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-sm font-semibold mb-3">Blocked Slots</p>
              <div className="space-y-2">
                {blockedSlots.map((bs) => (
                  <div
                    key={bs.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'rgba(239,83,80,0.1)' }}
                  >
                    <div>
                      <p className="text-sm font-semibold">{bs.date} at {bs.time}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {bs.service === 'all' ? 'All Services' : bs.service} {bs.reason && `· ${bs.reason}`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnblockSlot(bs.id)}
                      className="px-3 py-1 rounded text-sm"
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#f87171' }}
                    >
                      Unblock
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
