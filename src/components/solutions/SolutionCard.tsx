import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import { getPriceLabel, getDeliveryLabel, type Locale, type Solution } from "@/lib/solutions";
import "@/lib/home-fonts";

interface SolutionCardProps {
  solution: Solution;
  locale: Locale;
  /** "/cozumler" or "/solutions" — kept a prop so the card has no route knowledge. */
  basePath: string;
  categoryLabel?: string;
}

const FEATURED_LABEL: Record<Locale, string> = { tr: "Öne Çıkan", en: "Featured" };

export function SolutionCard({ solution, locale, basePath, categoryLabel }: SolutionCardProps) {
  const priceLabel = getPriceLabel(locale, solution.pricingType, solution.price);
  const deliveryLabel = getDeliveryLabel(locale, solution.deliveryDays);
  const highlights = solution.includedFeatures.slice(0, 5);

  return (
    <Link
      href={`${basePath}/${solution.slug}`}
      className="focus-ring-lime group flex h-full flex-col rounded-home-lg border border-home-border bg-home-bg p-6 transition-colors duration-200 hover:border-home-primary sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        {categoryLabel && (
          <span className="font-home-sans text-xs font-medium uppercase tracking-[0.08em] text-home-text-muted">
            {categoryLabel}
          </span>
        )}
        {solution.featured && <HomeBadge variant="lime">{FEATURED_LABEL[locale]}</HomeBadge>}
      </div>

      <h3 className="font-home-sans mt-3 text-xl font-semibold text-home-fg">{solution.title[locale]}</h3>
      <p className="font-home-sans mt-2 text-sm leading-6 text-home-text-secondary">
        {solution.shortDescription[locale]}
      </p>

      <ul className="mt-5 flex flex-1 flex-col gap-2">
        {highlights.map((feature) => (
          <li key={feature[locale]} className="font-home-sans flex items-start gap-2 text-[13px] leading-5 text-home-text-secondary">
            <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-home-full bg-home-primary-active" />
            {feature[locale]}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-home-border pt-5">
        <div>
          <p className="font-home-sans text-lg font-semibold text-home-fg">{priceLabel}</p>
          <p className="font-home-sans mt-1 flex items-center gap-1.5 text-xs text-home-text-muted">
            <Clock size={13} strokeWidth={2} />
            {deliveryLabel}
          </p>
        </div>
        <span className="font-home-sans inline-flex items-center gap-1.5 text-sm font-medium text-home-fg transition-colors group-hover:text-home-primary-active">
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
