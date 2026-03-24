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
import { Application } from "@/types/application.types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { updateApplication, deleteApplication } from "@/lib/api/applications";
import {
  getStatusName,
  getStatusLabel,
  getStatusColor,
} from "@/types/application";
import "@/styles/admin/applications-table.scss";

interface ApplicationsTableProps {
  applications: Application[];
  onStatusChange?: (id: string, status: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
}

const statusConfig: Record<
  string,
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
  onRefresh,
}: ApplicationsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Массовое изменение статуса
  const handleBulkStatusChange = async (status: string) => {
    const statusMap: Record<string, string> = {
      new: "cmmvw8foo0000pxcafe77n38k",
      in_progress: "cmmvw8fp50001pxcagnwe94re",
      contacted: "cmmvw8fpf0002pxcazmkczu3d",
      completed: "cmmvw8fpk0003pxcav65ar7cy",
      cancelled: "cmmvw8fpn0004pxca1i2ubgmv",
    };

    const statusId = statusMap[status];
    if (!statusId) return;

    for (const id of selectedRows) {
      try {
        await updateApplication(id, { statusId: statusId });
      } catch (error) {
        console.error(`Ошибка обновления заявки ${id}:`, error);
      }
    }

    alert(`Статус изменен для ${selectedRows.length} заявок`);
    setSelectedRows([]);
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

  // Массовое удаление
  const handleBulkDelete = async () => {
    if (!confirm(`Удалить ${selectedRows.length} заявок?`)) return;

    for (const id of selectedRows) {
      try {
        await deleteApplication(id);
      } catch (error) {
        console.error(`Ошибка удаления заявки ${id}:`, error);
      }
    }

    alert(`Удалено ${selectedRows.length} заявок`);
    setSelectedRows([]);
    if (onRefresh) onRefresh();
    else window.location.reload();
  };

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

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search) ||
      app.sport?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || getStatusName(app.status) === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (statusObj: any) => {
    const statusName = getStatusName(statusObj);
    const config = statusName
      ? statusConfig[statusName as keyof typeof statusConfig]
      : null;

    if (!config) {
      return (
        <span
          className="status-badge"
          style={{
            backgroundColor: "#6b728010",
            color: "#6b7280",
            borderColor: "#6b728020",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
            display: "inline-block",
          }}
        >
          {statusObj?.label || String(statusName || "Неизвестно")}
        </span>
      );
    }

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

  return (
    <div className="applications-admin">
      <div className="applications-header">
        <div className="header-left">
          <h1>Заявки на запись</h1>
          <span className="total-count">{applications.length} всего</span>
        </div>
        <div className="header-actions">
          <Link href="/dashboard/applications/new" className="btn-primary">
            <Plus size={18} />
            Создать заявку
          </Link>
        </div>
      </div>

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
                {
                  applications.filter((a) => getStatusName(a.status) === status)
                    .length
                }
              </div>
              <div className="stat-label">{label}</div>
            </div>
          </div>
        ))}
      </div>

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
              value={statusFilter as string}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="in_progress">В обработке</option>
              <option value="contacted">Связались</option>
              <option value="completed">Завершенные</option>
              <option value="cancelled">Отмененные</option>
            </select>
          </div>
        </div>
      </div>

      {selectedRows.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">Выбрано: {selectedRows.length}</span>
          <div className="bulk-buttons">
            <button
              className="bulk-btn active"
              onClick={() => handleBulkStatusChange("in_progress")}
            >
              <CheckCircle size={16} />В работу
            </button>
            <button
              className="bulk-btn contacted"
              onClick={() => handleBulkStatusChange("contacted")}
            >
              <Phone size={16} />
              Связались
            </button>
            <button className="bulk-btn delete" onClick={handleBulkDelete}>
              <Trash2 size={16} />
              Удалить
            </button>
          </div>
        </div>
      )}

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

              {expandedRows.includes(app.id) && (
                <div className="table-row expanded">
                  <div className="col-expand"></div>
                  <div className="expanded-content">
                    <div className="expanded-grid">
                      <div className="expanded-section">
                        <h4>Дополнительная информация</h4>
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
                          {(typeof app.statusHistory === "string"
                            ? JSON.parse(app.statusHistory)
                            : app.statusHistory || []
                          ).map((history: any, idx: number) => (
                            <div key={idx} className="history-item">
                              {getStatusBadge(history.status)}
                              <div className="history-date">
                                {format(
                                  new Date(history.changedAt || history.date),
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
                            value={getStatusName(app.status) || ""}
                            onChange={(e) =>
                              onStatusChange?.(app.id, e.target.value)
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
