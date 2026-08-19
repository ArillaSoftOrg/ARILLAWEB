import BrandIntroShell from '@/components/layout/BrandIntroShell';
import AnimatedShaderBackground from '@/components/AnimatedShaderBackground';
import FAQSection from '@/components/layout/FAQSection';
import NewsletterSection from '@/components/layout/NewsletterSection';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { getActiveCampaignBars } from '@/lib/announcement-actions';
import { getFaqsByPage } from '@/lib/faq-actions';
import { cookies, headers } from 'next/headers';
import { jwtVerify } from 'jose';
import { CookieConsentProvider } from '@/components/cookie/CookieConsentProvider';
import { CookieBanner } from '@/components/cookie/CookieBanner';
import { CookiePreferencesModal } from '@/components/cookie/CookiePreferencesModal';
import { ConsentedScripts } from '@/components/cookie/ConsentedScripts';
import { routing } from '@/i18n/routing';
import { getSiteSettings } from '@/lib/settings-actions';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') ?? '/';
  const publicPath = stripLocale(pathname);
  const isBlogPath = publicPath === '/kurumsal/blog' || publicPath.startsWith('/kurumsal/blog/');
  const isHomePath = publicPath === '/';
  const isAdminPreview = await hasValidAdminSession();
  const settings = await getSiteSettings();
  const maintenanceModeEnabled = settings.maintenanceModeEnabled;
  const showMaintenance =
    maintenanceModeEnabled && !isAdminPreview;
  const pathSegments = pathname.split('/').filter(Boolean);
  const locale = routing.locales.includes(pathSegments[0] as (typeof routing.locales)[number])
    ? pathSegments[0]
    : routing.defaultLocale;
  const announcementConfigs = showMaintenance ? [] : await getActiveCampaignBars();
  const faqs =
    !showMaintenance && !isBlogPath && !isHomePath
      ? await getFaqsByPage(publicPathToSlug(publicPath)).catch(() => [])
      : [];

  return (
    <CookieConsentProvider>
      <BrandIntroBootScript />
      <BrandIntroShell
        developerLoginOnly={
          maintenanceModeEnabled && !isAdminPreview
        }
      >
        {!showMaintenance && <AnnouncementBar configs={announcementConfigs} />}
        <main className="flex-1" style={{ paddingTop: 'var(--bar-h, 0px)' }}>
          {showMaintenance ? <MaintenanceNotice locale={locale} /> : children}
        </main>
        {!showMaintenance && !isBlogPath && !isHomePath && <FAQSection faqs={faqs} />}
        {!showMaintenance && !isBlogPath && <NewsletterSection />}
        {!showMaintenance && !isBlogPath && <Footer />}
      </BrandIntroShell>
      <CookieBanner />
      <CookiePreferencesModal />
      <ConsentedScripts />
    </CookieConsentProvider>
  );
}

function BrandIntroBootScript() {
  const script = `
(function () {
  try {
    var key = 'arilla-brand-intro:v1';
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && window.sessionStorage && window.sessionStorage.getItem(key) !== '1') {
      document.documentElement.setAttribute('data-brand-intro', 'pending');
      window.setTimeout(function () {
        if (document.documentElement.getAttribute('data-brand-intro') === 'pending') {
          document.documentElement.removeAttribute('data-brand-intro');
        }
      }, 1400);
    }
  } catch (error) {
    document.documentElement.removeAttribute('data-brand-intro');
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
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

function publicPathToSlug(publicPath: string): string {
  if (publicPath === '/' || publicPath === '') return 'home';
  if (publicPath.startsWith('/sektorel-yazilimlar/randevu-sistemi/klinik')) return 'klinik-randevu';
  if (publicPath.startsWith('/sektorel-yazilimlar/randevu-sistemi/kuafor')) return 'kuafor-randevu';
  if (publicPath.startsWith('/sektorel-yazilimlar/randevu-sistemi/guzellik')) return 'guzellik-merkezi';
  if (publicPath.startsWith('/sektorel-yazilimlar/randevu-sistemi')) return 'randevu';
  if (publicPath.startsWith('/sektorel-yazilimlar/qr-menu')) return 'qr-menu';
  if (publicPath.startsWith('/teklif-al')) return 'teklif-al';
  if (publicPath.startsWith('/iletisim')) return 'iletisim';
  return 'home';
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

function MaintenanceNotice({ locale }: { locale: string }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 12vw, 120px) 20px 56px',
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
            'linear-gradient(180deg, rgba(15,5,0,0.62) 0%, rgba(25,11,3,0.28) 50%, rgba(15,5,0,0.52) 100%), radial-gradient(circle at 50% 48%, rgba(255,149,36,0.06), rgba(50,20,4,0.18) 46%, rgba(18,8,3,0.50) 78%)',
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
            color: 'rgba(248,230,210,0.78)',
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            lineHeight: 1.7,
            margin: '0 auto',
            maxWidth: '560px',
          }}
        >
          Yakında yenilenen deneyimimizle yayında olacağız. Bu süreçte blog yazılarımız erişilebilir kalmaya devam ediyor.
        </p>
        <a
          href={`/${locale}/kurumsal/blog`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '28px',
            padding: '12px 22px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #7c3aed 100%)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 12px 28px rgba(37,99,235,0.28)',
          }}
        >
          Blog&apos;a Git
        </a>
        <p
          style={{
            marginTop: '40px',
            fontSize: '13px',
            color: 'rgba(248,230,210,0.42)',
            letterSpacing: '0.02em',
          }}
        >
          İletişim için: hello@arillasoft.com
        </p>
      </div>
    </section>
  );
}
