import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { permanentRedirect } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import ServicesHubContent from "../services/HubContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (locale !== "tr") return {};
    const t = await getTranslations({ locale, namespace: 'pages.hizmetler' });
    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `/${locale}/hizmetler`,
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `${SITE_URL}/${locale}/hizmetler`,
            type: 'website',
            locale: 'tr_TR',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
    };
}

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;
    if (locale !== "tr") {
        // No English content lives at this Turkish-slug hub — the CMS-managed
        // service listing this used to render here has zero published rows,
        // so it was serving a thin, mixed-language duplicate of /tr/hizmetler.
        // /en/services is the real English hub (see src/lib/en-site-data.ts).
        permanentRedirect("/en/services");
    }

    return <ServicesHubContent locale="tr" />;
}
