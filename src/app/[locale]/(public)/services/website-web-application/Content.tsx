'use client';

import { Globe, LayoutDashboard, Users2, ArrowRight, Compass, PenTool, Code2, Rocket } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { getServiceMeta, getIndustriesForService, SERVICES } from '@/lib/en-site-data';

const SERVICE_SLUG = 'website-web-application' as const;

export default function WebsiteWebApplicationContent() {
  const service = getServiceMeta(SERVICE_SLUG);
  const industries = getIndustriesForService(SERVICE_SLUG);
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'mobile-application' || item.slug === 'custom-software-admin-panels'
  );

  const whatWeBuild = [
    {
      icon: Globe,
      title: 'Marketing websites',
      description:
        'Fast, well-structured websites that present your business clearly and are built to rank and convert.',
    },
    {
      icon: LayoutDashboard,
      title: 'Web applications',
      description:
        'Customer-facing tools such as booking flows, dashboards, and self-service portals built on a solid, maintainable stack.',
    },
    {
      icon: Users2,
      title: 'Internal portals',
      description:
        'Internal tools your team uses daily to manage operations, data, and workflows without relying on spreadsheets.',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Discovery',
      description: 'We review your business, goals, and existing systems to define the right scope.',
      icon: Compass,
    },
    {
      number: 2,
      title: 'Design',
      description: 'Structure and interface design focused on clarity, usability, and your brand.',
      icon: PenTool,
    },
    {
      number: 3,
      title: 'Build',
      description: 'Development in iterations, with regular check-ins so nothing is a surprise at the end.',
      icon: Code2,
    },
    {
      number: 4,
      title: 'Launch & support',
      description: 'We deploy, monitor, and stay available for updates and fixes after launch.',
      icon: Rocket,
    },
  ];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: 'Services', href: '/en/services' },
          { label: service.title, href: `/en/services/${service.slug}` },
        ]}
      />
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url={`/en/services/${service.slug}`}
        serviceType="Website & Web Application Development"
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
              {service.title}
            </span>
            <h1 className="text-role-hero mb-4">Websites and Web Applications Built for Your Business</h1>
            <p className="text-role-body-lg">
              Whether you need a marketing site, a customer-facing web application, or an internal portal,
              we design and build it to work the way your business actually operates.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What we build"
        description="Three common starting points — and we can combine them as your needs grow."
        features={whatWeBuild}
        columns={3}
        darkMode={false}
      />

      <HowItWorks
        title="Our approach"
        description="A straightforward process from first conversation to a live, supported product."
        steps={steps}
        darkMode={false}
      />

      {industries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">Related industries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/sectoral-software/${industry.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-role-body text-sm leading-relaxed mb-4">{industry.summary}</p>
                  <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">Related services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-role-body text-sm">{item.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <Link
            href="/web-design-examples"
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="max-w-xl">
              <span className="text-role-eyebrow inline-block bg-white px-3 py-1 rounded-full mb-3 text-violet-600">
                Web Design Examples
              </span>
              <h2 className="text-role-section-heading mb-2">See What a Website Built by Us Looks Like</h2>
              <p className="text-role-body">
                Browse website concepts and design examples across industries to get a feel for our design
                quality before you start a project.
              </p>
            </div>
            <span className="text-role-navigation inline-flex items-center gap-2 text-violet-600 font-semibold group-hover:gap-3 transition-all whitespace-nowrap">
              View examples <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      </section>

      <ProductCTASection
        title="Ready to build your website or web application?"
        description="Tell us about your business and what you need. We'll recommend the right approach and scope."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
