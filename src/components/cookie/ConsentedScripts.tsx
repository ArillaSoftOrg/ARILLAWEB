'use client';

import { useCookieConsentContext } from './CookieConsentProvider';

export function ConsentedScripts() {
  const { isMounted } = useCookieConsentContext();

  if (!isMounted) return null;

  // Google ad/analytics consent (AdSense, IAB TCF) is owned exclusively by
  // Google's certified CMP — do not gate Google scripts on this app's own
  // consentRecord.categories, and do not reimplement TCF/consent state here.
  // This component is only for non-Google, app-specific third-party scripts
  // that should respect the site's own functional-cookie preference.
  return null;
}
