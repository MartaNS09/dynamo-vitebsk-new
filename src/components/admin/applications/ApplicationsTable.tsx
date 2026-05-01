"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Plus,
} from "lucide-react";
import { Application, ApplicationStatus } from "@/types/application.types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "@/styles/admin/applications-table.scss";

interface ApplicationsTableProps {
  applications: Application[];
  onStatusChange?: (id: string, status: ApplicationStatus) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; color: string; icon: React.ComponentType<{ size?: number }> }
> = {
  new: { label: "Новая", color: "#0055b7", icon: Clock },
  in_progress: { label: "В обработке", color: "#f59e0b", icon: RefreshCw },
  contacted: { label: "Связались", color: "#00d4aa", icon: Phone },
  completed: { label: "Завершена", color: "#10b981", icon: CheckCircle },
  cancelled: { label: "Отменена", color: "#ef4444", icon: XCircle },
};

export function ApplicationsTable({
  applications,
  onStatusChange,
  onDelete,
}: ApplicationsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">(
    "all",
  );
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [trainerFilter, setTrainerFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "section" | "trainer">("date");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const sections = [
    "all",
    ...Array.from(
      new Set(
        applications
          .map((app) => app.sectionName || app.sport)
          .filter(Boolean) as string[],
      ),
    ).sort((a, b) => a.localeCompare(b, "ru")),
  ];

  const trainers = [
    "all",
    ...Array.from(
      new Set(
        applications
          .map((app) => app.selectedAbonement?.trainerName)
          .filter(Boolean) as string[],
      ),
    ).sort((a, b) => a.localeCompare(b, "ru")),
  ];

  const toggleRow = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredApplications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredApplications.map((app) => app.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id],
    );
  };

  const filteredApplications = applications
    .filter((app) => {
      const sectionValue = app.sectionName || app.sport || "";
      const trainerValue = app.selectedAbonement?.trainerName || "";
      const searchValue = search.toLowerCase();

      const matchesSearch =
        app.name.toLowerCase().includes(searchValue) ||
        app.phone.includes(search) ||
        app.sport?.toLowerCase().includes(searchValue) ||
        app.email?.toLowerCase().includes(searchValue) ||
        sectionValue.toLowerCase().includes(searchValue) ||
        trainerValue.toLowerCase().includes(searchValue);

      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      const matchesSection =
        sectionFilter === "all" || sectionValue === sectionFilter;
      const matchesTrainer =
        trainerFilter === "all" || trainerValue === trainerFilter;

      return matchesSearch && matchesStatus && matchesSection && matchesTrainer;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      if (sortBy === "section") {
        const sectionA = a.sectionName || a.sport || "";
        const sectionB = b.sectionName || b.sport || "";
        return sectionA.localeCompare(sectionB, "ru");
      }

      const trainerA = a.selectedAbonement?.trainerName || "";
      const trainerB = b.selectedAbonement?.trainerName || "";
      return trainerA.localeCompare(trainerB, "ru");
    });

  const getStatusBadge = (status: ApplicationStatus) => {
    const config = statusConfig[status];

    return (
      <span
        className="status-badge"
        style={{
          backgroundColor: `${config.color}10`,
          color: config.color,
          borderColor: `${config.color}20`,
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "500",
          display: "inline-block",
        }}
      >
        {config.label}
      </span>
    );
  };

  const exportCsv = () => {
    const rows = [
      [
        "id",
        "createdAt",
        "name",
        "phone",
        "email",
        "sport",
        "status",
        "source",
        "consentGiven",
        "consentAt",
        "consentVersion",
      ],
      ...filteredApplications.map((app) => [
        app.id,
        app.createdAt,
        app.name,
        app.phone,
        app.email || "",
        app.sport || "",
        app.status,
        app.source,
        app.consentGiven ? "true" : "false",
        app.consentAt || "",
        app.consentVersion || "",
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="applications-admin">
      {/* Хедер */}
      <div className="applications-header">
        <div className="header-left">
          <h1>Заявки на запись</h1>
          <span className="total-count">{applications.length} всего</span>
        </div>
        <div className="header-actions">
          <button type="button" className="btn-secondary" onClick={exportCsv}>
            Экспорт CSV
          </button>
          <Link href="/dashboard/applications/new" className="btn-primary">
            <Plus size={18} />
            Создать заявку
          </Link>
        </div>
      </div>

      {/* Статистика */}
      <div className="stats-cards">
        {[
          { status: "new", icon: Clock, label: "Новые" },
          { status: "in_progress", icon: RefreshCw, label: "В обработке" },
          { status: "contacted", icon: Phone, label: "Связались" },
          { status: "completed", icon: CheckCircle, label: "Завершено" },
        ].map(({ status, icon: Icon, label }) => (
          <div key={status} className="stat-card">
            <div className={`stat-icon ${status}`}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {applications.filter((a) => a.status === status).length}
              </div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Фильтры */}
      <div className="filters-panel">
        <div className="search-section">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Поиск по имени, телефону, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="filters-section">
          <div className="filter-group">
            <Filter size={16} />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ApplicationStatus | "all")
              }
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="in_progress">В обработке</option>
              <option value="contacted">Связались</option>
              <option value="completed">Завершенные</option>
              <option value="cancelled">Отмененные</option>
            </select>
          </div>
          <div className="filter-group">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option value="all">Все секции</option>
              {sections
                .filter((section) => section !== "all")
                .map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
            </select>
          </div>
          <div className="filter-group">
            <select
              value={trainerFilter}
              onChange={(e) => setTrainerFilter(e.target.value)}
            >
              <option value="all">Все тренеры</option>
              {trainers
                .filter((trainer) => trainer !== "all")
                .map((trainer) => (
                  <option key={trainer} value={trainer}>
                    {trainer}
                  </option>
                ))}
            </select>
          </div>
          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date" | "section" | "trainer")
              }
            >
              <option value="date">Сортировка: по дате</option>
              <option value="section">Сортировка: по секции</option>
              <option value="trainer">Сортировка: по тренеру</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedRows.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">Выбрано: {selectedRows.length}</span>
          <div className="bulk-buttons">
            <button className="bulk-btn active">
              <CheckCircle size={16} />В работу
            </button>
            <button className="bulk-btn contacted">
              <Phone size={16} />
              Связались
            </button>
            <button className="bulk-btn delete">
              <Trash2 size={16} />
              Удалить
            </button>
          </div>
        </div>
      )}

      {/* Таблица */}
      <div className="applications-table">
        <div className="table-header">
          <div className="col-checkbox">
            <input
              type="checkbox"
              checked={
                selectedRows.length === filteredApplications.length &&
                filteredApplications.length > 0
              }
              onChange={toggleSelectAll}
            />
          </div>
          <div className="col-expand"></div>
          <div className="col-date">Дата</div>
          <div className="col-client">Клиент</div>
          <div className="col-sport">Секция</div>
          <div className="col-abonement">Абонемент</div>
          <div className="col-status">Статус</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body">
          {filteredApplications.map((app) => (
            <div key={app.id}>
              <div className="table-row">
                <div className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(app.id)}
                    onChange={() => toggleSelectRow(app.id)}
                  />
                </div>
                <div className="col-expand">
                  <button
                    className="expand-btn"
                    onClick={() => toggleRow(app.id)}
                  >
                    {expandedRows.includes(app.id) ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>
                <div className="col-date">
                  <div className="date-info">
                    <Calendar size={14} />
                    <span>
                      {format(new Date(app.createdAt), "dd MMM", {
                        locale: ru,
                      })}
                    </span>
                  </div>
                  <div className="time-ago">
                    {format(new Date(app.createdAt), "HH:mm")}
                  </div>
                </div>
                <div className="col-client">
                  <div className="client-info">
                    <div className="client-name">
                      <User size={14} />
                      <span>{app.name}</span>
                    </div>
                    <div className="client-contacts">
                      <a href={`tel:${app.phone}`} className="contact-link">
                        <Phone size={12} />
                        {app.phone}
                      </a>
                      {app.email && (
                        <a
                          href={`mailto:${app.email}`}
                          className="contact-link"
                        >
                          <Mail size={12} />
                          {app.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sport">
                  <div className="sport-name">{app.sport || "—"}</div>
                  {app.childAge && (
                    <div className="child-age">{app.childAge} лет</div>
                  )}
                </div>
                <div className="col-abonement">
                  {app.selectedAbonement ? (
                    <div className="abonement-info">
                      <div className="abonement-name">
                        {app.selectedAbonement.name}
                      </div>
                      <div className="abonement-price">
                        {app.selectedAbonement.price} BYN
                      </div>
                    </div>
                  ) : (
                    <span className="no-abonement">—</span>
                  )}
                </div>
                <div className="col-status">{getStatusBadge(app.status)}</div>
                <div className="col-actions">
                  <div className="actions-group">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="action-btn view"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/dashboard/applications/${app.id}/edit`}
                      className="action-btn edit"
                    >
                      <Edit3 size={16} />
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => onDelete?.(app.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Раскрывающаяся строка */}
              {expandedRows.includes(app.id) && (
                <div className="table-row expanded">
                  <div className="col-expand"></div>
                  <div className="expanded-content">
                    <div className="expanded-grid">
                      <div className="expanded-section">
                        <h4>Дополнительная информация</h4>
                        <p className="client-message">
                          Согласие на обработку ПДн:{" "}
                          <strong>{app.consentGiven ? "Да" : "Нет"}</strong>
                          {app.consentAt ? ` (${format(new Date(app.consentAt), "dd.MM.yyyy HH:mm")})` : ""}
                        </p>
                        {app.message ? (
                          <p className="client-message">{app.message}</p>
                        ) : (
                          <p className="no-message">
                            Нет дополнительной информации
                          </p>
                        )}
                      </div>

                      <div className="expanded-section">
                        <h4>История статусов</h4>
                        <div className="status-history">
                          {app.statusHistory.map((history, idx) => (
                            <div key={idx} className="history-item">
                              {getStatusBadge(history.status)}
                              <div className="history-date">
                                {format(
                                  new Date(history.changedAt),
                                  "dd MMM HH:mm",
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="expanded-section">
                        <h4>Быстрые действия</h4>
                        <div className="quick-actions">
                          <select
                            className="status-select"
                            value={app.status}
                            onChange={(e) =>
                              onStatusChange?.(
                                app.id,
                                e.target.value as ApplicationStatus,
                              )
                            }
                          >
                            <option value="new">Новая</option>
                            <option value="in_progress">В обработке</option>
                            <option value="contacted">Связались</option>
                            <option value="completed">Завершена</option>
                            <option value="cancelled">Отменена</option>
                          </select>
                          <button className="quick-action-btn">
                            <MessageCircle size={14} />
                            Добавить заметку
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Пагинация */}
      <div className="table-footer">
        <div className="pagination-info">
          Показано 1-{filteredApplications.length} из {applications.length}
        </div>
        <div className="pagination">
          <button className="pagination-btn" disabled>
            ←
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">→</button>
        </div>
      </div>
    </div>
  );
}
