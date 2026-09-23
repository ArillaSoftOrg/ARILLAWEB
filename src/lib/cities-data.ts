/**
 * Turkey-wide local SEO city registry — the data model behind
 * /tr/yazilim-firmasi/{sehir}.
 *
 * Every city starts at `draft` and stays there until it has genuinely
 * differentiated, non-fabricated content (see PHASE 3 report). A city only
 * becomes `indexable` — entering the sitemap, gaining internal links from
 * the national hub, and switching to index/follow — once that content
 * exists and is reviewed. This file is the single gate: nothing else in
 * the app should decide a city's visibility independently of `status`
 * here (see getIndexableCities()/sitemap.ts/the hub page).
 */

export type CityPublishStatus = 'draft' | 'review' | 'indexable';

export interface CityMeta {
  /** URL slug under /tr/yazilim-firmasi/[slug]. */
  slug: string;
  name: string;
  status: CityPublishStatus;
  /**
   * True only for the confirmed real office/location city, once verified
   * by the business owner (see the Phase 3 trust-data conflict — currently
   * unresolved for every city, including this one). A verified office city
   * is the one place honest "based in {city}" language becomes accurate;
   * every other city must stick to remote-delivery framing regardless of
   * status.
   */
  isVerifiedOffice?: boolean;
}

/**
 * Initial candidate set (see PHASE 1.5/2/3 reports for the prioritization
 * rationale). Order is not a ranking — it's alphabetical for maintainability.
 * All start as `draft`: none has verified local-sector differentiation or a
 * confirmed office-city fact yet.
 */
export const CITIES: CityMeta[] = [
  { slug: 'adana', name: 'Adana', status: 'draft' },
  { slug: 'ankara', name: 'Ankara', status: 'draft' },
  { slug: 'antalya', name: 'Antalya', status: 'draft' },
  { slug: 'bursa', name: 'Bursa', status: 'draft' },
  { slug: 'eskisehir', name: 'Eskişehir', status: 'draft' },
  { slug: 'gaziantep', name: 'Gaziantep', status: 'draft' },
  { slug: 'istanbul', name: 'İstanbul', status: 'draft' },
  { slug: 'izmir', name: 'İzmir', status: 'draft' },
  { slug: 'kayseri', name: 'Kayseri', status: 'draft' },
  { slug: 'kocaeli', name: 'Kocaeli', status: 'draft' },
  { slug: 'konya', name: 'Konya', status: 'draft' },
  { slug: 'mersin', name: 'Mersin', status: 'draft' },
  { slug: 'mugla', name: 'Muğla', status: 'draft' },
  { slug: 'samsun', name: 'Samsun', status: 'draft' },
  { slug: 'trabzon', name: 'Trabzon', status: 'draft' },
];

export function getCityBySlug(slug: string): CityMeta | undefined {
  return CITIES.find((city) => city.slug === slug);
}

export function getIndexableCities(): CityMeta[] {
  return CITIES.filter((city) => city.status === 'indexable');
}

export function cityHref(city: CityMeta): string {
  return `/yazilim-firmasi/${city.slug}`;
}
