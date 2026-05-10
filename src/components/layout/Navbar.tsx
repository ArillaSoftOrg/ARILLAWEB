'use client';

import { useState, useEffect, useRef, startTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { NAV_LINKS, type NavItem } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function handleMouseEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  function isItemActive(item: NavItem): boolean {
    if (item.href && pathname === item.href) return true;
    if (item.children) return item.children.some((c) => pathname === c.href);
    return false;
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
                style={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                ARILLA{' '}
                <span className="text-slate-300 md:text-slate-600" style={{ fontWeight: 500 }}>SOFT</span>
              </span>
            </Link>
          </div>

          {/* Nav links — center */}
          <nav
            className="hidden lg:flex items-center"
            style={{ gap: '2px' }}
          >
            {NAV_LINKS.map((item, navIndex) => {
              const active = isItemActive(item);
              const hasChildren = Boolean(item.children?.length);
              const isDropdownOpen = openDropdown === item.label;

              if (hasChildren) {
                return (
                  <div
                    key={`${item.label}-${navIndex}`}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Dropdown trigger */}
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
                      {item.label}
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

                    {/* Dropdown panel */}
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
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.children!.map((child, childIndex) => {
                          // If child has href, render as Link, otherwise as div
                          if (child.href) {
                            return (
                              <Link
                                key={`${child.label}-${childIndex}`}
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
                                {child.label}
                              </Link>
                            );
                          }
                          // If no href, render as div (for parent categories)
                          return (
                            <div
                              key={`${child.label}-${childIndex}`}
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
                              {child.label}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              }

              // Plain link (no children)
              // Only render as Link if item has href
              if (item.href) {
                return (
                  <Link
                    key={`${item.label}-${navIndex}`}
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
                    {item.label}
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

              // If item has no href and no children (shouldn't happen), render empty
              return null;
            })}
          </nav>

          {/* CTA + mobile toggle — right */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
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
              Teklif Al{' '}
              <span data-arrow="" style={{ display: 'inline-flex', transition: 'transform 0.2s ease' }}>
                <ArrowRight size={14} />
              </span>
            </Link>

            <button
              className="flex items-center justify-center lg:hidden text-slate-100 md:text-slate-700"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
              }}
              aria-label="Menüyü aç/kapat"
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
            {NAV_LINKS.map((item, mobileIndex) => {
              const active = isItemActive(item);
              const hasChildren = Boolean(item.children?.length);
              const isExpanded = mobileExpanded === item.label;

              if (hasChildren) {
                return (
                  <div key={`${item.label}-${mobileIndex}`}>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
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
                      {item.label}
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
                        {item.children!.map((child, childMobileIndex) => {
                          // If child has href, render as Link, otherwise as div
                          if (child.href) {
                            return (
                              <Link
                                key={`${child.label}-${childMobileIndex}`}
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
                                {child.label}
                              </Link>
                            );
                          }
                          // If no href, render as div
                          return (
                            <div
                              key={`${child.label}-${childMobileIndex}`}
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
                              {child.label}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Plain link (no children)
              // Only render as Link if item has href
              if (item.href) {
                return (
                  <Link
                    key={`${item.label}-${mobileIndex}`}
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
                    {item.label}
                  </Link>
                );
              }

              // If item has no href and no children (shouldn't happen), render empty
              return null;
            })}

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
              Teklif Al
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
