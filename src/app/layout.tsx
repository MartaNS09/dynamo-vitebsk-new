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
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
import { Header } from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import CookieConsent from "@/components/cookie/CookieConsent";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title:
    "Динамо Витебск - СДЮШОР | Специализированная школа олимпийского резерва",
  description: "Официальный сайт СДЮШОР Динамо Витебск",
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
