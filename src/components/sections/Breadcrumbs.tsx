import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        paddingTop: '96px',
        paddingBottom: '8px',
        background: 'transparent',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 xl:px-14">
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '4px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={`${item.label}-${item.href || ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {index > 0 && (
                  <ChevronRight
                    size={13}
                    aria-hidden="true"
                    style={{ color: '#94a3b8', flexShrink: 0 }}
                  />
                )}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    style={{
                      fontSize: '13px',
                      fontWeight: isLast ? 500 : 400,
                      color: isLast ? '#334155' : '#64748b',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:underline hover:text-blue-700"
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#2563eb',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
