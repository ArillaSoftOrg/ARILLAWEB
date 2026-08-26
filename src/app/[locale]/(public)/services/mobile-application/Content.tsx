'use client';

import { Smartphone, Layers, Scale, Search, PenTool, Code2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { getServiceMeta, getIndustriesForService } from '@/lib/en-site-data';

export default function MobileApplicationContent() {
  const service = getServiceMeta('mobile-application');
  const relatedIndustries = getIndustriesForService('mobile-application');
  const relatedServices = [getServiceMeta('website-web-application'), getServiceMeta('integrations-automation')];

  const features = [
    {
      icon: Smartphone,
      title: 'Native iOS & Android',
      description:
        'Fully native apps built with platform-specific tools for the best possible performance, look, and feel on each device.',
    },
    {
      icon: Layers,
      title: 'Cross-Platform',
      description:
        'A single codebase that ships to both iOS and Android, reducing development time and cost without compromising on quality.',
    },
    {
      icon: Scale,
      title: 'App vs. Web Application',
      description:
        'We help you decide whether a dedicated app is the right investment, or whether a mobile-friendly website or web application already meets the need.',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Discovery',
      description: 'We review your goals, users, and existing systems to define what the app needs to do.',
      icon: Search,
    },
    {
      number: 2,
      title: 'Design',
      description: 'Wireframes and UI design tailored to your users, reviewed with you before development begins.',
      icon: PenTool,
    },
    {
      number: 3,
      title: 'Build',
      description: 'Development in short cycles, with working builds you can test throughout the project.',
      icon: Code2,
    },
    {
      number: 4,
      title: 'Launch & Support',
      description: 'App store submission, release, and ongoing updates and technical support after launch.',
      icon: Rocket,
    },
  ];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: 'Services', href: '/en/services' },
          { label: service.title, href: '/en/services/mobile-application' },
        ]}
      />
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url="/en/services/mobile-application"
        serviceType="Mobile Application Development"
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
            <h1 className="text-role-hero mb-4">Native and Cross-Platform Mobile Apps</h1>
            <p className="text-role-body-lg">
              A dedicated mobile app for your customers or staff, built and supported by a team that
              also handles the web, backend, and integrations around it.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What we build"
        description="From fully native apps to shared cross-platform codebases, matched to what your business actually needs."
        features={features}
        columns={3}
        darkMode={false}
      />

      <HowItWorks
        title="Our approach"
        description="A straightforward process from first conversation to a live app in the store."
        steps={steps}
        darkMode={false}
      />

      {relatedIndustries.length > 0 && (
        <section className="section-py" style={{ paddingTop: 0 }}>
          <div className="section-container">
            <h2 className="text-role-section-heading mb-8">Related industries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/sectoral-software/${industry.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-role-subheading mb-1 group-hover:text-violet-600 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-role-body text-sm">{industry.summary}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-violet-600 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
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
        title="Ready to talk about your mobile app?"
        description="Book a free discovery call and we'll walk through whether an app, a web application, or both fits your business."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
