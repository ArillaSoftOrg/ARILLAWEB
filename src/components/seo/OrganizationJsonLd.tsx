import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { SOCIAL_LINKS, COMPANY_CONTACT } from '@/lib/constants/company';

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
    email: COMPANY_CONTACT.email,
    telephone: COMPANY_CONTACT.phone,
    // City/district/country only — no street address, postal code, or
    // lat/long. The supplied Google location link didn't resolve to a
    // verifiable street address in this environment; do not add
    // streetAddress/postalCode/geo fields until one is confirmed (see
    // src/lib/constants/company.ts).
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Konyaaltı',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    sameAs: Object.values(SOCIAL_LINKS),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: COMPANY_CONTACT.email,
      telephone: COMPANY_CONTACT.phone,
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
