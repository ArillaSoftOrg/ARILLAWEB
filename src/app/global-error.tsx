'use client';

// Last-resort boundary for errors in the root layout itself. It replaces the whole
// document, so it carries its own html/body and uses plain inline styles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F6F5F1',
          color: '#101010',
          fontFamily: '"Open Sauce One", Inter, "Helvetica Neue", Arial, sans-serif',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#60605C', margin: '0 0 28px' }}>
            Beklenmedik bir hata oluştu. Lütfen sayfayı yeniden yüklemeyi deneyin.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              minHeight: 44,
              padding: '0 24px',
              borderRadius: 999,
              border: 'none',
              background: '#101010',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Tekrar dene
          </button>
        </div>
      </body>
    </html>
  );
}
