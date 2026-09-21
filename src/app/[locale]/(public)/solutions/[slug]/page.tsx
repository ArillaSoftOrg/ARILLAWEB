import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ServiceJsonLd from "@/components/seo/ServiceJsonLd";
import { SolutionDetailContent } from "@/components/solutions/SolutionDetailContent";
import { getAllSolutionSlugs, getSolutionBySlug, getCategoryById } from "@/lib/solutions";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  const title = solution.title.en;
  const description = solution.shortDescription.en;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/solutions/${slug}`,
      languages: { tr: `/tr/cozumler/${slug}`, en: `/en/solutions/${slug}`, "x-default": `/tr/cozumler/${slug}` },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/solutions/${slug}`,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SolutionsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();

  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const t = await getTranslations({ locale, namespace: "pages.solutions" });
  const category = getCategoryById(solution.category);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: t("title"), href: "/solutions" },
          { label: solution.title.en },
        ]}
      />
      <ServiceJsonLd
        name={solution.title.en}
        description={solution.shortDescription.en}
        url={`/solutions/${slug}`}
      />
      <SolutionDetailContent
        solution={solution}
        locale="en"
        basePath="/solutions"
        categoryName={category.name.en}
        copy={{
          featuresHeading: t("detail.featuresHeading"),
          extrasHeading: t("detail.extrasHeading"),
          requirementsHeading: t("detail.requirementsHeading"),
          suitableForHeading: t("detail.suitableForHeading"),
          processHeading: t("detail.processHeading"),
          deliverablesHeading: t("detail.deliverablesHeading"),
          faqHeading: t("detail.faqHeading"),
          tiersHeading: t("detail.tiersHeading"),
          ctaHeading: t("detail.ctaHeading"),
          ctaBody: t("detail.ctaBody"),
          backToCatalog: t("backToCatalog"),
          otherSolutionsCta: t("detail.otherSolutionsCta"),
        }}
      />
    </>
  );
}
