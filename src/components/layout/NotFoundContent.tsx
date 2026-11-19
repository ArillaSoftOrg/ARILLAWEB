import Link from 'next/link';
import '@/lib/home-fonts';

const COPY = {
  tr: {
    code: '404',
    title: 'Aradığınız sayfa bulunamadı',
    body: 'Adres değişmiş ya da sayfa kaldırılmış olabilir. Ana sayfaya dönebilir veya hizmetlerimize göz atabilirsiniz.',
    home: 'Ana sayfaya dön',
    services: 'Hizmetleri incele',
    homeHref: '/tr',
    servicesHref: '/tr/hizmetler',
  },
  en: {
    code: '404',
    title: "We couldn't find that page",
    body: 'The address may have changed or the page may have been removed. Go back home or browse our services.',
    home: 'Back to home',
    services: 'Browse services',
    homeHref: '/en',
    servicesHref: '/en/services',
  },
} as const;

/** Shared, home-styled 404 body. Uses plain links so it also works outside the intl provider. */
export default function NotFoundContent({ locale = 'tr' }: { locale?: string }) {
  const copy = locale === 'en' ? COPY.en : COPY.tr;

  return (
    <main
      className="bg-home-surface-warm px-5 pb-20 sm:px-6"
      style={{ minHeight: '100svh', paddingTop: 'calc(var(--header-h) + 72px)' }}
    >
      <div className="mx-auto max-w-[640px] text-center">
        <p className="font-home-sans text-[56px] font-semibold leading-none tracking-[-0.03em] text-home-fg sm:text-[88px]">
          {copy.code}
        </p>
        <h1 className="font-home-sans mt-6 text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-home-fg sm:text-[40px]">
          {copy.title}
        </h1>
        <p className="font-home-sans mx-auto mt-4 max-w-[48ch] text-[17px] leading-7 text-home-text-secondary">
          {copy.body}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={copy.homeHref}
            className="font-home-sans inline-flex min-h-[44px] items-center justify-center rounded-home-full bg-home-fg px-6 text-[15px] font-medium text-home-text-inverse no-underline transition-colors duration-200 hover:bg-home-primary hover:text-home-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary focus-visible:ring-offset-2"
          >
            {copy.home}
          </Link>
          <Link
            href={copy.servicesHref}
            className="font-home-sans inline-flex min-h-[44px] items-center justify-center rounded-home-full border border-home-border-strong px-6 text-[15px] font-medium text-home-fg no-underline transition-colors duration-200 hover:border-home-primary hover:bg-home-primary hover:text-home-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-home-primary focus-visible:ring-offset-2"
          >
            {copy.services}
          </Link>
        </div>
      </div>
    </main>
  );
}
