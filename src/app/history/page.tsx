import { Metadata } from "next";
import HistoryHero from "./components/HistoryHero/HistoryHero";
import TimelineSection from "./components/TimelineSection/TimelineSection";
import HistoricalDocument from "./components/HistoricalDocument/HistoricalDocument";
import AchievementsSection from "./components/AchievementsSection/AchievementsSection";
import "./page.scss";

export const metadata: Metadata = {
  title: "История СДЮШОР Динамо Витебск - 50+ лет побед и традиций | 1975-2025",
  description:
    "Полная история спортивной школы Динамо Витебск с 1975 года: от основания до современных достижений, олимпийские чемпионы, развитие видов спорта",
  keywords: [
    "история динамо витебск",
    "СДЮШОР история",
    "спортивная школа витебск",
    "динамо витебск 1975",
    "олимпийские чемпионы динамо",
    "история спортивной школы",
  ],
  openGraph: {
    title: "История СДЮШОР Динамо Витебск - 50+ лет спортивных побед",
    description: "Подробная хронология развития спортивной школы с 1975 года",
    type: "article",
    publishedTime: "2025-01-01T00:00:00Z",
    authors: ["СДЮШОР Динамо Витебск"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HistoryPage() {
  return (
    <div className="history-page" role="main" aria-label="История школы">
      <HistoryHero />
      <TimelineSection />
      <HistoricalDocument />
      <AchievementsSection />

      {/* Schema.org разметка для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "История СДЮШОР Динамо Витебск - 50+ лет побед",
            description: metadata.description,
            image: "https://dynamovitebsk.by/og-image-history.jpg",
            author: {
              "@type": "Organization",
              name: "СДЮШОР Динамо Витебск",
            },
            publisher: {
              "@type": "Organization",
              name: "СДЮШОР Динамо Витебск",
              logo: {
                "@type": "ImageObject",
                url: "https://dynamovitebsk.by/logo.png",
              },
            },
            datePublished: "2025-01-01",
            dateModified: "2025-01-01",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://dynamovitebsk.by/history",
            },
          }),
        }}
      />
    </div>
  );
}
