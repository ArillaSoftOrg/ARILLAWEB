import type { Metadata } from 'next';
import './globals.css';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import PageTransition from "@/components/PageTransition";

export async function generateMetadata(): Promise<Metadata> {
  let ogImage = '/og-default.png';

  try {
    const setting = await prisma.siteSetting.findFirst({
      select: { logoPath: true },
    });
    if (setting?.logoPath) ogImage = setting.logoPath;
  } catch {
    // DB not yet seeded – fall back to static defaults
  }

  return {
    title: {
      default: `${SITE_NAME} | Modern Yazılım Çözümleri`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Modern Yazılım Çözümleri`,
      description: SITE_DESCRIPTION,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | Modern Yazılım Çözümleri`,
      description: SITE_DESCRIPTION,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}