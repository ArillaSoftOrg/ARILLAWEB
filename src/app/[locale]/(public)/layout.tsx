import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/layout/FAQSection';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { getActiveCampaignBars } from '@/lib/announcement-actions';
import { CookieConsentProvider } from '@/components/cookie/CookieConsentProvider';
import { CookieBanner } from '@/components/cookie/CookieBanner';
import { CookiePreferencesModal } from '@/components/cookie/CookiePreferencesModal';
import { ConsentedScripts } from '@/components/cookie/ConsentedScripts';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const announcementConfigs = await getActiveCampaignBars();

  return (
    <CookieConsentProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AnnouncementBar configs={announcementConfigs} />
        <main className="flex-1" style={{ paddingTop: 'var(--bar-h, 0px)' }}>
          {children}
        </main>
        <FAQSection />
        <Footer />
      </div>
      <CookieBanner />
      <CookiePreferencesModal />
      <ConsentedScripts />
    </CookieConsentProvider>
  );
}
