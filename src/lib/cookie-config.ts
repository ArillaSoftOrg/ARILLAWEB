export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'cookie-consent';

export type CategoryId = 'required' | 'functional' | 'analytics' | 'marketing';
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
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = {
  hasDecided: boolean;
  categories: ConsentCategories;
  savedAt: number;
  version: number;
};

export const DEFAULT_CONSENT: ConsentRecord = {
  hasDecided: false,
  categories: { required: true, functional: false, analytics: false, marketing: false },
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
  {
    id: 'analytics',
    label: 'Analitik Çerezler',
    description: 'Siteyi nasıl kullandığınızı anlamamızı sağlar. Toplanan veriler anonim tutulur.',
    required: false,
  },
  {
    id: 'marketing',
    label: 'Pazarlama Çerezleri',
    description: 'İlgi alanlarınıza uygun içerik ve reklamlar sunmak için kullanılır.',
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
