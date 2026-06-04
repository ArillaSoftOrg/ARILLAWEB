import Navbar from '@/components/layout/Navbar';
import AnimatedShaderBackground from '@/components/AnimatedShaderBackground';
import FAQSection from '@/components/layout/FAQSection';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { getActiveCampaignBars } from '@/lib/announcement-actions';
import { cookies, headers } from 'next/headers';
import { jwtVerify } from 'jose';
import { CookieConsentProvider } from '@/components/cookie/CookieConsentProvider';
import { CookieBanner } from '@/components/cookie/CookieBanner';
import { CookiePreferencesModal } from '@/components/cookie/CookiePreferencesModal';
import { ConsentedScripts } from '@/components/cookie/ConsentedScripts';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-dynamic';

const PUBLIC_DEVELOPMENT_MODE = true;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') ?? '/';
  const publicPath = stripLocale(pathname);
  const isBlogPath = publicPath === '/kurumsal/blog' || publicPath.startsWith('/kurumsal/blog/');
  const isAdminPreview = await hasValidAdminSession();
  const showMaintenance = PUBLIC_DEVELOPMENT_MODE && !isAdminPreview && !isBlogPath;
  const announcementConfigs = showMaintenance ? [] : await getActiveCampaignBars();

  return (
    <CookieConsentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar developerLoginOnly={PUBLIC_DEVELOPMENT_MODE && !isAdminPreview} />
        {!showMaintenance && <AnnouncementBar configs={announcementConfigs} />}
        <main className="flex-1" style={{ paddingTop: 'var(--bar-h, 0px)' }}>
          {showMaintenance ? <MaintenanceNotice /> : children}
        </main>
        {!showMaintenance && !isBlogPath && <FAQSection />}
        {!showMaintenance && !isBlogPath && <Footer />}
      </div>
      <CookieBanner />
      <CookiePreferencesModal />
      <ConsentedScripts />
    </CookieConsentProvider>
  );
}

async function hasValidAdminSession(): Promise<boolean> {
  const token = (await cookies()).get('admin-auth')?.value;
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!token || !secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (routing.locales.includes(first as (typeof routing.locales)[number])) {
    const withoutLocale = `/${segments.slice(1).join('/')}`;
    return withoutLocale === '/' ? '/' : withoutLocale.replace(/\/$/, '');
  }

  return pathname.replace(/\/$/, '') || '/';
}

function MaintenanceNotice() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 56px',
        background: '#190b03',
        color: '#f8fafc',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatedShaderBackground />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(32,13,3,0.08), rgba(20,8,2,0.34)), radial-gradient(circle at 50% 48%, rgba(255,149,36,0.08), rgba(50,20,4,0.16) 46%, rgba(18,8,3,0.42) 78%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 7vw, 58px)',
            lineHeight: 1.05,
            fontWeight: 800,
            marginBottom: '18px',
          }}
        >
          Sitemiz geliştirilme aşamasında.
        </h1>
        <p
          style={{
            color: '#cbd5e1',
            fontSize: 'clamp(16px, 3vw, 19px)',
            lineHeight: 1.7,
            margin: '0 auto',
            maxWidth: '560px',
          }}
        >
          Yakında yenilenen deneyimimizle yayında olacağız. Bu süreçte blog yazılarımız erişilebilir kalmaya devam ediyor.
        </p>
        <a
          href="/tr/kurumsal/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '28px',
            padding: '12px 22px',
            borderRadius: '10px',
            background: '#7c3aed',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 10px 24px rgba(124,58,237,0.28)',
          }}
        >
          Blog'a Git
        </a>
      </div>
    </section>
  );
}
