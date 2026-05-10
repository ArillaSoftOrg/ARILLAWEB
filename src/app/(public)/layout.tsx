import Navbar from '@/components/layout/Navbar';
import FAQSection from '@/components/layout/FAQSection';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { getAnnouncementConfig } from '@/lib/announcement-actions';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const announcementConfig = await getAnnouncementConfig();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AnnouncementBar config={announcementConfig} />
      <main className="flex-1" style={{ paddingTop: 'var(--bar-h, 0px)' }}>
        {children}
      </main>
      <FAQSection />
      <Footer />
    </div>
  );
}
