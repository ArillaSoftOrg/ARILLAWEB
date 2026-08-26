// Shared, locale-driven data source for the "Sectoral Software" / "Services" IA.
// Originally English-only; now bilingual (en/tr) so the same components render both
// /en/services + /en/sectoral-software and their /tr/hizmetler + /tr/sektorel-yazilimlar
// mirrors without duplicating any component or page.

export type Locale = 'en' | 'tr';

export interface LocalizedText {
  en: string;
  tr: string;
}

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export type SolutionKey =
  | 'website'
  | 'appointment'
  | 'management-panel'
  | 'crm'
  | 'mobile-app'
  | 'automation';

export const SOLUTION_LABELS: Record<SolutionKey, LocalizedText> = {
  website: { en: 'Website', tr: 'Web Sitesi' },
  appointment: { en: 'Appointment System', tr: 'Randevu Sistemi' },
  'management-panel': { en: 'Management Panel', tr: 'Yönetim Paneli' },
  crm: { en: 'CRM / Customer Tracking', tr: 'CRM / Müşteri Takibi' },
  'mobile-app': { en: 'Mobile Application', tr: 'Mobil Uygulama' },
  automation: { en: 'Automation / Integrations', tr: 'Otomasyon / Entegrasyonlar' },
};

export const SOLUTION_DESCRIPTIONS: Record<SolutionKey, LocalizedText> = {
  website: {
    en: 'A fast, professional website that represents your business online.',
    tr: 'İşletmenizi online ortamda temsil eden hızlı, profesyonel bir web sitesi.',
  },
  appointment: {
    en: 'Customers book time slots online, with confirmations and reminders handled automatically.',
    tr: 'Müşterileriniz online randevu alır; onay ve hatırlatmalar otomatik olarak yönetilir.',
  },
  'management-panel': {
    en: 'A back-office panel to manage staff, services, and day-to-day operations.',
    tr: 'Personel, hizmet ve günlük operasyonları yönetebileceğiniz bir yönetim paneli.',
  },
  crm: {
    en: 'Track customers, history, and follow-ups in one place.',
    tr: 'Müşterilerinizi, geçmişlerini ve takip süreçlerini tek bir yerden yönetin.',
  },
  'mobile-app': {
    en: 'A dedicated mobile app for customers or staff.',
    tr: 'Müşterileriniz veya çalışanlarınız için özel bir mobil uygulama.',
  },
  automation: {
    en: 'Connect your existing tools and automate repetitive manual work.',
    tr: 'Kullandığınız araçları birbirine bağlayın, tekrarlayan manuel işleri otomatikleştirin.',
  },
};

export type ServiceSlug =
  | 'website-web-application'
  | 'mobile-application'
  | 'game-development'
  | 'custom-software-admin-panels'
  | 'integrations-automation'
  | 'maintenance-technical-support';

export type ServiceGroup = 'digital-products' | 'software-solutions';

export interface ServiceMeta {
  /** Canonical id, also the EN URL slug under /services/[slug]. */
  slug: ServiceSlug;
  /** TR URL slug under /hizmetler/[trSlug]. */
  trSlug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  group: ServiceGroup;
}

export const SERVICES: ServiceMeta[] = [
  {
    slug: 'website-web-application',
    trSlug: 'web-sitesi-web-uygulama',
    title: { en: 'Website & Web Application', tr: 'Web Sitesi & Web Uygulama' },
    shortDescription: {
      en: 'Marketing sites, customer portals, and full web applications.',
      tr: 'Kurumsal siteler, müşteri portalları ve uçtan uca web uygulamaları.',
    },
    group: 'digital-products',
  },
  {
    slug: 'mobile-application',
    trSlug: 'mobil-uygulama',
    title: { en: 'Mobile Application', tr: 'Mobil Uygulama' },
    shortDescription: {
      en: 'Native and cross-platform apps for iOS and Android.',
      tr: 'iOS ve Android için native ve çoklu platform mobil uygulamalar.',
    },
    group: 'digital-products',
  },
  {
    slug: 'game-development',
    trSlug: 'oyun-gelistirme',
    title: { en: 'Game Development', tr: 'Oyun Geliştirme' },
    shortDescription: {
      en: '2D and 3D games and interactive experiences for web and mobile.',
      tr: 'Web ve mobil için 2D/3D oyunlar ve etkileşimli deneyimler.',
    },
    group: 'digital-products',
  },
  {
    slug: 'custom-software-admin-panels',
    trSlug: 'ozel-yazilim-yonetim-panelleri',
    title: { en: 'Custom Software & Admin Panels', tr: 'Özel Yazılım & Yönetim Panelleri' },
    shortDescription: {
      en: 'Bespoke back-office tools and management dashboards.',
      tr: 'İşletmenize özel arka ofis araçları ve yönetim panelleri.',
    },
    group: 'software-solutions',
  },
  {
    slug: 'integrations-automation',
    trSlug: 'entegrasyon-otomasyon',
    title: { en: 'Integrations & Automation', tr: 'Entegrasyon & Otomasyon' },
    shortDescription: {
      en: 'Connect your tools and automate manual workflows.',
      tr: 'Araçlarınızı birbirine bağlayın, manuel iş akışlarını otomatikleştirin.',
    },
    group: 'software-solutions',
  },
  {
    slug: 'maintenance-technical-support',
    trSlug: 'bakim-teknik-destek',
    title: { en: 'Maintenance & Technical Support', tr: 'Bakım & Teknik Destek' },
    shortDescription: {
      en: 'Ongoing updates, monitoring, and support for existing software.',
      tr: 'Mevcut yazılımlarınız için sürekli güncelleme, izleme ve destek.',
    },
    group: 'software-solutions',
  },
];

