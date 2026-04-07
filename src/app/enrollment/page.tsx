"use client";

import { Suspense } from "react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, User, Calendar, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { ALL_SECTIONS } from "@/data/sport-sections";
import TrainerSelector from "@/components/enrollment/TrainerSelector";
import TrainerAbonementSelector from "@/components/enrollment/TrainerAbonementSelector";
import PaymentInstructions from "@/components/enrollment/PaymentInstructions";
import {
  getTrainerAbonementByName,
  TrainerAbonement,
} from "@/data/trainer-abonement-data";
import "./page.scss";

function EnrollmentForm() {
  const searchParams = useSearchParams();

  // Параметры из URL
  const sportFromUrl = searchParams.get("sport") || searchParams.get("section");
  const abonementId =
    searchParams.get("abonement") || searchParams.get("abonementId");
  const abonementPrice =
    searchParams.get("price") || searchParams.get("abonementPrice");
  const abonementName = searchParams.get("abonementName");
  const trainerIdFromUrl = searchParams.get("trainerId");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    sport: sportFromUrl || "",
    abonementId: abonementId || "",
    abonementName: abonementName || "",
    abonementPrice: abonementPrice || "",
    message: "",
    paymentAccount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [selectedAbonement, setSelectedAbonement] =
    useState<TrainerAbonement | null>(null);
  const [selectedTrainerAbonement, setSelectedTrainerAbonement] =
    useState<TrainerAbonement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.sport) {
      const section = ALL_SECTIONS.find((s) => s.name === formData.sport);
      setSelectedSection(section || null);
    }
  }, [formData.sport]);

  // Сохраняем абонемент из URL при загрузке
  useEffect(() => {
    if (abonementName && abonementPrice) {
      setFormData((prev) => ({
        ...prev,
        abonementId: abonementId || "",
        abonementName: abonementName,
        abonementPrice: abonementPrice,
      }));
    }
  }, [abonementName, abonementPrice, abonementId]);

  // Если передан абонемент из URL, пытаемся найти его данные
  useEffect(() => {
    if (abonementName && abonementPrice) {
      setSelectedAbonement({
        id: abonementId || "temp",
        name: abonementName,
        price: Number(abonementPrice),
        duration: "1 месяц",
        paymentAccount: "",
      });
    }
  }, [abonementName, abonementPrice, abonementId]);

  // Сбрасываем выбранный абонемент и тренера при смене секции
  useEffect(() => {
    if (formData.sport) {
      // Сбрасываем выбранный абонемент
      setSelectedAbonement(null);
      setSelectedTrainerAbonement(null);
      setSelectedTrainer(null);

      // Сбрасываем данные абонемента в форме
      setFormData((prev) => ({
        ...prev,
        abonementId: "",
        abonementName: "",
        abonementPrice: "",
      }));
    }
  }, [formData.sport]);

  const sports = ALL_SECTIONS.map((s) => s.name).sort();

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d+]/g, "");
    if (phoneNumber.startsWith("+375") || phoneNumber.startsWith("375")) {
      const cleanNumber = phoneNumber.replace("+", "");
      if (cleanNumber.length <= 3) return `+${cleanNumber}`;
      if (cleanNumber.length <= 5)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(3)}`;
      if (cleanNumber.length <= 8)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(3, 5)}) ${cleanNumber.slice(5)}`;
      if (cleanNumber.length <= 10)
        return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(3, 5)}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(8)}`;
      return `+${cleanNumber.slice(0, 3)} (${cleanNumber.slice(3, 5)}) ${cleanNumber.slice(5, 8)}-${cleanNumber.slice(8, 10)}-${cleanNumber.slice(10, 12)}`;
    }
    return value;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim())
      newErrors.name = "ФИО обязательно для заполнения";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    console.log("📋 Отправка заявки:", {
      sport: formData.sport,
      sectionId: selectedSection?.id,
      sectionName: selectedSection?.name,
      selectedTrainer,
      selectedAbonement,
    });

    try {
      const response = await fetch("http://localhost:3001/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          childAge: formData.age ? parseInt(formData.age) : null,
          message: formData.message || null,
          sport: formData.sport || null,
          source: "enrollment_form",
          sectionId: selectedSection?.id || null,
          sectionName: selectedSection?.name || null,
          selectedAbonement: selectedAbonement
            ? {
                id: selectedAbonement.id,
                name: selectedAbonement.name,
                price: selectedAbonement.price,
                duration: selectedAbonement.duration,
                paymentAccount: selectedAbonement.paymentAccount,
              }
            : null,
          selectedTrainer: selectedTrainer
            ? {
                id: selectedTrainer.id,
                name: selectedTrainer.name,
                position: selectedTrainer.position,
              }
            : null,
          paymentAccount: selectedAbonement?.paymentAccount || null,
        }),
      });

      const result = await response.json();
      console.log("✅ Заявка создана:", result);

      if (response.ok) {
        alert("Заявка отправлена! Мы свяжемся с вами.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          age: "",
          sport: "",
          abonementId: "",
          abonementName: "",
          abonementPrice: "",
          message: "",
          paymentAccount: "",
        });
        setSelectedTrainer(null);
        setSelectedAbonement(null);
        setSelectedTrainerAbonement(null);
      } else {
        throw new Error(result.message || "Ошибка при отправке");
      }
    } catch (error) {
      console.error("❌ Ошибка:", error);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    let formattedValue = name === "phone" ? formatPhoneNumber(value) : value;
    setFormData({ ...formData, [name]: formattedValue });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneInputClick = () => {
    if (phoneInputRef.current && !formData.phone) {
      phoneInputRef.current.value = "+375 (";
    }
  };

  return (
    <>
      <nav className="breadcrumbs">
        <Link href="/">Главная</Link>
        <span> / </span>
        {formData.sport && (
          <>
            <Link href="/sports">Секции</Link>
            <span> / </span>
          </>
        )}
        <span>Запись в школу</span>
      </nav>

      <div className="enrollment-content">
        <div className="form-section">
          <h1>
            <span className="highlight">Запись</span> в спортивную школу
          </h1>
          <p className="subtitle">
            {formData.sport
              ? `Запись в секцию "${formData.sport}"`
              : "Заполните форму, и мы подберем для вас подходящую секцию"}
          </p>

          {formData.abonementName && formData.abonementPrice && (
            <div className="selected-abonement">
              <div className="abonement-header">
                <CreditCard size={20} />
                <span>Выбранный абонемент</span>
              </div>
              <div className="abonement-details">
                <div className="abonement-name">{formData.abonementName}</div>
                <div className="abonement-price">
                  {formData.abonementPrice} BYN
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="enrollment-form" noValidate>
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
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">
                  <Phone size={16} />
                  Телефон *
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onClick={handlePhoneInputClick}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
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
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">
                  <Calendar size={16} />
                  Возраст ребенка
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="3"
                  max="18"
                  value={formData.age}
                  onChange={handleChange}
                  className={errors.age ? "error" : ""}
                />
                {errors.age && (
                  <span className="error-message">{errors.age}</span>
                )}
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

            {/* Выбор тренера - для общей формы (БЕЗ предвыбранного абонемента) */}
            {selectedSection?.id && !formData.abonementPrice && (
              <TrainerSelector
                sectionId={selectedSection.id}
                onSelect={(trainer, paymentAccount) => {
                  setSelectedTrainer(trainer);
                  if (paymentAccount && selectedAbonement) {
                    setSelectedAbonement({
                      ...selectedAbonement,
                      paymentAccount: paymentAccount,
                    });
                  }
                }}
                selectedTrainerId={trainerIdFromUrl || undefined}
              />
            )}

            {/* Выбор тренера - для формы с предвыбранным абонементом (из секции) */}
            {selectedSection?.id && formData.abonementPrice && (
              <TrainerSelector
                sectionId={selectedSection.id}
                abonementPrice={Number(formData.abonementPrice)}
                onSelect={(trainer, paymentAccount) => {
                  setSelectedTrainer(trainer);
                  if (paymentAccount && selectedAbonement) {
                    setSelectedAbonement({
                      ...selectedAbonement,
                      paymentAccount: paymentAccount,
                    });
                  } else if (paymentAccount && !selectedAbonement) {
                    setSelectedAbonement({
                      id: abonementId || "temp",
                      name: formData.abonementName || "",
                      price: Number(formData.abonementPrice) || 0,
                      duration: "1 месяц",
                      paymentAccount: paymentAccount,
                    });
                  }
                }}
                selectedTrainerId={trainerIdFromUrl || undefined}
              />
            )}

            {/* Выбор абонемента - только для общей формы (БЕЗ предвыбранного абонемента) */}
            {selectedTrainer && !formData.abonementPrice && (
              <TrainerAbonementSelector
                trainerName={selectedTrainer.name}
                sectionId={selectedSection.id}
                onSelect={(abonement) => {
                  setSelectedTrainerAbonement(abonement);
                  if (abonement) {
                    setFormData((prev) => ({
                      ...prev,
                      abonementId: abonement.id,
                      abonementName: abonement.name,
                      abonementPrice: String(abonement.price),
                    }));
                    setSelectedAbonement(abonement);
                  }
                }}
              />
            )}

            {/* Инструкция по оплате */}
            {selectedTrainer && selectedAbonement && (
              <PaymentInstructions
                trainerName={selectedTrainer.name}
                paymentAccount={selectedAbonement.paymentAccount}
                abonementName={selectedAbonement.name}
                abonementPrice={selectedAbonement.price}
                instructions={`
                  <h4>Абонемент: ${selectedAbonement?.name || formData.abonementName} - ${selectedAbonement?.price || formData.abonementPrice} BYN</h4>
                  <h4>Как оплатить через систему «Расчет» (ЕРИП)</h4>
                  <ol>
                    <li>Выберите пункт "Система «Расчет» (ЕРИП)"</li>
                    <li>Выберите "Образование и развитие"</li>
                    <li>Выберите "Спорт и физическое развитие"</li>
                    <li>Выберите "Физкультурные центры"</li>
                    <li>Выберите "Витебская обл."</li>
                    <li>Выберите "СДЮШОР БФСО Динамо"</li>
                    <li>Выберите "Физкультурно-оздоровит.услуги"</li>
                    <li><strong>Введите номер счета: ${selectedAbonement?.paymentAccount || ""}</strong></li>
                    <li>Введите свои данные (фамилию, имя, отчество)</li>
                    <li>Проверьте правильность информации</li>
                    <li>Совершите платеж</li>
                  </ol>
                  <p><strong>Справки по тел. 37-36-35</strong></p>
                  <p><strong>ИЛИ оплатите по коду услуги:</strong></p>
                  <ol>
                    <li>Выберите пункт "Система «Расчет» (ЕРИП)"</li>
                    <li>Выберите "Оплата в ЕРИП по коду услуги"</li>
                    <li>Введите код <strong>207383</strong></li>
                  </ol>
                `}
              />
            )}

            <input
              type="hidden"
              name="abonementId"
              value={formData.abonementId}
            />
            <input
              type="hidden"
              name="abonementName"
              value={formData.abonementName}
            />
            <input
              type="hidden"
              name="abonementPrice"
              value={formData.abonementPrice}
            />

            <div className="form-group">
              <label htmlFor="message">Дополнительная информация</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="form-footer">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
              <p className="form-note">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link href="/privacy">политикой конфиденциальности</Link>
              </p>
            </div>
          </form>
        </div>

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
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div className="contact-info">
                <div className="contact-label">Электронная почта</div>
                <a
                  href="mailto:vitebsksdushor@dynamo.by"
                  className="contact-value"
                >
                  vitebsksdushor@dynamo.by
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function EnrollmentPage() {
  return (
    <div className="enrollment-page">
      <div className="container">
        <Suspense fallback={<div>Загрузка...</div>}>
          <EnrollmentForm />
        </Suspense>
      </div>
    </div>
  );
}
