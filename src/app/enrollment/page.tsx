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
import "./page.scss";

function EnrollmentForm() {
  const searchParams = useSearchParams();

  const sportFromUrl = searchParams.get("sport");
  const abonementId = searchParams.get("abonement");
  const abonementPrice = searchParams.get("price");
  const abonementName = searchParams.get("abonementName");

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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // МАППИНГ ID АБОНЕМЕНТОВ (slug -> реальный ID)
  const abonementIdMap: Record<string, string> = {
    "kickboxing-2": "cmmx50m8l00074hcaywyhwr3a",
    "gymnastics-1": "cmmx50m7c00004hca1enay9dk",
    "gymnastics-2": "cmmx50m7g00014hca6nlsghyy",
    "kickboxing-1": "cmmx50m8b00064hcadbr8zy72",
    "kickboxing-3": "cmmx50m8n00084hca5ke47lt3",
    "kickboxing-4": "cmmx50m8u00094hcaek2otkeu",
    "kickboxing-5": "cmmx50m91000a4hcanjtmx7qm",
    "vajra-yoga-1": "cmmx50m9o000e4hcahjcxyhul",
    "vajra-yoga-2": "cmmx50m9t000f4hcaw9jun6m5",
    "vajra-yoga-3": "cmmx50ma0000g4hcaihrrufz1",
    "judo-1": "cmmx50mag000i4hcay90rtru6",
    "judo-2": "cmmx50mak000j4hcae6zho5cs",
    "judo-3": "cmmx50mam000k4hca38dl5gwl",
    "viet-vo-dao-1": "cmmx50mb5000n4hca5kmwsrpe",
    "shooting-1": "cmmx50mbl000p4hca6ojcuphx",
    "shooting-2": "cmmx50mbo000q4hcablpm5a2p",
    "choreography-1": "cmmx50mch000v4hca1qvzdqi7",
    "developing-gymnastics-1": "cmmx50md4000w4hcaxpkmudjr",
    "developing-gymnastics-2": "cmmx50md6000x4hca2qv1sr48",
    "freestyle-1": "cmmx50mdm000y4hcay6dd8559",
    "fireman-1": "cmmx50mdz00114hcawcubidjl",
  };

  useEffect(() => {
    if (formData.sport) {
      const section = ALL_SECTIONS.find((s) => s.name === formData.sport);
      setSelectedSection(section || null);
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

    // ПОИСК АБОНЕМЕНТА
    let selectedAbonementFull = null;
    if (formData.abonementId && selectedSection?.abonements) {
      const realId = abonementIdMap[formData.abonementId];
      selectedAbonementFull = selectedSection.abonements.find(
        (a: any) => a.id === realId || a.id === formData.abonementId,
      );
    }

    console.log("📋 Отправка заявки:", {
      sport: formData.sport,
      sectionId: selectedSection?.id,
      sectionName: selectedSection?.name,
      abonementId: formData.abonementId,
      selectedAbonementFull,
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
          selectedAbonement: selectedAbonementFull
            ? {
                id: selectedAbonementFull.id,
                name: selectedAbonementFull.name,
                price: selectedAbonementFull.price,
                duration: selectedAbonementFull.duration,
              }
            : null,
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
        });
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
