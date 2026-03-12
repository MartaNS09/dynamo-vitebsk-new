// import { BlogPost, BlogCategory } from "@/types/blog.types";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// // Получить все посты
// export async function getBlogPosts(published?: boolean): Promise<BlogPost[]> {
//   const url = published
//     ? `${API_BASE_URL}/blog?published=true`
//     : `${API_BASE_URL}/blog`;
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Ошибка загрузки постов");
//   return res.json();
// }

// // Получить опубликованные посты (для сайта)
// export async function getPublishedPosts(): Promise<BlogPost[]> {
//   return getBlogPosts(true);
// }

// // Получить пост по slug
// export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
//   const res = await fetch(`${API_BASE_URL}/blog/slug/${slug}`);
//   if (!res.ok) throw new Error("Пост не найден");
//   return res.json();
// }

// // Получить пост по ID
// export async function getBlogPostById(id: string): Promise<BlogPost> {
//   const res = await fetch(`${API_BASE_URL}/blog/${id}`);
//   if (!res.ok) throw new Error("Пост не найден");
//   return res.json();
// }

// // Получить категории
// export async function getBlogCategories(): Promise<BlogCategory[]> {
//   const res = await fetch(`${API_BASE_URL}/blog/categories`);
//   if (!res.ok) throw new Error("Ошибка загрузки категорий");
//   return res.json();
// }

// // Создать пост
// export async function createBlogPost(
//   data: Partial<BlogPost>,
// ): Promise<BlogPost> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_BASE_URL}/blog`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Ошибка создания поста");
//   return res.json();
// }

// // Обновить пост
// export async function updateBlogPost(
//   id: string,
//   data: Partial<BlogPost>,
// ): Promise<BlogPost> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Ошибка обновления поста");
//   return res.json();
// }

// // Удалить пост
// export async function deleteBlogPost(id: string): Promise<void> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_BASE_URL}/blog/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Ошибка удаления поста");
// }

// новый

// import { BlogPost, BlogCategory } from "@/types/blog.types";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// // Получить все посты
// export async function getBlogPosts(published?: boolean): Promise<BlogPost[]> {
//   const url = published ? `${API_URL}/blog?published=true` : `${API_URL}/blog`;
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Ошибка загрузки постов");
//   return res.json();
// }

// // Получить опубликованные посты (для сайта)
// export async function getPublishedPosts(): Promise<BlogPost[]> {
//   return getBlogPosts(true);
// }

// // Получить пост по slug
// export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
//   const res = await fetch(`${API_URL}/blog/slug/${slug}`);
//   if (!res.ok) throw new Error("Пост не найден");
//   return res.json();
// }

// // Получить пост по ID
// export async function getBlogPostById(id: string): Promise<BlogPost> {
//   const res = await fetch(`${API_URL}/blog/${id}`);
//   if (!res.ok) throw new Error("Пост не найден");
//   return res.json();
// }

// // Получить категории
// export async function getBlogCategories(): Promise<BlogCategory[]> {
//   const res = await fetch(`${API_URL}/blog/categories`);
//   if (!res.ok) throw new Error("Ошибка загрузки категорий");
//   return res.json();
// }

// // Создать пост
// export async function createBlogPost(
//   data: Partial<BlogPost>,
// ): Promise<BlogPost> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_URL}/blog`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Ошибка создания поста");
//   return res.json();
// }

// // Обновить пост
// export async function updateBlogPost(
//   id: string,
//   data: Partial<BlogPost>,
// ): Promise<BlogPost> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_URL}/blog/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error("Ошибка обновления поста");
//   return res.json();
// }

// // Удалить пост
// export async function deleteBlogPost(id: string): Promise<void> {
//   const token = localStorage.getItem("access_token");
//   const res = await fetch(`${API_URL}/blog/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error("Ошибка удаления поста");
// }

// // Для совместимости с blogAPI
// export const blogAPI = {
//   getAll: getBlogPosts,
//   getById: getBlogPostById,
//   getBySlug: getBlogPostBySlug,
//   create: createBlogPost,
//   update: updateBlogPost,
//   delete: deleteBlogPost,
//   getCategories: getBlogCategories,
// };

// 11 марта
import { BlogPost, BlogCategory } from "@/types/blog.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Получить все посты
export async function getBlogPosts(published?: boolean): Promise<BlogPost[]> {
  const url = published ? `${API_URL}/blog?published=true` : `${API_URL}/blog`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Ошибка загрузки постов");
  return res.json();
}

// Получить опубликованные посты (для сайта)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getBlogPosts(true);
}

// Получить пост по slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const res = await fetch(`${API_URL}/blog/slug/${slug}`);
  if (!res.ok) throw new Error("Пост не найден");
  return res.json();
}

// Получить пост по ID
export async function getBlogPostById(id: string): Promise<BlogPost> {
  console.log("🔍 Загружаем пост по ID:", id);
  const res = await fetch(`${API_URL}/blog/${id}`);
  if (!res.ok) throw new Error("Пост не найден");
  const data = await res.json();
  console.log("✅ Загружен пост:", data);
  return data;
}

// Получить категории
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const res = await fetch(`${API_URL}/blog/categories`);
  if (!res.ok) throw new Error("Ошибка загрузки категорий");
  return res.json();
}

// Создать пост
export async function createBlogPost(
  data: Partial<BlogPost>,
): Promise<BlogPost> {
  const token = localStorage.getItem("access_token");
  console.log("📝 Создание нового поста");
  const res = await fetch(`${API_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Ошибка создания поста");
  return res.json();
}

// Обновить пост
export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>,
): Promise<BlogPost> {
  console.log("🔄 Начинаем обновление поста ID:", id);
  console.log("📦 Данные для обновления:", JSON.stringify(data, null, 2));

  const token = localStorage.getItem("access_token");
  console.log("🔑 Токен:", token ? "есть" : "нет");

  const url = `${API_URL}/blog/${id}`;
  console.log("📡 URL запроса:", url);

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    console.log("📊 Статус ответа:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Текст ошибки:", errorText);
      throw new Error(`Ошибка ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    console.log("✅ Результат обновления:", result);
    return result;
  } catch (error) {
    console.error("❌ Ошибка в updateBlogPost:", error);
    throw error;
  }
}

// Удалить пост
export async function deleteBlogPost(id: string): Promise<void> {
  const token = localStorage.getItem("access_token");
  console.log("🗑️ Удаление поста ID:", id);
  const res = await fetch(`${API_URL}/blog/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Ошибка удаления:", errorText);
    throw new Error("Ошибка удаления поста");
  }
  console.log("✅ Пост успешно удален");
}

// Для совместимости с blogAPI
export const blogAPI = {
  getAll: getBlogPosts,
  getById: getBlogPostById,
  getBySlug: getBlogPostBySlug,
  create: createBlogPost,
  update: updateBlogPost,
  delete: deleteBlogPost,
  getCategories: getBlogCategories,
};
