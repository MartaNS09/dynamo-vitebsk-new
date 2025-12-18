import { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Спортивные секции в Витебске | СДЮШОР Динамо Витебск",
  description: "Все спортивные секции СДЮШОР Динамо Витебск...",
  openGraph: {
    title: "Спортивные секции | СДЮШОР Динамо Витебск",
    description: "Профессиональные спортивные секции для детей и взрослых",
    type: "website",
    url: "https://dynamovitebsk.by/sports",
  },
};

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
