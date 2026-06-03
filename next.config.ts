import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
    ],
  },
  async redirects() {
    return [
      // Services → /tr/hizmetler (default locale)
      {
        source: "/services",
        destination: "/tr/hizmetler",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/tr/hizmetler/:slug",
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
