"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchResult } from "@/lib/search/types";
import styles from "./SearchPage.module.scss";

const SUGGESTIONS = [
  "гимнастика",
  "футбол",
  "акробатика",
  "тренеры",
  "абонемент",
  "запись",
  "блог",
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`/search/api?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: SearchResult[]) => setResults(Array.isArray(data) ? data : []))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Search failed:", error);
          setResults([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  if (query.length < 2) {
    return (
      <div className={styles.empty}>
        <h2>Введите запрос</h2>
        <p>Минимум 2 символа для поиска по сайту</p>
        <div className={styles.suggestions}>
          <p>Популярные запросы:</p>
          <div className={styles.suggestionList}>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className={styles.suggestion}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} aria-hidden="true" />
        <p>Поиск...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Ничего не найдено</h2>
        <p>
          По запросу <strong>«{query}»</strong> результатов нет
        </p>
        <p>Попробуйте изменить или сократить запрос</p>
      </div>
    );
  }

  return (
    <div>
      <p className={styles.summary}>
        Найдено <strong>{results.length}</strong> результатов по запросу «
        {query}»
      </p>
      <div className={styles.results}>
        {results.map((result) => (
          <Link
            key={`${result.type}-${result.id}-${result.url}`}
            href={result.url}
            className={styles.resultCard}
          >
            <div className={styles.resultRow}>
              <span className={styles.icon} aria-hidden="true">
                {result.icon}
              </span>
              <div className={styles.resultBody}>
                <span className={styles.badge}>{result.category}</span>
                <h2 className={styles.title}>{result.title}</h2>
                {result.description && (
                  <p className={styles.description}>{result.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="main-content" id="main-content">
      <div className={`container ${styles.page}`}>
        <div className={styles.header}>
          <h1>Поиск по сайту</h1>
          <p>Секции, новости, тренеры, абонементы и страницы школы</p>
        </div>
        <div className={styles.panel}>
          <Suspense
            fallback={
              <div className={styles.loading}>
                <div className={styles.spinner} aria-hidden="true" />
                <p>Загрузка...</p>
              </div>
            }
          >
            <SearchContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
