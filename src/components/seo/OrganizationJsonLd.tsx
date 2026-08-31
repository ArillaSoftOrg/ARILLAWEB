import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

interface Props {
  contactUrl?: string;
}

export default function OrganizationJsonLd({ contactUrl = `${SITE_URL}/kurumsal/iletisim` }: Props = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://linkedin.com/company/arillasoft',
      'https://github.com/arillasoft',
      'https://instagram.com/arillasoft',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: contactUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
