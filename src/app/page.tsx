// import { Hero } from "@/components/sections/hero/Hero";
// import { Features } from "@/components/sections/features/Features";

// export default function Home() {
//   return (
//     <main className="main-content">
//       <Hero />
//       <Features />
//       {/* Здесь будут другие секции: Sports, News, CTA */}
//     </main>
//   );
// }

// import { Hero } from "@/components/sections/hero/Hero";
// import { Features } from "@/components/sections/features/Features";
// import { HistorySection } from "@/components/sections/history/HistorySection";
// // Пока закомментируем остальные секции
// // import { LegendsSlider } from "@/components/sections/legends/LegendsSlider";
// // import { SportsSection } from "@/components/sections/sports/SportsSection";

// export default function Home() {
//   return (
//     <main className="main-content">
//       <Hero />
//       <Features />
//       <HistorySection />
//       {/* Позже добавим остальные секции */}
//       {/* <LegendsSlider /> */}
//       {/* <SportsSection /> */}
//       <div
//         className="container"
//         style={{ padding: "40px 0", textAlign: "center" }}
//       >
//         <p style={{ color: "var(--text-secondary)" }}>
//           Другие секции будут добавлены в ближайшее время...
//         </p>
//       </div>
//     </main>
//   );
// }
import { Hero } from "@/components/sections/hero/Hero";
import { Features } from "@/components/sections/features/Features";
import { HistorySection } from "@/components/sections/history/HistorySection";
import { LegendsSlider } from "@/components/sections/legends/LegendsSlider";
import { ContactCTA } from "@/components/sections/cta/ContactCTA";

export default function Home() {
  return (
    <main className="main-content">
      <Hero />
      <Features />
      <HistorySection />
      <LegendsSlider />
      <ContactCTA />
    </main>
  );
}
