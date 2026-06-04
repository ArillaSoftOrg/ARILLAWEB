'use client';

import { useCookieConsentContext } from './CookieConsentProvider';

export function ConsentedScripts() {
  const { isMounted } = useCookieConsentContext();

  if (!isMounted) return null;

  // No third-party scripts are configured yet.
  // When adding analytics or marketing scripts, read consentRecord.categories here
  // and render <Script> tags conditionally, e.g.:
  //   const { analytics, marketing } = consentRecord.categories;
  //   {analytics && <Script src="..." strategy="afterInteractive" />}
  return null;
}
