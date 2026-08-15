import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {badge && (
        <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-role-section-heading mb-4">{title}</h2>
      {description && (
        <p className={cn('text-role-body-lg', align === 'center' ? 'max-w-2xl mx-auto' : '')}>
          {description}
        </p>
      )}
    </div>
  );
}
