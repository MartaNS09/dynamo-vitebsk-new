"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "@/components/admin/blog/BlogForm";
import { BlogPost } from "@/types/blog.types";
import { getBlogPostById } from "@/lib/api/blog";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogPostById(params.id);
        setPost(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) {
    return <div className="loading-spinner" />;
  }

  if (!post) {
    return <div>Статья не найдена</div>;
  }

  return <BlogForm post={post} />;
}
