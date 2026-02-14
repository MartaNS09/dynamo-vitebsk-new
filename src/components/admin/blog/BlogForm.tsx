// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Image from "next/image";
// import { useForm, useFieldArray, Resolver } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   ArrowLeft,
//   Save,
//   Calendar,
//   Image as ImageIcon,
//   Plus,
//   Trash2,
//   X,
// } from "lucide-react";
// import { BlogPost } from "@/types/blog.types";
// import { blogCategories } from "@/data/blog-posts";
// import "@/styles/admin/blog/blog-edit.scss";

// // Схема валидации с галереей
// const blogPostSchema = z.object({
//   title: z.string().min(5, "Заголовок минимум 5 символов"),
//   slug: z.string().min(3, "URL минимум 3 символа"),
//   excerpt: z.string().min(10, "Краткое описание минимум 10 символов"),
//   content: z.string().min(50, "Контент минимум 50 символов"),
//   category: z.string().min(1, "Выберите категорию"),
//   isFeatured: z.boolean().default(false),
//   isPinned: z.boolean().default(false),
//   publishedAt: z.string(),
//   featuredImage: z.object({
//     url: z.string(),
//     alt: z.string().optional(),
//   }),
//   gallery: z.array(z.string()).default([]),
//   tags: z.string().optional(),
// });

// // Тип данных формы, выведенный из схемы
// type BlogFormData = z.infer<typeof blogPostSchema>;

// interface BlogFormProps {
//   post?: BlogPost;
// }

// export default function BlogForm({ post }: BlogFormProps) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // Явно приводим resolver к нужному типу, чтобы избежать конфликтов
//   const resolver = zodResolver(blogPostSchema) as Resolver<BlogFormData>;

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors, isDirty },
//     setValue,
//     watch,
//   } = useForm<BlogFormData>({
//     resolver,
//     defaultValues: post
//       ? {
//           title: post.title,
//           slug: post.slug,
//           excerpt: post.excerpt,
//           content: post.content,
//           category: post.category.id,
//           isFeatured: post.isFeatured,
//           isPinned: post.isPinned,
//           publishedAt: post.publishedAt.slice(0, 16),
//           featuredImage: post.featuredImage,
//           gallery: post.gallery || [],
//           tags: post.tags?.join(", "),
//         }
//       : {
//           title: "",
//           slug: "",
//           excerpt: "",
//           content: "",
//           category: "",
//           isFeatured: false,
//           isPinned: false,
//           publishedAt: new Date().toISOString().slice(0, 16),
//           featuredImage: { url: "", alt: "" },
//           gallery: [],
//           tags: "",
//         },
//   });

//   // useFieldArray автоматически получит правильный тип из control
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "gallery",
//   });

//   const onSubmit = async (data: BlogFormData) => {
//     setLoading(true);
//     try {
//       const tagsArray = data.tags
//         ? data.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag)
//         : [];

//       const postData = {
//         ...data,
//         tags: tagsArray,
//       };

//       console.log("Сохраняем статью:", postData);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       router.push("/dashboard/blog");
//     } catch (error) {
//       console.error("Ошибка:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const featuredImage = watch("featuredImage");
//   const gallery = watch("gallery") || [];

//   return (
//     <div className="blog-edit">
//       {/* Хедер */}
//       <div className="edit-header">
//         <div className="header-left">
//           <button onClick={() => router.back()} className="back-btn">
//             <ArrowLeft size={20} />
//             Назад
//           </button>
//           <div className="title-section">
//             <h1>{post ? "Редактирование статьи" : "Новая статья"}</h1>
//             {isDirty && (
//               <span className="unsaved-badge">
//                 Есть несохраненные изменения
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="header-actions">
//           <button
//             onClick={handleSubmit(onSubmit)}
//             disabled={loading}
//             className="save-btn"
//           >
//             <Save size={18} />
//             {loading ? "Сохранение..." : post ? "Сохранить" : "Опубликовать"}
//           </button>
//         </div>
//       </div>

//       {/* Форма */}
//       <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
//         <div className="form-grid">
//           {/* Основная колонка */}
//           <div className="form-main">
//             <div className="form-card">
//               <h3>Основная информация</h3>

