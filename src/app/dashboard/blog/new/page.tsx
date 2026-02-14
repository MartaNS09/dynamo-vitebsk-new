import { Metadata } from "next";
import BlogForm from "@/components/admin/blog/BlogForm";

export const metadata: Metadata = {
  title: "Новая статья | Управление блогом",
  description: "Создание новой статьи для блога",
};

export default function NewBlogPostPage() {
  return <BlogForm />;
}
