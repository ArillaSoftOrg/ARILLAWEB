export const CONSENT_VERSION = 2;
export const CONSENT_STORAGE_KEY = 'cookie-consent';

// Scope: app-specific functional preferences only (session drafts, announcement
// dismissal, chat trigger timing). Google ad/analytics consent (AdSense, IAB TCF)
// is owned exclusively by Google's certified CMP (AdSense > Privacy & messaging)
// and must not be duplicated here — see src/components/cookie/ConsentedScripts.tsx.
export type CategoryId = 'required' | 'functional';
export type StorageType = 'cookie' | 'localStorage' | 'sessionStorage';

export type CookieEntry = {
  name: string;
  domain: string;
  duration: string;
  description: string;
  category: CategoryId;
  type: StorageType;
};

export type CookieCategory = {
  id: CategoryId;
  label: string;
  description: string;
  required: boolean;
};

export type ConsentCategories = {
  required: true;
  functional: boolean;
};

export type ConsentRecord = {
  hasDecided: boolean;
  categories: ConsentCategories;
  savedAt: number;
  version: number;
};

export const DEFAULT_CONSENT: ConsentRecord = {
  hasDecided: false,
  categories: { required: true, functional: false },
  savedAt: 0,
  version: CONSENT_VERSION,
};

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'required',
    label: 'Zorunlu Çerezler',
    description: 'Sitenin temel işlevleri için zorunludur ve devre dışı bırakılamaz.',
    required: true,
  },
  {
    id: 'functional',
    label: 'İşlevsel Çerezler',
    description: 'Form taslakları ve oturum tercihlerinizi hatırlayarak kullanıcı deneyimini iyileştirir.',
    required: false,
  },
];

export const COOKIE_ENTRIES: CookieEntry[] = [
  {
    name: 'admin-auth',
    domain: 'arillasoft.com',
    duration: '8 saat',
    description: 'Yönetim paneli oturum kimlik doğrulaması için kullanılır.',
    category: 'required',
    type: 'cookie',
  },
  {
    name: 'cookie-consent',
    domain: 'Yalnızca bu site',
    duration: 'Kalıcı',
    description: 'Çerez tercihlerinizi ve onay versiyonunu saklar.',
    category: 'required',
    type: 'localStorage',
  },
  {
    name: 'randevuDraft',
    domain: 'Yalnızca bu site',
    duration: 'Oturum süresi',
    description: 'Randevu formundaki seçimlerinizi (hizmet, tarih, saat) sayfa geçişlerinde geçici olarak saklar.',
    category: 'functional',
    type: 'sessionStorage',
  },
  {
    name: 'announcement-dismissed-*',
    domain: 'Yalnızca bu site',
    duration: 'Oturum süresi',
    description: 'Bu oturumda kapattığınız duyuru bildirimlerini tekrar göstermemek için hatırlar.',
    category: 'functional',
    type: 'sessionStorage',
  },
];