export const SERVICE_GROUPS: { key: ServiceGroup; label: LocalizedText }[] = [
  { key: 'digital-products', label: { en: 'Digital Products', tr: 'Dijital Ürünler' } },
  { key: 'software-solutions', label: { en: 'Software Solutions', tr: 'Yazılım Çözümleri' } },
];

export function getServiceMeta(slug: ServiceSlug): ServiceMeta {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}

/** Looks a service up by its URL slug in the given locale (EN slug or TR slug). */
export function getServiceMetaByUrlSlug(urlSlug: string, locale: Locale): ServiceMeta | undefined {
  return SERVICES.find((item) => (locale === 'en' ? item.slug === urlSlug : item.trSlug === urlSlug));
}

export type IndustryGroup = 'beauty' | 'healthcare' | 'other';

export interface IndustryMeta {
  /** Canonical id, also the EN URL slug under /sectoral-software/[slug]. */
  slug: string;
  /** TR URL slug under /sektorel-yazilimlar/[trSlug]. */
  trSlug: string;
  title: LocalizedText;
  group: IndustryGroup;
  summary: LocalizedText;
  applicableSolutions: SolutionKey[];
  relatedServiceSlugs: ServiceSlug[];
  /** ProjectCategory.slug in the existing catalog data, when a real design-example mapping exists. */
  catalogSectorSlug?: string;
}

export const INDUSTRY_GROUPS: { key: IndustryGroup; label: LocalizedText }[] = [
  { key: 'beauty', label: { en: 'Beauty & Personal Care', tr: 'Güzellik & Kişisel Bakım' } },
  { key: 'healthcare', label: { en: 'Healthcare', tr: 'Sağlık' } },
  { key: 'other', label: { en: 'Other Industries', tr: 'Diğer Sektörler' } },
];

