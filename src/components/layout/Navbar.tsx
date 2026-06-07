'use client';

import { useState, useEffect, useRef, startTransition } from 'react';
import { usePathname, Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

type NavChild = {
  labelKey: string;
  href?: string;
  children?: NavChild[];
};

type NavItem = {
  labelKey: string;
  href?: string;
  children?: NavChild[];
};

type NavbarProps = {
  developerLoginOnly?: boolean;
};

export default function Navbar({ developerLoginOnly = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const NAV_ITEMS: NavItem[] = [
    {
      labelKey: 'sektorelYazilimlar',
      children: [
        { labelKey: 'tumSektorelYazilimlar', href: '/sektorel-yazilimlar' },
        { labelKey: 'qrMenu', href: '/sektorel-yazilimlar/qr-menu' },
        { labelKey: 'randevuSistemi', href: '/sektorel-yazilimlar/randevu-sistemi' },
        { labelKey: 'kuaforRandevu', href: '/sektorel-yazilimlar/randevu-sistemi/kuafor-randevu-sistemi' },
        { labelKey: 'klinikRandevu', href: '/sektorel-yazilimlar/randevu-sistemi/klinik-randevu-sistemi' },
        { labelKey: 'guzellikRandevu', href: '/sektorel-yazilimlar/randevu-sistemi/guzellik-merkezi-randevu-sistemi' },
      ],
    },
    {
      labelKey: 'hizmetler',
      children: [
        { labelKey: 'tumHizmetler', href: '/hizmetler' },
      ],
    },
    {
      labelKey: 'kurumsal',
      children: [
        { labelKey: 'hakkimizda', href: '/kurumsal/hakkimizda' },
        { labelKey: 'blog', href: '/kurumsal/blog' },
        { labelKey: 'kariyer', href: '/kurumsal/kariyer' },
        { labelKey: 'iletisim', href: '/kurumsal/iletisim' },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setIsOpen(false);
      setMobileExpanded(null);
    });
  }, [pathname]);

  function handleMouseEnter(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function isItemActive(item: NavItem): boolean {
    if (item.href && pathname === item.href) return true;
    if (item.children) return item.children.some((c) => pathname === c.href);
    return false;
  }

  const otherLocale = locale === 'tr' ? 'en' : 'tr';

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
          <div className="flex items-center justify-between h-14 lg:h-[92px]">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
              <img
                src="/logoarilla.png"
                alt="Arilla Soft"
                className="h-10 lg:h-[56px] w-auto flex-shrink-0"
              />
              <span
                className="text-[15px] tracking-[0.20em] lg:text-[22px] lg:tracking-[0.18em] text-white md:text-slate-900"
                style={{ fontWeight: 700, textTransform: 'uppercase', userSelect: 'none' }}
              >
                ARILLA{' '}
                <span className="text-slate-300 md:text-slate-600" style={{ fontWeight: 500 }}>SOFT</span>
              </span>
            </Link>

            {/* Desktop: Blog + Dev Login buttons */}
            <div className="hidden lg:flex items-center" style={{ gap: '10px' }}>
              <Link
                href="/kurumsal/blog"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
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
                className="inline-flex items-center"
                style={{
                  gap: '6px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
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
              style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer' }}
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
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link
                href="/kurumsal/blog"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 500,
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
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
      className="bg-slate-900 md:bg-white"
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
        <div className="flex items-center h-14 lg:h-[92px]">

          {/* Logo */}
          <div style={{ flex: 1 }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
              <img
                src="/logoarilla.png"
                alt="Arilla Soft"
                className="h-10 lg:h-[56px] w-auto flex-shrink-0"
              />
              <span
                className="text-[15px] tracking-[0.20em] lg:text-[22px] lg:tracking-[0.18em] text-white md:text-slate-900"
                style={{ fontWeight: 700, textTransform: 'uppercase', userSelect: 'none' }}
              >
                ARILLA{' '}
                <span className="text-slate-300 md:text-slate-600" style={{ fontWeight: 500 }}>SOFT</span>
              </span>
            </Link>
          </div>

          {/* Nav links — center */}
          <nav className="hidden lg:flex items-center" style={{ gap: '2px' }}>
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              const hasChildren = Boolean(item.children?.length);
              const isDropdownOpen = openDropdown === item.labelKey;

              if (hasChildren) {
                return (
                  <div
                    key={item.labelKey}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => handleMouseEnter(item.labelKey)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '8px 14px',
                        paddingBottom: '10px',
                        borderRadius: '7px',
                        fontSize: '15px',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#7c3aed' : isDropdownOpen ? '#7c3aed' : '#334155',
                        background: active ? 'rgba(124,58,237,0.06)' : isDropdownOpen ? 'rgba(124,58,237,0.10)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease, background 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {t(item.labelKey)}
                      <ChevronDown
                        size={14}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: active ? '#7c3aed' : isDropdownOpen ? '#7c3aed' : '#64748B',
                        }}
                      />
                      {active && (
                        <motion.span
                          layoutId="active-underline"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          style={{
                            position: 'absolute',
                            bottom: '4px',
                            left: '14px',
                            right: '14px',
                            height: '2px',
                            borderRadius: '1px',
                            background: '#7c3aed',
                          }}
                        />
                      )}
                    </button>

                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          minWidth: '220px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: '12px',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                          padding: '6px',
                          zIndex: 200,
                        }}
                        onMouseEnter={() => handleMouseEnter(item.labelKey)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.children!.map((child) => {
                          if (child.href) {
                            return (
                              <Link
                                key={child.labelKey}
                                href={child.href}
                                style={{
                                  display: 'block',
                                  padding: '9px 14px',
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  fontWeight: pathname === child.href ? 600 : 400,
                                  color: pathname === child.href ? '#7c3aed' : '#334155',
                                  background: pathname === child.href ? 'rgba(124,58,237,0.08)' : 'transparent',
                                  textDecoration: 'none',
                                  transition: 'background 0.15s ease, color 0.15s ease',
                                  whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                  if (pathname !== child.href) {
                                    e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                                    e.currentTarget.style.color = '#7c3aed';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (pathname !== child.href) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#334155';
                                  }
                                }}
                              >
                                {t(child.labelKey)}
                              </Link>
                            );
                          }
                          return (
                            <div
                              key={child.labelKey}
                              style={{
                                display: 'block',
                                padding: '9px 14px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#334155',
                                background: 'transparent',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {t(child.labelKey)}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              }

              if (item.href) {
                return (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    style={{
                      position: 'relative',
                      padding: '8px 14px',
                      paddingBottom: '10px',
                      borderRadius: '7px',
                      fontSize: '15px',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#7c3aed' : '#334155',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      whiteSpace: 'nowrap',
                      background: active ? 'rgba(124,58,237,0.06)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = '#7c3aed';
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = '#334155';
                    }}
                  >
                    {t(item.labelKey)}
                    {active && (
                      <motion.span
                        layoutId="active-underline"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '14px',
                          right: '14px',
                          height: '2px',
                          borderRadius: '1px',
                          background: '#7c3aed',
                        }}
                      />
                    )}
                  </Link>
                );
              }

              return null;
            })}
          </nav>

          {/* CTA + locale switcher + mobile toggle — right */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            {/* Locale switcher */}
            <Link
              href={pathname}
              locale={otherLocale}
              className="hidden lg:inline-flex items-center"
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
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

            <Link
              href="/teklif-al"
              className="hidden lg:inline-flex items-center"
              style={{
                gap: '6px',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
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
              className="flex items-center justify-center lg:hidden text-slate-100 md:text-slate-700"
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer' }}
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
          }}
          className="lg:hidden top-14 text-slate-100 md:bg-white md:border-slate-200 md:text-slate-900"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = mobileExpanded === item.labelKey;

              if (hasChildren) {
                return (
                  <div key={item.labelKey}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.labelKey)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: active ? 600 : 500,
                        color: active ? '#a78bfa' : '#cbd5e1',
                        background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {t(item.labelKey)}
                      <ChevronDown
                        size={15}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          color: active ? '#a78bfa' : '#cbd5e1',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {isExpanded && (
                      <div style={{ paddingLeft: '12px', paddingBottom: '4px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {item.children!.map((child) => {
                          if (child.href) {
                            return (
                              <Link
                                key={child.labelKey}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                style={{
                                  display: 'block',
                                  padding: '8px 14px',
                                  borderRadius: '7px',
                                  fontSize: '14px',
                                  fontWeight: pathname === child.href ? 600 : 400,
                                  color: pathname === child.href ? '#a78bfa' : '#cbd5e1',
                                  background: pathname === child.href ? 'rgba(124,58,237,0.15)' : 'transparent',
                                  textDecoration: 'none',
                                }}
                              >
                                {t(child.labelKey)}
                              </Link>
                            );
                          }
                          return (
                            <div
                              key={child.labelKey}
                              style={{
                                display: 'block',
                                padding: '8px 14px',
                                borderRadius: '7px',
                                fontSize: '14px',
                                fontWeight: 400,
                                color: '#cbd5e1',
                                background: 'transparent',
                              }}
                            >
                              {t(child.labelKey)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (item.href) {
                return (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#a78bfa' : '#cbd5e1',
                      background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              }

              return null;
            })}

            {/* Locale switcher in mobile */}
            <Link
              href={pathname}
              locale={otherLocale}
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '4px',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
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

            <Link
              href="/teklif-al"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '8px',
                padding: '11px 20px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '15px',
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
