'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { getServicesForForm, SERVICE_LABELS } from '@/lib/services';
import { useCookieConsentContext } from '@/components/cookie/CookieConsentProvider';

interface DraftData {
  service?: string;
  date?: string;
  time?: string;
}

interface DaySlot {
  time: string;
  status: 'available' | 'booked' | 'blocked';
}

const SERVICES_FOR_FORM = getServicesForForm(false);

export default function RandevualClient() {
  const router = useRouter();
  const { isMounted, consentRecord } = useCookieConsentContext();
  const [isHydrated, setIsHydrated] = useState(false);

  // Pre-filled from sessionStorage
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // State management
  const [showSuccess, setShowSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Availability state
  const [slots, setSlots] = useState<DaySlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Load draft from sessionStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    if (!consentRecord.categories.functional) {
      sessionStorage.removeItem('randevuDraft');
      setIsHydrated(true);
      return;
    }

    const stored = sessionStorage.getItem('randevuDraft');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DraftData;
        setService(parsed.service || '');
        setDate(parsed.date || '');
        setTime(parsed.time || '');
      } catch {
        // Ignore parsing errors
      }
    }
    setIsHydrated(true);
  }, [isMounted, consentRecord.categories.functional]);

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

  const validatePhoneFormat = (value: string): boolean => {
    if (!value) return true; // Optional field
    const phoneRegex = /^(\+90|0)?5\d{9}$/;
    return phoneRegex.test(value.replace(/[\s-]/g, ''));
  };

  const validateEmailFormat = (value: string): boolean => {
    if (!value) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!service) newErrors.service = 'Hizmet seçiniz';
    if (!date) newErrors.date = 'Tarih seçiniz';
    if (!time) newErrors.time = 'Saat seçiniz';
    if (!name) newErrors.name = 'Ad soyad zorunludur';

    // Validate phone/email
    if (!phone && !email) {
      newErrors.contact = 'Telefon veya e-postadan en az biri zorunludur';
    } else {
      if (phone && !validatePhoneFormat(phone)) {
        newErrors.phone = 'Geçerli telefon numarası giriniz (05XX XXX XX XX)';
      }
      if (email && !validateEmailFormat(email)) {
        newErrors.email = 'Geçerli e-posta adresi giriniz';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});

    // Submit to API
    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, date, time, name, phone: phone || undefined, email: email || undefined, message }),
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error?.fieldErrors) {
        setFieldErrors(data.error.fieldErrors);
      } else {
        setFieldErrors({ submit: data.error || 'Randevu oluşturulamadı. Lütfen tekrar deneyiniz.' });
      }
      return;
    }

    // Clear the draft and show success
    sessionStorage.removeItem('randevuDraft');
    setShowSuccess(true);
  };

  // Wait for hydration to avoid SSR mismatch
  if (!isHydrated) {
    return (
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <p style={{ color: '#64748b' }}>Yükleniyor...</p>
      </div>
    );
  }

  // Success state
  if (showSuccess) {
    const handleHomeClick = () => {
      router.push('/');
    };

    return (
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <CheckCircle size={48} style={{ color: '#10b981', marginBottom: 16 }} />
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
          Randevu talebiniz alındı.
        </h2>
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#64748b', marginBottom: 8 }}>
            Randevu bilgileriniz size e-posta ile gönderildi.
          </p>
          <p style={{ color: '#64748b' }}>
            Yanlış bir bilgi varsa daha sonra buradan düzenleyebilirsiniz.
          </p>
        </div>
        <button
          onClick={handleHomeClick}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        borderTop: '3px solid #7c3aed',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Desktop: two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 0,
        }}
        className="lg:grid"
      >
        {/* Left: Summary panel */}
        <div
          style={{
            background: '#f8fafc',
            padding: 32,
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="hidden lg:flex"
        >
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>
            Randevu Özeti
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {service && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                  HİZMET
                </p>
                <p style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{SERVICE_LABELS[service as keyof typeof SERVICE_LABELS] || service}</p>
              </div>
            )}

            {date && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                  TARİH
                </p>
                <p style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>
                  {new Date(date).toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            {time && (
              <div>
                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 4 }}>
                  SAAT
                </p>
                <p style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{time}</p>
              </div>
            )}
          </div>

          {!service && (
            <p
              style={{
                fontSize: 13,
                color: '#94a3b8',
                fontStyle: 'italic',
                marginTop: 16,
              }}
            >
              Formu tamamladıktan sonra özeti burada göreceksiniz.
            </p>
          )}
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
          className="flex flex-col"
        >
          {/* Heading */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
              Ön Görüşme Talebiniz
            </h2>
            <p style={{ fontSize: 14, color: '#64748b' }}>
              Lütfen aşağıdaki bilgileri doldurarak randevu talebinizi tamamlayın.
            </p>
          </div>

          {/* Error state - general submit error */}
          {fieldErrors.submit && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#dc2626',
                fontSize: 13,
                fontWeight: 500,
                border: '1px solid rgba(220, 38, 38, 0.2)',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{fieldErrors.submit}</span>
            </div>
          )}

          {/* Service field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: fieldErrors.service ? '#dc2626' : '#475569',
                marginBottom: 8,
              }}
            >
              Hizmet
            </label>
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                if (e.target.value) {
                  setFieldErrors((prev) => {
                    const { service: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: fieldErrors.service ? '1px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: 10,
                color: '#0f172a',
                fontSize: 14,
                padding: '10px 12px',
                fontFamily: 'inherit',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                paddingRight: 32,
              }}
            >
              <option value="">Hizmet seçiniz</option>
              {SERVICES_FOR_FORM.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.label}
                </option>
              ))}
            </select>
            {fieldErrors.service && (
              <p style={{ fontSize: 12, fontWeight: 500, color: '#dc2626', marginTop: 6, lineHeight: '1.4' }}>{fieldErrors.service}</p>
            )}
          </div>

          {/* Date field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: fieldErrors.date ? '#dc2626' : '#475569',
                marginBottom: 8,
              }}
            >
              Tarih
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (e.target.value) {
                  setFieldErrors((prev) => {
                    const { date: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: fieldErrors.date ? '1px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: 10,
                color: '#0f172a',
                fontSize: 14,
                padding: '10px 12px',
                fontFamily: 'inherit',
              }}
            />
            {fieldErrors.date && (
              <p style={{ fontSize: 12, fontWeight: 500, color: '#dc2626', marginTop: 6, lineHeight: '1.4' }}>{fieldErrors.date}</p>
            )}
          </div>

          {/* Time field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: fieldErrors.time ? '#dc2626' : '#475569',
                marginBottom: 8,
              }}
            >
              Saat
            </label>
            {loadingSlots ? (
              <div
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  color: '#0f172a',
                  fontSize: 14,
                  padding: '10px 12px',
                  fontFamily: 'inherit',
                }}
              >
                Saatler yükleniyor...
              </div>
            ) : slots.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  color: '#dc2626',
                  fontSize: 14,
                  padding: '10px 12px',
                  fontFamily: 'inherit',
                }}
              >
                Bu tarih için müsait saat yok
              </div>
            ) : (
              <>
                <select
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (e.target.value) {
                      setFieldErrors((prev) => {
                        const { time: _, ...rest } = prev;
                        return rest;
                      });
                    }
                  }}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: fieldErrors.time ? '1px solid #dc2626' : '1px solid #e2e8f0',
                    borderRadius: 10,
                    color: '#0f172a',
                    fontSize: 14,
                    padding: '10px 12px',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: 32,
                  }}
                >
                  <option value="">Saat seçiniz</option>
                  {slots.map((slot) => (
                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={slot.status !== 'available'}
                      style={{
                        color: slot.status === 'available' ? '#0f172a' : '#94a3b8',
                        textDecoration: slot.status !== 'available' ? 'line-through' : 'none',
                      }}
                    >
                      {slot.time} {slot.status === 'booked' ? '(Dolu)' : slot.status === 'blocked' ? '(Bloke)' : ''}
                    </option>
                  ))}
                </select>
                {fieldErrors.time && (
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#dc2626', marginTop: 6, lineHeight: '1.4' }}>{fieldErrors.time}</p>
                )}
              </>
            )}
          </div>

          {/* Name field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: fieldErrors.name ? '#dc2626' : '#475569',
                marginBottom: 8,
              }}
            >
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value) {
                  setFieldErrors((prev) => {
                    const { name: _, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              placeholder="Adınız Soyadınız"
              style={{
                width: '100%',
                background: '#f8fafc',
                border: fieldErrors.name ? '1px solid #dc2626' : '1px solid #e2e8f0',
                borderRadius: 10,
                color: '#0f172a',
                fontSize: 14,
                padding: '10px 12px',
                fontFamily: 'inherit',
              }}
            />
            {fieldErrors.name && (
              <p style={{ fontSize: 12, fontWeight: 500, color: '#dc2626', marginTop: 6, lineHeight: '1.4' }}>{fieldErrors.name}</p>
            )}
          </div>

          {/* Contact fields - Phone and Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Shared requirement text above phone/email fields */}
            <div
              style={{
                padding: '8px 12px',
                borderLeft: '3px solid #f59e0b',
                background: 'rgba(245, 158, 11, 0.08)',
                borderRadius: '0 6px 6px 0',
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#b45309',
                  margin: 0,
                  lineHeight: '1.5',
                }}
              >
                Telefon veya e-postadan en az biri zorunludur.
              </p>
            </div>

            {/* Phone field */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: fieldErrors.phone ? '#dc2626' : '#475569',
                  marginBottom: 8,
                }}
              >
                Telefon
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (!e.target.value && !email) {
                    setFieldErrors((prev) => {
                      const { phone: _, ...rest } = prev;
                      return rest;
                    });
                  } else if (e.target.value) {
                    setFieldErrors((prev) => {
                      const { phone: _, contact: __, ...rest } = prev;
                      return rest;
                    });
                  }
                }}
                placeholder="05XX XXX XX XX"
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: fieldErrors.phone ? '1px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: 10,
                  color: '#0f172a',
                  fontSize: 14,
                  padding: '10px 12px',
                  fontFamily: 'inherit',
                }}
              />
              {fieldErrors.phone && (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#dc2626',
                    marginTop: 6,
                    lineHeight: '1.4',
                  }}
                >
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: fieldErrors.email ? '#dc2626' : '#475569',
                  marginBottom: 8,
                }}
              >
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!e.target.value && !phone) {
                    setFieldErrors((prev) => {
                      const { email: _, ...rest } = prev;
                      return rest;
                    });
                  } else if (e.target.value) {
                    setFieldErrors((prev) => {
                      const { email: _, contact: __, ...rest } = prev;
                      return rest;
                    });
                  }
                }}
                placeholder="email@example.com"
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: fieldErrors.email ? '1px solid #dc2626' : '1px solid #e2e8f0',
                  borderRadius: 10,
                  color: '#0f172a',
                  fontSize: 14,
                  padding: '10px 12px',
                  fontFamily: 'inherit',
                }}
              />
              {fieldErrors.email && (
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#dc2626',
                    marginTop: 6,
                    lineHeight: '1.4',
                  }}
                >
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Display contact error if neither phone nor email is filled */}
            {fieldErrors.contact && (
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#dc2626',
                  marginTop: 4,
                  lineHeight: '1.4',
                }}
              >
                {fieldErrors.contact}
              </p>
            )}
          </div>

          {/* Message field */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 600,
                color: '#475569',
                marginBottom: 8,
              }}
            >
              Mesaj <span style={{ color: '#94a3b8' }}>(İsteğe bağlı)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ön görüşme sırasında bahsetmek istediğiniz özel konular varsa belirtiniz..."
              rows={3}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                color: '#0f172a',
                fontSize: 14,
                padding: '10px 12px',
                fontFamily: 'inherit',
                resize: 'none',
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Randevu Talebini Gönder
          </button>
        </form>
      </div>

      {/* Mobile: single column (hide left summary panel) */}
      <style>{`
        @media (max-width: 1024px) {
          div[class*="lg:grid"] {
            grid-template-columns: 1fr;
          }
          div[class*="hidden lg:flex"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
