"use client";

import { useState, useEffect } from "react";
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
import { useBlog } from "@/hooks/admin/useBlog";
import { BlogPost } from "@/types/blog.types";
import "@/styles/admin/blog/blog.scss";

export default function BlogTable() {
  const { posts, loading, error, removePost } = useBlog();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  // Категории для фильтра (исправлено!)
  const categories = [
    { id: "all", name: "Все категории" },
    { id: "competitions", name: "Соревнования" },
    { id: "interviews", name: "Интервью" },
    { id: "articles", name: "Статьи" },
  ];

  // Фильтрация постов
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || post.category?.id === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    setFilteredPosts(filtered);
  }, [posts, search, categoryFilter]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту статью?")) {
      await removePost(id);
    }
  };

  const stats = {
    total: posts.length,
    featured: posts.filter((p) => p.isFeatured).length,
    pinned: posts.filter((p) => p.isPinned).length,
  };

  if (loading) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка постов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-error">
        <p>Ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );
  }

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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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

      {/* Таблица */}
      {viewMode === "list" ? (
        <div className="blog-table">
          <div className="table-header">
            <div className="col-checkbox">
              <input type="checkbox" />
            </div>
            <div className="col-info">Статья</div>
            <div className="col-category">Категория</div>
            <div className="col-date">Дата</div>
            <div className="col-status">Статус</div>
            <div className="col-actions"></div>
          </div>

          <div className="table-body">
            {filteredPosts.map((post) => (
              <div key={post.id} className="table-row">
                <div className="col-checkbox">
                  <input type="checkbox" />
                </div>

                <div className="col-info">
                  <div className="post-preview">
                    <div className="post-image">
                      {post.featuredImage?.url && (
                        <Image
                          src={post.featuredImage.url}
                          alt={post.title}
                          width={56}
                          height={56}
                        />
                      )}
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
                    style={{
                      backgroundColor: post.category?.color || "#0055b7",
                    }}
                  >
                    {post.category?.name || "Без категории"}
                  </span>
                </div>

                <div className="col-date">
                  <Calendar size={14} />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                <div className="col-status">
                  <span
                    className={`status-badge ${post.published ? "published" : "draft"}`}
                  >
                    {post.published ? "Опубликовано" : "Черновик"}
                  </span>
                </div>

                <div className="col-actions">
                  <div className="actions-group">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="action-btn view"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/dashboard/blog/edit/${post.id}`}
                      className="action-btn edit"
                    >
                      <Edit2 size={20} />
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
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
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      width={320}
                      height={180}
                    />
                  )}
                </div>
                <span
                  className="card-category"
                  style={{ backgroundColor: post.category?.color || "#0055b7" }}
                >
                  {post.category?.name || "Без категории"}
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
                  <Calendar size={14} />
                  {new Date(post.publishedAt).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
