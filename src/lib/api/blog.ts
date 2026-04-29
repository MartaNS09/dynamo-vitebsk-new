import { BlogPost } from "@/types/blog.types";

const API_BASE_URL =
  typeof window === "undefined"
    ? process.env["API_URL_SERVER"] || "http://127.0.0.1:4000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const NORMALIZED_API_BASE_URL = API_BASE_URL.replace(/\/+$/, "");

function authHeaders(): HeadersInit {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

type BlogPayload = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  gallery?: string[];
  author?: { name: string };
  category: BlogPost["category"];
  tags: string[];
  publishedAt: string;
  readTime?: number;
  views?: number;
  isFeatured: boolean;
  isPinned: boolean;
  seo?: { metaTitle: string; metaDescription: string };
  published?: boolean;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/blog`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Ошибка загрузки постов");
  return response.json();
}

export async function getBlogPostById(id: string): Promise<BlogPost> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/blog/${id}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Пост не найден");
  return response.json();
}

export async function createBlogPost(payload: BlogPayload): Promise<BlogPost> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/blog`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function updateBlogPost(
  id: string,
  payload: BlogPayload,
): Promise<BlogPost> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/blog/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function deleteBlogPost(id: string): Promise<void> {
  const response = await fetch(`${NORMALIZED_API_BASE_URL}/blog/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error(await response.text());
}
