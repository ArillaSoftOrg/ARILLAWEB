import type { NextConfig } from "next";

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
      // Services → Hizmetler
      {
        source: "/services",
        destination: "/hizmetler",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/hizmetler/:slug",
        permanent: true,
      },
      // Blog → Kurumsal/Blog
      {
        source: "/blog",
        destination: "/kurumsal/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/kurumsal/blog/:slug",
        permanent: true,
      },
      // Hakkımızda → Kurumsal/Hakkımızda
      {
        source: "/hakkimizda",
        destination: "/kurumsal/hakkimizda",
        permanent: true,
      },
      // İletişim → Kurumsal/İletişim
      {
        source: "/iletisim",
        destination: "/kurumsal/iletisim",
        permanent: true,
      },
      // Projects → Homepage
      {
        source: "/projects",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;