import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HomeButton } from "@/components/home/ui/HomeButton";
import "@/lib/home-fonts";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
}

export function EmptyState({ icon: Icon, title, description, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-home-lg border border-home-border bg-home-surface px-6 py-16 text-center">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-home-full bg-home-bg text-home-fg">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="font-home-sans text-lg font-semibold text-home-fg">{title}</h3>
      {description && (
        <p className="font-home-sans mt-2 max-w-md text-sm leading-6 text-home-text-secondary">{description}</p>
      )}
      {cta && (
        <HomeButton asChild variant="secondary" className="mt-6">
          <Link href={cta.href}>{cta.label}</Link>
        </HomeButton>
      )}
    </div>
  );
}
