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
  Grid,
  List,
  AlertCircle,
} from "lucide-react";
import { SportSection } from "@/types/sport-section.types";
import { getSections, deleteSection } from "@/lib/api/sections";
import "@/styles/admin/sections.scss";

export default function SectionsTable() {
  const [sections, setSections] = useState<SportSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  // Загрузка секций из API
  const loadSections = async () => {
    try {
      setLoading(true);
      const data = await getSections();
      setSections(data);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки секций");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Удаление секции
  const handleDelete = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту секцию?")) return;

    try {
      await deleteSection(id);
      await loadSections(); // перезагружаем список
    } catch (err) {
      alert("Ошибка при удалении секции");
      console.error(err);
    }
  };

  // Массовое удаление
  const handleBulkDelete = async () => {
    if (!window.confirm(`Удалить ${selectedSections.length} секций?`)) return;

    try {
      for (const id of selectedSections) {
        await deleteSection(id);
      }
      await loadSections();
      setSelectedSections([]);
    } catch (err) {
      alert("Ошибка при массовом удалении");
      console.error(err);
    }
  };

  // Загружаем данные при монтировании
  useEffect(() => {
    loadSections();
  }, []);

  // Уникальные категории
  const categories = [
    "all",
    ...new Set(sections.map((s) => s.category).filter(Boolean)),
  ];

  // Фильтрация
  const filteredSections = sections.filter((section) => {
    const matchesSearch =
      section.name.toLowerCase().includes(search.toLowerCase()) ||
      section.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || section.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && section.isActive) ||
      (statusFilter === "inactive" && !section.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleActive = async (id: string) => {
    // Здесь должен быть вызов API для изменения статуса
    // Пока просто обновляем локально
    setSections(
      sections.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
    );
  };

  const handleSelectAll = () => {
    if (selectedSections.length === filteredSections.length) {
      setSelectedSections([]);
    } else {
      setSelectedSections(filteredSections.map((s) => s.id));
    }
  };

  const handleSelectSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Статистика
  const stats = {
    total: sections.length,
    active: sections.filter((s) => s.isActive).length,
    withAbonements: sections.filter((s) => s.abonements?.length > 0).length,
  };

  if (loading) {
    return (
      <div className="sections-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка секций...</p>
        <style jsx>{`
          .sections-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid #e5e7eb;
            border-top-color: #0055b7;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sections-error">
        <AlertCircle size={48} color="#ef4444" />
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
        <button onClick={loadSections} className="retry-btn">
          Попробовать снова
        </button>
        <style jsx>{`
          .sections-error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            text-align: center;
          }
          h3 {
            margin: 16px 0 8px;
            color: #111827;
          }
          p {
            color: #6b7280;
            margin-bottom: 16px;
          }
          .retry-btn {
            padding: 8px 16px;
            background: #0055b7;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }
          .retry-btn:hover {
            background: #003d82;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="sections-admin">
      {/* ===== ХЕДЕР ===== */}
      <div className="sections-header">
        <div className="header-left">
          <h1>Спортивные секции</h1>
          <span className="total-count">{stats.total} секций</span>
        </div>
        <div className="header-actions">
          <Link href="/dashboard/sections/new" className="btn-primary">
            <Plus size={20} />
            Добавить секцию
          </Link>
        </div>
      </div>

      {/* ===== СТАТИСТИКА ===== */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">🏋️</div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Всего секций</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">✅</div>
          <div className="stat-info">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Активных</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon price">💰</div>
          <div className="stat-info">
            <span className="stat-value">{stats.withAbonements}</span>
            <span className="stat-label">С абонементами</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">📸</div>
          <div className="stat-info">
            <span className="stat-value">
              {sections.reduce((acc, s) => acc + (s.gallery?.length || 0), 0)}
            </span>
            <span className="stat-label">Всего фото</span>
          </div>
        </div>
      </div>

      {/* ===== ФИЛЬТРЫ ===== */}
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
              {categories
                .filter((c) => c !== "all")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
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

      {/* ===== BULK ACTIONS ===== */}
      {selectedSections.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">
            Выбрано: {selectedSections.length}
          </span>
          <div className="bulk-buttons">
            <button className="bulk-btn delete" onClick={handleBulkDelete}>
              🗑️ Удалить выбранные
            </button>
          </div>
        </div>
      )}

      {/* ===== LIST VIEW ===== */}
      {viewMode === "list" ? (
        <div className="sections-table">
          <div className="table-header">
            <div className="col-checkbox">
              <input
                type="checkbox"
                checked={
                  selectedSections.length === filteredSections.length &&
                  filteredSections.length > 0
                }
                onChange={handleSelectAll}
              />
            </div>
            <div className="col-info">Секция</div>
            <div className="col-category">Категория</div>
            <div className="col-abonements">Абонементы</div>
            <div className="col-status">Статус</div>
            <div className="col-actions"></div>
          </div>

          <div className="table-body">
            {filteredSections.length === 0 ? (
              <div className="empty-state">
                <p>Секции не найдены</p>
              </div>
            ) : (
              filteredSections.map((section) => (
                <div key={section.id} className="table-row">
                  {/* Чекбокс */}
                  <div className="col-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(section.id)}
                      onChange={() => handleSelectSection(section.id)}
                    />
                  </div>

                  {/* Информация о секции */}
                  <div className="col-info">
                    <div className="section-preview">
                      <div className="section-image">
                        {section.coverImage ? (
                          <Image
                            src={section.coverImage}
                            alt={section.name}
                            width={56}
                            height={56}
                          />
                        ) : (
                          <div className="no-image">🏋️</div>
                        )}
                      </div>
                      <div className="section-details">
                        <div className="section-name">
                          <Link href={`/dashboard/sections/edit/${section.id}`}>
                            {section.name}
                          </Link>
                        </div>
                        <div className="section-age">👤 {section.ageInfo}</div>
                      </div>
                    </div>
                  </div>

                  {/* Категория */}
                  <div className="col-category">
                    <span className="category-badge">
                      {section.category || "—"}
                    </span>
                  </div>

                  {/* Абонементы */}
                  <div className="col-abonements">
                    {section.abonements?.length ? (
                      <div className="abonements-info">
                        <span className="abonements-count">
                          {section.abonements.length} абонем.
                        </span>
                        <span className="price-from">
                          от{" "}
                          {Math.min(...section.abonements.map((a) => a.price))}{" "}
                          BYN
                        </span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </div>

                  {/* Статус */}
                  <div className="col-status">
                    <button
                      className={`status-badge ${section.isActive ? "active" : "inactive"}`}
                      onClick={() => handleToggleActive(section.id)}
                    >
                      {section.isActive ? "Активна" : "Неактивна"}
                    </button>
                  </div>

                  {/* Действия */}
                  <div className="col-actions">
                    <div className="actions-group">
                      <Link
                        href={`/sports/${section.slug}`}
                        target="_blank"
                        className="action-btn view"
                        title="Смотреть на сайте"
                      >
                        <Eye size={20} />
                      </Link>
                      <Link
                        href={`/dashboard/sections/edit/${section.id}`}
                        className="action-btn edit"
                        title="Редактировать"
                      >
                        <Edit2 size={20} />
                      </Link>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(section.id)}
                        title="Удалить"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* ===== GRID VIEW ===== */
        <div className="sections-grid">
          {filteredSections.length === 0 ? (
            <div className="empty-state">Секции не найдены</div>
          ) : (
            filteredSections.map((section) => (
              <div key={section.id} className="grid-card">
                <div className="card-header">
                  <div className="card-image">
                    {section.coverImage ? (
                      <Image
                        src={section.coverImage}
                        alt={section.name}
                        width={320}
                        height={180}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="no-image-large">🏋️</div>
                    )}
                  </div>
                  <div className="card-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSections.includes(section.id)}
                      onChange={() => handleSelectSection(section.id)}
                    />
                  </div>
                  <button
                    className={`card-status ${section.isActive ? "active" : "inactive"}`}
                    onClick={() => handleToggleActive(section.id)}
                  >
                    {section.isActive ? "Активна" : "Неактивна"}
                  </button>
                </div>

                <div className="card-body">
                  <h3 className="card-title">
                    <Link href={`/dashboard/sections/edit/${section.id}`}>
                      {section.name}
                    </Link>
                  </h3>
                  <p className="card-description">{section.shortDescription}</p>

                  <div className="card-info">
                    <span>👤 {section.ageInfo}</span>
                    <span>🏷️ {section.category || "—"}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <Link
                    href={`/sports/${section.slug}`}
                    target="_blank"
                    className="card-action view"
                  >
                    <Eye size={18} />
                    Смотреть
                  </Link>
                  <Link
                    href={`/dashboard/sections/edit/${section.id}`}
                    className="card-action edit"
                  >
                    <Edit2 size={18} />
                    Редактировать
                  </Link>
                  <button
                    className="card-action delete"
                    onClick={() => handleDelete(section.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ===== ПАГИНАЦИЯ ===== */}
      <div className="table-footer">
        <div className="pagination-info">
          Показано {filteredSections.length} из {sections.length} секций
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
