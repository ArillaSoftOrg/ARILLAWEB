'use client';

import { Link } from '@/i18n/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { EN_CORPORATE_ITEMS, EN_SECTORAL_MENU, EN_SERVICES_MENU } from '@/lib/en-site-data';

/**
 * Mobile nav for the EN-only IA: expandable accordion groups instead of the desktop
 * mega-menu panels, built on the existing (previously unused) shadcn accordion primitive.
 * Rendered only when locale === 'en'; the legacy TR mobile menu in Navbar.tsx is untouched.
 */
export default function MobileNavAccordion({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
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
          {EN_SECTORAL_MENU.label}
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          {EN_SECTORAL_MENU.groups.map((group) => (
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
            <Link href={EN_SECTORAL_MENU.viewAllHref} onClick={onNavigate} style={linkStyle(EN_SECTORAL_MENU.viewAllHref)}>
              {EN_SECTORAL_MENU.viewAllLabel}
            </Link>
            <Link href={EN_SECTORAL_MENU.ctaHref} onClick={onNavigate} style={{ ...linkStyle(EN_SECTORAL_MENU.ctaHref), color: '#a78bfa', fontWeight: 600 }}>
              {EN_SECTORAL_MENU.ctaLabel}
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="services" className="border-b border-white/10">
        <AccordionTrigger className="text-slate-100 hover:text-violet-300 px-3 py-3 text-sm font-medium no-underline hover:no-underline">
          {EN_SERVICES_MENU.label}
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          {EN_SERVICES_MENU.groups.map((group) => (
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
            <Link href={EN_SERVICES_MENU.viewAllHref} onClick={onNavigate} style={linkStyle(EN_SERVICES_MENU.viewAllHref)}>
              {EN_SERVICES_MENU.viewAllLabel}
            </Link>
            <Link href={EN_SERVICES_MENU.secondaryHref} onClick={onNavigate} style={{ ...linkStyle(EN_SERVICES_MENU.secondaryHref), color: '#a78bfa', fontWeight: 600 }}>
              {EN_SERVICES_MENU.secondaryLabel}
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="corporate" className="border-b-0">
        <AccordionTrigger className="text-slate-100 hover:text-violet-300 px-3 py-3 text-sm font-medium no-underline hover:no-underline">
          Corporate
        </AccordionTrigger>
        <AccordionContent className="text-slate-300 pb-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {EN_CORPORATE_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={onNavigate} style={linkStyle(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
