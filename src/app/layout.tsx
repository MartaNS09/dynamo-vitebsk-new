// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme/ThemeProvider";
// import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
// import { Header } from "@/components/layout/header/Header";
// import Footer from "@/components/layout/footer/Footer";
// import CookieConsent from "@/components/cookie/CookieConsent";
// import "./globals.scss";

// const inter = Inter({
//   subsets: ["latin", "cyrillic"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("http://localhost:3000"),
//   title:
//     "Динамо Витебск - СДЮШОР | Специализированная школа олимпийского резерва",
//   description: "Официальный сайт СДЮШОР Динамо Витебск...",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ru" dir="ltr" data-scroll-behavior="smooth">
//       <body className={inter.className}>
//         <ThemeProvider>
//           <div className="page-wrapper">
//             <Header />
//             <main className="main-content">
//               <FloatingThemeToggle />
//               {children}
//             </main>
//             <Footer />
//             {/* Добавляем баннер cookie - безопасно, без зависимостей */}
//             <CookieConsent />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
import { Header } from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import CookieConsent from "@/components/cookie/CookieConsent";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { AuthProvider } from "@/contexts/AuthContext";
import { getSiteUrl, SITE_NAME, toAbsoluteUrl } from "@/lib/seo/site";
import {
  GA_MEASUREMENT_ID,
  YM_COUNTER_ID,
  isGaEnabled,
  isYmEnabled,
} from "@/lib/analytics/track";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Спортивная школа в Витебске`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Официальный сайт СДЮШОР Динамо Витебск: спортивные секции для детей и взрослых, тренеры, расписание, запись онлайн.",
  keywords: [
    "СДЮШОР Динамо Витебск",
    "спортивная школа Витебск",
    "секции для детей Витебск",
    "спорт Витебск",
    "запись в секцию Витебск",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Спортивная школа в Витебске`,
    description:
      "Спортивные секции в Витебске, тренерский состав, новости и онлайн-запись в СДЮШОР Динамо.",
    images: [
      {
        url: toAbsoluteUrl("/logo-dynamo.png"),
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Спортивная школа в Витебске`,
    description:
      "Секции, тренеры, новости и запись в спортивную школу Динамо Витебск.",
    images: [toAbsoluteUrl("/logo-dynamo.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="page-wrapper">
              <Header />
              <main className="main-content">
                <FloatingThemeToggle />
                {isGaEnabled && (
                  <>
                    <Script
                      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                      strategy="afterInteractive"
                    />
                    <Script id="ga-init" strategy="afterInteractive">
                      {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        window.gtag = gtag;
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
                      `}
                    </Script>
                  </>
                )}
                {isYmEnabled && (
                  <Script id="ym-init" strategy="afterInteractive">
                    {`
                      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                      m[i].l=1*new Date();
                      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                      ym(${YM_COUNTER_ID}, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                      });
                    `}
                  </Script>
                )}
                <AnalyticsTracker />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "SportsOrganization",
                      name: SITE_NAME,
                      url: getSiteUrl(),
                      logo: toAbsoluteUrl("/logo-dynamo.png"),
                      areaServed: {
                        "@type": "City",
                        name: "Витебск",
                      },
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: "Витебск",
                        addressCountry: "BY",
                      },
                    }),
                  }}
                />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: SITE_NAME,
                      url: getSiteUrl(),
                      inLanguage: "ru",
                      potentialAction: {
                        "@type": "SearchAction",
                        target: `${getSiteUrl()}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string",
                      },
                    }),
                  }}
                />
                {children}
              </main>
              <Footer />
              <CookieConsent />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
