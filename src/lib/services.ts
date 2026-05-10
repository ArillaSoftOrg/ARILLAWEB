/**
 * Stable service mappings for availability system.
 * Use these slugs as service identifiers in databases and APIs.
 * Turkish labels are for display only.
 */

export const SERVICE_SLUGS = {
  ALL: 'all',
  WEB_DEV: 'web-development',
  MOBILE_APP: 'mobile-application',
  CUSTOM_SOFTWARE: 'custom-software',
  API_BACKEND: 'api-backend',
  QR_MENU: 'qr-menu',
  APPOINTMENT_SYSTEM: 'appointment-system',
  MAINTENANCE: 'maintenance',
} as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[keyof typeof SERVICE_SLUGS];

export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  [SERVICE_SLUGS.ALL]: 'Tüm Hizmetler',
  [SERVICE_SLUGS.WEB_DEV]: 'Web Geliştirme',
  [SERVICE_SLUGS.MOBILE_APP]: 'Mobil Uygulama',
  [SERVICE_SLUGS.CUSTOM_SOFTWARE]: 'Özel Yazılım',
  [SERVICE_SLUGS.API_BACKEND]: 'API & Backend',
  [SERVICE_SLUGS.QR_MENU]: 'QR Menü Sistemi',
  [SERVICE_SLUGS.APPOINTMENT_SYSTEM]: 'Randevu Yönetim Sistemi',
  [SERVICE_SLUGS.MAINTENANCE]: 'Bakım & Destek',
};

/**
 * Get Turkish label for a service slug.
 */
export function getServiceLabel(slug: ServiceSlug | string): string {
  return SERVICE_LABELS[slug as ServiceSlug] || slug;
}

/**
 * Get all service slugs (excluding "all" if you want only specific services).
 */
export function getAllServiceSlugs(includeAll = false): ServiceSlug[] {
  const slugs = Object.values(SERVICE_SLUGS) as ServiceSlug[];
  return includeAll ? slugs : slugs.filter(s => s !== SERVICE_SLUGS.ALL);
}

/**
 * Get all services as an array of { slug, label } for forms/selects.
 */
export function getServicesForForm(includeAll = false): Array<{ slug: ServiceSlug; label: string }> {
  const slugs = getAllServiceSlugs(includeAll);
  return slugs.map(slug => ({
    slug,
    label: SERVICE_LABELS[slug],
  }));
}