//               <div className="form-group">
//                 <label>
//                   Заголовок статьи <span className="required">*</span>
//                 </label>
//                 <input
//                   {...register("title")}
//                   placeholder="Например: Чемпионат Витебской области по лыжным гонкам"
//                 />
//                 {errors.title && (
//                   <span className="error-message">{errors.title.message}</span>
//                 )}
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>
//                     URL (slug) <span className="required">*</span>
//                   </label>
//                   <input
//                     {...register("slug")}
//                     placeholder="chempionat-vitebskoj-oblasti"
//                   />
//                   {errors.slug && (
//                     <span className="error-message">{errors.slug.message}</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Категория <span className="required">*</span>
//                   </label>
//                   <select {...register("category")}>
//                     <option value="">Выберите категорию</option>
//                     {blogCategories
//                       .filter((c) => c.id !== "all")
//                       .map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                   </select>
//                   {errors.category && (
//                     <span className="error-message">
//                       {errors.category.message}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>
//                   Краткое описание <span className="required">*</span>
//                 </label>
//                 <textarea
//                   {...register("excerpt")}
//                   rows={3}
//                   placeholder="Краткое описание статьи..."
//                 />
//                 {errors.excerpt && (
//                   <span className="error-message">
//                     {errors.excerpt.message}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="form-card">
//               <h3>Полный текст статьи</h3>
//               <div className="form-group">
//                 <textarea
//                   {...register("content")}
//                   rows={15}
//                   placeholder="<h2>Заголовок</h2><p>Текст статьи...</p>"
//                 />
//                 {errors.content && (
//                   <span className="error-message">
//                     {errors.content.message}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ */}
//             <div className="form-card">
//               <div className="card-header">
//                 <h3>Галерея изображений</h3>
//                 <button
//                   type="button"
//                   className="add-gallery-btn"
//                   onClick={() => append("")}
//                 >
//                   <Plus size={16} />
//                   Добавить фото
//                 </button>
//               </div>

//               {gallery.length === 0 ? (
//                 <div className="gallery-empty">
//                   <ImageIcon size={40} />
//                   <p>Нет изображений в галерее</p>
//                   <button
//                     type="button"
//                     className="empty-state-btn"
//                     onClick={() => append("")}
//                   >
//                     <Plus size={16} />
//                     Добавить фото
//                   </button>
//                 </div>
//               ) : (
//                 <div className="gallery-grid">
//                   {fields.map((field, index) => (
//                     <div key={field.id} className="gallery-item">
//                       {gallery[index] ? (
//                         <>
//                           <Image
//                             src={gallery[index]}
//                             alt={`Gallery ${index + 1}`}
//                             width={150}
//                             height={150}
//                             className="gallery-image"
//                           />
//                           <button
//                             type="button"
//                             className="remove-gallery-item"
//                             onClick={() => remove(index)}
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </>
//                       ) : (
//                         <div className="gallery-upload-placeholder">
//                           <input
//                             type="text"
//                             placeholder="URL изображения"
//                             value={gallery[index] || ""}
//                             onChange={(e) => {
//                               const newGallery = [...gallery];
//                               newGallery[index] = e.target.value;
//                               setValue("gallery", newGallery);
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Боковая колонка */}
//           <div className="form-sidebar">
//             <div className="form-card">
//               <h3>Публикация</h3>

//               <div className="form-group">
//                 <label>Дата публикации</label>
//                 <div className="date-input">
//                   <Calendar size={16} />
//                   <input type="datetime-local" {...register("publishedAt")} />
//                 </div>
//               </div>

//               <div className="checkbox-group">
//                 <label className="checkbox-label">
//                   <input type="checkbox" {...register("isFeatured")} />
//                   <span>Рекомендуемая статья</span>
//                 </label>

//                 <label className="checkbox-label">
//                   <input type="checkbox" {...register("isPinned")} />
//                   <span>Закрепить вверху</span>
//                 </label>
//               </div>
//             </div>

//             <div className="form-card">
//               <h3>Главное изображение</h3>

//               {featuredImage?.url ? (
//                 <div className="image-preview">
//                   <Image
//                     src={featuredImage.url}
//                     alt={featuredImage.alt || "Preview"}
//                     width={300}
//                     height={200}
//                     className="preview-image"
//                   />
//                   <button
//                     type="button"
//                     className="remove-image"
//                     onClick={() =>
//                       setValue("featuredImage", { url: "", alt: "" })
//                     }
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="image-upload">
//                   <ImageIcon size={32} />
//                   <p>URL изображения</p>
//                   <input
//                     type="text"
//                     placeholder="https://example.com/image.jpg"
//                     onChange={(e) =>
//                       setValue("featuredImage", {
//                         url: e.target.value,
//                         alt: featuredImage?.alt || "",
//                       })
//                     }
//                   />
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>Alt текст (для SEO)</label>
//                 <input
//                   {...register("featuredImage.alt")}
//                   placeholder="Описание изображения"
//                 />
//               </div>
//             </div>

