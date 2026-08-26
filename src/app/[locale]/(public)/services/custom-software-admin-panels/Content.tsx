'use client';

import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  UsersRound,
  Search,
  PenTool,
  Code2,
  Rocket,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { getIndustriesForService, getServiceMeta, SERVICES } from '@/lib/en-site-data';

const SLUG = 'custom-software-admin-panels' as const;

export default function CustomSoftwareAdminPanelsContent() {
  const service = getServiceMeta(SLUG);
  const relatedIndustries = getIndustriesForService(SLUG);
  const integrationsService = SERVICES.find((item) => item.slug === 'integrations-automation')!;
  const maintenanceService = SERVICES.find((item) => item.slug === 'maintenance-technical-support')!;

  return (
    <main className="bg-white">
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url={`/en/services/${SLUG}`}
        serviceType="Custom Software Development"
      />
      <BreadcrumbJsonLd
        items={[
          { label: 'Services', href: '/en/services' },
          { label: service.title, href: `/en/services/${SLUG}` },
        ]}
      />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.title }]} />

      <section className="section-py">
        <div className="section-container">
          <div className="max-w-2xl">
            <span className="text-role-eyebrow inline-block bg-blue-100 px-3 py-1 rounded-full mb-4">
              Custom Software & Admin Panels
            </span>
            <h1 className="text-role-hero mb-4">Custom Software and Admin Panels for Your Operations</h1>
            <p className="text-role-body-lg">
              When off-the-shelf tools stop fitting the way your business works, we design and build
              software that does — from internal tools to full management dashboards.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What we build"
        description="Software shaped around your team's actual workflows, not a generic template."
        columns={3}
        darkMode={false}
        features={[
          {
            icon: LayoutDashboard,
            title: 'Bespoke Back-Office Tools',
            description:
              "Purpose-built applications for the operational work that generic software doesn't handle well — order tracking, scheduling, inventory, reporting, and more.",
          },
          {
            icon: Code2,
            title: 'Admin & Management Dashboards',
            description:
              'Centralized dashboards that give owners and managers real-time visibility into operations, staff activity, and business performance.',
          },
          {
            icon: ShieldCheck,
            title: 'Role-Based Staff Access',
            description:
              'Access control that matches your organization structure, so each staff member sees and edits only what their role requires.',
          },
        ]}
      />

      <HowItWorks
        title="Our approach"
        description="A straightforward process from first conversation to ongoing support."
        layout="horizontal"
        darkMode={false}
        steps={[
          {
            number: 1,
            title: 'Discovery',
            description: 'We learn how your team works today and identify where custom software adds the most value.',
            icon: Search,
          },
          {
            number: 2,
            title: 'Design',
            description: 'We map out workflows, roles, and screens before writing a line of code.',
            icon: PenTool,
          },
          {
            number: 3,
            title: 'Build',
            description: 'We develop the application in stages, with regular check-ins so you can review progress.',
            icon: Code2,
          },
          {
            number: 4,
            title: 'Launch & Support',
            description: 'We deploy the software, train your team, and stay on for ongoing updates and support.',
            icon: Rocket,
          },
        ]}
      />

      {relatedIndustries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">Industries we build this for</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedIndustries.map((industry) => (
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

      <section className="section-py" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <h2 className="text-role-section-heading mb-8">Related services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href={`/services/${integrationsService.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <UsersRound className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                {integrationsService.title}
              </h3>
              <p className="text-role-body text-sm leading-relaxed mb-4">{integrationsService.shortDescription}</p>
              <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href={`/services/${maintenanceService.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <ShieldCheck className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="text-role-subheading mb-2 group-hover:text-violet-600 transition-colors">
                {maintenanceService.title}
              </h3>
              <p className="text-role-body text-sm leading-relaxed mb-4">{maintenanceService.shortDescription}</p>
              <span className="mt-auto text-role-navigation inline-flex items-center gap-1 text-violet-600 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ProductCTASection
        title="Have a workflow that doesn't fit off-the-shelf software?"
        description="Tell us how your team works today. We'll help you scope a custom tool that fits."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
