import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Bare (unprefixed) hits on English-slug route trees. next-intl's
      // localePrefix:"always" auto-prefixes any unprefixed path with the
      // *default* locale (tr), which would send these straight into a
      // TR-locale request for an English-only slug and 404 (see the
      // locale gates in services/page.tsx, sectoral-software/page.tsx,
      // web-design-examples/page.tsx). Route them to their real /en/ home
      // instead. Do NOT translate the slug — these trees don't have a TR
      // equivalent path (see src/lib/en-site-data.ts href builders).
      {
        source: "/services",
        destination: "/en/services",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/en/services/:slug",
        permanent: true,
      },
      {
        source: "/sectoral-software",
        destination: "/en/sectoral-software",
        permanent: true,
      },
      {
        source: "/sectoral-software/:slug",
        destination: "/en/sectoral-software/:slug",
        permanent: true,
      },
      {
        source: "/web-design-examples",
        destination: "/en/web-design-examples",
        permanent: true,
      },
      // Blog → /tr/kurumsal/blog
      {
        source: "/blog",
        destination: "/tr/kurumsal/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/tr/kurumsal/blog/:slug",
        permanent: true,
      },
      // Hakkımızda → /tr/kurumsal/hakkimizda
      {
        source: "/hakkimizda",
        destination: "/tr/kurumsal/hakkimizda",
        permanent: true,
      },
      // İletişim → /tr/kurumsal/iletisim
      {
        source: "/iletisim",
        destination: "/tr/kurumsal/iletisim",
        permanent: true,
      },
      // Projects → /tr (homepage)
      {
        source: "/projects",
        destination: "/tr",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
