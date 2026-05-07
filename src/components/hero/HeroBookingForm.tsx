'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBookingFormProps {
  defaultService?: string;
  theme?: 'light' | 'dark';
}

const SERVICE_OPTIONS = [
  'Web Geliştirme',
  'Mobil Uygulama',
  'Özel Yazılım',
  'API & Backend',
  'QR Menü Sistemi',
  'Randevu Yönetim Sistemi',
  'Bakım & Destek',
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00',
];

type SlotStatus = 'available' | 'booked';

const MOCK_AVAILABILITY: Record<string, Record<string, SlotStatus>> = {
  '2026-05-09': {
    '09:00': 'booked', '09:30': 'booked', '10:00': 'booked', '10:30': 'booked',
    '11:00': 'booked', '11:30': 'booked', '12:00': 'booked', '12:30': 'booked',
    '13:00': 'booked', '13:30': 'booked', '14:00': 'booked', '14:30': 'booked',
    '15:00': 'booked', '15:30': 'booked', '16:00': 'booked', '16:30': 'booked',
    '17:00': 'booked', '17:30': 'booked', '18:00': 'booked',
  },
  '2026-05-13': {
    '09:00': 'booked', '09:30': 'booked', '10:00': 'available', '10:30': 'available',
    '11:00': 'booked', '11:30': 'available', '14:00': 'booked', '14:30': 'booked',
  },
  '2026-05-19': {
    '09:00': 'booked', '10:00': 'booked', '11:00': 'booked', '14:00': 'available',
    '15:00': 'available', '16:00': 'booked',
  },
  '2026-05-22': {
    '09:00': 'booked', '09:30': 'booked', '10:00': 'booked', '10:30': 'booked',
    '11:00': 'booked', '11:30': 'booked', '12:00': 'booked', '12:30': 'booked',
    '13:00': 'booked', '13:30': 'booked', '14:00': 'booked', '14:30': 'booked',
    '15:00': 'booked', '15:30': 'booked', '16:00': 'booked', '16:30': 'booked',
    '17:00': 'booked', '17:30': 'booked', '18:00': 'booked',
  },
};

function getSlotStatus(dateStr: string, slot: string): SlotStatus {
  return MOCK_AVAILABILITY[dateStr]?.[slot] ?? 'available';
}

