'use client';

import { Globe, Calendar, LayoutDashboard, Users, Smartphone, Zap } from 'lucide-react';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { SOLUTION_LABELS, type SolutionKey } from '@/lib/en-site-data';

const SOLUTION_ICONS: Record<SolutionKey, React.ComponentType<{ size: number; color: string }>> = {
  website: Globe,
  appointment: Calendar,
  'management-panel': LayoutDashboard,
  crm: Users,
  'mobile-app': Smartphone,
  automation: Zap,
};

const SOLUTION_DESCRIPTIONS: Record<SolutionKey, string> = {
  website: 'A fast, professional website that represents your business online.',
  appointment: 'Customers book time slots online, with confirmations and reminders handled automatically.',
  'management-panel': 'A back-office panel to manage staff, services, and day-to-day operations.',
  crm: 'Track customers, history, and follow-ups in one place.',
  'mobile-app': 'A dedicated mobile app for customers or staff.',
  automation: 'Connect your existing tools and automate repetitive manual work.',
};

/**
 * Takes plain SolutionKey strings (serializable across the server/client boundary) and resolves
 * them to icon components client-side — FeatureGrid is a Client Component, and passing a lucide
 * icon component reference as a prop from a Server Component page throws
 * "Functions cannot be passed directly to Client Components".
 */
export default function SolutionsFeatureGrid({ solutions }: { solutions: SolutionKey[] }) {
  const features = solutions.map((solution) => ({
    icon: SOLUTION_ICONS[solution],
    title: SOLUTION_LABELS[solution],
    description: SOLUTION_DESCRIPTIONS[solution],
  }));

  return (
    <FeatureGrid
      title="Solutions that fit this industry"
      description="Start with what you need today — every piece is built to connect with the others as your business grows."
      features={features}
      columns={3}
      darkMode={false}
    />
  );
}
