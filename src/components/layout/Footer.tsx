import React from 'react';
import Link from 'next/link';
import { Code2, Linkedin, Github, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        color: '#94a3b8',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }} className="px-5 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={16} color="white" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '17px', color: '#f1f5f9' }}>
                Arilla<span style={{ color: '#8b5cf6' }}>soft</span>
              </span>
            </Link>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, marginBottom: '20px' }}>
              Modern yazılım çözümleri ile işletmenizi dijital geleceğe taşıyoruz.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: Linkedin, href: 'https://linkedin.com/company/arillasoft' },
                { icon: Github, href: 'https://github.com/arillasoft' },
                { icon: Instagram, href: 'https://instagram.com/arillasoft' },
                { icon: Twitter, href: 'https://twitter.com/arillasoft' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#475569',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={15} />
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
                    style={{ fontSize: '14px', color: '#475569', textDecoration: 'none' }}
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
                    style={{ fontSize: '14px', color: '#475569', textDecoration: 'none' }}
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
                <Mail size={14} color="#7c3aed" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a href="mailto:iletisim@arillasoft.com" style={{ fontSize: '13px', color: '#475569', textDecoration: 'none' }}>
                  iletisim@arillasoft.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Phone size={14} color="#7c3aed" style={{ marginTop: '2px', flexShrink: 0 }} />
                <a href="tel:+902125550101" style={{ fontSize: '13px', color: '#475569', textDecoration: 'none' }}>
                  +90 (212) 555 01 01
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={14} color="#7c3aed" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  Maslak Mah. Büyükdere Cad.<br />
                  Sarıyer / İstanbul
                </span>
              </li>
            </ul>
            <div style={{ marginTop: '20px' }}>
              <Link
                href="/kurumsal/iletisim"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '9px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'white',
                  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                }}
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#334155' }}>
            © {currentYear} Arillasoft. Tüm hakları saklıdır.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#334155', textDecoration: 'none' }}>
              Gizlilik Politikası
            </Link>
            <Link href="/" style={{ fontSize: '13px', color: '#334155', textDecoration: 'none' }}>
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
