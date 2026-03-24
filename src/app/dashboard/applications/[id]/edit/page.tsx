"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { getApplication, updateApplication } from "@/lib/api/applications";
import { Application } from "@/types/application.types";
import { getStatusLabel } from "@/types/application";
import { ALL_SECTIONS } from "@/data/sport-sections";
import "@/styles/admin/application-edit.scss";

export default function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    childAge: "",
    sport: "",
    message: "",
  });

  const sports = ALL_SECTIONS.map((s) => s.name).sort();

  useEffect(() => {
    const loadApplication = async () => {
      try {
        console.log("📥 Загружаем заявку с ID:", id);
        const data = await getApplication(id);
        setApplication(data);
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          childAge: data.childAge?.toString() || "",
          sport: data.sport || "",
          message: data.message || "",
        });
      } catch (error) {
        console.error("❌ Ошибка загрузки заявки:", error);
        setError("Не удалось загрузить заявку");
      } finally {
        setLoading(false);
      }
    };
    loadApplication();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    console.log("📝 Сохраняем изменения:", formData);

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        childAge: formData.childAge ? parseInt(formData.childAge) : null,
        sport: formData.sport || null,
        message: formData.message || null,
      };

      console.log("📤 Отправляем на сервер:", updateData);
      console.log("🔑 ID заявки:", id);

      await updateApplication(id, updateData);

      console.log("✅ Сохранено успешно!");
      alert("Изменения сохранены!");
      router.push("/dashboard/applications");
    } catch (error) {
      console.error("❌ Ошибка сохранения:", error);
      setError("Не удалось сохранить изменения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Загрузка заявки...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="error-container">
        <AlertCircle size={48} />
        <h2>Ошибка</h2>
        <p>{error || "Заявка не найдена"}</p>
        <button onClick={() => router.back()} className="back-btn">
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className="application-edit">
      <div className="edit-header">
        <button onClick={() => router.back()} className="back-btn">
          <ArrowLeft size={20} />
          Назад к заявкам
        </button>
        <div className="title-section">
          <h1>Редактирование заявки</h1>
          <span className="application-id">ID: {application.id}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-main">
            <div className="form-card">
              <h2>Контактные данные</h2>

              <div className="form-group">
                <label htmlFor="name">
                  <User size={16} />
                  ФИО *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+375 (29) 123-45-67"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="childAge">
                    <Calendar size={16} />
                    Возраст ребенка
                  </label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    min="3"
                    max="18"
                    placeholder="от 3 до 18 лет"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sport">
                    <Users size={16} />
                    Вид спорта
                  </label>
                  <select
                    id="sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                  >
                    <option value="">Не выбран</option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h2>Дополнительная информация</h2>
              <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Комментарий к заявке..."
                />
              </div>
            </div>
          </div>

          <div className="form-sidebar">
            <div className="info-card">
              <h3>Информация о заявке</h3>
              <div className="info-row">
                <span className="info-label">Статус:</span>
                <span className="info-value">
                  {getStatusLabel(application.status)}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Дата создания:</span>
                <span className="info-value">
                  {new Date(application.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Источник:</span>
                <span className="info-value">
                  {application.source === "enrollment_form"
                    ? "Форма записи"
                    : application.source === "admin"
                      ? "Админка"
                      : application.source}
                </span>
              </div>
            </div>

            {application.selectedAbonement && (
              <div className="abonement-card">
                <h3>Выбранный абонемент</h3>
                <div className="abonement-details">
                  <div className="abonement-name">
                    {application.selectedAbonement.name}
                  </div>
                  <div className="abonement-price">
                    {application.selectedAbonement.price} BYN
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => router.back()}
          >
            Отмена
          </button>
          <button type="submit" disabled={saving} className="submit-btn">
            <Save size={16} />
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </div>
  );
}
