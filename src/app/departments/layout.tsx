import type { Metadata } from "next";
import "../globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Спортивные отделения | СДЮШОР Динамо Витебск",
    template: "%s | СДЮШОР Динамо Витебск",
  },
  description: "Профессиональные спортивные отделения СДЮШОР Динамо Витебск",
};

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
