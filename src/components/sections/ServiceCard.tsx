import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Code2, Palette, Server, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Smartphone,
  Code2,
  Palette,
  Server,
  Wrench,
};

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  icon: string;
  slug: string;
  className?: string;
}

export default function ServiceCard({ title, shortDescription, icon, slug, className }: ServiceCardProps) {
  const Icon = iconMap[icon] || Code2;

  return (
    <Link
      href={`/hizmetler/${slug}`}
      className={cn(
        'group block bg-white rounded-xl border border-slate-100 p-6 hover:border-blue-200 hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{shortDescription}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
        Detayları İncele <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
