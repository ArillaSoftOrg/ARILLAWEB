import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { SOCIAL_LINKS } from '@/lib/constants/company';

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
    // Previously missing the X/Twitter link that the footer already shows —
    // now sourced from the same single list so this can't drift again.
    sameAs: Object.values(SOCIAL_LINKS),
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
