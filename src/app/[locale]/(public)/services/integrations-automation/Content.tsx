'use client';

import { Plug, Workflow, Link2, Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { getServiceMeta, getIndustriesForService, SERVICES } from '@/lib/en-site-data';

const SERVICE_SLUG = 'integrations-automation' as const;

export default function IntegrationsAutomationContent() {
  const service = getServiceMeta(SERVICE_SLUG);
  const industries = getIndustriesForService(SERVICE_SLUG);
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'custom-software-admin-panels' || item.slug === 'maintenance-technical-support'
  );

  const whatWeBuild = [
    {
      icon: Plug,
      title: 'API integrations',
      description:
        'Custom integrations between your CRM, accounting, booking, or e-commerce systems so data flows automatically instead of being re-entered by hand.',
    },
    {
      icon: Workflow,
      title: 'Workflow automation',
      description:
        'Automated processes for repetitive tasks — order routing, notifications, approvals, and data syncing — triggered by the events that matter to your business.',
    },
    {
      icon: Link2,
      title: 'Third-party connectors',
      description:
        'Reliable connections to payment providers, marketplaces, messaging platforms, and other external services your business depends on.',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Audit current workflow',
      description: 'We map out the tools you use today and identify where manual work and data gaps slow you down.',
      icon: Search,
    },
    {
      number: 2,
      title: 'Design integration',
      description: 'We define the data flow, triggers, and error handling needed to connect your systems reliably.',
      icon: PenTool,
    },
    {
      number: 3,
      title: 'Build & test',
      description: 'We build the integration and test it against real data and edge cases before it touches production.',
      icon: Code2,
    },
    {
      number: 4,
      title: 'Launch & monitor',
      description: 'We deploy the integration and monitor it so issues are caught early, not after they cause problems.',
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
        serviceType="Integrations and Business Process Automation"
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
            <h1 className="text-role-hero mb-4">Integrations and Business Process Automation</h1>
            <p className="text-role-body-lg">
              If your team is juggling disconnected tools or copying data between systems by hand, we connect
              them and automate the repetitive work in between.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What we build"
        description="Practical integrations and automations that remove manual work from your day-to-day operations."
        features={whatWeBuild}
        columns={3}
        darkMode={false}
      />

      <HowItWorks
        title="Our approach"
        description="A focused process for connecting your systems without disrupting how your business already runs."
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

      <ProductCTASection
        title="Ready to connect your systems?"
        description="Tell us which tools you use today and where the manual work is. We'll recommend where automation makes the biggest difference."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
