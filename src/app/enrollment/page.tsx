"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, User, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import "./page.scss";

export default function EnrollmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    sport: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const sports = [
    "ПОЖАРНО-СПАСАТЕЛЬНЫЙ СПОРТ",
    "ФРИСТАЙЛ",
    "АКРОБАТИКА",
    "ГИМНАСТИКА РАЗВИВАЮЩАЯ",
    "СКАЛОЛАЗАНИЕ",
    "ДЕТСКИЙ ФИТНЕС",
    "СОВРЕМЕННАЯ ХОРЕОГРАФИЯ",
    "СТРЕЛЬБА ПУЛЕВАЯ",
    "ВЬЕТ ВО ДАО",
    "ДЕТСКАЯ АКВААЭРОБИКА",
    "ДЗЮДО (САМБО)",
    "КАРАТЭ",
    "ВАДЖРА ЙОГА",
    "КИКБОКСИНГ",
    "ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА",
    "ВЕЛОСИПЕДНЫЙ СПОРТ",
    "ЛЕГКАЯ АТЛЕТИКА",
  ];

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
          5
        )}) ${cleanNumber.slice(5)}`;
      if (cleanNumber.length <= 10)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(
          3,
          5
        )}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(8)}`;
      return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(
        3,
        5
      )}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(
        8,
        10
      )}-${cleanNumber.slice(10, 12)}`;
    }

    if (phoneNumber.replace("+", "").length <= 9) {
      const numbers = phoneNumber.replace("+", "");
      if (numbers.length === 0) return "";
      if (numbers.length <= 2) return `+375 (${numbers}`;
      if (numbers.length <= 5)
        return `+375 (${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      if (numbers.length <= 8)
        return `+375 (${numbers.slice(0, 2)}) ${numbers.slice(
          2,
          5
        )}-${numbers.slice(5)}`;
      return `+375 (${numbers.slice(0, 2)}) ${numbers.slice(
        2,
        5
      )}-${numbers.slice(5, 7)}-${numbers.slice(7, 9)}`;
    }

    return value;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "ФИО обязательно для заполнения";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else {
      const phoneRegex = /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone =
          "Введите корректный номер телефона (+375 (XX) XXX-XX-XX)";
      }
    }

    if (formData.age) {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 3 || ageNum > 18) {
        newErrors.age = "Возраст ребенка должен быть от 3 до 18 лет";
      }
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert("Заявка отправлена! Мы свяжемся с вами в течение дня.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        sport: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneInputClick = () => {
    if (phoneInputRef.current && !formData.phone) {
      phoneInputRef.current.value = "+375 (";
    }
  };

  return (
    <div className="enrollment-page">
      <div className="container">
        {/* Хлебные крошки с aria-label */}
        <nav className="breadcrumbs" aria-label="Навигация по страницам">
          <Link href="/" aria-label="Перейти на главную страницу">
            Главная
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Запись в школу</span>
        </nav>

        <div className="enrollment-content">
          {/* Левая часть - форма */}
          <div className="form-section">
            <h1>
              <span className="highlight">Запись</span> в спортивную школу
            </h1>
            <p className="subtitle">
              Заполните форму, и мы подберем для вас подходящую секцию
            </p>

            <form
              onSubmit={handleSubmit}
              className="enrollment-form"
              aria-label="Форма записи в спортивную школу"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="name">
                  <User size={16} aria-hidden="true" />
                  ФИО ребенка или родителя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Иванов Иван Иванович"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={16} aria-hidden="true" />
                    Телефон *
                  </label>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+375 (29) 123-45-67"
                    value={formData.phone}
                    onChange={handleChange}
                    onClick={handlePhoneInputClick}
                    className={errors.phone ? "error" : ""}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <span
                      id="phone-error"
                      className="error-message"
                      role="alert"
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} aria-hidden="true" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span
                      id="email-error"
                      className="error-message"
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">
                    <Calendar size={16} aria-hidden="true" />
                    Возраст ребенка
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="3"
                    max="18"
                    placeholder="от 3 до 18 лет"
                    value={formData.age}
                    onChange={handleChange}
                    className={errors.age ? "error" : ""}
                    aria-invalid={!!errors.age}
                    aria-describedby={errors.age ? "age-error" : undefined}
                  />
                  {errors.age && (
                    <span id="age-error" className="error-message" role="alert">
                      {errors.age}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="sport">
                    <Users size={16} aria-hidden="true" />
                    Интересующий вид спорта
                  </label>
                  <select
                    id="sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    aria-label="Выберите вид спорта"
                  >
                    <option value="">Выберите вид спорта</option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Дополнительная информация</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Опыт занятий спортом, пожелания, удобное время для тренировок..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-label="Дополнительная информация"
                />
              </div>

              <div className="form-footer">
                <p className="required-note" aria-hidden="true">
                  <span className="required-star">*</span> Поля обязательные для
                  заполнения
                </p>
                <p className="visually-hidden" id="required-description">
                  Поля, отмеченные звездочкой, обязательны для заполнения
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting}
                  aria-label={
                    isSubmitting
                      ? "Отправка формы..."
                      : "Отправить заявку на запись в спортивную школу"
                  }
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
                <p className="form-note">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link
                    href="/privacy"
                    aria-label="Политика конфиденциальности"
                  >
                    политикой конфиденциальности
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Правая часть - контакты */}
          <div className="contacts-section">
            <div className="contacts-card">
              <h2>Контактная информация</h2>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <div className="contact-info">
                  <div className="contact-label">Телефон для связи</div>
                  <a
                    href="tel:+375333102525"
                    className="contact-value"
                    aria-label="Позвонить по телефону +375 33 310 25 25"
                  >
                    +375 (33) 310-25-25
                  </a>
                  <p className="contact-note">Ежедневно с 9:00 до 18:00</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} aria-hidden="true" />
                </div>
                <div className="contact-info">
                  <div className="contact-label">Электронная почта</div>
                  <a
                    href="mailto:vitebsksdushor@dynamo.by"
                    className="contact-value"
                    aria-label="Написать на электронную почту vitebsksdushor@dynamo.by"
                  >
                    vitebsksdushor@dynamo.by
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Calendar size={24} aria-hidden="true" />
                </div>
                <div className="contact-info">
                  <div className="contact-label">График работы</div>
                  <div className="contact-value">
                    Пн-Пт: 8:00-20:00
                    <br />
                    Сб: 9:00-16:00
                    <br />
                    Вс: 9:00-14:00
                  </div>
                </div>
              </div>

              <div className="info-box">
                <h3>Что дальше?</h3>
                <ul aria-label="Процесс записи в спортивную школу">
                  <li>Мы перезвоним вам в течение дня</li>
                  <li>Познакомим с тренером выбранной секции</li>
                  <li>Пригласим на пробную тренировку</li>
                  <li>Поможем с оформлением документов</li>
                </ul>
              </div>

              <div className="back-link">
                <Link href="/" aria-label="Вернуться на главную страницу">
                  <ArrowLeft size={16} aria-hidden="true" />
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
