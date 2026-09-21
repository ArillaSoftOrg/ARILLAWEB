import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import { SolutionsCatalogGrid } from "@/components/solutions/SolutionsCatalogGrid";
import { PriceDisclaimer } from "@/components/solutions/PriceDisclaimer";
import { getAllSolutions, getCategories } from "@/lib/solutions";
import "@/lib/home-fonts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.solutions" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/tr/cozumler",
      languages: { tr: "/tr/cozumler", en: "/en/solutions", "x-default": "/tr/cozumler" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/tr/cozumler`,
      type: "website",
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function CozumlerPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr") notFound();

  const t = await getTranslations({ locale, namespace: "pages.solutions" });
  const solutions = getAllSolutions();
  const categories = getCategories();

  return (
    <main className="bg-home-surface-warm pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-home-sans text-[32px] font-semibold leading-[1.16] tracking-[-0.02em] text-home-fg sm:text-[44px] sm:leading-[1.14] sm:tracking-[-0.025em]">
            {t("heroHeading")}
          </h1>
          <p className="font-home-sans mx-auto mt-5 max-w-2xl text-[17px] leading-7 text-home-text-secondary">
            {t("heroBody")}
          </p>
          <PriceDisclaimer locale="tr" className="mx-auto mt-4 max-w-xl" />
        </div>

        <div className="mt-10 sm:mt-12">
          <SolutionsCatalogGrid
            solutions={solutions}
            categories={categories}
            locale="tr"
            basePath="/cozumler"
            allLabel={t("allCategoriesLabel")}
          />
        </div>
      </div>
    </main>
  );
}
