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
