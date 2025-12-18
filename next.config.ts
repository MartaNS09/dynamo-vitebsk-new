// супер последнее и правильное

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,

//   // Важно для SCSS модулей
//   sassOptions: {
//     silenceDeprecations: ["legacy-js-api"],
//   },

//   // Для production
//   experimental: {
//     optimizeCss: false,
//   },

//   images: {
//     // ✅ ОПТИМИЗАЦИЯ ДЛЯ LIGHTHOUSE
//     formats: ["image/webp"], // Только WebP - самый легкий формат
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

//     // Если будут внешние изображения
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],

//     // ✅ ОПЦИИ ДЛЯ ПРОИЗВОДИТЕЛЬНОСТИ
//     minimumCacheTTL: 60, // Кэшировать на 60 секунд
//     disableStaticImages: false, // Разрешить статические изображения
//   },

//   // ✅ ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production", // Убрать console.log в продакшене
//   },

//   // ✅ КОМПРЕССИЯ
//   compress: true,
// };

// module.exports = nextConfig;

// самая последняя еще не провереная
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  experimental: {
    optimizeCss: false,
  },

  images: {
    formats: ["image/webp", "image/avif"],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    qualities: [75, 85],

    minimumCacheTTL: 60 * 60 * 24, // 1 день

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    disableStaticImages: false,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" && {
      exclude: ["error", "warn"],
    },
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Оптимизация для производительности
  swcMinify: true,

  // Для лучшего кэширования
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3600, stale-while-revalidate=86400",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
