"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Grid,
  List,
} from "lucide-react";
import { sortedBlogPosts } from "@/data/blog-posts";
import { BlogPost } from "@/types/blog.types";
import "@/styles/admin/blog/blog-admin.scss";

export default function BlogTable() {
  const [posts, setPosts] = useState<BlogPost[]>(sortedBlogPosts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  // Уникальные категории
  const categories = ["all", ...new Set(posts.map((p) => p.category.slug))];

  // Фильтрация постов
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || post.category.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту статью?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Удалить ${selectedPosts.length} статей?`)) {
      setPosts(posts.filter((p) => !selectedPosts.includes(p.id)));
      setSelectedPosts([]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((p) => p.id));
    }
  };

  const handleSelectPost = (id: string) => {
    setSelectedPosts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const stats = {
    total: posts.length,
    featured: posts.filter((p) => p.isFeatured).length,
    pinned: posts.filter((p) => p.isPinned).length,
  };

  return (
    <div className="blog-admin">
      {/* Хедер */}
      <div className="blog-header">
        <div className="header-left">
          <h1>Управление блогом</h1>
          <span className="total-count">{stats.total} статей</span>
        </div>
        <div className="header-actions">
          <Link href="/dashboard/blog/new" className="btn-primary">
            <Plus size={20} />
            Новая статья
          </Link>
        </div>
      </div>

      {/* Статистика */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">📝</div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Всего статей</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon featured">⭐</div>
          <div className="stat-info">
            <span className="stat-value">{stats.featured}</span>
            <span className="stat-label">Рекомендуемые</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pinned">📌</div>
          <div className="stat-info">
            <span className="stat-value">{stats.pinned}</span>
            <span className="stat-label">Закрепленные</span>
          </div>
        </div>
        {/* УДАЛЕНА карточка с просмотрами */}
      </div>

      {/* Фильтры */}
      <div className="filters-panel">
        <div className="search-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Все категории</option>
              <option value="competitions">Соревнования</option>
              <option value="interviews">Интервью</option>
              <option value="articles">Статьи</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </button>
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedPosts.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">
            Выбрано: {selectedPosts.length}
          </span>
          <div className="bulk-buttons">
            <button className="bulk-btn delete" onClick={handleBulkDelete}>
              <Trash2 size={16} />
              Удалить
            </button>
          </div>
        </div>
      )}

      {/* Таблица постов */}
      {viewMode === "list" ? (
        <div className="blog-table">
          <div className="table-header">
            <div className="col-checkbox">
              <input
                type="checkbox"
                checked={
                  selectedPosts.length === filteredPosts.length &&
                  filteredPosts.length > 0
                }
                onChange={handleSelectAll}
              />
            </div>
            <div className="col-info">Статья</div>
            <div className="col-category">Категория</div>
            <div className="col-date">Дата</div>
            {/* УДАЛЕНА колонка Просмотры */}
            <div className="col-status">Статус</div>
            <div className="col-actions"></div>
          </div>

          <div className="table-body">
            {filteredPosts.map((post) => (
              <div key={post.id} className="table-row">
                <div className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                  />
                </div>

                <div className="col-info">
                  <div className="post-preview">
                    <div className="post-image">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="post-details">
                      <div className="post-title">
                        <Link href={`/dashboard/blog/edit/${post.id}`}>
                          {post.title}
                        </Link>
                      </div>
                      <div className="post-excerpt">{post.excerpt}</div>
                      <div className="post-meta">
                        {post.isFeatured && (
                          <span className="featured-badge">
                            ⭐ Рекомендуемое
                          </span>
                        )}
                        {post.isPinned && (
                          <span className="pinned-badge">📌 Закреплено</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-category">
                  <span
                    className="category-badge"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.name}
                  </span>
                </div>

                <div className="col-date">
                  <Calendar size={14} />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                {/* УДАЛЕН блок col-views */}

                <div className="col-status">
                  <span className="status-badge active">Опубликовано</span>
                </div>

                <div className="col-actions">
                  <div className="actions-group">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="action-btn view"
                      title="Смотреть на сайте"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/dashboard/blog/edit/${post.id}`}
                      className="action-btn edit"
                      title="Редактировать"
                    >
                      <Edit2 size={20} />
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
                      title="Удалить"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Grid view
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="grid-card">
              <div className="card-header">
                <div className="card-image">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={320}
                    height={180}
                  />
                </div>
                <div className="card-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                  />
                </div>
                <span
                  className="card-category"
                  style={{ backgroundColor: post.category.color }}
                >
                  {post.category.name}
                </span>
              </div>

              <div className="card-body">
                <h3 className="card-title">
                  <Link href={`/dashboard/blog/edit/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-meta">
                  <span>
                    <Calendar size={14} />
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </span>
                  {/* УДАЛЕНЫ просмотры в мета-информации */}
                </div>
              </div>

              <div className="card-footer">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="card-action view"
                >
                  <Eye size={16} />
                  Смотреть
                </Link>
                <Link
                  href={`/dashboard/blog/edit/${post.id}`}
                  className="card-action edit"
                >
                  <Edit2 size={16} />
                  Редактировать
                </Link>
                <button
                  className="card-action delete"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Пагинация */}
      <div className="table-footer">
        <div className="pagination-info">
          Показано {filteredPosts.length} из {posts.length} статей
        </div>
        <div className="pagination">
          <button className="pagination-btn" disabled>
            ‹
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">›</button>
        </div>
      </div>
    </div>
  );
}
