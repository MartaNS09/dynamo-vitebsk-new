import { useState, useEffect } from "react";
import { BlogPost, BlogCategory } from "@/types/blog.types";
import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
} from "@/lib/api/blog";

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки постов");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getBlogCategories();
      setCategories(data);
    } catch (err) {
      console.error("Ошибка загрузки категорий:", err);
    }
  };

  const loadPost = async (id: string) => {
    setLoading(true);
    try {
      const data = await getBlogPostById(id);
      setError(null);
      return data;
    } catch (err) {
      setError("Ошибка загрузки поста");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (id: string | null, data: Partial<BlogPost>) => {
    setLoading(true);
    try {
      if (id && id !== "new") {
        await updateBlogPost(id, data);
      } else {
        await createBlogPost(data);
      }
      await loadPosts();
      setError(null);
      return true;
    } catch (err) {
      setError("Ошибка сохранения поста");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id: string) => {
    setLoading(true);
    try {
      await deleteBlogPost(id);
      await loadPosts();
      setError(null);
      return true;
    } catch (err) {
      setError("Ошибка удаления поста");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  return {
    posts,
    categories,
    loading,
    error,
    loadPosts,
    loadPost,
    savePost,
    removePost,
  };
}
