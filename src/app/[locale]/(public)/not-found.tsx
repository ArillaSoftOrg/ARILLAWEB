import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
};

// Rendered inside the public layout (navbar + footer) when a page calls notFound().
export default async function PublicNotFound() {
  const locale = await getLocale();
  return <NotFoundContent locale={locale} />;
}
