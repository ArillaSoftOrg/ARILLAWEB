'use client';

import { LifeBuoy, RefreshCw, Activity, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { SERVICES, getServiceMeta } from '@/lib/en-site-data';

export default function MaintenanceTechnicalSupportContent() {
  const service = getServiceMeta('maintenance-technical-support');
  const otherServices = SERVICES.filter((item) => item.slug !== 'maintenance-technical-support');

  const features = [
    {
      icon: LifeBuoy,
      title: 'Support When Something Breaks',
      description:
        'A clear point of contact and a defined process for reporting issues, so problems get triaged and addressed rather than left waiting.',
    },
    {
      icon: RefreshCw,
      title: 'Regular Updates',
      description:
        'Ongoing maintenance of dependencies, libraries, and platform updates to keep your software secure and compatible over time.',
    },
    {
      icon: Activity,
      title: 'Monitoring',
      description:
        'Keeping an eye on how your application is running so issues can be caught and flagged early, rather than discovered by your users first.',
    },
  ];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: 'Services', href: '/en/services' },
          { label: service.title, href: '/en/services/maintenance-technical-support' },
        ]}
      />
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url="/en/services/maintenance-technical-support"
        serviceType="Software Maintenance and Technical Support"
      />
      <Breadcrumbs
        items={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="section-py" style={{ paddingBottom: '32px' }}>
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              Services
            </span>
            <h1 className="text-role-hero mb-4">Ongoing Maintenance and Technical Support</h1>
            <p className="text-role-body-lg">
              For businesses that already have software in place — built by us or by someone else —
              and need it kept up to date, monitored, and supported after launch.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What's included"
        description="A support arrangement built around keeping existing software reliable, current, and looked after."
        features={features}
        columns={3}
        darkMode={false}
      />

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <h2 className="text-role-section-heading mb-8">Works alongside everything we build</h2>
          <p className="text-role-body mb-8 max-w-2xl">
            Maintenance and support isn&apos;t a standalone product — it&apos;s an add-on we offer alongside any
            project, whatever it is.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >
                <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-role-body text-sm leading-relaxed mb-4">{item.shortDescription}</p>
                <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductCTASection
        title="Need ongoing support for existing software?"
        description="Book a free discovery call and tell us what you have in place today. We'll walk through what an ongoing support arrangement could look like."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
