import './globals.css';
import { headers } from 'next/headers';
import PageTransition from '@/components/PageTransition';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hl = await headers();
  const locale = hl.get('x-locale') ?? 'tr';

  return (
    <html lang={locale}>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
