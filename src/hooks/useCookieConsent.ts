'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ConsentRecord,
  ConsentCategories,
  DEFAULT_CONSENT,
  CONSENT_VERSION,
  CONSENT_STORAGE_KEY,
} from '@/lib/cookie-config';

function readFromStorage(): ConsentRecord {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_CONSENT;
    return parsed;
  } catch {
    return DEFAULT_CONSENT;
  }
}

function writeToStorage(record: ConsentRecord): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Unavailable in private browsing or when storage quota is exceeded
  }
}

export function useCookieConsent() {
  const [isMounted, setIsMounted] = useState(false);
  const [consentRecord, setConsentRecord] = useState<ConsentRecord>(DEFAULT_CONSENT);

  useEffect(() => {
    setConsentRecord(readFromStorage());
    setIsMounted(true);
  }, []);

  const acceptAll = useCallback(() => {
    const record: ConsentRecord = {
      hasDecided: true,
      categories: { required: true, functional: true, analytics: true, marketing: true },
      savedAt: Date.now(),
      version: CONSENT_VERSION,
    };
    writeToStorage(record);
    setConsentRecord(record);
  }, []);

  const rejectOptional = useCallback(() => {
    const record: ConsentRecord = {
      hasDecided: true,
      categories: { required: true, functional: false, analytics: false, marketing: false },
      savedAt: Date.now(),
      version: CONSENT_VERSION,
    };
    writeToStorage(record);
    setConsentRecord(record);
  }, []);

  const savePreferences = useCallback((categories: Omit<ConsentCategories, 'required'>) => {
    const record: ConsentRecord = {
      hasDecided: true,
      categories: { required: true, ...categories },
      savedAt: Date.now(),
      version: CONSENT_VERSION,
    };
    writeToStorage(record);
    setConsentRecord(record);
  }, []);

  return { isMounted, consentRecord, acceptAll, rejectOptional, savePreferences };
}
