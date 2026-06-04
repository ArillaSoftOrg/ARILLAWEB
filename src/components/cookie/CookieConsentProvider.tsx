'use client';

import React, { createContext, useContext, useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import type { ConsentRecord, ConsentCategories } from '@/lib/cookie-config';

type CookieConsentContextValue = {
  isMounted: boolean;
  consentRecord: ConsentRecord;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (categories: Omit<ConsentCategories, 'required'>) => void;
  preferencesOpen: boolean;
  setPreferencesOpen: (open: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsentContext(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsentContext must be used within CookieConsentProvider');
  return ctx;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const consent = useCookieConsent();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <CookieConsentContext.Provider value={{ ...consent, preferencesOpen, setPreferencesOpen }}>
      {children}
    </CookieConsentContext.Provider>
  );
}
