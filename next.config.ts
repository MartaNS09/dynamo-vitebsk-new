/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // ДОБАВЛЯЕМ ВСЕ ИСПОЛЬЗУЕМЫЕ КАЧЕСТВА
    qualities: [75, 80, 85, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  compress: true,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "react-icons"],
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
