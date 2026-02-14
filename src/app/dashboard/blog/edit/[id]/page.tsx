import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/blog/BlogForm";
import { blogPosts } from "@/data/blog-posts";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditBlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return {
      title: "Статья не найдена",
    };
  }

  return {
    title: `Редактирование: ${post.title}`,
    description: `Редактирование статьи "${post.title}"`,
  };
}

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return <BlogForm post={post} />;
}
