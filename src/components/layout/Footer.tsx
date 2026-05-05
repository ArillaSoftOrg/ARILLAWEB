import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(124,58,237,0.2)',
        color: '#94a3b8',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-5 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <img
                src="/logoarilla.png"
                alt="Arillasoft"
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '24px' }}>
              Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                {
                  svg: <svg viewBox="0 0 24 24" fill="white" style={{ width: '15px', height: '15px' }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.249-.129.597-.129.946v5.422h-3.554s.05-8.736 0-9.646h3.554v1.364c.429-.647 1.194-1.569 2.898-1.569 2.117 0 3.704 1.385 3.704 4.362v5.489zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.709 0-.968.779-1.708 1.959-1.708 1.18 0 1.914.74 1.939 1.708 0 .951-.759 1.709-1.983 1.709zm1.581 11.019H3.656V9.807h3.262v10.645zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>,
                  href: 'https://linkedin.com/company/arillasoft',
                },
                {
                  svg: <svg viewBox="0 0 24 24" fill="white" style={{ width: '15px', height: '15px' }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                  href: 'https://github.com/arillasoft',
                },
                {
                  svg: <svg viewBox="0 0 24 24" fill="white" style={{ width: '15px', height: '15px' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>,
                  href: 'https://instagram.com/arillasoft',
                },
                {
                  svg: <svg viewBox="0 0 24 24" fill="white" style={{ width: '15px', height: '15px' }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.654l-5.207-6.807-5.967 6.807H2.882l7.732-8.835L1.227 2.25h6.802l4.721 6.24 5.474-6.24zM17.15 18.75h1.828L5.672 3.75H3.75l13.4 15z"/></svg>,
                  href: 'https://twitter.com/arillasoft',
                },
              ].map(({ svg, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white transition-all duration-200 hover:text-violet-300 hover:border-violet-400/50 hover:bg-violet-500/20"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0', marginBottom: '16px' }}>
              Hizmetler
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Web Uygulama Geliştirme', href: '/hizmetler' },
                { label: 'Mobil Uygulama', href: '/hizmetler' },
                { label: 'QR Menü Sistemi', href: '/hizmetler' },
                { label: 'UI/UX Tasarımı', href: '/hizmetler' },
                { label: 'Backend & API', href: '/hizmetler' },
                { label: 'Bakım & Destek', href: '/hizmetler' },
              ].map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 no-underline transition-colors duration-200 hover:text-slate-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0', marginBottom: '16px' }}>
              Şirket
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
                { label: 'Blog', href: '/kurumsal/blog' },
                { label: 'Kariyer', href: '/kurumsal/kariyer' },
                { label: 'İletişim', href: '/kurumsal/iletisim' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 no-underline transition-colors duration-200 hover:text-slate-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0', marginBottom: '16px' }}>
              İletişim
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: '14px', height: '14px', marginTop: '2px', flexShrink: 0 }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <a
                  href="mailto:iletisim@arillasoft.com"
                  className="text-xs text-slate-500 no-underline transition-colors duration-200 hover:text-violet-300"
                >
                  iletisim@arillasoft.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: '14px', height: '14px', marginTop: '2px', flexShrink: 0 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.052 0-2.082.354-2.906.986l-.208.156-2.155-.564.574 2.068-.134.214a4.908 4.908 0 00-.639 2.921c0 2.6 2.123 4.723 4.723 4.723 1.262 0 2.45-.504 3.337-1.417.887-.913 1.417-2.075 1.417-3.337 0-2.6-2.123-4.723-4.723-4.723m3.636-2.882c-1.327-.682-2.905-1.084-4.309-1.084-4.47 0-8.268 3.798-8.268 8.268 0 1.454.379 2.891 1.104 4.157l.175.28-.742 2.711 2.752-.723.282.177A8.25 8.25 0 008 24c4.47 0 8.268-3.798 8.268-8.268 0-2.205-.844-4.27-2.379-5.833"/></svg>
                <a
                  href="https://wa.me/905422535192?text=Merhaba%2C%20hizmetlerinizle%20ilgili%20detayl%C4%B1%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 no-underline transition-colors duration-200 hover:text-violet-300"
                >
                  WhatsApp
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: '14px', height: '14px', marginTop: '2px', flexShrink: 0 }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/></svg>
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  Konyaaltı / Antalya
                </span>
              </li>
            </ul>
            <div style={{ marginTop: '20px' }}>
              <Link
                href="/kurumsal/iletisim"
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-br from-violet-600 to-purple-700 no-underline transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '24px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            © {currentYear} Arillasoft. Tüm hakları saklıdır.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              href="/"
              className="text-xs text-slate-600 no-underline transition-colors duration-200 hover:text-slate-500"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-600 no-underline transition-colors duration-200 hover:text-slate-500"
            >
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
