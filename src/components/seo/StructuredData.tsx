import { ALL_SECTIONS } from "@/data/sport-sections";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "СДЮШОР Динамо Витебск",
    description: "Спортивные секции для детей и взрослых",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Витебск",
      streetAddress: "ул. Спортивная, 15",
    },
    makesOffer: ALL_SECTIONS.map((section) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "SportsActivityLocation",
        name: section.name,
        description: section.shortDescription,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
