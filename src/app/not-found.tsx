import type { Metadata } from 'next';
import { headers } from 'next/headers';
import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata: Metadata = {
  title: '404 | Arillasoft',
  robots: { index: false, follow: false },
};

// Fallback for URLs that match no route at all (no locale layout, so no navbar/footer).
export default async function RootNotFound() {
  const locale = (await headers()).get('x-locale') ?? 'tr';
  return <NotFoundContent locale={locale} />;
}
