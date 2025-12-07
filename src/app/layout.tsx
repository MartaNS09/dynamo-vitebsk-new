// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { ThemeProvider } from "@/components/theme/ThemeProvider";
// import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
// import { Header } from "@/components/layout/header/Header";
// import Footer from "@/components/layout/footer/Footer";
// import "./globals.scss";

// const inter = Inter({
//   subsets: ["latin", "cyrillic"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title:
//     "Динамо Витебск - СДЮШОР | Специализированная школа олимпийского резерва",
//   description:
//     "Официальный сайт СДЮШОР Динамо Витебск. Подготовка спортсменов высокого класса, олимпийских чемпионов. Бокс, дзюдо, легкая атлетика, тяжелая атлетика, стрельба, лыжные гонки, велоспорт.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ru" dir="ltr">
//       <body className={inter.className}>
//         <div className="page-wrapper">
//           <AntdRegistry>
//             <ThemeProvider>
//               <Header />
//               <main className="main-content">
//                 <FloatingThemeToggle />
//                 {children}
//               </main>
//               <Footer />
//             </ThemeProvider>
//           </AntdRegistry>
//         </div>
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
import { Header } from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Динамо Витебск - СДЮШОР | Специализированная школа олимпийского резерва",
  description:
    "Официальный сайт СДЮШОР Динамо Витебск. Подготовка спортсменов высокого класса, олимпийских чемпионов. Бокс, дзюдо, легкая атлетика, тяжелая атлетика, стрельба, лыжные гонки, велоспорт.",
};

// ✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ - Добавьте этот блок!
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr">
      <body className={inter.className}>
        <div className="page-wrapper">
          <AntdRegistry>
            <ThemeProvider>
              <Header />
              <main className="main-content">
                <FloatingThemeToggle />
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
