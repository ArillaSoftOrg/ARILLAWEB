import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { SITE_URL } from '@/lib/constants';
import { SERVICE_GROUPS, SERVICES } from '@/lib/en-site-data';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Software Development Services';
  const description =
    'Websites and web applications, mobile apps, custom software, integrations, game development, and ongoing technical support.';
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services` },
    openGraph: { title, description, url: `${SITE_URL}/${locale}/services`, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={[{ label: 'Services', href: '/en/services' }]} />
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <section className="section-py">
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              Services
            </span>
            <h1 className="text-role-hero mb-4">Software development services for growing businesses</h1>
            <p className="text-role-body-lg">
              From a first website to custom internal tools, we work across the full stack of what a
              modern business needs — and keep supporting it after launch.
            </p>
          </div>
        </div>
      </section>

      {SERVICE_GROUPS.map((group) => {
        const services = SERVICES.filter((service) => service.group === group.key);
        return (
          <section key={group.key} className="section-py" style={{ paddingTop: 0 }}>
            <div className="section-container">
              <h2 className="text-role-section-heading mb-8">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                  >
                    <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-role-body text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                    <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <Link
            href="/web-design-examples"
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-6"
          >
            <div>
              <h2 className="text-role-subheading mb-1">Web Design Examples</h2>
              <p className="text-role-body text-sm">
                Browse website concepts and design examples we&apos;ve created for different industries.
              </p>
            </div>
            <span className="text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
              View examples <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <ProductCTASection
        title="Not sure which service fits?"
        description="Tell us about your business and what you're trying to solve. We'll recommend a starting point."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
