"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  ArrowLeft,
  Compass,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Анимированная 404 */}
        <div className="not-found-number">
          <h1>404</h1>
          <div className="not-found-glow"></div>
        </div>

        {/* Заголовок */}
        <h2 className="not-found-title">Страница не найдена</h2>
        <p className="not-found-text">
          К сожалению, страница, которую вы ищете, не существует или была
          перемещена.
        </p>

        {/* Поиск */}
        <div className="not-found-search">
          <form onSubmit={handleSearch} className="not-found-search-form">
            <Search className="not-found-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по сайту..."
              className="not-found-search-input"
            />
            <button type="submit" className="not-found-search-button">
              Найти
            </button>
          </form>
        </div>

        {/* Кнопки действий */}
        <div className="not-found-actions">
          <Link href="/" className="not-found-btn-primary">
            <Home size={18} />
            На главную
          </Link>
          <button
            onClick={() => router.back()}
            className="not-found-btn-secondary"
          >
            <ArrowLeft size={18} />
            Вернуться назад
          </button>
        </div>

        {/* Популярные разделы */}
        <div className="not-found-sections">
          <div className="not-found-sections-title">
            <Compass size={16} />
            <span>Популярные разделы</span>
          </div>
          <div className="not-found-links">
            <Link href="/sports" className="not-found-link">
              Спортивные секции
            </Link>
            <Link href="/trainers" className="not-found-link">
              Тренеры
            </Link>
            <Link href="/blog" className="not-found-link">
              Новости
            </Link>
            <Link href="/abonements" className="not-found-link">
              Абонементы
            </Link>
            <Link href="/enrollment" className="not-found-link">
              Запись в секции
            </Link>
            <Link href="/contacts" className="not-found-link">
              Контакты
            </Link>
          </div>
        </div>

        {/* Контакты */}
        <div className="not-found-footer">
          <div className="flex items-center justify-center gap-2 text-sm">
            <MapPin size={14} />
            <span>г. Витебск, ул. Спортивная, 1</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-sm">
            <a
              href="tel:+375291234567"
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
            >
              <Phone size={12} />
              +375 (29) 123-45-67
            </a>
            <a
              href="mailto:info@dynamo-vitebsk.by"
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition"
            >
              <Mail size={12} />
              info@dynamo-vitebsk.by
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
