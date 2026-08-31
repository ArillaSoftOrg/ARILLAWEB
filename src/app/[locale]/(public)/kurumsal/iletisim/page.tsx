import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { CorporatePageHero } from '@/components/corporate/CorporatePageHero';
import { HomeCard } from '@/components/home/ui/HomeCard';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ContactFormDark from "@/components/forms/ContactFormDark";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.iletisim' });
  const isTurkish = locale === 'tr';
  const title = isTurkish ? t('title') : `${t('title')} (Turkish)`;
  const description = isTurkish ? t('description') : `${t('description')} Turkish archive.`;
  return {
    title,
    description,
    // No English body copy exists yet (see redesign plan) — noindex the EN
    // route rather than presenting Turkish content as real English content,
    // matching the pattern already used for the blog's EN routes.
    robots: isTurkish ? undefined : { index: false, follow: true },
    alternates: {
      canonical: '/tr/kurumsal/iletisim',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${isTurkish ? 'tr' : locale}/kurumsal/iletisim`,
      type: 'website',
    },
  };
}

// NOTE: values below are carried over from the pre-redesign page as-is.
// Email/phone are flagged in the redesign plan pending confirmation
// (three different emails exist across the codebase; the phone number is a
// known placeholder) — do not treat these as verified real contact details.
const contactDetails = [
    {
        icon: Mail,
        label: "E-posta",
        value: "info@arillasoft.com",
        href: "mailto:info@arillasoft.com",
    },
    {
        icon: Phone,
        label: "Telefon",
        value: "+90 (555) 000 00 00",
        href: "tel:+905550000000",
    },
    {
        icon: MapPin,
        label: "Adres",
        value: "İstanbul, Türkiye",
        href: null,
    },
    {
        icon: Clock,
        label: "Çalışma Saatleri",
        value: "Pzt – Cum, 09:00 – 18:00",
        href: null,
    },
];

const whyUs = [
    "Hızlı dönüş garantisi — 24 saat içinde",
    "Deneyimli ve uzman ekip",
    "Şeffaf fiyatlandırma",
    "Proje sonrası destek",
];

export default function ContactPage() {
    return (
        <>
            <BreadcrumbJsonLd items={[{ label: 'Anasayfa', href: '/' }, { label: 'İletişim' }]} />

            <CorporatePageHero
                eyebrow="İletişim"
                title="Bizimle İletişime Geçin"
                description="Projeniz hakkında konuşmak, fiyat teklifi almak ya da sadece merhaba demek için mesaj gönderin."
            />

            <section className="bg-home-bg py-14 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-5">
                        {/* Left: contact info */}
                        <div className="space-y-6 lg:col-span-2">
                            <div className="space-y-3">
                                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                                    <div
                                        key={label}
                                        className="flex items-start gap-4 rounded-home-lg border border-home-border bg-home-surface p-5 transition hover:border-home-border-strong"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-home-md bg-home-bg">
                                            <Icon className="h-4 w-4 text-home-fg" />
                                        </div>
                                        <div>
                                            <p className="font-home-sans text-xs font-medium uppercase tracking-wider text-home-text-muted">
                                                {label}
                                            </p>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="font-home-sans mt-1 block text-sm text-home-fg transition hover:text-home-primary-active"
                                                >
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="font-home-sans mt-1 text-sm text-home-fg">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <HomeCard surface="neutral">
                                <h2 className="font-home-sans text-base font-semibold text-home-fg">
                                    Neden Arillasoft?
                                </h2>
                                <ul className="mt-4 space-y-3">
                                    {whyUs.map((item) => (
                                        <li key={item} className="font-home-sans flex items-center gap-2 text-sm text-home-text-secondary">
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-home-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </HomeCard>
                        </div>

                        {/* Right: form */}
                        <div className="rounded-home-lg border border-home-border bg-home-surface p-7 lg:col-span-3 md:p-9">
                            <h2 className="font-home-sans mb-6 text-xl font-semibold text-home-fg">
                                Mesaj Gönderin
                            </h2>
                            <ContactFormDark />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
