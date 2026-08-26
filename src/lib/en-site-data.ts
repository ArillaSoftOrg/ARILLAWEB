// Shared data source for the English-only "Sectoral Software" / "Services" IA.
// Used by the EN mega menu, the EN mobile nav, and the /en/services + /en/sectoral-software
// hub and detail pages so nav, hubs, and cross-links never drift out of sync.

export type SolutionKey =
  | 'website'
  | 'appointment'
  | 'management-panel'
  | 'crm'
  | 'mobile-app'
  | 'automation';

export const SOLUTION_LABELS: Record<SolutionKey, string> = {
  website: 'Website',
  appointment: 'Appointment System',
  'management-panel': 'Management Panel',
  crm: 'CRM / Customer Tracking',
  'mobile-app': 'Mobile Application',
  automation: 'Automation / Integrations',
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
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  group: ServiceGroup;
}

export const SERVICES: ServiceMeta[] = [
  {
    slug: 'website-web-application',
    title: 'Website & Web Application',
    shortDescription: 'Marketing sites, customer portals, and full web applications.',
    group: 'digital-products',
  },
  {
    slug: 'mobile-application',
    title: 'Mobile Application',
    shortDescription: 'Native and cross-platform apps for iOS and Android.',
    group: 'digital-products',
  },
  {
    slug: 'game-development',
    title: 'Game Development',
    shortDescription: '2D and 3D games and interactive experiences for web and mobile.',
    group: 'digital-products',
  },
  {
    slug: 'custom-software-admin-panels',
    title: 'Custom Software & Admin Panels',
    shortDescription: 'Bespoke back-office tools and management dashboards.',
    group: 'software-solutions',
  },
  {
    slug: 'integrations-automation',
    title: 'Integrations & Automation',
    shortDescription: 'Connect your tools and automate manual workflows.',
    group: 'software-solutions',
  },
  {
    slug: 'maintenance-technical-support',
    title: 'Maintenance & Technical Support',
    shortDescription: 'Ongoing updates, monitoring, and support for existing software.',
    group: 'software-solutions',
  },
];

export const SERVICE_GROUPS: { key: ServiceGroup; label: string }[] = [
  { key: 'digital-products', label: 'Digital Products' },
  { key: 'software-solutions', label: 'Software Solutions' },
];

export function getServiceMeta(slug: ServiceSlug): ServiceMeta {
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}

export type IndustryGroup = 'beauty' | 'healthcare' | 'other';

export interface IndustryMeta {
  slug: string;
  title: string;
  group: IndustryGroup;
  summary: string;
  applicableSolutions: SolutionKey[];
  relatedServiceSlugs: ServiceSlug[];
  /** ProjectCategory.slug in the existing catalog data, when a real design-example mapping exists. */
  catalogSectorSlug?: string;
}

export const INDUSTRY_GROUPS: { key: IndustryGroup; label: string }[] = [
  { key: 'beauty', label: 'Beauty & Personal Care' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'other', label: 'Other Industries' },
];

