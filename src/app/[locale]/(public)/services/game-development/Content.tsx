'use client';

import { ArrowRight, Gamepad2, Smartphone, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ProductCTASection from '@/components/sections/ProductCTASection';
import { SERVICES, getServiceMeta } from '@/lib/en-site-data';

export default function GameDevelopmentContent() {
  const service = getServiceMeta('game-development');
  const relatedServices = SERVICES.filter(
    (item) => item.slug === 'mobile-application' || item.slug === 'website-web-application'
  );

  const features = [
    {
      icon: Gamepad2,
      title: '2D & 3D Game Development',
      description:
        'We build 2D and 3D games using tools and engines suited to the scope of the project, from simple browser games to more involved interactive builds.',
    },
    {
      icon: Smartphone,
      title: 'Web & Mobile Platforms',
      description:
        'Games and interactive experiences built to run in the browser or as native and cross-platform mobile apps, depending on where your audience is.',
    },
    {
      icon: Sparkles,
      title: 'Gamification & Interactive Experiences',
      description:
        'Mini-games, quizzes, and gamified features that can be embedded into an existing website or app, or delivered as a standalone promotional experience.',
    },
  ];

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          { label: 'Services', href: '/en/services' },
          { label: service.title, href: '/en/services/game-development' },
        ]}
      />
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url="/en/services/game-development"
        serviceType="Game Development"
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
            <h1 className="text-role-hero mb-4">Game Development for Web and Mobile</h1>
            <p className="text-role-body-lg">
              We build 2D and 3D games, interactive experiences, and gamified features for web and
              mobile — a newer part of our software practice, offered alongside our core web and app
              development work.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="What we build"
        description="From a self-contained browser game to a gamified feature inside a larger product."
        features={features}
        columns={3}
        darkMode={false}
      />

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

      <ProductCTASection
        title="Have a game or interactive project in mind?"
        description="Tell us about what you're trying to build and we'll let you know how we can help."
        primaryButton={{ label: 'Book a Free Discovery Call', href: '/teklif-al' }}
        secondaryButton={{ label: 'Contact Us', href: '/kurumsal/iletisim' }}
        badgeLabel="Free Discovery Call"
      />
    </main>
  );
}
