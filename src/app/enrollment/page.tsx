"use client";

import { useState } from "react";
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

  const sports = [
    "Бокс",
    "Дзюдо",
    "Самбо",
    "Борьба классическая",
    "Борьба вольная",
    "Тяжелая атлетика",
    "Легкая атлетика",
    "Спортивная гимнастика",
    "Пулевая стрельба",
    "Биатлон",
    "Лыжные гонки",
    "Плавание",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы
    alert("Заявка отправлена! Мы свяжемся с вами в течение дня.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="enrollment-page">
      <div className="container">
        {/* Хлебные крошки */}
        <nav className="breadcrumbs" aria-label="Навигация">
          {/* ИЗМЕНИТЕ <a> на <Link> */}
          <Link href="/">Главная</Link>
          <span> / </span>
          <span>Запись в школу</span>
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

            <form onSubmit={handleSubmit} className="enrollment-form">
              {/* ... остальная форма без изменений ... */}
              <div className="form-group">
                <label htmlFor="name">
                  <User size={16} />
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
                    required
                    placeholder="+375 (XX) XXX-XX-XX"
                    value={formData.phone}
                    onChange={handleChange}
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
                    placeholder="example@mail.ru"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age">
                    <Calendar size={16} />
                    Возраст ребенка *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    min="6"
                    max="18"
                    placeholder="10 лет"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sport">
                    <Users size={16} />
                    Интересующий вид спорта
                  </label>
                  <select
                    id="sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
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
                />
              </div>

              <div className="form-footer">
                <Button type="submit" variant="primary" size="large">
                  Отправить заявку
                </Button>
                <p className="form-note">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  {/* И здесь тоже заменить */}
                  <Link href="/privacy">политикой конфиденциальности</Link>
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
                  <Phone size={24} />
                </div>
                <div className="contact-info">
                  <div className="contact-label">Телефон для связи</div>
                  <a href="tel:+375333102525" className="contact-value">
                    +375 (33) 310-25-25
                  </a>
                  <p className="contact-note">Ежедневно с 9:00 до 18:00</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} />
                </div>
                <div className="contact-info">
                  <div className="contact-label">Электронная почта</div>
                  <a
                    href="mailto:dynamo-vitebsk@mail.ru"
                    className="contact-value"
                  >
                    dynamo-vitebsk@mail.ru
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Calendar size={24} />
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
                <ul>
                  <li>Мы перезвоним вам в течение дня</li>
                  <li>Познакомим с тренером выбранной секции</li>
                  <li>Пригласим на пробную тренировку</li>
                  <li>Поможем с оформлением документов</li>
                </ul>
              </div>

              {/* И здесь заменить */}
              <div className="back-link">
                <Link href="/">
                  <ArrowLeft size={16} />
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
