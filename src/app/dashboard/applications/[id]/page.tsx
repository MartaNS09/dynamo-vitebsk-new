"use client";

import { useState, useEffect, use } from "react";
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
  // Download,
} from "lucide-react";
import {
  getApplication,
  updateApplication,
  deleteApplication,
} from "@/lib/api/applications";
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
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus>("new");

  const getAbonement = () => {
    if (!application?.selectedAbonement) return null;

    if (typeof application.selectedAbonement === "string") {
      try {
        return JSON.parse(application.selectedAbonement);
      } catch {
        console.error("Ошибка парсинга selectedAbonement");
        return null;
      }
    }
    return application.selectedAbonement;
  };

  const abonement = getAbonement();

  useEffect(() => {
    const loadApplication = async () => {
      try {
        console.log("📥 Загружаем заявку с ID:", id);
        const data = await getApplication(id);
        setApplication(data);
        // Получаем имя статуса (если объект - берем name, если строка - саму строку)
        const statusName =
          typeof data.status === "object" ? data.status.name : data.status;
        setSelectedStatus(statusName || "new");
      } catch (error) {
        console.error("❌ Ошибка загрузки заявки:", error);
      } finally {
        setLoading(false);
      }
    };
    loadApplication();
  }, [id]);

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

  const handleStatusChange = async () => {
    if (!application) return;

    // Получаем текущее имя статуса
    const currentStatusName =
      typeof application.status === "object"
        ? application.status.name
        : application.status;

    if (selectedStatus === currentStatusName) return;

    console.log("🔄 Меняем статус:", {
      id: id,
      currentStatus: currentStatusName,
      newStatus: selectedStatus,
    });

    try {
      // Маппинг статусов (ID из базы данных)
      const statusMap: Record<string, string> = {
        new: "cmmvw8foo0000pxcafe77n38k",
        in_progress: "cmmvw8fp50001pxcagnwe94re",
        contacted: "cmmvw8fpf0002pxcazmkczu3d",
        completed: "cmmvw8fpk0003pxcav65ar7cy",
        cancelled: "cmmvw8fpn0004pxca1i2ubgmv",
      };

      // const statusId = statusMap[selectedStatus];
      const statusId = statusMap[selectedStatus as keyof typeof statusMap];

      if (!statusId) {
        console.error("Не найден ID статуса для:", selectedStatus);
        alert("Не удалось обновить статус: ID статуса не найден");
        return;
      }

      await updateApplication(id, { statusId: statusId });

      // Обновляем локальное состояние
      setApplication({
        ...application,
        status: {
          ...(typeof application.status === "object" && application.status
            ? application.status
            : {}),
          name: selectedStatus,
          label: statusConfig[selectedStatus]?.label || selectedStatus,
        },
        updatedAt: new Date().toISOString(),
        statusHistory: [
          ...(application.statusHistory || []),
          {
            status: selectedStatus,
            changedAt: new Date().toISOString(),
            changedBy: "current_user",
            changedByName: "Текущий пользователь",
          },
        ],
      });

      alert("Статус успешно изменен!");
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
      alert("Не удалось обновить статус");
    }
  };

  const handleDelete = async () => {
    if (!application) return;

    if (confirm("Вы уверены, что хотите удалить заявку?")) {
      try {
        await deleteApplication(id);
        router.push("/dashboard/applications");
      } catch (error) {
        console.error("Ошибка удаления:", error);
        alert("Не удалось удалить заявку");
      }
    }
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

  const statusName =
    typeof application.status === "object"
      ? application.status.name
      : application.status;
  const StatusIcon = statusConfig[statusName || "new"]?.icon || Clock;

  return (
    <div className="application-detail">
      <div className="detail-header">
        <button onClick={() => router.back()} className="back-btn">
          <ArrowLeft size={20} />
          Назад к заявкам
        </button>
        <div className="header-actions">
          <button
            onClick={() => router.push(`/dashboard/applications/${id}/edit`)}
            className="btn-secondary"
          >
            <Save size={18} />
            Редактировать
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            <Trash2 size={18} />
            Удалить
          </button>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-card">
            <div className="card-header">
              <h2>Информация о клиенте</h2>
              <div
                className="status-badge"
                style={{
                  background: `${statusConfig[statusName || "new"].color}10`,
                  color: statusConfig[statusName || "new"].color,
                  border: `1px solid ${statusConfig[statusName || "new"].color}20`,
                }}
              >
                <StatusIcon size={16} />
                {statusConfig[statusName || "new"].label}
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

              {abonement && (
                <div className="detail-row abonement-row">
                  <span className="row-label">Выбранный абонемент:</span>
                  <div className="abonement-detail">
                    <div className="abonement-name">{abonement.name}</div>
                    <div className="abonement-price">{abonement.price} BYN</div>
                    {abonement.duration && (
                      <div className="abonement-duration">
                        {abonement.duration}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Выбранный тренер */}
              {application.selectedTrainer && (
                <div className="detail-row">
                  <span className="row-label">Выбранный тренер:</span>
                  <span className="row-value">
                    {application.selectedTrainer.name} -{" "}
                    {application.selectedTrainer.position}
                  </span>
                </div>
              )}

              {/* Номер счета для оплаты */}
              {(application as any).paymentAccount && (
                <div className="detail-row">
                  <span className="row-label">Номер счета в ЕРИП:</span>
                  <span className="row-value">
                    {(application as any).paymentAccount}
                  </span>
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
                        : application.source === "admin"
                          ? "Админка"
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
              disabled={selectedStatus === statusName}
            >
              <Save size={16} />
              Сохранить статус
            </button>
          </div>

          <div className="sidebar-card">
            <h3>История статусов</h3>

            <div className="history-list">
              {application.statusHistory &&
                application.statusHistory.map((history, index) => {
                  const historyStatusName =
                    typeof history.status === "object"
                      ? history.status.name
                      : history.status;
                  const Icon = statusConfig[historyStatusName]?.icon || Clock;
                  return (
                    <div key={index} className="history-item">
                      <div
                        className="history-icon"
                        style={{
                          background: `${statusConfig[historyStatusName]?.color || "#000"}10`,
                          color:
                            statusConfig[historyStatusName]?.color || "#000",
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div className="history-content">
                        <div className="history-status">
                          {statusConfig[historyStatusName]?.label ||
                            historyStatusName}
                        </div>
                        <div className="history-date">
                          {format(
                            new Date(history.changedAt),
                            "dd MMM yyyy, HH:mm",
                          )}
                        </div>
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
