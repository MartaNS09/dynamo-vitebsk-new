// последнее новое

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

// супер последнее новое

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Важно для SCSS модулей
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  // Для production
  experimental: {
    optimizeCss: false,
  },

  images: {
    // ✅ ОПТИМИЗАЦИЯ ДЛЯ LIGHTHOUSE
    formats: ["image/webp"], // Только WebP - самый легкий формат
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Если будут внешние изображения
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    // ✅ ОПЦИИ ДЛЯ ПРОИЗВОДИТЕЛЬНОСТИ
    minimumCacheTTL: 60, // Кэшировать на 60 секунд
    disableStaticImages: false, // Разрешить статические изображения
  },

  // ✅ ДОПОЛНИТЕЛЬНЫЕ ОПТИМИЗАЦИИ
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Убрать console.log в продакшене
  },

  // ✅ КОМПРЕССИЯ
  compress: true,
};

module.exports = nextConfig;
