'use client';

import { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DraftData {
  service?: string;
  date?: string;
  time?: string;
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

export default function RandevualClient() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Pre-filled from sessionStorage
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  // State management
  const [status, setStatus] = useState<'idle' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  // Load draft from sessionStorage on mount
  useLayoutEffect(() => {
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!service || !date || !time || !name || !contact) {
      setStatus('error');
      return;
    }

    // Submit to API
    const res = await fetch('/api/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, date, time, name, contact, message }),
    });

    if (!res.ok) {
      setStatus('error');
      return;
    }

    // Clear the draft and show success
    sessionStorage.removeItem('randevuDraft');
    setShowSuccess(true);
    setStatus('idle');
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
        <p style={{ color: '#64748b', marginBottom: 24 }}>
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
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
                <p style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>{service}</p>
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

          {/* Error state */}
          {status === 'error' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#dc2626',
                fontSize: 13,
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>Lütfen tüm gerekli alanları doldurunuz</span>
            </div>
          )}

          {/* Service field */}
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
              Hizmet
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
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
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Date field */}
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
              Tarih
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
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
            />
          </div>

          {/* Time field */}
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
              Saat
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
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
              {[
                '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
                '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
                '17:00', '17:30', '18:00',
              ].map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Name field */}
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
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız"
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
            />
          </div>

          {/* Contact field */}
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
              Telefon veya E-posta
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="05XX XXX XX XX veya email@example.com"
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
            />
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
