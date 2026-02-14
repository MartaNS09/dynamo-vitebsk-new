import { Metadata } from "next";
import SectionsTable from "@/components/admin/sections/SectionsTable";

export const metadata: Metadata = {
  title: "Спортивные секции | Панель управления",
  description: "Управление спортивными секциями СДЮШОР Динамо Витебск",
};

export default function SectionsPage() {
  return <SectionsTable />;
}
