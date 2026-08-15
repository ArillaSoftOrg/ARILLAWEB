'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getServiceLabel, SERVICE_SLUGS } from '@/lib/services';
import { getTodayDateStr, type DayStatus, type SlotStatus } from '@/lib/availability';
import { useCookieConsentContext } from '@/components/cookie/CookieConsentProvider';

interface HeroBookingFormProps {
  defaultService?: string;
  theme?: 'light' | 'dark';
}

type CalendarDayStatus = DayStatus | 'loading' | 'unknown' | 'no_remaining_today_slots';

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
  const locale = useLocale();
  const { consentRecord } = useCookieConsentContext();
  const [service, setService] = useState<string>(defaultService ? getServiceLabel(defaultService) : '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);

  // Availability state
  const [dayStatuses, setDayStatuses] = useState<Record<string, DayStatus>>({});
  const [slots, setSlots] = useState<DaySlot[]>([]);
  const [todaySlots, setTodaySlots] = useState<DaySlot[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingTodaySlots, setLoadingTodaySlots] = useState(false);

  const todayDateStr = getTodayDateStr();
  const [todayYearValue, todayMonthValue] = todayDateStr.split('-').map(Number);
  const todayYear = todayYearValue;
  const todayMonth = todayMonthValue - 1;

  const [calendarYear, setCalendarYear] = useState(todayYear);
  const [calendarMonth, setCalendarMonth] = useState(todayMonth);

  // Fetch day statuses when month changes
  useEffect(() => {
    const monthStr = getMonthStr(calendarYear, calendarMonth);
    setLoadingDays(true);

    fetch(`/api/availability/days?month=${monthStr}&service=${SERVICE_SLUGS.ALL}`)
      .then((res) => res.json())
      .then((data) => {
        setDayStatuses(data);
        setLoadingDays(false);
      })
      .catch((err) => {
        console.error('Failed to fetch day statuses:', err);
        setLoadingDays(false);
      });
  }, [calendarYear, calendarMonth]);

  // Fetch today's slots for the calendar-only "no remaining time today" state.
  useEffect(() => {
    if (calendarYear !== todayYear || calendarMonth !== todayMonth) {
      setTodaySlots([]);
      return;
    }

    setLoadingTodaySlots(true);

    fetch(`/api/availability/slots?date=${todayDateStr}&service=${SERVICE_SLUGS.ALL}`)
      .then((res) => res.json())
      .then((data) => {
        setTodaySlots(data.slots || []);
        setLoadingTodaySlots(false);
      })
      .catch((err) => {
        console.error('Failed to fetch today slots:', err);
        setLoadingTodaySlots(false);
      });
  }, [calendarYear, calendarMonth, todayDateStr, todayYear, todayMonth]);

  // Fetch slots when date changes
  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }

    setLoadingSlots(true);

    fetch(`/api/availability/slots?date=${date}&service=${SERVICE_SLUGS.ALL}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error('Failed to fetch slots:', err);
        setLoadingSlots(false);
      });
  }, [date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceText = service.trim();
    if (!serviceText || !date || !time) {
      setError(true);
      return;
    }

    if (consentRecord.categories.functional) {
      sessionStorage.setItem('randevuDraft', JSON.stringify({ service: serviceText, date, time }));
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

  // Get day status from API response; unknown/loading is never treated as past.
  function getDayStatus(dateStr: string): CalendarDayStatus {
    if (dateStr < todayDateStr) {
      return 'past';
    }

    const status = dayStatuses[dateStr];
    if (!status) {
      return loadingDays ? 'loading' : 'unknown';
    }

    if (dateStr === todayDateStr && status === 'available') {
      if (loadingTodaySlots) {
        return 'loading';
      }

      if (todaySlots.length > 0 && !todaySlots.some((slot) => slot.status === 'available')) {
        return 'no_remaining_today_slots';
      }
    }

    return status;
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
        <input
          type="text"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setError(false);
          }}
          placeholder="Örn. Web sitesi geliştirme"
          style={{
            width: '100%',
            background: inputBg,
            border: inputBorder,
            borderRadius: 10,
            color: inputColor,
            fontSize: 14,
            padding: '10px 12px',
            fontFamily: 'inherit',
          }}
        />
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
            {new Date(calendarYear, calendarMonth).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
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
            const cellTextDecoration = 'none';
            let cellTitle = '';

            // Determine styling based on day status
            if (isOverflow) {
              cellOpacity = dayStatus === 'past' ? 0.2 : 0.45;
              cellColor = isDark ? 'rgba(255,255,255,0.35)' : '#94a3b8';
              cellCursor = isClickable ? 'pointer' : 'not-allowed';
            } else if (dayStatus === 'past') {
              cellOpacity = 0.3;
              cellCursor = 'not-allowed';
              cellColor = isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1';
            } else if (dayStatus === 'closed') {
              cellColor = isDark ? 'rgba(255,255,255,0.4)' : '#94a3b8';
              cellOpacity = 0.5;
              cellCursor = 'not-allowed';
              cellTitle = 'Kapalı';
            } else if (dayStatus === 'fully_booked') {
              cellColor = isDark ? '#fca5a5' : '#b91c1c';
              cellOpacity = 0.72;
              cellCursor = 'not-allowed';
              cellBg = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.07)';
              cellBorder = isDark ? '1px solid rgba(248,113,113,0.28)' : '1px solid rgba(185,28,28,0.18)';
              cellTitle = 'Dolu';
            } else if (dayStatus === 'blocked') {
              cellColor = isDark ? 'rgba(255,255,255,0.42)' : '#94a3b8';
              cellOpacity = 0.55;
              cellCursor = 'not-allowed';
              cellBg = isDark ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.08)';
              cellTitle = 'Bloke';
            } else if (dayStatus === 'no_remaining_today_slots') {
              cellColor = '#7c3aed';
              cellOpacity = 0.64;
              cellCursor = 'not-allowed';
              cellBorder = '1.5px solid #7c3aed';
              cellBg = isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.05)';
              cellTitle = 'Bugün için kalan saat yok';
            } else if (dayStatus === 'loading' || dayStatus === 'unknown') {
              cellColor = isDark ? 'rgba(255,255,255,0.58)' : '#64748b';
              cellOpacity = 0.75;
              cellCursor = 'not-allowed';
              cellBg = isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc';
            }

            if (isToday && !isSelected && dayStatus !== 'past') {
              cellBorder = cellBorder === 'none' ? '1.5px solid #7c3aed' : cellBorder;
              if (isClickable) {
                cellColor = '#7c3aed';
              }
            }

            if (isClickable && !isSelected && !isToday) {
              cellColor = inputColor;
              cellCursor = 'pointer';
            }

            if (isToday && !isSelected && isClickable) {
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
                title={cellTitle}
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
                const isPastSlot = slot.status === 'past';
                const isBookedSlot = slot.status === 'booked';
                const isBlockedSlot = slot.status === 'blocked';

                let slotBg = inputBg;
                let slotColor = inputColor;
                let slotBorder = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';
                let slotOpacity = 1;
                let slotTextDecoration = 'none';
                let slotTitle = '';

                if (isPastSlot) {
                  slotColor = isDark ? 'rgba(255,255,255,0.34)' : '#94a3b8';
                  slotOpacity = 0.55;
                  slotTitle = 'Geçmiş saat';
                } else if (isBookedSlot) {
                  slotBg = isDark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.08)';
                  slotColor = isDark ? '#fca5a5' : '#b91c1c';
                  slotBorder = isDark ? 'rgba(248,113,113,0.28)' : 'rgba(185,28,28,0.18)';
                  slotTextDecoration = 'line-through';
                  slotTitle = 'Dolu';
                } else if (isBlockedSlot) {
                  slotBg = isDark ? 'rgba(148,163,184,0.08)' : 'rgba(148,163,184,0.08)';
                  slotColor = isDark ? 'rgba(255,255,255,0.42)' : '#94a3b8';
                  slotOpacity = 0.75;
                  slotTextDecoration = 'line-through';
                  slotTitle = 'Bloke';
                }

                if (isSlotSelected) {
                  slotBg = '#7c3aed';
                  slotColor = 'white';
                  slotBorder = '#7c3aed';
                  slotOpacity = 1;
                  slotTextDecoration = 'none';
                }

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
                      border: `1px solid ${slotBorder}`,
                      background: slotBg,
                      color: slotColor,
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      opacity: slotOpacity,
                      textDecoration: slotTextDecoration,
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
                        e.currentTarget.style.background = slotBg;
                      }
                    }}
                    title={slotTitle}
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
