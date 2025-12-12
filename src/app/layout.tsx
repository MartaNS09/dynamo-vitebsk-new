// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
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
//           <ThemeProvider>
//             <Header />
//             <main className="main-content">
//               <FloatingThemeToggle />
//               {children}
//             </main>
//             <Footer />
//           </ThemeProvider>
//         </div>
//       </body>
//     </html>
//   );
// }

// app/layout.tsx (ваш RootLayout.tsx)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  description: "Официальный сайт СДЮШОР Динамо Витебск...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr">
      {/* ▼▼▼ ДОБАВЬТЕ ЭТОТ БЛОК ▼▼▼ */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      {/* ▲▲▲ ДОБАВЬТЕ ЭТОТ БЛОК ▲▲▲ */}

      <body className={inter.className}>
        <div className="page-wrapper">
          <ThemeProvider>
            <Header />
            <main className="main-content">
              <FloatingThemeToggle />
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
