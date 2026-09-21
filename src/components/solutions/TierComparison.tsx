import { Check } from "lucide-react";
import { HomeCard } from "@/components/home/ui/HomeCard";
import { getPriceLabel, getDeliveryLabel, type Locale, type SolutionTier } from "@/lib/solutions";
import "@/lib/home-fonts";

interface TierComparisonProps {
  tiers: SolutionTier[];
  locale: Locale;
  revisionsLabel: (count: number) => string;
}

export function TierComparison({ tiers, locale, revisionsLabel }: TierComparisonProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {tiers.map((tier, index) => {
        const isMiddle = index === 1 && tiers.length === 3;
        return (
          <HomeCard
            key={tier.id}
            surface={isMiddle ? "accent" : "light"}
            padding="md"
            className="flex flex-col"
          >
            <h3 className="font-home-sans text-lg font-semibold">{tier.name[locale]}</h3>
            <p
              className={`font-home-sans mt-2 text-sm leading-6 ${
                isMiddle ? "text-home-primary-foreground/80" : "text-home-text-secondary"
              }`}
            >
              {tier.shortDescription[locale]}
            </p>

            <p className="font-home-sans mt-5 text-2xl font-semibold">
              {getPriceLabel(locale, tier.pricingType, tier.price)}
            </p>
            <p
              className={`font-home-sans mt-1 text-xs ${
                isMiddle ? "text-home-primary-foreground/70" : "text-home-text-muted"
              }`}
            >
              {getDeliveryLabel(locale, tier.deliveryDays)}
              {tier.revisionCount !== null ? ` · ${revisionsLabel(tier.revisionCount)}` : ""}
            </p>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {tier.includedFeatures.map((feature) => (
                <li key={feature[locale]} className="font-home-sans flex items-start gap-2.5 text-sm">
                  <Check size={16} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 opacity-70" />
                  <span className="leading-6">{feature[locale]}</span>
                </li>
              ))}
            </ul>
          </HomeCard>
        );
      })}
    </div>
  );
}
