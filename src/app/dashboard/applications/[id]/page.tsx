"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  User,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Save,
  Trash2,
  Download,
} from "lucide-react";
import { mockApplications } from "@/data/applications";
import { Application, ApplicationStatus } from "@/types/application.types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "@/styles/admin/application-detail.scss";

const statusConfig = {
  new: { label: "Новая", color: "#0055b7", icon: Clock },
  in_progress: { label: "В обработке", color: "#f59e0b", icon: RefreshCw },
  contacted: { label: "Связались", color: "#00d4aa", icon: Phone },
  completed: { label: "Завершена", color: "#10b981", icon: CheckCircle },
  cancelled: { label: "Отменена", color: "#ef4444", icon: XCircle },
};

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>("new");

  useEffect(() => {
    setTimeout(() => {
      const app = mockApplications.find((a) => a.id === params.id);
      if (app) {
        setApplication(app);
        setSelectedStatus(app.status);
      }
      setLoading(false);
    }, 300);
  }, [params.id]);

  const handleAddNote = () => {
    if (!newNote.trim() || !application) return;

    const note = {
      id: `note_${Date.now()}`,
      text: newNote,
      createdAt: new Date().toISOString(),
      createdBy: "current_user",
      createdByName: "Текущий пользователь",
    };

    setApplication({
      ...application,
      managerNotes: [...(application.managerNotes || []), note],
    });
    setNewNote("");
  };

  const handleStatusChange = () => {
    if (!application || selectedStatus === application.status) return;

    setApplication({
      ...application,
      status: selectedStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...application.statusHistory,
        {
          status: selectedStatus,
          changedAt: new Date().toISOString(),
          changedBy: "current_user",
          changedByName: "Текущий пользователь",
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="not-found">
        <h2>Заявка не найдена</h2>
        <button onClick={() => router.back()}>Вернуться назад</button>
      </div>
    );
  }

  const StatusIcon = statusConfig[application.status].icon;

  return (
    <div className="application-detail">
      {/* Хедер */}
      <div className="detail-header">
        <button onClick={() => router.back()} className="back-btn">
          <ArrowLeft size={20} />
          Назад к заявкам
        </button>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={18} />
            Экспорт
          </button>
          <button className="btn-danger">
            <Trash2 size={18} />
            Удалить
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="detail-grid">
        {/* Левая колонка - информация о клиенте */}
        <div className="detail-main">
          <div className="detail-card">
            <div className="card-header">
              <h2>Информация о клиенте</h2>
              <div
                className="status-badge"
                style={{
                  background: `${statusConfig[application.status].color}10`,
                  color: statusConfig[application.status].color,
                  border: `1px solid ${statusConfig[application.status].color}20`,
                }}
              >
                <StatusIcon size={16} />
                {statusConfig[application.status].label}
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <User size={16} />
                <div>
                  <div className="info-label">ФИО</div>
                  <div className="info-value">{application.name}</div>
                </div>
              </div>

              <div className="info-item">
                <Phone size={16} />
                <div>
                  <div className="info-label">Телефон</div>
                  <a
                    href={`tel:${application.phone}`}
                    className="info-value link"
                  >
                    {application.phone}
                  </a>
                </div>
              </div>

              {application.email && (
                <div className="info-item">
                  <Mail size={16} />
                  <div>
                    <div className="info-label">Email</div>
                    <a
                      href={`mailto:${application.email}`}
                      className="info-value link"
                    >
                      {application.email}
                    </a>
                  </div>
                </div>
              )}

              {application.childAge && (
                <div className="info-item">
                  <Calendar size={16} />
                  <div>
                    <div className="info-label">Возраст ребенка</div>
                    <div className="info-value">{application.childAge} лет</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="detail-card">
            <h2>Детали заявки</h2>

            <div className="detail-rows">
              <div className="detail-row">
                <span className="row-label">Вид спорта:</span>
                <span className="row-value">
                  {application.sport || "Не указан"}
                </span>
              </div>

              {application.selectedAbonement && (
                <div className="detail-row abonement-row">
                  <span className="row-label">Выбранный абонемент:</span>
                  <div className="abonement-detail">
                    <div className="abonement-name">
                      {application.selectedAbonement.name}
                    </div>
                    <div className="abonement-price">
                      {application.selectedAbonement.price} BYN /{" "}
                      {application.selectedAbonement.duration}
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-row">
                <span className="row-label">Дата заявки:</span>
                <span className="row-value">
                  {format(
                    new Date(application.createdAt),
                    "dd MMMM yyyy, HH:mm",
                    { locale: ru },
                  )}
                </span>
              </div>

              <div className="detail-row">
                <span className="row-label">Источник:</span>
                <span className="row-value">
                  {application.source === "enrollment_form"
                    ? "Форма записи"
                    : application.source === "sport_section_page"
                      ? "Страница секции"
                      : application.source === "abonement_page"
                        ? "Страница абонемента"
                        : "Другое"}
                </span>
              </div>

              {application.message && (
                <div className="message-block">
                  <div className="row-label">Сообщение клиента:</div>
                  <div className="message-text">{application.message}</div>
                </div>
              )}
            </div>
          </div>

          {/* Заметки менеджера */}
          <div className="detail-card">
            <h2>Заметки менеджера</h2>

            <div className="notes-list">
              {application.managerNotes &&
              application.managerNotes.length > 0 ? (
                application.managerNotes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span className="note-author">{note.createdByName}</span>
                      <span className="note-date">
                        {format(new Date(note.createdAt), "dd MMM yyyy, HH:mm")}
                      </span>
                    </div>
                    <p className="note-text">{note.text}</p>
                  </div>
                ))
              ) : (
                <p className="no-notes">Нет заметок</p>
              )}
            </div>

            <div className="add-note">
              <textarea
                placeholder="Добавить заметку..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button onClick={handleAddNote} className="add-note-btn">
                <MessageCircle size={16} />
                Добавить заметку
              </button>
            </div>
          </div>
        </div>

        {/* Правая колонка - статус и история */}
        <div className="detail-sidebar">
          <div className="sidebar-card">
            <h3>Изменить статус</h3>

            <select
              className="status-select"
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as ApplicationStatus)
              }
            >
              <option value="new">Новая</option>
              <option value="in_progress">В обработке</option>
              <option value="contacted">Связались</option>
              <option value="completed">Завершена</option>
              <option value="cancelled">Отменена</option>
            </select>

            <button
              className="save-status-btn"
              onClick={handleStatusChange}
              disabled={selectedStatus === application.status}
            >
              <Save size={16} />
              Сохранить статус
            </button>
          </div>

          <div className="sidebar-card">
            <h3>История статусов</h3>

            <div className="history-list">
              {application.statusHistory.map((history, index) => {
                const Icon = statusConfig[history.status].icon;
                return (
                  <div key={index} className="history-item">
                    <div
                      className="history-icon"
                      style={{
                        background: `${statusConfig[history.status].color}10`,
                        color: statusConfig[history.status].color,
                      }}
                    >
                      <Icon size={14} />
                    </div>
                    <div className="history-content">
                      <div className="history-status">
                        {statusConfig[history.status].label}
                      </div>
                      <div className="history-date">
                        {format(
                          new Date(history.changedAt),
                          "dd MMM yyyy, HH:mm",
                        )}
                      </div>
                      {history.comment && (
                        <div className="history-comment">{history.comment}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
