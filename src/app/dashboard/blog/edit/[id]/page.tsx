// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import BlogForm from "@/components/admin/blog/BlogForm";
// import { blogPosts } from "@/data/blog-posts";

// interface EditBlogPostPageProps {
//   params: Promise<{ id: string }>;
// }

// export async function generateMetadata({
//   params,
// }: EditBlogPostPageProps): Promise<Metadata> {
//   const { id } = await params;
//   const post = blogPosts.find((p) => p.id === id);

//   if (!post) {
//     return {
//       title: "Статья не найдена",
//     };
//   }

//   return {
//     title: `Редактирование: ${post.title}`,
//     description: `Редактирование статьи "${post.title}"`,
//   };
// }

// export default async function EditBlogPostPage({
//   params,
// }: EditBlogPostPageProps) {
//   const { id } = await params;
//   const post = blogPosts.find((p) => p.id === id);

//   if (!post) {
//     notFound();
//   }

//   return <BlogForm post={post} />;
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogForm from "@/components/admin/blog/BlogForm";
import { getBlogPostById } from "@/lib/api/blog";
import { BlogPost } from "@/types/blog.types";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const data = await getBlogPostById(params.id as string);
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Ошибка загрузки поста");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error || !post) {
    return (
      <div className="error">
        <p>{error || "Пост не найден"}</p>
        <button onClick={() => router.push("/dashboard/blog")}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  return <BlogForm post={post} />;
}
