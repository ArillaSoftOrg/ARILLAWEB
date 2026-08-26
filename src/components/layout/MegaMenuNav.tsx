'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CORPORATE_LINKS, getSectoralMenu, getServicesMenu, type Locale } from '@/lib/en-site-data';

type MenuKey = 'sectoral' | 'services' | 'corporate';

type NavGroup = { heading: string; items: { label: string; href: string }[] };

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => pathname === item.href);
}

/**
 * Desktop navigation shared by both locales: two data-driven mega menus (Sectoral
 * Software, Services) plus a flat Corporate dropdown, all driven by `locale`. This
 * replaced the old TR-only flat-dropdown NAV_ITEMS render path in Navbar.tsx.
 */
export default function MegaMenuNav({ locale, pathname }: { locale: Locale; pathname: string }) {
  const tNav = useTranslations('nav');
  const [open, setOpen] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const sectoralMenu = getSectoralMenu(locale);
  const servicesMenu = getServicesMenu(locale);
  const corporateLabel = tNav('kurumsal');

  function openMenu(key: MenuKey) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  function closeNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(null);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(null);
    }
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const triggerStyle = (key: MenuKey, active: boolean) => ({
    position: 'relative' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 14px',
    paddingBottom: '10px',
    borderRadius: '7px',
    color: active || open === key ? '#7c3aed' : '#334155',
    background: active ? 'rgba(124,58,237,0.06)' : open === key ? 'rgba(124,58,237,0.10)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease, background 0.2s ease',
    whiteSpace: 'nowrap' as const,
  });

  const corporateHrefs = CORPORATE_LINKS.map((item) => item.href);
  const sectoralActive = sectoralMenu.groups.some((group) => isGroupActive(group, pathname));
  const servicesActive =
    servicesMenu.groups.some((group) => isGroupActive(group, pathname)) || pathname === servicesMenu.secondaryHref;
  const corporateActive = corporateHrefs.some((href) => pathname === href);

  return (
    <div ref={rootRef} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {/* Sectoral Software */}
      <div style={{ position: 'relative' }} onMouseEnter={() => openMenu('sectoral')} onMouseLeave={scheduleClose}>
        <button
          type="button"
          className="text-role-navigation"
          style={triggerStyle('sectoral', sectoralActive)}
          aria-haspopup="true"
          aria-expanded={open === 'sectoral'}
          onClick={() => setOpen(open === 'sectoral' ? null : 'sectoral')}
        >
          {sectoralMenu.label}
          <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: open === 'sectoral' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {open === 'sectoral' && (
          <MegaPanel
            groups={sectoralMenu.groups}
            pathname={pathname}
            columns={3}
            onMouseEnter={() => openMenu('sectoral')}
            onMouseLeave={scheduleClose}
            footer={
              <>
                <Link href={sectoralMenu.viewAllHref} onClick={closeNow} style={footerLinkStyle}>
                  {sectoralMenu.viewAllLabel}
                </Link>
                <Link href={sectoralMenu.ctaHref} onClick={closeNow} style={{ ...footerLinkStyle, color: '#7c3aed', fontWeight: 600 }}>
                  {sectoralMenu.ctaLabel}
                </Link>
              </>
            }
          />
        )}
      </div>

      {/* Services */}
      <div style={{ position: 'relative' }} onMouseEnter={() => openMenu('services')} onMouseLeave={scheduleClose}>
        <button
          type="button"
          className="text-role-navigation"
          style={triggerStyle('services', servicesActive)}
          aria-haspopup="true"
          aria-expanded={open === 'services'}
          onClick={() => setOpen(open === 'services' ? null : 'services')}
        >
          {servicesMenu.label}
          <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: open === 'services' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {open === 'services' && (
          <MegaPanel
            groups={servicesMenu.groups}
            pathname={pathname}
            columns={2}
            onMouseEnter={() => openMenu('services')}
            onMouseLeave={scheduleClose}
            footer={
              <>
                <Link href={servicesMenu.viewAllHref} onClick={closeNow} style={footerLinkStyle}>
                  {servicesMenu.viewAllLabel}
                </Link>
                <Link href={servicesMenu.secondaryHref} onClick={closeNow} style={{ ...footerLinkStyle, color: '#7c3aed', fontWeight: 600 }}>
                  {servicesMenu.secondaryLabel}
                </Link>
              </>
            }
          />
        )}
      </div>

      {/* Corporate — flat dropdown, content unchanged from the legacy pattern */}
      <div style={{ position: 'relative' }} onMouseEnter={() => openMenu('corporate')} onMouseLeave={scheduleClose}>
        <button
          type="button"
          className="text-role-navigation"
          style={triggerStyle('corporate', corporateActive)}
          aria-haspopup="true"
          aria-expanded={open === 'corporate'}
          onClick={() => setOpen(open === 'corporate' ? null : 'corporate')}
        >
          {corporateLabel}
          <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: open === 'corporate' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
        {open === 'corporate' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              minWidth: '200px',
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '12px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              padding: '6px',
              zIndex: 200,
            }}
            onMouseEnter={() => openMenu('corporate')}
            onMouseLeave={scheduleClose}
          >
            {CORPORATE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNow}
                className="text-role-navigation"
                style={{
                  display: 'block',
                  padding: '9px 14px',
                  borderRadius: '8px',
                  color: pathname === item.href ? '#7c3aed' : '#334155',
                  background: pathname === item.href ? 'rgba(124,58,237,0.08)' : 'transparent',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {tNav(item.navKey)}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const footerLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '10px 14px',
  borderRadius: '8px',
  color: '#475569',
  textDecoration: 'none',
  fontSize: '13px',
  whiteSpace: 'nowrap',
};

function MegaPanel({
  groups,
  pathname,
  columns,
  footer,
  onMouseEnter,
  onMouseLeave,
}: {
  groups: NavGroup[];
  pathname: string;
  columns: 2 | 3;
  footer: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      role="menu"
      style={{
        position: 'absolute',
        top: 'calc(100% + 4px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `min(${columns === 3 ? '900px' : '620px'}, calc(100vw - 32px))`,
        maxWidth: 'calc(100vw - 32px)',
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(15,23,42,0.14)',
        padding: '20px',
        zIndex: 200,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '24px',
        }}
      >
        {groups.map((group) => (
          <div key={group.heading}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                margin: '0 0 8px 4px',
              }}
            >
              {group.heading}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-role-navigation"
                  style={{
                    display: 'block',
                    padding: '8px',
                    borderRadius: '8px',
                    color: pathname === item.href ? '#7c3aed' : '#334155',
                    background: pathname === item.href ? 'rgba(124,58,237,0.08)' : 'transparent',
                    textDecoration: 'none',
                    fontSize: '13.5px',
                    lineHeight: 1.4,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          justifyContent: 'space-between',
        }}
      >
        {footer}
      </div>
    </motion.div>
  );
}
