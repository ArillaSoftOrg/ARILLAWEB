import { SITE_URL } from '@/lib/constants';

interface Props {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string;
}

export default function ServiceJsonLd({ name, description, url, serviceType, areaServed }: Props) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'ArillaSoft',
      url: SITE_URL,
    },
  };

  if (serviceType) schema.serviceType = serviceType;
  if (areaServed) schema.areaServed = areaServed;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
