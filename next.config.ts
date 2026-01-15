// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   sassOptions: {
//     silenceDeprecations: ["legacy-js-api"],
//   },

//   experimental: {
//     optimizeCss: false,
//   },

//   images: {
//     formats: ["image/webp", "image/avif"],

//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

//     // ДОБАВЛЯЕМ НЕДОСТАЮЩИЕ КАЧЕСТВА
//     qualities: [70, 75, 85, 90],

//     minimumCacheTTL: 60 * 60 * 24, // 1 день

//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],

//     disableStaticImages: false,
//   },

//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production" && {
//       exclude: ["error", "warn"],
//     },
//   },

//   compress: true,
//   poweredByHeader: false,
//   generateEtags: true,

//   // Оптимизация для производительности
//   swcMinify: true,

//   // Для лучшего кэширования
//   headers: async () => [
//     {
//       source: "/:path*",
//       headers: [
//         {
//           key: "Cache-Control",
//           value: "public, max-age=3600, stale-while-revalidate=86400",
//         },
//       ],
//     },
//   ],
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" && {
      exclude: ["error", "warn"],
    },
  },
};

module.exports = nextConfig;
