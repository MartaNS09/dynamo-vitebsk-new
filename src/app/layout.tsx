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
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
    <html
      lang="ru"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={inter.variable}
    >
      <head>
        {/* 🔴 КРИТИЧЕСКИ ВАЖНО: Оптимизированная загрузка Space Grotesk */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="page-wrapper">
            <Header />
            <main className="main-content">
              <FloatingThemeToggle />
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