export const INDUSTRIES: IndustryMeta[] = [
  {
    slug: 'hair-salon-barber',
    trSlug: 'kuafor-berber',
    title: { en: 'Hair Salon & Barber', tr: 'Kuaför & Berber' },
    group: 'beauty',
    summary: {
      en: 'Booking, client history, and a professional online presence for hair salons and barbershops.',
      tr: 'Kuaför ve berber salonları için randevu, müşteri geçmişi ve profesyonel bir online varlık.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'kuafor-berber',
  },
  {
    slug: 'beauty-center',
    trSlug: 'guzellik-merkezi',
    title: { en: 'Beauty Center', tr: 'Güzellik Merkezi' },
    group: 'beauty',
    summary: {
      en: 'Service menus, staff scheduling, and customer retention tools for beauty centers.',
      tr: 'Güzellik merkezleri için hizmet menüleri, personel planlama ve müşteri sadakati araçları.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'guzellik-bakim-merkezi',
  },
  {
    slug: 'spa-wellness',
    trSlug: 'spa-wellness',
    title: { en: 'Spa & Wellness', tr: 'Spa & Wellness' },
    group: 'beauty',
    summary: {
      en: 'Online booking and membership tracking for spas and wellness studios.',
      tr: 'Spa ve wellness merkezleri için online randevu ve üyelik takibi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
  },
  {
    slug: 'clinic',
    trSlug: 'klinik',
    title: { en: 'Clinic', tr: 'Klinik' },
    group: 'healthcare',
    summary: {
      en: 'Patient scheduling, records access, and a professional web presence for clinics.',
      tr: 'Klinikler için hasta randevusu, kayıtlara erişim ve profesyonel bir web varlığı.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
  },
  {
    slug: 'dental-clinic',
    trSlug: 'dis-klinigi',
    title: { en: 'Dental Clinic', tr: 'Diş Kliniği' },
    group: 'healthcare',
    summary: {
      en: 'Appointment booking, patient management, and treatment tracking for dental practices.',
      tr: 'Diş klinikleri için randevu, hasta yönetimi ve tedavi takibi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'dis-klinigi-ozel-klinik',
  },
  {
    slug: 'psychologist-consultant',
    trSlug: 'psikolog-danisman',
    title: { en: 'Psychologist / Consultant', tr: 'Psikolog / Danışman' },
    group: 'healthcare',
    summary: {
      en: 'A professional website and simple session scheduling for independent practitioners.',
      tr: 'Bağımsız çalışan uzmanlar için profesyonel bir web sitesi ve basit seans planlama.',
    },
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application'],
  },
  {
    slug: 'dietitian',
    trSlug: 'diyetisyen',
    title: { en: 'Dietitian', tr: 'Diyetisyen' },
    group: 'healthcare',
    summary: {
      en: 'Booking, client progress tracking, and plan delivery for dietitians and nutrition coaches.',
      tr: 'Diyetisyenler ve beslenme koçları için randevu, danışan takibi ve plan teslimi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
  },
  {
    slug: 'restaurant-cafe',
    trSlug: 'restoran-kafe',
    title: { en: 'Restaurant & Cafe', tr: 'Restoran & Kafe' },
    group: 'other',
    summary: {
      en: 'Digital menus, ordering, and operations tools for restaurants and cafes.',
      tr: 'Restoran ve kafeler için dijital menü, sipariş ve operasyon araçları.',
    },
    applicableSolutions: ['website', 'mobile-app', 'management-panel', 'automation'],
    relatedServiceSlugs: ['mobile-application', 'integrations-automation'],
    catalogSectorSlug: 'restoran-kafe',
  },
  {
    slug: 'hotel-hospitality',
    trSlug: 'otel-konaklama',
    title: { en: 'Hotel & Hospitality', tr: 'Otel & Konaklama' },
    group: 'other',
    summary: {
      en: 'Booking, guest management, and property operations software for hospitality businesses.',
      tr: 'Konaklama işletmeleri için rezervasyon, misafir yönetimi ve tesis operasyon yazılımı.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
  {
    slug: 'veterinary-pet-services',
    trSlug: 'veteriner-pet-hizmetleri',
    title: { en: 'Veterinary & Pet Services', tr: 'Veteriner & Pet Hizmetleri' },
    group: 'other',
    summary: {
      en: 'Appointment scheduling and client/pet record management for veterinary practices and pet services.',
      tr: 'Veteriner klinikleri ve pet hizmetleri için randevu ve müşteri/pet kayıt yönetimi.',
    },
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'pet-kuaforu-pet-hizmetleri',
  },
  {
    slug: 'real-estate',
    trSlug: 'emlak',
    title: { en: 'Real Estate', tr: 'Emlak' },
    group: 'other',
    summary: {
      en: 'Listing websites, lead tracking, and CRM automation for real estate agencies and agents.',
      tr: 'Emlak ofisleri ve danışmanları için ilan siteleri, lead takibi ve CRM otomasyonu.',
    },
    applicableSolutions: ['website', 'crm', 'mobile-app', 'automation'],
    relatedServiceSlugs: ['website-web-application', 'integrations-automation'],
    catalogSectorSlug: 'emlak-danismanligi',
  },
  {
    slug: 'education-courses',
    trSlug: 'egitim-kurslar',
    title: { en: 'Education & Courses', tr: 'Eğitim & Kurslar' },
    group: 'other',
    summary: {
      en: 'Course catalogs, student management, and enrollment automation for schools and course providers.',
      tr: 'Okul ve kurs sağlayıcıları için kurs katalogları, öğrenci yönetimi ve kayıt otomasyonu.',
    },
    applicableSolutions: ['website', 'management-panel', 'crm', 'automation'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
  {
    slug: 'sports-fitness',
    trSlug: 'spor-fitness',
    title: { en: 'Sports & Fitness', tr: 'Spor & Fitness' },
    group: 'other',
    summary: {
      en: 'Class scheduling, membership management, and a mobile-friendly booking experience for gyms and studios.',
      tr: 'Spor salonları ve stüdyolar için ders planlama, üyelik yönetimi ve mobil uyumlu randevu deneyimi.',
    },
    applicableSolutions: ['website', 'appointment', 'mobile-app', 'crm'],
    relatedServiceSlugs: ['mobile-application', 'website-web-application'],
  },
  {
    slug: 'automotive',
    trSlug: 'otomotiv',
    title: { en: 'Automotive', tr: 'Otomotiv' },
    group: 'other',
    summary: {
      en: 'Service booking, customer records, and workshop management for automotive service businesses.',
      tr: 'Oto servis işletmeleri için randevu, müşteri kayıtları ve atölye yönetimi.',
    },
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
    catalogSectorSlug: 'otomotiv-servisi-arac-bakim',
  },
  {
    slug: 'retail',
    trSlug: 'perakende',
    title: { en: 'Retail', tr: 'Perakende' },
    group: 'other',
    summary: {
      en: 'Inventory-aware storefronts and back-office tools for retail businesses.',
      tr: 'Perakende işletmeleri için stok bilgili vitrin siteleri ve arka ofis araçları.',
    },
    applicableSolutions: ['website', 'management-panel', 'automation', 'mobile-app'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
];

export function getIndustryMeta(slug: string): IndustryMeta | undefined {
  return INDUSTRIES.find((item) => item.slug === slug);
}

/** Looks an industry up by its URL slug in the given locale (EN slug or TR slug). */
export function getIndustryMetaByUrlSlug(urlSlug: string, locale: Locale): IndustryMeta | undefined {
  return INDUSTRIES.find((item) => (locale === 'en' ? item.slug === urlSlug : item.trSlug === urlSlug));
}

export function getServicesForIndustry(industry: IndustryMeta): ServiceMeta[] {
  return industry.relatedServiceSlugs.map((slug) => getServiceMeta(slug));
}

export function getIndustriesForService(serviceSlug: ServiceSlug): IndustryMeta[] {
  return INDUSTRIES.filter((industry) => industry.relatedServiceSlugs.includes(serviceSlug));
}

// --- Locale-aware href builders -------------------------------------------------
// Route segments differ by locale (EN uses English segment names, TR reuses the
// site's existing Turkish segment names), so every internal link must be built
// through these helpers rather than a hardcoded path.

export function servicesHubHref(locale: Locale): string {
  return locale === 'en' ? '/services' : '/hizmetler';
}

export function serviceHref(locale: Locale, service: ServiceMeta): string {
  return locale === 'en' ? `/services/${service.slug}` : `/hizmetler/${service.trSlug}`;
}

export function industriesHubHref(locale: Locale): string {
  return locale === 'en' ? '/sectoral-software' : '/sektorel-yazilimlar';
}

export function industryHref(locale: Locale, industry: IndustryMeta): string {
  return locale === 'en' ? `/sectoral-software/${industry.slug}` : `/sektorel-yazilimlar/${industry.trSlug}`;
}

export function designExamplesHref(locale: Locale): string {
  return locale === 'en' ? '/web-design-examples' : '/site-ornekleri';
}

// --- Nav menu builders (consumed by MegaMenuNav + MobileNavAccordion) ----------

export const CORPORATE_LINKS: { navKey: 'hakkimizda' | 'blog' | 'kariyer' | 'iletisim'; href: string }[] = [
  { navKey: 'hakkimizda', href: '/kurumsal/hakkimizda' },
  { navKey: 'blog', href: '/kurumsal/blog' },
  { navKey: 'kariyer', href: '/kurumsal/kariyer' },
  { navKey: 'iletisim', href: '/kurumsal/iletisim' },
];

export function getSectoralMenu(locale: Locale) {
  return {
    label: locale === 'en' ? 'Sectoral Software' : 'Sektörel Yazılımlar',
    groups: INDUSTRY_GROUPS.map((group) => ({
      heading: t(group.label, locale),
      items: INDUSTRIES.filter((industry) => industry.group === group.key).map((industry) => ({
        label: t(industry.title, locale),
        href: industryHref(locale, industry),
      })),
    })),
    viewAllLabel: locale === 'en' ? 'View All Sectoral Solutions' : 'Tüm Sektörel Çözümleri Gör',
    viewAllHref: industriesHubHref(locale),
    ctaLabel: locale === 'en' ? "Don't see your industry? Let's talk" : 'Sektörünüz listede yok mu? Görüşelim',
    ctaHref: '/teklif-al',
  };
}

export function getServicesMenu(locale: Locale) {
  return {
    label: locale === 'en' ? 'Services' : 'Hizmetler',
    groups: SERVICE_GROUPS.map((group) => ({
      heading: t(group.label, locale),
      items: SERVICES.filter((service) => service.group === group.key).map((service) => ({
        label: t(service.title, locale),
        href: serviceHref(locale, service),
      })),
    })),
    viewAllLabel: locale === 'en' ? 'View All Services' : 'Tüm Hizmetleri Gör',
    viewAllHref: servicesHubHref(locale),
    secondaryLabel: locale === 'en' ? 'Web Design Examples' : 'Web Tasarım Örnekleri',
    secondaryHref: designExamplesHref(locale),
  };
}
