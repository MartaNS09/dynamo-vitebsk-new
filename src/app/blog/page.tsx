"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogCategories, sortedBlogPosts } from "@/data/blog-posts";
import { BlogHero } from "@/components/blog/BlogHero";
import styles from "./Blog.module.scss";

const POSTS_PER_PAGE = 6;

// Компоненты вынесены за пределы основного компонента
function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Навигация по страницам">
      <ul>
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={styles.pageButton}
              aria-label="Предыдущая страница"
            >
              ←
            </button>
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
              <button
                onClick={() => onPageChange(pageNum)}
                className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ""}`}
                aria-label={`Страница ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={styles.pageButton}
              aria-label="Следующая страница"
            >
              →
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

function CategoryFiltersComponent({
  activeCategory,
  onFilter,
}: {
  activeCategory: string;
  onFilter: (category: string) => void;
}) {
  return (
    <section className={styles.filtersSection} aria-labelledby="filters-title">
      <div className={styles.filtersContainer}>
        <h2 id="filters-title" className={styles.filtersTitle}>
          Категории новостей
        </h2>
        <div className={styles.filters}>
          <button
            onClick={() => onFilter("all")}
            className={`${styles.filterButton} ${activeCategory === "all" ? styles.filterButtonActive : ""}`}
            aria-label="Показать все новости"
            aria-current={activeCategory === "all" ? "page" : undefined}
          >
            Все
          </button>
          {blogCategories
            .filter((cat) =>
              ["Соревнования", "Интервью", "Статьи"].includes(cat.name),
            )
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilter(cat.slug)}
                className={`${styles.filterButton} ${activeCategory === cat.slug ? styles.filterButtonActive : ""}`}
                aria-label={cat.name}
                aria-current={activeCategory === cat.slug ? "page" : undefined}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: (typeof sortedBlogPosts)[0] }) {
  return (
    <article className={styles.blogCard}>
      <div className={styles.cardImageWrapper}>
        <Link
          href={`/blog/${post.slug}`}
          aria-label={post.title}
          title={`Читать: ${post.title}`}
        >
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
          <Link href={`/blog/${post.slug}`} title={`Читать: ${post.title}`}>
            {post.title}
          </Link>
        </h2>

        <p className={styles.cardExcerpt}>{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className={styles.readMore}
          aria-label={`Подробнее: ${post.title}`}
          title={`Читать подробнее: ${post.title}`}
        >
          Подробнее
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </article>
  );
}

function BlogPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categorySlug = searchParams.get("category") || "all";
  const pageParam = searchParams.get("page") || "1";

  const [activeCategory, setActiveCategory] = useState(categorySlug);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam));

  // Используем ref для отслеживания предыдущих значений
  const prevSearchParamsRef = useRef(searchParams.toString());

  // Фильтрация и пагинация
  const filteredPosts =
    activeCategory === "all"
      ? sortedBlogPosts
      : sortedBlogPosts.filter((post) => post.category.slug === activeCategory);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Обновление URL без перезагрузки
  const updateUrl = useCallback(
    (category: string, page: number) => {
      const params = new URLSearchParams();
      if (category !== "all") params.set("category", category);
      if (page > 1) params.set("page", page.toString());

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? "?" + queryString : ""}`, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  // Обработка фильтра
  const handleFilter = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setCurrentPage(1);
      updateUrl(category, 1);
    },
    [updateUrl],
  );

  // Обработка пагинации
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      updateUrl(activeCategory, page);
    },
    [activeCategory, updateUrl],
  );

  // Синхронизация с URL - исправленная версия
  useEffect(() => {
    const currentParams = searchParams.toString();

    // Проверяем, изменились ли параметры
    if (currentParams !== prevSearchParamsRef.current) {
      const slug = searchParams.get("category") || "all";
      const page = searchParams.get("page") || "1";

      // Используем setTimeout для избежания синхронного обновления в эффекте
      const timer = setTimeout(() => {
        if (slug !== activeCategory) {
          setActiveCategory(slug);
        }
        const pageNum = parseInt(page);
        if (pageNum !== currentPage) {
          setCurrentPage(pageNum);
        }
      }, 0);

      prevSearchParamsRef.current = currentParams;

      return () => clearTimeout(timer);
    }
  }, [searchParams, activeCategory, currentPage]);

  return (
    <main className="main-content" id="main-content">
      <div className={styles.blogPage}>
        <BlogHero />

        {/* Секция фильтров */}
        <CategoryFiltersComponent
          activeCategory={activeCategory}
          onFilter={handleFilter}
        />

        <div className="container">
          {/* Информация о фильтре */}
          <div className={styles.filterInfo}>
            <p>
              Показано: <strong>{paginatedPosts.length}</strong> из{" "}
              <strong>{totalPosts}</strong> новостей
              {activeCategory !== "all" &&
                ` в категории "${blogCategories.find((c) => c.slug === activeCategory)?.name}"`}
            </p>
          </div>

          {/* Грид статей */}
          <section className={styles.blogGrid} aria-label="Список новостей">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </section>

          {/* Пагинация */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}

// Главный компонент с Suspense для useSearchParams
export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загружаем новости...</p>
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  );
}
