'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CORPORATE_LINKS, getSectoralMenu, getServicesMenu, type Locale } from '@/lib/en-site-data';

/**
 * Mobile nav shared by both locales: expandable accordion groups instead of the
 * desktop mega-menu panels, built on the shadcn accordion primitive, driven by `locale`.
 */
export default function MobileNavAccordion({
  locale,
  pathname,
  onNavigate,
}: {
  locale: Locale;
  pathname: string;
  onNavigate: () => void;
}) {
  const tNav = useTranslations('nav');
  const sectoralMenu = getSectoralMenu(locale);
  const servicesMenu = getServicesMenu(locale);

  const linkStyle = (href: string): React.CSSProperties => ({
    display: 'block',
    padding: '8px 14px',
    borderRadius: '7px',
    color: pathname === href ? '#a78bfa' : '#cbd5e1',
    background: pathname === href ? 'rgba(124,58,237,0.15)' : 'transparent',
    textDecoration: 'none',
    fontSize: '14px',
  });

  const groupHeadingStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#64748b',
    margin: '10px 0 4px 14px',
  };

  return (
    <Accordion type="single" collapsible className="border-none">
      <AccordionItem value="sectoral" className="border-b border-white/10">
        <AccordionTrigger className="text-slate-100 hover:text-violet-300 px-3 py-3 text-sm font-medium no-underline hover:no-underline">
          {sectoralMenu.label}
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          {sectoralMenu.groups.map((group) => (
            <div key={group.heading}>
              <p style={groupHeadingStyle}>{group.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onNavigate} style={linkStyle(item.href)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href={sectoralMenu.viewAllHref} onClick={onNavigate} style={linkStyle(sectoralMenu.viewAllHref)}>
              {sectoralMenu.viewAllLabel}
            </Link>
            <Link href={sectoralMenu.ctaHref} onClick={onNavigate} style={{ ...linkStyle(sectoralMenu.ctaHref), color: '#a78bfa', fontWeight: 600 }}>
              {sectoralMenu.ctaLabel}
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="services" className="border-b border-white/10">
        <AccordionTrigger className="text-slate-100 hover:text-violet-300 px-3 py-3 text-sm font-medium no-underline hover:no-underline">
          {servicesMenu.label}
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          {servicesMenu.groups.map((group) => (
            <div key={group.heading}>
              <p style={groupHeadingStyle}>{group.heading}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onNavigate} style={linkStyle(item.href)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link href={servicesMenu.viewAllHref} onClick={onNavigate} style={linkStyle(servicesMenu.viewAllHref)}>
              {servicesMenu.viewAllLabel}
            </Link>
            <Link href={servicesMenu.secondaryHref} onClick={onNavigate} style={{ ...linkStyle(servicesMenu.secondaryHref), color: '#a78bfa', fontWeight: 600 }}>
              {servicesMenu.secondaryLabel}
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="corporate" className="border-b-0">
        <AccordionTrigger className="text-slate-100 hover:text-violet-300 px-3 py-3 text-sm font-medium no-underline hover:no-underline">
          {tNav('kurumsal')}
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {CORPORATE_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={onNavigate} style={linkStyle(item.href)}>
                {tNav(item.navKey)}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