function isFullyBooked(dateStr: string): boolean {
  return TIME_SLOTS.every((slot) => getSlotStatus(dateStr, slot) === 'booked');
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function HeroBookingForm({ defaultService, theme = 'light' }: HeroBookingFormProps) {
  const router = useRouter();
  const [service, setService] = useState<string>(
    SERVICE_OPTIONS.includes(defaultService || '') ? defaultService! : ''
  );
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);

  const today = new Date();
  const todayDateStr = today.toISOString().split('T')[0];
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  const [calendarYear, setCalendarYear] = useState(todayYear);
  const [calendarMonth, setCalendarMonth] = useState(todayMonth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service || !date || !time) {
      setError(true);
      return;
    }

    sessionStorage.setItem('randevuDraft', JSON.stringify({ service, date, time }));
    router.push('/randevual');
  };

  // Calendar navigation
  const handlePrevMonth = () => {
    setCalendarYear(calendarMonth === 0 ? calendarYear - 1 : calendarYear);
    setCalendarMonth(calendarMonth === 0 ? 11 : calendarMonth - 1);
    setDate('');
    setTime('');
  };

  const handleNextMonth = () => {
    setCalendarYear(calendarMonth === 11 ? calendarYear + 1 : calendarYear);
    setCalendarMonth(calendarMonth === 11 ? 0 : calendarMonth + 1);
    setDate('');
    setTime('');
  };

  // Build calendar grid
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const rawFirstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const firstDayOffset = (rawFirstDay + 6) % 7;

  const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();
  const prevOverflow = Array.from({ length: firstDayOffset }, (_, i) => ({
    day: prevMonthDays - firstDayOffset + 1 + i,
    month: calendarMonth - 1,
    year: calendarMonth === 0 ? calendarYear - 1 : calendarYear,
    overflow: 'prev' as const,
  }));

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    month: calendarMonth,
    year: calendarYear,
    overflow: null,
  }));

  const trailingCount = 42 - prevOverflow.length - currentDays.length;
  const nextOverflow = Array.from({ length: trailingCount }, (_, i) => ({
    day: i + 1,
    month: calendarMonth + 1,
    year: calendarMonth === 11 ? calendarYear + 1 : calendarYear,
    overflow: 'next' as const,
  }));

  const cells = [...prevOverflow, ...currentDays, ...nextOverflow];

  // Day click handler
  const handleDayClick = (cell: typeof cells[0]) => {
    const dateStr = toDateStr(cell.year, cell.month, cell.day);
    const isPast = dateStr < todayDateStr;
    const isBooked = isFullyBooked(dateStr);

    if (isPast || isBooked) {
      return;
    }

    if (cell.overflow === 'prev') {
      handlePrevMonth();
      setDate(dateStr);
      setTime('');
    } else if (cell.overflow === 'next') {
      handleNextMonth();
      setDate(dateStr);
      setTime('');
    } else {
      setDate(dateStr);
      setTime('');
    }
  };

  // Theme-based styling
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#fff';
  const cardBorder = isDark ? '1px solid rgba(255,255,255,0.08)' : 'none';
  const borderTop = '3px solid #7c3aed';
  const labelColor = isDark ? '#cbd5e1' : '#475569';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#f8fafc';
  const inputBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0';
  const inputColor = isDark ? '#f8fafc' : '#0f172a';
  const buttonGradient = 'linear-gradient(135deg, #8b5cf6, #6d28d9)';
  const errorColor = isDark ? '#fca5a5' : '#ef4444';

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: cardBg,
        border: isDark ? cardBorder : undefined,
        borderTop: borderTop,
        borderRadius: 20,
        padding: 28,
        maxWidth: 460,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {/* Service field */}
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: 'block',
            color: labelColor,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Hizmet
        </label>
        <select
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setError(false);
          }}
          style={{
            width: '100%',
            background: inputBg,
            border: inputBorder,
            borderRadius: 10,
            color: inputColor,
            fontSize: 14,
            padding: '10px 12px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${isDark ? 'cbd5e1' : '475569'}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            paddingRight: 32,
          }}
        >
          <option value="" disabled>
            Hizmet seçiniz
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div style={{ marginBottom: 20 }}>
        {/* Month navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={calendarYear === todayYear && calendarMonth === todayMonth}
            style={{
              background: 'none',
              border: 'none',
              cursor: (calendarYear === todayYear && calendarMonth === todayMonth) ? 'not-allowed' : 'pointer',
              color: labelColor,
              opacity: (calendarYear === todayYear && calendarMonth === todayMonth) ? 0.5 : 1,
              padding: 4,
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ color: inputColor, fontSize: 14, fontWeight: 600 }}>
            {new Date(calendarYear, calendarMonth).toLocaleDateString('tr-TR', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: labelColor, padding: 4 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
            <div
              key={day}
              style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: labelColor }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
          {cells.map((cell, idx) => {
            const cellDateStr = toDateStr(cell.year, cell.month, cell.day);
            const isPast = cellDateStr < todayDateStr;
            const isToday = cellDateStr === todayDateStr;
            const isSelected = cellDateStr === date;
            const isBooked = isFullyBooked(cellDateStr);
            const isOverflow = cell.overflow !== null;
            const isValidOverflow = !isPast && !isBooked && isOverflow;

            let cellBg = 'transparent';
            let cellColor = inputColor;
            let cellOpacity = 1;
            let cellCursor = 'pointer';
            let cellBorder = 'none';
            let cellTextDecoration = 'none';

            if (isOverflow && isPast) {
              cellOpacity = 0.2;
              cellCursor = 'default';
              cellColor = isDark ? 'rgba(255,255,255,0.2)' : '#94a3b8';
            } else if (isValidOverflow) {
              cellOpacity = 0.35;
              cellColor = isDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';
            } else if (!isOverflow && isPast) {
              cellOpacity = 0.3;
              cellCursor = 'default';
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1';
            } else if (isToday && !isSelected && !isBooked) {
              cellBorder = '1.5px solid #7c3aed';
              cellColor = '#7c3aed';
            } else if (isBooked) {
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8';
              cellOpacity = 0.5;
              cellCursor = 'not-allowed';
              cellTextDecoration = 'line-through';
              cellBg = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)';
            } else if (isSelected) {
              cellBg = '#7c3aed';
              cellColor = 'white';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDayClick(cell)}
                disabled={isPast || isBooked}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: cellBorder || (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0'),
                  background: cellBg,
                  color: cellColor,
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 500,
                  cursor: cellCursor,
                  opacity: cellOpacity,
                  textDecoration: cellTextDecoration,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (cellCursor === 'pointer' && !isSelected && !isBooked) {
                    e.currentTarget.style.background = isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isSelected) {
                    e.currentTarget.style.background = '#7c3aed';
                  } else {
                    e.currentTarget.style.background = cellBg;
                  }
                }}
              >
                {cell.day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots (shown after day selected) */}
      {date && (
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              color: labelColor,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Saat
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {TIME_SLOTS.map((slot) => {
              const slotStatus = getSlotStatus(date, slot);
              const isSlotSelected = time === slot;
              const isSlotBooked = slotStatus === 'booked';

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => {
                    if (!isSlotBooked) {
                      setTime(slot);
                      setError(false);
                    }
                  }}
                  disabled={isSlotBooked}
                  style={{
                    padding: '5px 10px',
                    fontSize: 12,
                    borderRadius: 8,
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                    background: isSlotSelected ? '#7c3aed' : inputBg,
                    color: isSlotSelected ? 'white' : inputColor,
                    cursor: isSlotBooked ? 'not-allowed' : 'pointer',
                    opacity: isSlotBooked ? 0.4 : 1,
                    textDecoration: isSlotBooked ? 'line-through' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSlotBooked && !isSlotSelected) {
                      e.currentTarget.style.background = isDark
                        ? 'rgba(124,58,237,0.15)'
                        : 'rgba(124,58,237,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSlotSelected) {
                      e.currentTarget.style.background = inputBg;
                    }
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20,
            padding: 12,
            borderRadius: 8,
            background: isDark ? 'rgba(252, 165, 165, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: errorColor,
            fontSize: 13,
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>Lütfen tüm alanları doldurunuz</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        style={{
          width: '100%',
          background: buttonGradient,
          color: 'white',
          border: 'none',
          borderRadius: 10,
          padding: '12px 16px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'opacity 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Ön Görüşme Planla
      </button>
    </form>
  );
}
