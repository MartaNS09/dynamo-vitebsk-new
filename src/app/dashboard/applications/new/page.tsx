"use client";

import { useState, useRef } from "react";
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
} from "lucide-react";
import { ALL_SECTIONS } from "@/data/sport-sections";
import "@/styles/admin/new-application.scss";

export default function NewApplicationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    childAge: "",
    sport: "",
    abonementId: "",
    message: "",
  });

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const sports = ALL_SECTIONS.map((s) => s.name).sort();

  // Маска для белорусского телефона
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d+]/g, "");

    if (phoneNumber.startsWith("+375") || phoneNumber.startsWith("375")) {
      const cleanNumber = phoneNumber.replace("+", "");

      if (cleanNumber.length <= 3) return `+${cleanNumber}`;
      if (cleanNumber.length <= 5)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(3)}`;
      if (cleanNumber.length <= 8)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(
          3,
          5,
        )}) ${cleanNumber.slice(5)}`;
      if (cleanNumber.length <= 10)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(
          3,
          5,
        )}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(8)}`;
      return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(
        3,
        5,
      )}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(
        8,
        10,
      )}-${cleanNumber.slice(10, 12)}`;
    }

    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handlePhoneClick = () => {
    if (phoneInputRef.current && !formData.phone) {
      phoneInputRef.current.value = "+375 (";
      setFormData({ ...formData, phone: "+375 (" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Отправить на бэкенд
    console.log("Новая заявка:", formData);
    router.push("/dashboard/applications");
  };

  return (
    <div className="new-application">
      <div className="page-header">
        <button onClick={() => router.back()} className="back-btn">
          <ArrowLeft size={20} />
          Назад
        </button>
        <h1>Создание новой заявки</h1>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-grid">
          <div className="form-card">
            <h2>Контактные данные</h2>

            <div className="form-group">
              <label>
                <User size={16} />
                ФИО *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <Phone size={16} />
                  Телефон *
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onClick={handlePhoneClick}
                  placeholder="+375 (29) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@mail.ru"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <Calendar size={16} />
                Возраст ребенка
              </label>
              <input
                type="number"
                min="3"
                max="18"
                value={formData.childAge}
                onChange={(e) =>
                  setFormData({ ...formData, childAge: e.target.value })
                }
                placeholder="от 3 до 18 лет"
              />
            </div>
          </div>

          <div className="form-card">
            <h2>Детали записи</h2>

            <div className="form-group">
              <label>
                <Users size={16} />
                Вид спорта
              </label>
              <select
                value={formData.sport}
                onChange={(e) =>
                  setFormData({ ...formData, sport: e.target.value })
                }
              >
                <option value="">Выберите секцию</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <CreditCard size={16} />
                Абонемент
              </label>
              <input
                type="text"
                value={formData.abonementId}
                onChange={(e) =>
                  setFormData({ ...formData, abonementId: e.target.value })
                }
                placeholder="ID абонемента (опционально)"
              />
            </div>

            <div className="form-group">
              <label>Комментарий</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Дополнительная информация..."
              />
            </div>
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
          <button type="submit" className="submit-btn">
            <Save size={16} />
            Сохранить заявку
          </button>
        </div>
      </form>
    </div>
  );
}