//             <div className="form-card">
//               <h3>Теги</h3>
//               <div className="form-group">
//                 <input
//                   {...register("tags")}
//                   placeholder="лыжные гонки, соревнования, спорт"
//                 />
//                 <span className="field-hint">Теги через запятую</span>
//               </div>
//               {post && post.tags && post.tags.length > 0 && (
//                 <div className="tags-preview">
//                   {post.tags.map((tag) => (
//                     <span key={tag} className="tag-badge">
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>

//       {/* Футер */}
//       <div className="edit-footer">
//         <div className="footer-status">
//           {isDirty && (
//             <span className="status-warning">
//               У вас есть несохраненные изменения
//             </span>
//           )}
//         </div>
//         <div className="footer-actions">
//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={() => router.back()}
//           >
//             Отмена
//           </button>
//           <button
//             type="submit"
//             className="save-btn"
//             onClick={handleSubmit(onSubmit)}
//             disabled={loading}
//           >
//             <Save size={18} />
//             {loading
//               ? "Сохранение..."
//               : post
//                 ? "Сохранить изменения"
//                 : "Опубликовать"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
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
} from "lucide-react";
import { BlogPost } from "@/types/blog.types";
import { blogCategories } from "@/data/blog-posts";
import "@/styles/admin/blog/blog-edit.scss";

// Схема валидации с галереей (объекты с url)
const blogPostSchema = z.object({
  title: z.string().min(5, "Заголовок минимум 5 символов"),
  slug: z.string().min(3, "URL минимум 3 символа"),
  excerpt: z.string().min(10, "Краткое описание минимум 10 символов"),
  content: z.string().min(50, "Контент минимум 50 символов"),
  category: z.string().min(1, "Выберите категорию"),
  isFeatured: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  publishedAt: z.string(),
  featuredImage: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }),
  gallery: z.array(z.object({ url: z.string() })).default([]),
  tags: z.string().optional(),
});

// Тип данных формы, выведенный из схемы
type BlogFormData = z.infer<typeof blogPostSchema>;

interface BlogFormProps {
  post?: BlogPost;
}

export default function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Явно приводим resolver к нужному типу, чтобы избежать конфликтов
  const resolver = zodResolver(blogPostSchema) as Resolver<BlogFormData>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver,
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category.id,
          isFeatured: post.isFeatured,
          isPinned: post.isPinned,
          publishedAt: post.publishedAt.slice(0, 16),
          featuredImage: post.featuredImage,
          gallery: post.gallery?.map((url) => ({ url })) || [],
          tags: post.tags?.join(", "),
        }
      : {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "",
          isFeatured: false,
          isPinned: false,
          publishedAt: new Date().toISOString().slice(0, 16),
          featuredImage: { url: "", alt: "" },
          gallery: [],
          tags: "",
        },
  });

  // ✅ Явно указан тип BlogFormData для useFieldArray
  const { fields, append, remove } = useFieldArray<BlogFormData>({
    control,
    name: "gallery",
  });

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    try {
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const postData = {
        ...data,
        tags: tagsArray,
        gallery: data.gallery.map((item) => item.url), // Преобразуем обратно в массив строк для API
      };

      console.log("Сохраняем статью:", postData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/blog");
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredImage = watch("featuredImage");
  const gallery = watch("gallery") || [];

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
            disabled={loading}
            className="save-btn"
          >
            <Save size={18} />
            {loading ? "Сохранение..." : post ? "Сохранить" : "Опубликовать"}
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

            {/* ✅ ИСПРАВЛЕННАЯ ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ */}
            <div className="form-card">
              <div className="card-header">
                <h3>Галерея изображений</h3>
                <button
                  type="button"
                  className="add-gallery-btn"
                  onClick={() => append({ url: "" })}
                >
                  <Plus size={16} />
                  Добавить фото
                </button>
              </div>

              {gallery.length === 0 ? (
                <div className="gallery-empty">
                  <ImageIcon size={40} />
                  <p>Нет изображений в галерее</p>
                  <button
                    type="button"
                    className="empty-state-btn"
                    onClick={() => append({ url: "" })}
                  >
                    <Plus size={16} />
                    Добавить фото
                  </button>
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
                              newGallery[index] = { url: e.target.value };
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
                  <input type="datetime-local" {...register("publishedAt")} />
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
                  <ImageIcon size={32} />
                  <p>URL изображения</p>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) =>
                      setValue("featuredImage", {
                        url: e.target.value,
                        alt: featuredImage?.alt || "",
                      })
                    }
                  />
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
              {post && post.tags && post.tags.length > 0 && (
                <div className="tags-preview">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-badge">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
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
          <button
            type="submit"
            className="save-btn"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Save size={18} />
            {loading
              ? "Сохранение..."
              : post
                ? "Сохранить изменения"
                : "Опубликовать"}
          </button>
        </div>
      </div>
    </div>
  );
}
