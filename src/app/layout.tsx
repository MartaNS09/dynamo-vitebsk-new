// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import { ThemeProvider } from "@/components/theme/ThemeProvider";
// import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
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
//         <AntdRegistry>
//           <ThemeProvider>
//             <FloatingThemeToggle />
//             {children}
//           </ThemeProvider>
//         </AntdRegistry>
//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx - ИСПРАВЛЕННАЯ ВЕРСИЯ
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FloatingThemeToggle } from "@/components/theme/FloatingThemeToggle";
import { Header } from "@/components/layout/header/Header"; // Импорт с фигурными скобками!
import Footer from "@/components/layout/footer/Footer"; // Футер default - без скобок
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" dir="ltr">
      <body className={inter.className}>
        <AntdRegistry>
          <ThemeProvider>
            <Header /> {/* Теперь правильно! */}
            <main className="main-content">
              <FloatingThemeToggle />
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
