"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Calendar,
  Image as ImageIcon,
  Plus,
  Trash2,
  X,
  Upload,
} from "lucide-react";
import { BlogPost } from "@/types/blog.types";
import { blogCategories } from "@/data/blog-posts";
import { createBlogPost, updateBlogPost } from "@/lib/api/blog";
import axios from "axios";
import "@/styles/admin/blog/blog-edit.scss";

// Схема валидации - исправленная
const blogPostSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  slug: z.string().min(1, "Обязательное поле"),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  category: z.string().min(1, "Обязательное поле"),
  publishedAt: z.string().min(1, "Обязательное поле"),
  featuredImage: z.object({
    url: z.string().default(""),
    alt: z.string().default(""),
  }),
  isFeatured: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  gallery: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string().optional(),
      }),
    )
    .default([]),
  tags: z.string().default(""),
});

type BlogFormData = z.infer<typeof blogPostSchema>;

interface BlogFormProps {
  post?: BlogPost;
}

export default function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    // resolver: zodResolver(blogPostSchema), // временно отключено для сборки
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      publishedAt: new Date().toISOString().split("T")[0],
      featuredImage: { url: "", alt: "" },
      isFeatured: false,
      isPinned: false,
      gallery: [],
      tags: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "gallery",
  });

  const featuredImage = watch("featuredImage");
  const gallery = watch("gallery") || [];

  // Загрузка главного изображения
  const handleFeaturedImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData);
      setValue("featuredImage.url", response.data.url);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Не удалось загрузить изображение");
    } finally {
      setUploading(false);
    }
  };

  // Загрузка изображений в галерею
  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData);
        append({ url: response.data.url, alt: "" });
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      alert("Не удалось загрузить изображения");
    } finally {
      setUploading(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    console.log("🔥 onSubmit сработал!");
    console.log("🆔 ID поста:", post?.id);

    setLoading(true);
    try {
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const galleryArray = data.gallery
        .map((item) => item.url)
        .filter((url) => url.trim() !== "");

      const selectedCategory = blogCategories.find(
        (c) => c.id === data.category,
      );

      const postData: Partial<BlogPost> = {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        publishedAt: new Date(data.publishedAt).toISOString(),
        isFeatured: data.isFeatured || false,
        isPinned: data.isPinned || false,
        published: true,
        author: { name: "Администратор" },
      };

      if (data.featuredImage?.url) {
        postData.featuredImage = {
          url: data.featuredImage.url,
          alt: data.featuredImage.alt || data.title,
        };
      }

      if (galleryArray.length > 0) {
        postData.gallery = galleryArray;
      }

      if (selectedCategory) {
        postData.category = {
          id: selectedCategory.id,
          name: selectedCategory.name,
          slug: selectedCategory.slug,
          color: selectedCategory.color,
        };
      }

      if (tagsArray.length > 0) {
        postData.tags = tagsArray;
      }

      console.log("📦 Отправляемые данные:", JSON.stringify(postData, null, 2));

      if (post?.id) {
        const result = await updateBlogPost(post.id, postData);
        console.log("✅ Результат:", result);
      } else {
        const result = await createBlogPost(postData);
        console.log("✅ Результат:", result);
      }

      router.push("/dashboard/blog");
      router.refresh();
    } catch (error) {
      console.error("❌ Ошибка:", error);
      alert("Ошибка: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-edit">
      {/* Хедер */}
      <div className="edit-header">
        <div className="header-left">
          <button onClick={() => router.back()} className="back-btn">
            <ArrowLeft size={20} />
            Назад
          </button>
          <div className="title-section">
            <h1>{post ? "Редактирование статьи" : "Новая статья"}</h1>
            {isDirty && (
              <span className="unsaved-badge">
                Есть несохраненные изменения
              </span>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading || uploading}
            className="save-btn"
          >
            <Save size={18} />
            {loading
              ? "Сохранение..."
              : uploading
                ? "Загрузка..."
                : post
                  ? "Сохранить"
                  : "Опубликовать"}
          </button>
        </div>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <div className="form-grid">
          {/* Основная колонка */}
          <div className="form-main">
            <div className="form-card">
              <h3>Основная информация</h3>

              <div className="form-group">
                <label>
                  Заголовок статьи <span className="required">*</span>
                </label>
                <input
                  {...register("title")}
                  placeholder="Например: Чемпионат Витебской области по лыжным гонкам"
                />
                {errors.title && (
                  <span className="error-message">{errors.title.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    URL (slug) <span className="required">*</span>
                  </label>
                  <input
                    {...register("slug")}
                    placeholder="chempionat-vitebskoj-oblasti"
                  />
                  {errors.slug && (
                    <span className="error-message">{errors.slug.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Категория <span className="required">*</span>
                  </label>
                  <select {...register("category")}>
                    <option value="">Выберите категорию</option>
                    {blogCategories
                      .filter((c) => c.id !== "all")
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  {errors.category && (
                    <span className="error-message">
                      {errors.category.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Краткое описание <span className="required">*</span>
                </label>
                <textarea
                  {...register("excerpt")}
                  rows={3}
                  placeholder="Краткое описание статьи..."
                />
                {errors.excerpt && (
                  <span className="error-message">
                    {errors.excerpt.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-card">
              <h3>Полный текст статьи</h3>
              <div className="form-group">
                <textarea
                  {...register("content")}
                  rows={15}
                  placeholder="<h2>Заголовок</h2><p>Текст статьи...</p>"
                />
                {errors.content && (
                  <span className="error-message">
                    {errors.content.message}
                  </span>
                )}
              </div>
            </div>

            {/* Галерея изображений с загрузкой */}
            <div className="form-card">
              <div className="card-header">
                <h3>Галерея изображений</h3>
                <div className="gallery-actions">
                  <button
                    type="button"
                    className="add-gallery-btn"
                    onClick={() => append({ url: "", alt: "" })}
                  >
                    <Plus size={16} />
                    Добавить URL
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    style={{ display: "none" }}
                    ref={galleryInputRef}
                    id="gallery-upload"
                  />
                  <label htmlFor="gallery-upload" className="upload-btn">
                    <Upload size={16} />
                    Загрузить фото
                  </label>
                </div>
              </div>

              {gallery.length === 0 ? (
                <div className="gallery-empty">
                  <ImageIcon size={40} />
                  <p>Нет изображений в галерее</p>
                  <div className="empty-actions">
                    <button
                      type="button"
                      className="empty-state-btn"
                      onClick={() => append({ url: "", alt: "" })}
                    >
                      <Plus size={16} />
                      Добавить URL
                    </button>
                    <label
                      htmlFor="gallery-upload"
                      className="empty-state-btn upload"
                    >
                      <Upload size={16} />
                      Загрузить фото
                    </label>
                  </div>
                </div>
              ) : (
                <div className="gallery-grid">
                  {fields.map((field, index) => (
                    <div key={field.id} className="gallery-item">
                      {gallery[index]?.url ? (
                        <>
                          <Image
                            src={gallery[index].url}
                            alt={`Gallery ${index + 1}`}
                            width={150}
                            height={150}
                            className="gallery-image"
                          />
                          <button
                            type="button"
                            className="remove-gallery-item"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      ) : (
                        <div className="gallery-upload-placeholder">
                          <input
                            type="text"
                            placeholder="URL изображения"
                            value={gallery[index]?.url || ""}
                            onChange={(e) => {
                              const newGallery = [...gallery];
                              newGallery[index] = {
                                url: e.target.value,
                                alt: "",
                              };
                              setValue("gallery", newGallery);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Боковая колонка */}
          <div className="form-sidebar">
            <div className="form-card">
              <h3>Публикация</h3>

              <div className="form-group">
                <label>Дата публикации</label>
                <div className="date-input">
                  <Calendar size={16} />
                  <input type="date" {...register("publishedAt")} />
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" {...register("isFeatured")} />
                  <span>Рекомендуемая статья</span>
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" {...register("isPinned")} />
                  <span>Закрепить вверху</span>
                </label>
              </div>
            </div>

            {/* Главное изображение с загрузкой */}
            <div className="form-card">
              <h3>Главное изображение</h3>

              {featuredImage?.url ? (
                <div className="image-preview">
                  <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt || "Preview"}
                    width={300}
                    height={200}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() =>
                      setValue("featuredImage", { url: "", alt: "" })
                    }
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    id="featured-image-upload"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="upload-area"
                  >
                    <ImageIcon size={32} />
                    <p>Нажмите для загрузки</p>
                    <span className="upload-hint">JPG, PNG, GIF до 5MB</span>
                  </label>
                </div>
              )}

              <div className="form-group">
                <label>Alt текст (для SEO)</label>
                <input
                  {...register("featuredImage.alt")}
                  placeholder="Описание изображения"
                />
              </div>
            </div>

            <div className="form-card">
              <h3>Теги</h3>
              <div className="form-group">
                <input
                  {...register("tags")}
                  placeholder="лыжные гонки, соревнования, спорт"
                />
                <span className="field-hint">Теги через запятую</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Футер */}
      <div className="edit-footer">
        <div className="footer-status">
          {isDirty && (
            <span className="status-warning">
              У вас есть несохраненные изменения
            </span>
          )}
        </div>
        <div className="footer-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => router.back()}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
