'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getServicesForForm } from '@/lib/services';
import { useCookieConsentContext } from '@/components/cookie/CookieConsentProvider';

interface HeroBookingFormProps {
  defaultService?: string;
  theme?: 'light' | 'dark';
}

const SERVICES_FOR_FORM = getServicesForForm(false);

type DayStatus = 'available' | 'closed' | 'fully_booked' | 'blocked' | 'past';
type SlotStatus = 'available' | 'booked' | 'blocked';

interface DaySlot {
  time: string;
  status: SlotStatus;
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getMonthStr(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export default function HeroBookingForm({ defaultService, theme = 'light' }: HeroBookingFormProps) {
  const router = useRouter();
  const { consentRecord } = useCookieConsentContext();
  const [service, setService] = useState<string>(
    SERVICES_FOR_FORM.some((s) => s.slug === defaultService) ? defaultService! : ''
  );
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);

  // Availability state
  const [dayStatuses, setDayStatuses] = useState<Record<string, DayStatus>>({});
  const [slots, setSlots] = useState<DaySlot[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = new Date();
  const todayDateStr = today.toISOString().split('T')[0];
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();

  const [calendarYear, setCalendarYear] = useState(todayYear);
  const [calendarMonth, setCalendarMonth] = useState(todayMonth);

  // Fetch day statuses when month or service changes
  useEffect(() => {
    if (!service) return;

    const monthStr = getMonthStr(calendarYear, calendarMonth);
    setLoadingDays(true);

    fetch(`/api/availability/days?month=${monthStr}&service=${encodeURIComponent(service)}`)
      .then((res) => res.json())
      .then((data) => {
        setDayStatuses(data);
        setLoadingDays(false);
      })
      .catch((err) => {
        console.error('Failed to fetch day statuses:', err);
        setLoadingDays(false);
      });
  }, [service, calendarYear, calendarMonth]);

  // Fetch slots when date or service changes
  useEffect(() => {
    if (!date || !service) {
      setSlots([]);
      return;
    }

    setLoadingSlots(true);

    fetch(`/api/availability/slots?date=${date}&service=${encodeURIComponent(service)}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error('Failed to fetch slots:', err);
        setLoadingSlots(false);
      });
  }, [date, service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service || !date || !time) {
      setError(true);
      return;
    }

    if (consentRecord.categories.functional) {
      sessionStorage.setItem('randevuDraft', JSON.stringify({ service, date, time }));
    } else {
      sessionStorage.removeItem('randevuDraft');
    }
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

  // Get day status from API response
  function getDayStatus(dateStr: string): DayStatus {
    return dayStatuses[dateStr] || 'past';
  }

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

  // Determine which week row to start rendering from (for current month, skip past weeks)
  const isCurrentMonth = calendarYear === todayYear && calendarMonth === todayMonth;
  let startRowIndex = 0;
  if (isCurrentMonth) {
    // Find which row contains today
    for (let i = 0; i < cells.length; i++) {
      const cellDateStr = toDateStr(cells[i].year, cells[i].month, cells[i].day);
      if (cellDateStr === todayDateStr) {
        startRowIndex = Math.floor(i / 7);
        break;
      }
    }
  }

  // Split cells into weeks (rows of 7)
  const weeks: (typeof cells[0])[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  const visibleWeeks = weeks.slice(startRowIndex);

  // Day click handler
  const handleDayClick = (cell: typeof cells[0]) => {
    const dateStr = toDateStr(cell.year, cell.month, cell.day);
    const dayStatus = getDayStatus(dateStr);

    // Only allow clicking on available days
    if (dayStatus !== 'available') {
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
        padding: 'clamp(16px, 4vw, 28px)',
        maxWidth: 'clamp(340px, 100%, 460px)',
        width: '100%',
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
          {SERVICES_FOR_FORM.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.label}
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
          {['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'].map((day) => (
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
          {visibleWeeks.flat().map((cell, idx) => {
            const cellDateStr = toDateStr(cell.year, cell.month, cell.day);
            const isToday = cellDateStr === todayDateStr;
            const isSelected = cellDateStr === date;
            const isOverflow = cell.overflow !== null;
            const dayStatus = getDayStatus(cellDateStr);
            const isClickable = dayStatus === 'available';

            let cellBg = 'transparent';
            let cellColor = inputColor;
            let cellOpacity = 1;
            let cellCursor = 'pointer';
            let cellBorder = 'none';
            let cellTextDecoration = 'none';

            // Determine styling based on day status
            if (isOverflow) {
              cellOpacity = 0.35;
              cellColor = isDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';
              if (dayStatus === 'past') {
                cellOpacity = 0.2;
                cellCursor = 'default';
              }
            } else if (dayStatus === 'past') {
              cellOpacity = 0.3;
              cellCursor = 'default';
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1';
            } else if (dayStatus === 'closed') {
              cellColor = isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8';
              cellOpacity = 0.5;
              cellCursor = 'not-allowed';
            } else if (dayStatus === 'fully_booked') {
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8';
              cellOpacity = 0.5;
              cellCursor = 'not-allowed';
              cellTextDecoration = 'line-through';
              cellBg = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)';
            } else if (dayStatus === 'blocked') {
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#94a3b8';
              cellOpacity = 0.4;
              cellCursor = 'not-allowed';
              cellTextDecoration = 'line-through';
            } else if (isToday && !isSelected && isClickable) {
              cellBorder = '1.5px solid #7c3aed';
              cellColor = '#7c3aed';
            }

            if (isSelected) {
              cellBg = '#7c3aed';
              cellColor = 'white';
              cellCursor = 'pointer';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDayClick(cell)}
                disabled={!isClickable}
                style={{
                  width: 'clamp(28px, 7vw, 32px)',
                  height: 'clamp(28px, 7vw, 32px)',
                  borderRadius: '50%',
                  border: cellBorder || (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0'),
                  background: cellBg,
                  color: cellColor,
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: cellCursor,
                  opacity: cellOpacity,
                  textDecoration: cellTextDecoration,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (cellCursor === 'pointer' && !isSelected) {
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
                title={dayStatus === 'closed' ? 'Kapalı' : dayStatus === 'fully_booked' ? 'Dolu' : dayStatus === 'blocked' ? 'Bloke' : ''}
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
          {loadingSlots ? (
            <div style={{ color: labelColor, fontSize: 12 }}>Saatler yükleniyor...</div>
          ) : slots.length === 0 ? (
            <div style={{ color: isDark ? '#fca5a5' : '#ef4444', fontSize: 12 }}>
              Bu tarih için müsait saat yok
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {slots.map((slot) => {
                const isSlotSelected = time === slot.time;
                const isAvailable = slot.status === 'available';

                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => {
                      if (isAvailable) {
                        setTime(slot.time);
                        setError(false);
                      }
                    }}
                    disabled={!isAvailable}
                    style={{
                      padding: '5px 10px',
                      fontSize: 12,
                      borderRadius: 8,
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                      background: isSlotSelected ? '#7c3aed' : inputBg,
                      color: isSlotSelected ? 'white' : inputColor,
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      opacity: isAvailable ? 1 : 0.4,
                      textDecoration: isAvailable ? 'none' : 'line-through',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (isAvailable && !isSlotSelected) {
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
                    title={!isAvailable ? (slot.status === 'booked' ? 'Dolu' : 'Bloke') : ''}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          )}
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
        Uygun Zamanı Seç ve Görüşme Planla
      </button>
    </form>
  );
}
