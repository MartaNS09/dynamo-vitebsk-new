import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import styles from "./BlogPost.module.scss";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Статья не найдена",
      description: "Запрошенная статья не существует",
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author.name ? [post.author.name] : undefined,
      images: [
        {
          url: post.featuredImage.url,
          width: post.featuredImage.width,
          height: post.featuredImage.height,
          alt: post.featuredImage.alt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Проверяем, вертикальное ли изображение (высота > ширины * 1.2)
  const isVerticalImage =
    post.featuredImage.height > post.featuredImage.width * 1.2;

  // Structured data для SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage.url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author.name
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "СДЮШОР Динамо Витебск",
      logo: {
        "@type": "ImageObject",
        url: "/logo-dynamo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="main-content" id="main-content">
        <article className={styles.blogPostPage}>
          <div className={styles.blogPostContainer}>
            {/* Хлебные крошки - скрыты на мобилке */}
            <nav className={styles.breadcrumbs} aria-label="Навигация">
              <ol className={styles.breadcrumbsList}>
                <li>
                  <Link href="/">Главная</Link>
                </li>
                <li>
                  <Link href="/blog">Новости</Link>
                </li>
                <li>
                  <Link href={`/blog?category=${post.category.slug}`}>
                    {post.category.name}
                  </Link>
                </li>
                <li aria-current="page">
                  <span>{post.title}</span>
                </li>
              </ol>
            </nav>

            {/* Заголовок */}
            <header className={styles.postHeader}>
              <div
                className={styles.postCategory}
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </div>
              <h1 className={styles.postTitle}>{post.title}</h1>

              <div className={styles.postMeta}>
                <div className={styles.metaItem}>
                  <Calendar size={16} aria-hidden="true" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Основное изображение - адаптивное с учетом вертикальных */}
            <div className={styles.featuredImage}>
              <div
                className={`${styles.imageWrapper} ${
                  isVerticalImage ? styles.verticalImageWrapper : ""
                }`}
              >
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt}
                  fill
                  className={`${styles.image} ${
                    isVerticalImage ? styles.verticalImage : ""
                  }`}
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>

            {/* Контент */}
            <div
              className={styles.postContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* ФОТОГАЛЕРЕЯ */}
            {post.gallery && post.gallery.length > 0 && (
              <div className={styles.photoGallery}>
                <h2 className={styles.galleryTitle}>
                  <Images size={20} aria-hidden="true" />
                  Фотогалерея
                </h2>
                <div className={styles.galleryGrid}>
                  {post.gallery.map((imageUrl, index) => (
                    <div key={index} className={styles.galleryItem}>
                      <Image
                        src={imageUrl}
                        alt={`Фото ${index + 1} к статье "${post.title}"`}
                        width={300}
                        height={200}
                        className={styles.galleryImage}
                        sizes="(max-width: 768px) 50vw, 200px"
                        priority={index < 3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Кнопка возврата */}
            <div className={styles.backLinkContainer}>
              <Link href="/blog" className={styles.backLink}>
                ← Все новости
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
