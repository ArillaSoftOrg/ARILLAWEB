'use client';

import { useState, useEffect, startTransition, type Ref } from 'react';
import { usePathname, Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import BrandLockup from '@/components/BrandLockup';
import MegaMenuNav from '@/components/layout/MegaMenuNav';
import MobileNavAccordion from '@/components/layout/MobileNavAccordion';
import type { Locale } from '@/lib/en-site-data';

type NavbarProps = {
  brandIntroActive?: boolean;
  brandLogoRef?: Ref<HTMLSpanElement>;
  developerLoginOnly?: boolean;
};

export default function Navbar({
  brandIntroActive = false,
  brandLogoRef,
  developerLoginOnly = false,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, []);

  useEffect(() => {
    startTransition(() => {
      setIsOpen(false);
    });
  }, [pathname]);

  const otherLocale = locale === 'tr' ? 'en' : 'tr';
  const showLocaleSwitcher =
    !pathname.startsWith('/site-ornekleri') &&
    !pathname.startsWith('/demo-siteler') &&
    !pathname.startsWith('/services') &&
    !pathname.startsWith('/sectoral-software') &&
    !pathname.startsWith('/web-design-examples') &&
    !pathname.startsWith('/hizmetler') &&
    !pathname.startsWith('/sektorel-yazilimlar');
  const isHomePath = pathname === '/';
  const isHomeTop = isHomePath && !scrolled;
  const publicHeaderClassName = isHomePath ? 'bg-transparent' : 'bg-slate-900 md:bg-white';
  const publicHeaderStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: isHomeTop ? 'transparent' : isHomePath ? 'rgba(255,255,255,0.84)' : undefined,
    backdropFilter: isHomePath ? (isHomeTop ? 'none' : 'blur(14px)') : 'blur(6px)',
    WebkitBackdropFilter: isHomePath ? (isHomeTop ? 'none' : 'blur(14px)') : 'blur(6px)',
    borderBottom: isHomeTop
      ? '1px solid transparent'
      : isHomePath
        ? '1px solid rgba(15,23,42,0.08)'
        : scrolled ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(0,0,0,0.1)',
    boxShadow: isHomeTop
      ? 'none'
      : isHomePath
        ? '0 10px 30px rgba(15,23,42,0.06)'
        : scrolled ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
    transition: 'background-color 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, backdrop-filter 0.28s ease',
  };

  if (developerLoginOnly) {
    return (
      <header
        className="bg-[#190b03] md:bg-white"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.2)' : '1px solid rgba(0,0,0,0.1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
          <div className="flex items-center justify-between h-14 lg:h-[84px]">
            <Link href="/" aria-label="Arilla Yazılım" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <span
                ref={brandLogoRef}
                data-brand-logo-target=""
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  opacity: brandIntroActive ? 0 : 1,
                  transition: brandIntroActive ? 'none' : 'opacity 180ms ease',
                }}
              >
                <BrandLockup variant="maintenance" rotationEnabled={!brandIntroActive} />
              </span>
            </Link>

            {/* Desktop: Blog + Dev Login buttons */}
            <div className="hidden lg:flex items-center" style={{ gap: '10px' }}>
              <Link
                href="/kurumsal/blog"
                className="text-role-navigation"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#1d4ed8',
                  background: '#f8fbff',
                  border: '1px solid rgba(37,99,235,0.22)',
                  boxShadow: '0 1px 2px rgba(37,99,235,0.06)',
                  transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1e40af';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
                  e.currentTarget.style.background = '#eef6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1d4ed8';
                  e.currentTarget.style.borderColor = 'rgba(37,99,235,0.22)';
                  e.currentTarget.style.background = '#f8fbff';
                }}
              >
                Blog
              </Link>
              <a
                href="/admin/login"
                className="inline-flex items-center text-role-button"
                style={{
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #7c3aed 100%)',
                  boxShadow: '0 8px 20px rgba(37,99,235,0.22)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 12px 26px rgba(37,99,235,0.3)';
                  const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,99,235,0.22)';
                  const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                Geliştirici Girişi
                <span data-arrow="" style={{ display: 'inline-flex', transition: 'transform 0.2s ease' }}>
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>

            {/* Mobile: hamburger */}
            <button
              className="flex items-center justify-center lg:hidden text-slate-100"
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', padding: '12px', margin: '-12px', cursor: 'pointer' }}
              aria-label="Menü"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden"
            style={{
              position: 'absolute',
              top: '100%',
              left: '12px',
              right: '12px',
              zIndex: 100,
              background: '#1f1008',
              border: '1px solid rgba(255,149,36,0.12)',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              padding: '12px',
              maxHeight: 'calc(100dvh - 72px)',
              overflowY: 'auto',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link
                href="/kurumsal/blog"
                onClick={() => setIsOpen(false)}
                className="text-role-navigation"
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#bfdbfe',
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(96,165,250,0.18)',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
              >
                Blog
              </Link>
              <a
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-role-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #7c3aed 100%)',
                }}
              >
                Geliştirici Girişi
                <ArrowRight size={14} />
              </a>
            </nav>
          </motion.div>
        )}
      </header>
    );
  }

  return (
    <header
      className={publicHeaderClassName}
      style={publicHeaderStyle}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
        <div className="flex items-center h-14 lg:h-[84px]">

          {/* Logo */}
          <div style={{ flex: 1 }}>
            <Link href="/" aria-label="Arilla Yazılım" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <span
                ref={brandLogoRef}
                data-brand-logo-target=""
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  opacity: brandIntroActive ? 0 : 1,
                  transition: brandIntroActive ? 'none' : 'opacity 180ms ease',
                }}
              >
                <BrandLockup
                  rotationEnabled={!brandIntroActive}
                  variant={isHomePath && !isHomeTop ? 'surface' : 'default'}
                />
              </span>
            </Link>
          </div>

          {/* Nav links — center */}
          <nav className="hidden lg:flex items-center" style={{ gap: '2px' }}>
            <MegaMenuNav locale={locale} pathname={pathname} />
          </nav>

          {/* CTA + locale switcher + mobile toggle — right */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            {/* Locale switcher */}
            {showLocaleSwitcher && (
              <Link
                href={pathname}
                locale={otherLocale}
                className="hidden lg:inline-flex items-center text-role-metadata"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: '#64748b',
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#7c3aed';
                  e.currentTarget.style.borderColor = '#7c3aed';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {otherLocale.toUpperCase()}
              </Link>
            )}

            <Link
              href="/teklif-al"
              className="hidden lg:inline-flex items-center text-role-button"
              style={{
                gap: '6px',
                padding: '10px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#FFFFFF',
                background: '#7c3aed',
                boxShadow: '0 1px 3px rgba(124,58,237,0.25)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(124,58,237,0.35)';
                const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                if (arrow) arrow.style.transform = 'translateX(3px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 3px rgba(124,58,237,0.25)';
                const arrow = e.currentTarget.querySelector('[data-arrow]') as HTMLElement;
                if (arrow) arrow.style.transform = 'translateX(0)';
              }}
            >
              {t('teklifAl')}{' '}
              <span data-arrow="" style={{ display: 'inline-flex', transition: 'transform 0.2s ease' }}>
                <ArrowRight size={14} />
              </span>
            </Link>

            <button
              className={`flex items-center justify-center lg:hidden ${isHomePath && !isHomeTop ? 'text-slate-700' : 'text-slate-100 md:text-slate-700'}`}
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', padding: '12px', margin: '-12px', cursor: 'pointer' }}
              aria-label={t('menuToggle')}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: '12px',
            right: '12px',
            zIndex: 100,
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            padding: '12px',
            maxHeight: 'calc(100dvh - 72px)',
            overflowY: 'auto',
          }}
          className="lg:hidden top-14 text-slate-100 md:bg-white md:border-slate-200 md:text-slate-900"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <MobileNavAccordion locale={locale} pathname={pathname} onNavigate={() => setIsOpen(false)} />

            {/* Locale switcher in mobile */}
            {showLocaleSwitcher && (
              <Link
                href={pathname}
                locale={otherLocale}
                onClick={() => setIsOpen(false)}
                className="text-role-metadata"
                style={{
                  marginTop: '4px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                {otherLocale.toUpperCase()}
              </Link>
            )}

            <Link
              href="/teklif-al"
              onClick={() => setIsOpen(false)}
              className="text-role-button"
              style={{
                marginTop: '8px',
                padding: '11px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                color: '#FFFFFF',
                background: '#7c3aed',
              }}
            >
              {t('teklifAl')}
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
