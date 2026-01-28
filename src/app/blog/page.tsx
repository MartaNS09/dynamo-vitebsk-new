import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories, sortedBlogPosts } from "@/data/blog-posts";
import { BlogHero } from "@/components/blog/BlogHero";
import styles from "./Blog.module.scss";

export const metadata: Metadata = {
  title: "Новости и события | СДЮШОР Динамо Витебск",
  description:
    "Актуальные новости, статьи и события спортивной школы СДЮШОР Динамо Витебск. Соревнования, достижения, интервью со спортсменами.",
  keywords: [
    "новости",
    "события",
    "Динамо Витебск",
    "спортивная школа",
    "достижения",
    "соревнования",
    "интервью",
    "спорт",
  ],
  openGraph: {
    title: "Новости и события | СДЮШОР Динамо Витебск",
    description: "Актуальные новости спортивной школы СДЮШОР Динамо Витебск",
    type: "website",
    siteName: "СДЮШОР Динамо Витебск",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const POSTS_PER_PAGE = 6;

async function getFilteredPosts(searchParams?: {
  page?: string;
  category?: string;
}) {
  const page = searchParams?.page || "1";
  const category = searchParams?.category || "all";

  const currentPage = parseInt(page);

  let filteredPosts = sortedBlogPosts;
  if (category !== "all") {
    filteredPosts = sortedBlogPosts.filter(
      (post) => post.category.slug === category,
    );
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    currentPage,
    totalPages,
    totalPosts,
    category,
  };
}

function Pagination({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number;
  totalPages: number;
  category: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <ul>
        {currentPage > 1 && (
          <li>
            <Link
              href={`/blog?category=${category}&page=${currentPage - 1}`}
              className={styles.pageButton}
              aria-label="Предыдущая страница"
            >
              ←
            </Link>
          </li>
        )}

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          if (pageNum < 1 || pageNum > totalPages) return null;

          return (
            <li key={pageNum}>
              <Link
                href={`/blog?category=${category}&page=${pageNum}`}
                className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ""}`}
                aria-label={`Страница ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </Link>
            </li>
          );
        })}

        {currentPage < totalPages && (
          <li>
            <Link
              href={`/blog?category=${category}&page=${currentPage + 1}`}
              className={styles.pageButton}
              aria-label="Следующая страница"
            >
              →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

function CategoryFilters({ currentCategory }: { currentCategory: string }) {
  return (
    <div className={styles.categoryFilters}>
      <ul className={styles.categoriesList}>
        {blogCategories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/blog?category=${cat.slug}`}
              className={`${styles.categoryButton} ${currentCategory === cat.slug ? styles.active : ""}`}
              aria-label={cat.name}
              aria-current={currentCategory === cat.slug ? "page" : undefined}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogCard({ post }: { post: (typeof sortedBlogPosts)[0] }) {
  return (
    <article className={styles.blogCard}>
      <div className={styles.cardImageWrapper}>
        <Link href={`/blog/${post.slug}`} aria-label={post.title}>
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            width={post.featuredImage.width}
            height={post.featuredImage.height}
            className={styles.cardImage}
            loading="lazy"
          />
        </Link>
        <span
          className={styles.categoryTag}
          style={{ backgroundColor: post.category.color }}
        >
          {post.category.name}
        </span>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <time dateTime={post.publishedAt} className={styles.cardDate}>
            <Calendar size={14} aria-hidden="true" />
            {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        <h2 className={styles.cardTitle}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className={styles.cardExcerpt}>{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className={styles.readMore}
          aria-label={`Подробнее: ${post.title}`}
        >
          Подробнее
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const { posts, currentPage, totalPages, totalPosts, category } =
    await getFilteredPosts(params);

  return (
    <main className="main-content" id="main-content">
      <div className={styles.blogPage}>
        <BlogHero />

        <div className="container">
          {/* Категории */}
          <CategoryFilters currentCategory={category} />

          {/* Информация о фильтре */}
          <div className={styles.filterInfo}>
            <p>
              Показано: <strong>{posts.length}</strong> из{" "}
              <strong>{totalPosts}</strong> новостей
              {category !== "all" &&
                ` в категории "${blogCategories.find((c) => c.slug === category)?.name}"`}
            </p>
          </div>

          {/* Грид статей */}
          <section className={styles.blogGrid} aria-label="Список новостей">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </section>

          {/* Пагинация */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={category}
          />
        </div>
      </div>
    </main>
  );
}
