'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HomeButton } from '@/components/home/ui/HomeButton';
import '@/lib/home-fonts';

const COPY = {
  tr: {
    title: 'Bir şeyler ters gitti',
    body: 'Sayfa yüklenirken beklenmedik bir hata oluştu. Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.',
    retry: 'Tekrar dene',
    home: 'Ana sayfaya dön',
  },
  en: {
    title: 'Something went wrong',
    body: 'An unexpected error occurred while loading this page. Try again or go back home.',
    retry: 'Try again',
    home: 'Back to home',
  },
} as const;

export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const copy = locale === 'en' ? COPY.en : COPY.tr;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="bg-home-surface-warm px-5 pb-20 sm:px-6"
      style={{ minHeight: '100svh', paddingTop: 'calc(var(--header-h) + 72px)' }}
    >
      <div className="mx-auto max-w-[640px] text-center">
        <h1 className="font-home-sans text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-home-fg sm:text-[40px]">
          {copy.title}
        </h1>
        <p className="font-home-sans mx-auto mt-4 max-w-[48ch] text-[17px] leading-7 text-home-text-secondary">
          {copy.body}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <HomeButton variant="primary" onClick={() => reset()}>
            {copy.retry}
          </HomeButton>
          <HomeButton variant="outline" asChild>
            <Link href="/">{copy.home}</Link>
          </HomeButton>
        </div>
      </div>
    </main>
  );
}
