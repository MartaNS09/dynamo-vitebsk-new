"use client";

import { Suspense } from "react";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Users,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { ALL_SECTIONS } from "@/data/sport-sections";
import { getSections } from "@/lib/api/sections";
import { createApplication } from "@/lib/api/applications";
import { trackEvent } from "@/lib/analytics/track";
import { SportSection, Trainer } from "@/types/sport-section.types";
import "./page.scss";

function normalizeSessionsLabel(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function extractSessionsCount(value: string) {
  const match = value.toLowerCase().match(/(\d+)\s*занят/);
  return match ? Number(match[1]) : null;
}

function extractSessionsFromAbonement(value: string) {
  const normalized = value.toLowerCase();
  if (normalized.includes("индивиду")) {
    return "индивидуальное";
  }
  const match = normalized.match(/(\d+)\s*занят/i);
  return match ? `${match[1]} занятий` : "";
}

function findAccountNumberBySessions(
  trainer: Trainer | undefined,
  sessionsLabel: string,
) {
  if (!trainer?.paymentAccounts?.length || !sessionsLabel) {
    return "";
  }
  const normalizedTarget = normalizeSessionsLabel(sessionsLabel);
  const exact = trainer.paymentAccounts.find(
    (item) => normalizeSessionsLabel(item.sessions) === normalizedTarget,
  );
  if (exact?.accountNumber) {
    return exact.accountNumber;
  }

  const targetCount = extractSessionsCount(sessionsLabel);
  if (targetCount !== null) {
    const numericMatch = trainer.paymentAccounts.find(
      (item) => extractSessionsCount(item.sessions) === targetCount,
    );
    if (numericMatch?.accountNumber) {
      return numericMatch.accountNumber;
    }
  }

  const fuzzy = trainer.paymentAccounts.find((item) =>
    normalizeSessionsLabel(item.sessions).includes(normalizedTarget) ||
    normalizedTarget.includes(normalizeSessionsLabel(item.sessions)),
  );
  return fuzzy?.accountNumber || "";
}

function trainerSupportsAbonement(trainer: Trainer | undefined, abonementLabel: string) {
  const sessionsLabel = extractSessionsFromAbonement(abonementLabel);
  return Boolean(findAccountNumberBySessions(trainer, sessionsLabel));
}

function resolveSectionFromQuery(
  sectionQuery: string | null,
  sections: SportSection[],
) {
  if (!sectionQuery) return null;
  const normalized = sectionQuery.toLowerCase().trim();
  return (
    sections.find((section) => section.slug.toLowerCase() === normalized) ||
    sections.find((section) => section.name.toLowerCase() === normalized) ||
    null
  );
}

// Компонент с формой, использующий useSearchParams
function EnrollmentForm() {
  const searchParams = useSearchParams();

  // Получаем параметры из URL
  const sportFromUrl = searchParams.get("sport");
  const sectionFromUrl = searchParams.get("section");
  const trainerIdFromUrl = searchParams.get("trainerId");
  const abonementId = searchParams.get("abonement");
  const abonementPrice = searchParams.get("price");
  const abonementName = searchParams.get("abonementName");
  const [availableSections, setAvailableSections] =
    useState<SportSection[]>(ALL_SECTIONS);
  const resolvedSection =
    resolveSectionFromQuery(sectionFromUrl, availableSections) ||
    resolveSectionFromQuery(sportFromUrl, availableSections);
  const preselectedTrainer = resolvedSection?.trainers?.find(
    (trainer) => trainer.id === trainerIdFromUrl,
  );
  const preselectedAbonement = resolvedSection?.abonements?.find(
    (abonement) => abonement.id === abonementId,
  );
  const isPaymentOnlyFlow = Boolean(abonementId || abonementName || abonementPrice);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    sport: resolvedSection?.name || sportFromUrl || "",
    trainerId: preselectedTrainer?.id || "",
    trainerName: preselectedTrainer?.name || "",
    abonementId: abonementId || "",
    abonementName: abonementName || preselectedAbonement?.description || "",
    abonementPrice:
      abonementPrice || (preselectedAbonement ? String(preselectedAbonement.price) : ""),
    accountNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SportSection | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const selectedTrainer = selectedSection?.trainers?.find(
    (trainer) => trainer.id === formData.trainerId,
  );
  const selectedTrainerName = selectedTrainer?.name || formData.trainerName;
  const trainersByAbonement = selectedSection?.trainers?.filter((trainer) =>
    formData.abonementName ? trainerSupportsAbonement(trainer, formData.abonementName) : true,
  );
  const abonementsByTrainer = selectedSection?.abonements?.filter((abonement) =>
    formData.trainerId ? trainerSupportsAbonement(selectedTrainer, abonement.description) : true,
  );

  // Находим секцию по названию спорта
  useEffect(() => {
    trackEvent("enrollment_page_view");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const sections = await getSections();
        if (sections.length > 0) {
          setAvailableSections(sections);
        }
      } catch {
        // Keep static fallback if API is unavailable.
      }
    })();
  }, []);

  useEffect(() => {
    if (formData.sport) {
      const section = resolveSectionFromQuery(formData.sport, availableSections);
      setSelectedSection(section || null);
      if (!section) {
        setFormData((prev) => ({
          ...prev,
          trainerId: "",
          trainerName: "",
          accountNumber: "",
        }));
      }
    } else {
      setSelectedSection(null);
      setFormData((prev) => ({
        ...prev,
        trainerId: "",
        trainerName: "",
        accountNumber: "",
      }));
    }
  }, [formData.sport, availableSections]);

  useEffect(() => {
    if (!selectedSection || !formData.abonementId) return;
    const matchedAbonement = selectedSection.abonements.find(
      (item) => item.id === formData.abonementId,
    );
    if (!matchedAbonement) return;
    setFormData((prev) => ({
      ...prev,
      abonementName: prev.abonementName || matchedAbonement.description,
      abonementPrice: prev.abonementPrice || String(matchedAbonement.price),
    }));
  }, [formData.abonementId, selectedSection]);

  useEffect(() => {
    const sessionsLabel = extractSessionsFromAbonement(formData.abonementName);
    const accountNumber = findAccountNumberBySessions(selectedTrainer, sessionsLabel);

    setFormData((prev) => {
      if (prev.accountNumber === accountNumber) {
        return prev;
      }
      return {
        ...prev,
        accountNumber,
      };
    });
  }, [formData.trainerId, formData.abonementName, selectedSection, selectedTrainer]);

  useEffect(() => {
    if (
      formData.abonementId &&
      selectedTrainer &&
      !trainerSupportsAbonement(selectedTrainer, formData.abonementName)
    ) {
      setFormData((prev) => ({
        ...prev,
        abonementId: "",
        abonementName: "",
        abonementPrice: "",
        accountNumber: "",
      }));
    }
  }, [
    formData.abonementId,
    formData.abonementName,
    formData.trainerId,
    selectedTrainer,
  ]);

  useEffect(() => {
    if (
      formData.trainerId &&
      formData.abonementName &&
      !trainerSupportsAbonement(selectedTrainer, formData.abonementName)
    ) {
      setFormData((prev) => ({
        ...prev,
        trainerId: "",
        trainerName: "",
        accountNumber: "",
      }));
    }
  }, [
    formData.abonementName,
    formData.trainerId,
    selectedTrainer,
  ]);

  // Все доступные виды спорта
  const sports = availableSections.map((s) => s.name).sort();

  const handleDownloadPaymentPdf = () => {
    const sectionTitle = formData.sport || "—";
    const abonementTitle = formData.abonementName || "—";
    const trainerTitle = selectedTrainerName || "—";
    const accountTitle = formData.accountNumber || "—";

    const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Памятка по оплате</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111; line-height: 1.45; }
    h1 { font-size: 22px; margin: 0 0 12px; }
    h2 { font-size: 16px; margin: 0 0 10px; color: #0055b7; }
    .meta { background: #f3f6fb; border: 1px solid #d8e2f0; border-radius: 8px; padding: 12px; margin-bottom: 14px; }
    .meta div { margin: 4px 0; }
    ol { margin: 8px 0 0 18px; }
    li { margin: 8px 0; }
    .path { font-weight: 700; }
    .extra { margin-top: 14px; padding-top: 12px; border-top: 1px dashed #b8c0cc; }
  </style>
</head>
<body>
  <h1>Памятка по оплате (ЕРИП)</h1>
  <div class="meta">
    <div><strong>Секция:</strong> ${sectionTitle}</div>
    <div><strong>Абонемент:</strong> ${abonementTitle}</div>
    <div><strong>Тренер:</strong> ${trainerTitle}</div>
    <div><strong>Номер счета:</strong> ${accountTitle}</div>
  </div>
  <h2>Как оплатить по шагам</h2>
  <ol>
    <li>В ЕРИП выберите путь:<br /><span class="path">Образование и развитие → Спорт и физическое развитие → Физкультурные центры → Витебская обл. → СДЮШОР БФСО Динамо → Физкультурно-оздоровит. услуги</span></li>
    <li>Введите номер счета тренера в АИС ЕРИП.</li>
    <li>Введите свои данные (фамилия, имя, отчество).</li>
    <li>Проверьте правильность информации и совершите платеж.</li>
  </ol>
  <div class="extra">
    <div><strong>Код услуги в ЕРИП:</strong> 207383</div>
    <div><strong>Справки по оплате:</strong> 37-36-35</div>
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      await createApplication({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        childAge: formData.age ? Number(formData.age) : undefined,
        sport: formData.sport || undefined,
        message: formData.message || undefined,
        source: "enrollment_form",
        sectionId: selectedSection?.id,
        sectionName: selectedSection?.name,
        selectedAbonement: {
          id: formData.abonementId || undefined,
          name: formData.abonementName || undefined,
          price: formData.abonementPrice ? Number(formData.abonementPrice) : undefined,
          trainerId: formData.trainerId || undefined,
          trainerName: formData.trainerName || undefined,
          accountNumber: formData.accountNumber || undefined,
        },
      });

      alert("Заявка отправлена! Мы свяжемся с вами в течение дня.");

      // Очищаем форму
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        sport: "",
        trainerId: "",
        trainerName: "",
        abonementId: "",
        abonementName: "",
        abonementPrice: "",
        accountNumber: "",
        message: "",
      });

      // Перенаправляем на страницу успеха или главную
      // router.push("/success");
    } catch {
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

    let formattedValue = value;

    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }

    if (name === "sport") {
      setFormData((prev) => ({
        ...prev,
        sport: value,
        trainerId: "",
        trainerName: "",
        abonementId: "",
        abonementName: "",
        abonementPrice: "",
        accountNumber: "",
      }));
      return;
    }

    if (name === "trainerId") {
      const selectedTrainer = selectedSection?.trainers?.find(
        (trainer) => trainer.id === value,
      );
      const sessionsLabel = extractSessionsFromAbonement(formData.abonementName);
      const accountNumber = findAccountNumberBySessions(selectedTrainer, sessionsLabel);
      setFormData((prev) => ({
        ...prev,
        trainerId: value,
        trainerName: selectedTrainer?.name || "",
        accountNumber,
      }));
      return;
    }

    if (name === "abonementId") {
      const selectedAbonement = selectedSection?.abonements?.find(
        (abonement) => abonement.id === value,
      );
      const sessionsLabel = extractSessionsFromAbonement(
        selectedAbonement?.description || "",
      );
      const accountNumber = findAccountNumberBySessions(selectedTrainer, sessionsLabel);
      setFormData((prev) => ({
        ...prev,
        abonementId: value,
        abonementName: selectedAbonement?.description || "",
        abonementPrice: selectedAbonement ? String(selectedAbonement.price) : "",
        accountNumber,
      }));
      return;
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
    <>
      {/* Хлебные крошки */}
      <nav className="breadcrumbs" aria-label="Навигация по страницам">
        <Link href="/" aria-label="Перейти на главную страницу">
          Главная
        </Link>
        <span aria-hidden="true"> / </span>
        {formData.sport && (
          <>
            <Link href="/sports" aria-label="Все секции">
              Секции
            </Link>
            <span aria-hidden="true"> / </span>
          </>
        )}
        <span aria-current="page">
          {isPaymentOnlyFlow ? "Оплата (ЕРИП)" : "Запись в школу"}
        </span>
      </nav>

      <div className="enrollment-content">
        {/* Левая часть - форма */}
        <div className="form-section">
          <h1>
            {isPaymentOnlyFlow ? (
              <>
                <span className="highlight">Информация</span> для оплаты выбранного
                абонемента
              </>
            ) : (
              <>
                <span className="highlight">Запись</span> в спортивную школу
              </>
            )}
          </h1>
          <p className="subtitle">
            {isPaymentOnlyFlow
              ? "Оплатить через систему «Расчет» (ЕРИП)"
              : formData.sport
              ? `Запись в секцию "${formData.sport}"`
              : "Заполните форму, и мы подберем для вас подходящую секцию"}
          </p>

          {/* Блок с выбранным абонементом */}
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

          {isPaymentOnlyFlow ? (
            <div className="enrollment-form" aria-label="Информация для оплаты">
              {abonementsByTrainer?.length ? (
                <div className="form-group">
                  <label htmlFor="abonementId">
                    <CreditCard size={16} aria-hidden="true" />
                    Выберите абонемент
                  </label>
                  <select
                    id="abonementId"
                    name="abonementId"
                    value={formData.abonementId}
                    onChange={handleChange}
                    aria-label="Выберите абонемент"
                  >
                    <option value="">Выберите абонемент</option>
                    {abonementsByTrainer.map((abonement) => (
                      <option key={abonement.id} value={abonement.id}>
                        {abonement.description} — {abonement.price} BYN
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {trainersByAbonement?.length ? (
                <div className="form-group">
                  <label htmlFor="trainerId">
                    <Users size={16} aria-hidden="true" />
                    Выберите тренера для оплаты
                  </label>
                  <select
                    id="trainerId"
                    name="trainerId"
                    value={formData.trainerId}
                    onChange={handleChange}
                    aria-label="Выберите тренера"
                  >
                    <option value="">Выберите тренера</option>
                    {trainersByAbonement.map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>
                        {trainer.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {formData.abonementId && !trainersByAbonement?.length ? (
                <div className="payment-instructions">
                  <p className="payment-intro">
                    Для выбранного абонемента нет тренеров с указанным номером счета.
                    Выберите другой абонемент.
                  </p>
                </div>
              ) : null}

              {!formData.trainerId ? (
                <div className="payment-instructions">
                  <p className="payment-intro">
                    Для получения номера счета выберите тренера.
                  </p>
                </div>
              ) : null}

              {formData.trainerId ? (
                <div className="payment-instructions">
                  <div className="payment-title-box">
                    <div>
                      <strong>Секция:</strong> {formData.sport || "—"}
                    </div>
                    <div>
                      <strong>Абонемент:</strong> {formData.abonementName || "—"}
                    </div>
                  </div>
                  <h3>Как оплатить по шагам (ЕРИП)</h3>
                  <p className="payment-intro">
                    Для выбранного тренера и абонемента платеж выполняется через{" "}
                    <strong>«Расчет» (ЕРИП)</strong>.
                  </p>
                  <ol className="payment-steps">
                    <li>
                      В ЕРИП выберите путь:
                      <br />
                      <strong>
                        Образование и развитие → Спорт и физическое развитие →
                        Физкультурные центры → Витебская обл. → СДЮШОР БФСО Динамо
                        → Физкультурно-оздоровит. услуги
                      </strong>
                    </li>
                    <li>
                      Введите номер счета тренера в АИС ЕРИП:
                      <div className="payment-highlight">
                        <div>
                          Тренер: <strong>{selectedTrainerName || "не выбран"}</strong>
                        </div>
                        <div>
                          Номер счета:{" "}
                          <strong>{formData.accountNumber || "не указан"}</strong>
                        </div>
                      </div>
                    </li>
                    <li>Введите свои данные (фамилия, имя, отчество).</li>
                    <li>Проверьте правильность информации и совершите платеж.</li>
                  </ol>

                  <div className="payment-extra">
                    <p>
                      Также можно оплатить по коду услуги в ЕРИП:{" "}
                      <strong>207383</strong>
                    </p>
                    <p>
                      Справки по оплате: <strong>37-36-35</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="payment-pdf-btn"
                    onClick={handleDownloadPaymentPdf}
                  >
                    Скачать PDF памятку
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
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
                  <span id="phone-error" className="error-message" role="alert">
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
                  <span id="email-error" className="error-message" role="alert">
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

            {selectedSection?.abonements?.length ? (
              <div className="form-group">
                <label htmlFor="abonementId">
                  <CreditCard size={16} aria-hidden="true" />
                  Абонемент
                </label>
                <select
                  id="abonementId"
                  name="abonementId"
                  value={formData.abonementId}
                  onChange={handleChange}
                  aria-label="Выберите абонемент"
                >
                  <option value="">Выберите абонемент</option>
                  {selectedSection.abonements.map((abonement) => (
                    <option key={abonement.id} value={abonement.id}>
                      {abonement.description} — {abonement.price} BYN
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {selectedSection?.trainers?.length ? (
              <div className="form-group">
                <label htmlFor="trainerId">
                  <Users size={16} aria-hidden="true" />
                  Тренер
                </label>
                <select
                  id="trainerId"
                  name="trainerId"
                  value={formData.trainerId}
                  onChange={handleChange}
                  aria-label="Выберите тренера"
                >
                  <option value="">Выберите тренера</option>
                  {trainersByAbonement.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {formData.trainerId && formData.abonementName ? (
              <div className="selected-account">
                <div className="account-header">Номер счета тренера</div>
                {formData.accountNumber ? (
                  <div className="account-number">{formData.accountNumber}</div>
                ) : (
                  <div className="account-missing">
                    Для выбранного количества занятий счет пока не указан
                  </div>
                )}
              </div>
            ) : null}

            {formData.trainerId ? (
              <div className="payment-instructions">
                <div className="payment-title-box">
                  <div>
                    <strong>Секция:</strong> {formData.sport || "—"}
                  </div>
                  <div>
                    <strong>Абонемент:</strong> {formData.abonementName || "—"}
                  </div>
                </div>
                <h3>Как оплатить по шагам (ЕРИП)</h3>
                <p className="payment-intro">
                  После выбора тренера платеж выполняется через систему{" "}
                  <strong>«Расчет» (ЕРИП)</strong>.
                </p>
                <ol className="payment-steps">
                  <li>
                    В ЕРИП выберите путь:
                    <br />
                    <strong>
                      Образование и развитие → Спорт и физическое развитие →
                      Физкультурные центры → Витебская обл. → СДЮШОР БФСО Динамо
                      → Физкультурно-оздоровит. услуги
                    </strong>
                  </li>
                  <li>
                    Введите номер счета тренера в АИС ЕРИП:
                    <div className="payment-highlight">
                      <div>
                        Тренер: <strong>{selectedTrainerName || "не выбран"}</strong>
                      </div>
                      <div>
                        Номер счета:{" "}
                        <strong>{formData.accountNumber || "не указан"}</strong>
                      </div>
                    </div>
                  </li>
                  <li>Введите свои данные (фамилия, имя, отчество).</li>
                  <li>Проверьте правильность информации и совершите платеж.</li>
                </ol>

                <div className="payment-extra">
                  <p>
                    Также можно оплатить по коду услуги в ЕРИП:{" "}
                    <strong>207383</strong>
                  </p>
                  <p>
                    Справки по оплате: <strong>37-36-35</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="payment-pdf-btn"
                  onClick={handleDownloadPaymentPdf}
                >
                  Скачать PDF памятку
                </button>
              </div>
            ) : null}

            {/* Скрытые поля для данных абонемента */}
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
            <input type="hidden" name="trainerName" value={formData.trainerName} />
            <input
              type="hidden"
              name="accountNumber"
              value={formData.accountNumber}
            />

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
                <Link href="/privacy" aria-label="Политика конфиденциальности">
                  политикой конфиденциальности
                </Link>
              </p>
            </div>
            </form>
          )}
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
    </>
  );
}

// Главный компонент с Suspense
export default function EnrollmentPage() {
  return (
    <div className="enrollment-page">
      <div className="container">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                padding: "50px",
                fontSize: "18px",
                color: "#666",
              }}
            >
              Загрузка формы записи...
            </div>
          }
        >
          <EnrollmentForm />
        </Suspense>
      </div>
    </div>
  );
}
