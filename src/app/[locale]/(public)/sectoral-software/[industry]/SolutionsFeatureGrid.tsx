'use client';

import { Globe, Calendar, LayoutDashboard, Users, Smartphone, Zap } from 'lucide-react';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { SOLUTION_LABELS, SOLUTION_DESCRIPTIONS, t, type Locale, type SolutionKey } from '@/lib/en-site-data';

const SOLUTION_ICONS: Record<SolutionKey, React.ComponentType<{ size: number; color: string }>> = {
  website: Globe,
  appointment: Calendar,
  'management-panel': LayoutDashboard,
  crm: Users,
  'mobile-app': Smartphone,
  automation: Zap,
};

const COPY = {
  en: {
    title: 'Solutions that fit this industry',
    description: 'Start with what you need today — every piece is built to connect with the others as your business grows.',
  },
  tr: {
    title: 'Bu sektöre uygun çözümler',
    description: 'Bugün ihtiyacınız olanla başlayın — her parça, işletmeniz büyüdükçe diğerleriyle bağlanacak şekilde tasarlanmıştır.',
  },
} as const;

/**
 * Takes plain SolutionKey strings (serializable across the server/client boundary) and resolves
 * them to icon components client-side — FeatureGrid is a Client Component, and passing a lucide
 * icon component reference as a prop from a Server Component page throws
 * "Functions cannot be passed directly to Client Components".
 */
export default function SolutionsFeatureGrid({ locale, solutions }: { locale: Locale; solutions: SolutionKey[] }) {
  const copy = COPY[locale];
  const features = solutions.map((solution) => ({
    icon: SOLUTION_ICONS[solution],
    title: t(SOLUTION_LABELS[solution], locale),
    description: t(SOLUTION_DESCRIPTIONS[solution], locale),
  }));

  return (
    <FeatureGrid
      title={copy.title}
      description={copy.description}
      features={features}
      columns={3}
      darkMode={false}
    />
  );
}
