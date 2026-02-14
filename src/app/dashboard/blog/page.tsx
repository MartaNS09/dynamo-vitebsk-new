import { Metadata } from "next";
import BlogTable from "@/components/admin/blog/BlogTable";

export const metadata: Metadata = {
  title: "Управление блогом | Панель управления",
  description: "Управление статьями и новостями блога",
};

export default function BlogAdminPage() {
  return <BlogTable />;
}
