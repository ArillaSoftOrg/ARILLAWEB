import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/layout/FAQSection';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { getActiveCampaignBars } from '@/lib/announcement-actions';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const announcementConfigs = await getActiveCampaignBars();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AnnouncementBar configs={announcementConfigs} />
      <main className="flex-1" style={{ paddingTop: 'var(--bar-h, 0px)' }}>
        {children}
      </main>
      <FAQSection />
      <Footer />
    </div>
  );
}
