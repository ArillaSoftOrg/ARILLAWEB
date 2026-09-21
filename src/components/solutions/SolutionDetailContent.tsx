import { ArrowLeft, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HomeButton } from "@/components/home/ui/HomeButton";
import { HomeBadge } from "@/components/home/ui/HomeBadge";
import { TierComparison } from "@/components/solutions/TierComparison";
import { ExtrasSelector } from "@/components/solutions/ExtrasSelector";
import { PriceDisclaimer } from "@/components/solutions/PriceDisclaimer";
import { getPriceLabel, getDeliveryLabel, type Locale, type Solution } from "@/lib/solutions";
import "@/lib/home-fonts";

interface DetailCopy {
  featuresHeading: string;
  extrasHeading: string;
  requirementsHeading: string;
  suitableForHeading: string;
  processHeading: string;
  deliverablesHeading: string;
  faqHeading: string;
  tiersHeading: string;
  ctaHeading: string;
  ctaBody: string;
  backToCatalog: string;
  otherSolutionsCta: string;
}

interface SolutionDetailContentProps {
  solution: Solution;
  locale: Locale;
  basePath: string;
  categoryName: string;
  copy: DetailCopy;
}

const revisionsLabel = (locale: Locale, count: number) =>
  locale === "tr" ? `${count} revizyon hakkı` : `${count} revision${count === 1 ? "" : "s"}`;

export function SolutionDetailContent({ solution, locale, basePath, categoryName, copy }: SolutionDetailContentProps) {
  const priceLabel = getPriceLabel(locale, solution.pricingType, solution.price);
  const deliveryLabel = getDeliveryLabel(locale, solution.deliveryDays);

  return (
    <main className="bg-home-surface-warm pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-[1024px] px-5 sm:px-6 lg:px-8">
        <Link
          href={basePath}
          className="focus-ring-lime font-home-sans inline-flex items-center gap-2 rounded-home-full border border-home-border-strong bg-home-bg px-4 py-2 text-sm font-medium text-home-fg transition-colors duration-200 hover:border-home-primary"
        >
          <ArrowLeft size={16} />
          {copy.backToCatalog}
        </Link>

        {/* Hero */}
        <div className="mt-8 rounded-home-xl border border-home-border bg-home-bg p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <HomeBadge variant="neutral">{categoryName}</HomeBadge>
            {solution.featured && <HomeBadge variant="lime">{locale === "tr" ? "Öne Çıkan" : "Featured"}</HomeBadge>}
          </div>

          <h1 className="font-home-sans mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-home-fg sm:text-4xl">
            {solution.title[locale]}
          </h1>
          <p className="font-home-sans mt-4 max-w-2xl text-[17px] leading-7 text-home-text-secondary">
            {solution.shortDescription[locale]}
          </p>

          <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-home-border pt-6">
            <div>
              <p className="font-home-sans text-2xl font-semibold text-home-fg">{priceLabel}</p>
              <p className="font-home-sans mt-1 flex items-center gap-1.5 text-sm text-home-text-muted">
                <Clock size={14} strokeWidth={2} />
                {deliveryLabel}
              </p>
            </div>
            {solution.revisionCount !== null && (
              <p className="font-home-sans mb-1 flex items-center gap-1.5 text-sm text-home-text-secondary">
                <RefreshCw size={14} strokeWidth={2} />
                {revisionsLabel(locale, solution.revisionCount)}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <HomeButton variant="primary" asChild>
              <Link href="/teklif-al">
                {solution.ctaLabel[locale]}
                <ArrowRight size={16} />
              </Link>
            </HomeButton>
          </div>
          <PriceDisclaimer locale={locale} className="mt-4" />
        </div>

        {/* Tiers */}
        {solution.tiers && solution.tiers.length > 0 && (
          <section className="mt-10">
            <h2 className="font-home-sans text-xl font-semibold text-home-fg">{copy.tiersHeading}</h2>
            <div className="mt-5">
              <TierComparison
                tiers={solution.tiers}
                locale={locale}
                revisionsLabel={(count) => revisionsLabel(locale, count)}
              />
            </div>
          </section>
        )}

        {/* Two-column body */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="font-home-sans text-xl font-semibold text-home-fg">{copy.featuresHeading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {solution.includedFeatures.map((feature) => (
                  <li key={feature[locale]} className="font-home-sans flex items-start gap-2.5 text-[15px] leading-6 text-home-text-secondary">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-home-full bg-home-primary-active" />
                    {feature[locale]}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-home-sans text-xl font-semibold text-home-fg">{copy.processHeading}</h2>
              <ol className="mt-5 flex flex-col gap-5">
                {solution.process.map((step, index) => (
                  <li key={step.title[locale]} className="flex gap-4">
                    <span className="font-home-sans flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-home-full bg-home-surface text-sm font-semibold text-home-fg">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-home-sans text-[15px] font-semibold text-home-fg">{step.title[locale]}</h3>
                      <p className="font-home-sans mt-1 text-sm leading-6 text-home-text-secondary">{step.description[locale]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-home-sans text-xl font-semibold text-home-fg">{copy.deliverablesHeading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {solution.deliverables.map((item) => (
                  <li key={item[locale]} className="font-home-sans flex items-start gap-2.5 text-[15px] leading-6 text-home-text-secondary">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-home-full bg-home-primary-active" />
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-home-sans text-xl font-semibold text-home-fg">{copy.faqHeading}</h2>
              <div className="mt-4 flex flex-col divide-y divide-home-border rounded-home-lg border border-home-border bg-home-bg">
                {solution.faq.map((item) => (
                  <div key={item.question[locale]} className="p-5">
                    <h3 className="font-home-sans text-[15px] font-semibold text-home-fg">{item.question[locale]}</h3>
                    <p className="font-home-sans mt-2 text-sm leading-6 text-home-text-secondary">{item.answer[locale]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-8">
            {solution.optionalExtras.length > 0 && (
              <section>
                <h2 className="font-home-sans text-base font-semibold text-home-fg">{copy.extrasHeading}</h2>
                <div className="mt-4">
                  <ExtrasSelector extras={solution.optionalExtras} locale={locale} />
                </div>
              </section>
            )}

            <section>
              <h2 className="font-home-sans text-base font-semibold text-home-fg">{copy.requirementsHeading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {solution.requirementsFromCustomer.map((item) => (
                  <li key={item[locale]} className="font-home-sans text-sm leading-6 text-home-text-secondary">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-home-sans text-base font-semibold text-home-fg">{copy.suitableForHeading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {solution.suitableFor.map((item) => (
                  <li key={item[locale]} className="font-home-sans text-sm leading-6 text-home-text-secondary">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-home-xl border border-home-border-dark bg-home-surface-dark-raised p-8 text-center sm:p-10">
          <h2 className="font-home-sans text-2xl font-semibold text-home-text-inverse">{copy.ctaHeading}</h2>
          <p className="font-home-sans mx-auto mt-3 max-w-xl text-[15px] leading-6 text-home-text-inverse-secondary">
            {copy.ctaBody}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <HomeButton variant="lime" asChild>
              <Link href="/teklif-al">
                {solution.ctaLabel[locale]}
                <ArrowRight size={16} />
              </Link>
            </HomeButton>
            <HomeButton variant="ghost" onDark asChild>
              <Link href={basePath}>{copy.otherSolutionsCta}</Link>
            </HomeButton>
          </div>
        </div>
      </div>
    </main>
  );
}
