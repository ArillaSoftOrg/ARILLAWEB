import { SITE_URL } from '@/lib/constants';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

function toAbsoluteUrl(path: string) {
  const normalizedPath = /^\/(tr|en)(\/|$)/.test(path) ? path : `/tr${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export default function BreadcrumbJsonLd({ items }: Props) {
  const listItems = items
    .filter((item, index) => item.href || index === items.length - 1)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? toAbsoluteUrl(item.href) : undefined,
    }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