export const INDUSTRIES: IndustryMeta[] = [
  {
    slug: 'hair-salon-barber',
    title: 'Hair Salon & Barber',
    group: 'beauty',
    summary: 'Booking, client history, and a professional online presence for hair salons and barbershops.',
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'kuafor-berber',
  },
  {
    slug: 'beauty-center',
    title: 'Beauty Center',
    group: 'beauty',
    summary: 'Service menus, staff scheduling, and customer retention tools for beauty centers.',
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'guzellik-bakim-merkezi',
  },
  {
    slug: 'spa-wellness',
    title: 'Spa & Wellness',
    group: 'beauty',
    summary: 'Online booking and membership tracking for spas and wellness studios.',
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
  },
  {
    slug: 'clinic',
    title: 'Clinic',
    group: 'healthcare',
    summary: 'Patient scheduling, records access, and a professional web presence for clinics.',
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
  },
  {
    slug: 'dental-clinic',
    title: 'Dental Clinic',
    group: 'healthcare',
    summary: 'Appointment booking, patient management, and treatment tracking for dental practices.',
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['website-web-application', 'custom-software-admin-panels'],
    catalogSectorSlug: 'dis-klinigi-ozel-klinik',
  },
  {
    slug: 'psychologist-consultant',
    title: 'Psychologist / Consultant',
    group: 'healthcare',
    summary: 'A professional website and simple session scheduling for independent practitioners.',
    applicableSolutions: ['website', 'appointment', 'crm'],
    relatedServiceSlugs: ['website-web-application'],
  },
  {
    slug: 'dietitian',
    title: 'Dietitian',
    group: 'healthcare',
    summary: 'Booking, client progress tracking, and plan delivery for dietitians and nutrition coaches.',
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
  },
  {
    slug: 'restaurant-cafe',
    title: 'Restaurant & Cafe',
    group: 'other',
    summary: 'Digital menus, ordering, and operations tools for restaurants and cafes.',
    applicableSolutions: ['website', 'mobile-app', 'management-panel', 'automation'],
    relatedServiceSlugs: ['mobile-application', 'integrations-automation'],
    catalogSectorSlug: 'restoran-kafe',
  },
  {
    slug: 'hotel-hospitality',
    title: 'Hotel & Hospitality',
    group: 'other',
    summary: 'Booking, guest management, and property operations software for hospitality businesses.',
    applicableSolutions: ['website', 'appointment', 'crm', 'management-panel'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
  {
    slug: 'veterinary-pet-services',
    title: 'Veterinary & Pet Services',
    group: 'other',
    summary: 'Appointment scheduling and client/pet record management for veterinary practices and pet services.',
    applicableSolutions: ['website', 'appointment', 'crm', 'mobile-app'],
    relatedServiceSlugs: ['website-web-application', 'mobile-application'],
    catalogSectorSlug: 'pet-kuaforu-pet-hizmetleri',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    group: 'other',
    summary: 'Listing websites, lead tracking, and CRM automation for real estate agencies and agents.',
    applicableSolutions: ['website', 'crm', 'mobile-app', 'automation'],
    relatedServiceSlugs: ['website-web-application', 'integrations-automation'],
    catalogSectorSlug: 'emlak-danismanligi',
  },
  {
    slug: 'education-courses',
    title: 'Education & Courses',
    group: 'other',
    summary: 'Course catalogs, student management, and enrollment automation for schools and course providers.',
    applicableSolutions: ['website', 'management-panel', 'crm', 'automation'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
  {
    slug: 'sports-fitness',
    title: 'Sports & Fitness',
    group: 'other',
    summary: 'Class scheduling, membership management, and a mobile-friendly booking experience for gyms and studios.',
    applicableSolutions: ['website', 'appointment', 'mobile-app', 'crm'],
    relatedServiceSlugs: ['mobile-application', 'website-web-application'],
  },
  {
    slug: 'automotive',
    title: 'Automotive',
    group: 'other',
    summary: 'Service booking, customer records, and workshop management for automotive service businesses.',
    applicableSolutions: ['website', 'appointment', 'management-panel', 'crm'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'website-web-application'],
    catalogSectorSlug: 'otomotiv-servisi-arac-bakim',
  },
  {
    slug: 'retail',
    title: 'Retail',
    group: 'other',
    summary: 'Inventory-aware storefronts and back-office tools for retail businesses.',
    applicableSolutions: ['website', 'management-panel', 'automation', 'mobile-app'],
    relatedServiceSlugs: ['custom-software-admin-panels', 'integrations-automation'],
  },
];

export function getIndustryMeta(slug: string): IndustryMeta | undefined {
  return INDUSTRIES.find((item) => item.slug === slug);
}

export function getServicesForIndustry(industry: IndustryMeta): ServiceMeta[] {
  return industry.relatedServiceSlugs.map((slug) => getServiceMeta(slug));
}

export function getIndustriesForService(serviceSlug: ServiceSlug): IndustryMeta[] {
  return INDUSTRIES.filter((industry) => industry.relatedServiceSlugs.includes(serviceSlug));
}

// EN-only nav config consumed by the desktop mega menu and mobile accordion nav.
export const EN_CORPORATE_ITEMS: { label: string; href: string }[] = [
  { label: 'About Us', href: '/kurumsal/hakkimizda' },
  { label: 'Blog', href: '/kurumsal/blog' },
  { label: 'Careers', href: '/kurumsal/kariyer' },
  { label: 'Contact', href: '/kurumsal/iletisim' },
];

export const EN_SECTORAL_MENU = {
  label: 'Sectoral Software',
  groups: INDUSTRY_GROUPS.map((group) => ({
    heading: group.label,
    items: INDUSTRIES.filter((industry) => industry.group === group.key).map((industry) => ({
      label: industry.title,
      href: `/sectoral-software/${industry.slug}`,
    })),
  })),
  viewAllLabel: 'View All Sectoral Solutions',
  viewAllHref: '/sectoral-software',
  ctaLabel: "Don't see your industry? Let's talk",
  ctaHref: '/teklif-al',
};

export const EN_SERVICES_MENU = {
  label: 'Services',
  groups: SERVICE_GROUPS.map((group) => ({
    heading: group.label,
    items: SERVICES.filter((service) => service.group === group.key).map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  })),
  viewAllLabel: 'View All Services',
  viewAllHref: '/services',
  secondaryLabel: 'Web Design Examples',
  secondaryHref: '/web-design-examples',
};
