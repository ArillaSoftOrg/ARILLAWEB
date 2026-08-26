import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import '@/lib/typography-fonts';
import { headers } from 'next/headers';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  other: {
    'google-adsense-account': 'ca-pub-8376062562948187',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hl = await headers();
  const locale = hl.get('x-locale') ?? 'tr';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8376062562948187"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
