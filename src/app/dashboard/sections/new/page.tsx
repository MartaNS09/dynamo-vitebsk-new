"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  CreditCard,
  FileText,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import "@/styles/admin/sections/sections-edit.scss";

// =============================================
// СХЕМА ВАЛИДАЦИИ - ВСЕ ПОЛЯ ОБЯЗАТЕЛЬНЫЕ С ДЕФОЛТНЫМИ ЗНАЧЕНИЯМИ
// =============================================
const newSectionSchema = z.object({
  name: z.string().min(3, "Название минимум 3 символа"),
  slug: z.string().min(3, "URL минимум 3 символа"),
  category: z.string().min(1, "Выберите категорию"),
  shortDescription: z.string().min(10, "Краткое описание минимум 10 символов"),
  ageInfo: z.string().min(1, "Укажите возраст"),
  fullDescription: z.string().min(50, "Полное описание минимум 50 символов"),
  schedule: z.string().optional(),
  location: z.string().optional(),
  isActive: z.boolean(),
  coverImage: z.string(),
  gallery: z.array(z.string()),
  abonements: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      currency: z.string(),
      duration: z.string(),
      features: z.array(z.string()),
      isPopular: z.boolean().optional(),
    }),
  ),
  trainers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      position: z.string(),
      photo: z.string().optional(),
    }),
  ),
});

// ВАЖНО: Явно указываем тип формы
type NewSectionFormData = z.infer<typeof newSectionSchema>;

const CATEGORIES = [
  "Гимнастика",
  "Единоборства",
  "Йога",
  "Стрельба",
  "Танцы",
  "Экстрим",
  "Прикладной спорт",
];

// =============================================
// КОМПОНЕНТ ЗАГРУЗКИ ИЗОБРАЖЕНИЙ
// =============================================
function ImageUploader({
  value,
  onChange,
  label,
  description,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
  description?: string;
}) {
  const [preview, setPreview] = useState(value);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div className="image-uploader">
      <label className="uploader-label">{label}</label>
      {preview ? (
        <div className="preview-container">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "200px",
              borderRadius: "8px",
            }}
          />
          <button
            type="button"
            className="remove-image-btn"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          <Upload size={32} color="#9ca3af" />
          <p style={{ marginTop: "12px", fontWeight: 500, color: "#374151" }}>
            {isDragActive
              ? "Отпустите файл"
              : "Перетащите изображение или нажмите для выбора"}
          </p>
          {description && (
            <p style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280" }}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================
// ГЛАВНЫЙ КОМПОНЕНТ
// =============================================
export default function NewSectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [expandedAbonements, setExpandedAbonements] = useState<string[]>([]);

  // ✅ ИСПРАВЛЕНО: Явно указываем тип для useForm
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<NewSectionFormData>({
    resolver: zodResolver(newSectionSchema),
    defaultValues: {
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      ageInfo: "",
      category: "",
      schedule: "",
      location: "",
      isActive: true,
      coverImage: "",
      gallery: [],
      abonements: [],
      trainers: [],
    },
  });

  const {
    fields: abonementFields,
    append: appendAbonement,
    remove: removeAbonement,
  } = useFieldArray({
    control,
    name: "abonements",
  });

  const {
    fields: trainerFields,
    append: appendTrainer,
    remove: removeTrainer,
  } = useFieldArray({
    control,
    name: "trainers",
  });

  const toggleAbonement = (id: string) => {
    setExpandedAbonements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const onSubmit = async (data: NewSectionFormData) => {
    setLoading(true);
    try {
      const newSection = {
        id: String(Date.now()),
        ...data,
      };
      console.log("Новая секция:", newSection);

      // TODO: Отправить на сервер
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/dashboard/sections");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const coverImage = watch("coverImage");
  const isActive = watch("isActive");

  return (
    <div className="section-edit">
      {/* ХЕДЕР */}
      <div className="edit-header">
        <div className="header-left">
          <button onClick={() => router.back()} className="back-btn">
            <ArrowLeft size={20} />
            Назад
          </button>
          <div className="title-section">
            <h1>Новая спортивная секция</h1>
            {isDirty && (
              <span className="unsaved-badge">
                <AlertCircle size={14} />
                Есть несохраненные изменения
              </span>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="save-btn"
          >
            <Save size={18} />
            {loading ? "Создание..." : "Создать секцию"}
          </button>
        </div>
      </div>

      {/* ТАБЫ */}
      <div className="edit-tabs">
        <button
          className={activeTab === "main" ? "active" : ""}
          onClick={() => setActiveTab("main")}
        >
          <FileText size={16} />
          Основное
        </button>
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          <FileText size={16} />
          Полное описание
        </button>
        <button
          className={activeTab === "abonements" ? "active" : ""}
          onClick={() => setActiveTab("abonements")}
        >
          <CreditCard size={16} />
          Абонементы
          {abonementFields.length > 0 && (
            <span className="tab-count">{abonementFields.length}</span>
          )}
        </button>
        <button
          className={activeTab === "trainers" ? "active" : ""}
          onClick={() => setActiveTab("trainers")}
        >
          <Users size={16} />
          Тренеры
          {trainerFields.length > 0 && (
            <span className="tab-count">{trainerFields.length}</span>
          )}
        </button>
        <button
          className={activeTab === "media" ? "active" : ""}
          onClick={() => setActiveTab("media")}
        >
          <ImageIcon size={16} />
          Медиа
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        {/* ОСНОВНОЕ */}
        {activeTab === "main" && (
          <div className="tab-content">
            <div className="form-grid">
              <div className="form-main">
                <div className="form-card">
                  <h3>Основная информация</h3>

                  <div className="form-group">
                    <label>
                      Название секции <span className="required">*</span>
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Например: ХУДОЖЕСТВЕННАЯ ГИМНАСТИКА"
                    />
                    {errors.name && (
                      <span className="error-message">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        URL (slug) <span className="required">*</span>
                      </label>
                      <input
                        {...register("slug")}
                        placeholder="gymnastics-section"
                      />
                      {errors.slug && (
                        <span className="error-message">
                          {errors.slug.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>
                        Категория <span className="required">*</span>
                      </label>
                      <select {...register("category")}>
                        <option value="">Выберите категорию</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <span className="error-message">
                          {errors.category.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        Возрастная группа <span className="required">*</span>
                      </label>
                      <input
                        {...register("ageInfo")}
                        placeholder="для детей с 3 лет"
                      />
                      {errors.ageInfo && (
                        <span className="error-message">
                          {errors.ageInfo.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Статус</label>
                      <div className="toggle-container">
                        <button
                          type="button"
                          className={`toggle-btn ${isActive ? "active" : ""}`}
                          onClick={() => setValue("isActive", !isActive)}
                        >
                          <span className="toggle-handle" />
                          <span className="toggle-label">
                            {isActive ? "Активна" : "Неактивна"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Краткое описание <span className="required">*</span>
                    </label>
                    <textarea
                      {...register("shortDescription")}
                      rows={4}
                      placeholder="Краткое описание секции"
                    />
                    {errors.shortDescription && (
                      <span className="error-message">
                        {errors.shortDescription.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-card">
                  <h3>Расположение</h3>
                  <div className="form-group">
                    <label>Адреса</label>
                    <textarea
                      {...register("location")}
                      rows={3}
                      placeholder="пр-т Московский, 35; пр-т Фрунзе, 77Лк2"
                    />
                  </div>
                  <div className="form-group">
                    <label>Расписание</label>
                    <input
                      {...register("schedule")}
                      placeholder="Вт/Чт 17:00-19:00, Сб 10:00-12:00"
                    />
                  </div>
                </div>
              </div>

              <div className="form-sidebar">
                <div className="form-card">
                  <h3>Обложка секции</h3>
                  <ImageUploader
                    value={coverImage || ""}
                    onChange={(url) => setValue("coverImage", url)}
                    label=""
                    description="Рекомендуемый размер: 1200x800px"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ПОЛНОЕ ОПИСАНИЕ */}
        {activeTab === "description" && (
          <div className="tab-content">
            <div className="form-card full-width">
              <div className="card-header">
                <h3>Полное описание секции</h3>
                <span className="badge">HTML поддерживается</span>
              </div>
              <div className="form-group">
                <textarea
                  {...register("fullDescription")}
                  rows={25}
                  placeholder="<h3>Заголовок</h3>\n<p>Полное описание секции...</p>"
                />
                {errors.fullDescription && (
                  <span className="error-message">
                    {errors.fullDescription.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* АБОНЕМЕНТЫ */}
        {activeTab === "abonements" && (
          <div className="tab-content">
            <div className="abonements-section">
              <div className="section-header">
                <div>
                  <h3>Абонементы</h3>
                  <p className="section-description">
                    Добавьте абонементы для этой секции
                  </p>
                </div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    const newId = `abonement-${Date.now()}`;
                    appendAbonement({
                      id: newId,
                      name: "АБОНЕМЕНТ",
                      description: "",
                      price: 0,
                      currency: "BYN",
                      duration: "1 месяц",
                      features: [],
                      isPopular: false,
                    });
                    setExpandedAbonements((prev) => [...prev, newId]);
                  }}
                >
                  <Plus size={16} />
                  Добавить абонемент
                </button>
              </div>

              {abonementFields.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <CreditCard size={48} />
                  </div>
                  <h4>Нет абонементов</h4>
                  <p>Добавьте первый абонемент для этой секции</p>
                  <button
                    type="button"
                    className="empty-state-btn"
                    onClick={() => {
                      const newId = `abonement-${Date.now()}`;
                      appendAbonement({
                        id: newId,
                        name: "АБОНЕМЕНТ",
                        description: "",
                        price: 0,
                        currency: "BYN",
                        duration: "1 месяц",
                        features: [],
                        isPopular: false,
                      });
                      setExpandedAbonements((prev) => [...prev, newId]);
                    }}
                  >
                    <Plus size={16} />
                    Создать абонемент
                  </button>
                </div>
              ) : (
                <div className="abonements-list">
                  {abonementFields.map((field, index) => {
                    const isExpanded = expandedAbonements.includes(field.id);
                    const isPopular = watch(`abonements.${index}.isPopular`);
                    return (
                      <div
                        key={field.id}
                        className={`abonement-card ${isPopular ? "popular" : ""}`}
                      >
                        <div className="card-header">
                          <div className="card-title">
                            <button
                              type="button"
                              className="expand-btn"
                              onClick={() => toggleAbonement(field.id)}
                            >
                              {isExpanded ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                            <div>
                              <h4>
                                {watch(`abonements.${index}.name`) ||
                                  "АБОНЕМЕНТ"}
                              </h4>
                              <span className="price-preview">
                                {watch(`abonements.${index}.price`)}{" "}
                                {watch(`abonements.${index}.currency`)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeAbonement(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="card-body">
                            <div className="form-row">
                              <div className="form-group">
                                <label>Название</label>
                                <input
                                  {...register(`abonements.${index}.name`)}
                                />
                              </div>
                              <div className="form-group">
                                <label>Описание</label>
                                <input
                                  {...register(
                                    `abonements.${index}.description`,
                                  )}
                                />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Цена</label>
                                <input
                                  {...register(`abonements.${index}.price`, {
                                    valueAsNumber: true,
                                  })}
                                  type="number"
                                />
                              </div>
                              <div className="form-group">
                                <label>Валюта</label>
                                <select
                                  {...register(`abonements.${index}.currency`)}
                                >
                                  <option value="BYN">BYN</option>
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label>Длительность</label>
                                <input
                                  {...register(`abonements.${index}.duration`)}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Особенности</label>
                              <input
                                {...register(`abonements.${index}.features`)}
                                placeholder="Занятия 2 раза в неделю, Профессиональные тренеры"
                                onChange={(e) => {
                                  const features = e.target.value
                                    .split(",")
                                    .map((f) => f.trim());
                                  setValue(
                                    `abonements.${index}.features`,
                                    features,
                                  );
                                }}
                              />
                            </div>
                            <label className="checkbox-label">
                              <input
                                {...register(`abonements.${index}.isPopular`)}
                                type="checkbox"
                              />
                              <span>Популярный абонемент</span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ТРЕНЕРЫ */}
        {activeTab === "trainers" && (
          <div className="tab-content">
            <div className="trainers-section">
              <div className="section-header">
                <div>
                  <h3>Тренерский состав</h3>
                  <p className="section-description">
                    Добавьте тренеров, которые работают в этой секции
                  </p>
                </div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={() =>
                    appendTrainer({
                      id: `trainer-${Date.now()}`,
                      name: "",
                      position: "тренер-преподаватель",
                      photo: "",
                    })
                  }
                >
                  <Plus size={16} />
                  Добавить тренера
                </button>
              </div>

              {trainerFields.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Users size={48} />
                  </div>
                  <h4>Нет тренеров</h4>
                  <p>Добавьте тренера для этой секции</p>
                  <button
                    type="button"
                    className="empty-state-btn"
                    onClick={() =>
                      appendTrainer({
                        id: `trainer-${Date.now()}`,
                        name: "",
                        position: "тренер-преподаватель",
                        photo: "",
                      })
                    }
                  >
                    <Plus size={16} />
                    Добавить тренера
                  </button>
                </div>
              ) : (
                <div className="trainers-list">
                  {trainerFields.map((field, index) => (
                    <div key={field.id} className="trainer-card">
                      <div className="card-header">
                        <div className="card-title">
                          <div className="trainer-avatar">
                            {watch(`trainers.${index}.photo`) ? (
                              <Image
                                src={watch(`trainers.${index}.photo`) || ""}
                                alt=""
                                width={40}
                                height={40}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div className="avatar-placeholder">
                                {watch(`trainers.${index}.name`)?.charAt(0) ||
                                  "Т"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4>
                              {watch(`trainers.${index}.name`) ||
                                "Новый тренер"}
                            </h4>
                            <span className="position-badge">
                              {watch(`trainers.${index}.position`)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeTrainer(index)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="card-body">
                        <div className="form-row">
                          <div className="form-group">
                            <label>
                              ФИО тренера <span className="required">*</span>
                            </label>
                            <input
                              {...register(`trainers.${index}.name`)}
                              placeholder="Иванов Иван Иванович"
                            />
                          </div>
                          <div className="form-group">
                            <label>Должность</label>
                            <input
                              {...register(`trainers.${index}.position`)}
                              placeholder="тренер-преподаватель"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Фото тренера</label>
                          <input
                            {...register(`trainers.${index}.photo`)}
                            placeholder="/images/trainers/photo.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* МЕДИА */}
        {activeTab === "media" && (
          <div className="tab-content">
            <div className="media-section">
              <div className="form-card">
                <h3>Галерея изображений</h3>
                <p className="section-description">
                  Добавьте фотографии секции
                </p>
                <div className="gallery-grid">
                  {watch("gallery")?.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <Image
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        width={200}
                        height={150}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        type="button"
                        className="remove-gallery-item"
                        onClick={() => {
                          const newGallery = watch("gallery").filter(
                            (_, i) => i !== index,
                          );
                          setValue("gallery", newGallery);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="gallery-upload">
                    <Upload size={24} color="#9ca3af" />
                    <p>Добавить изображение</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* ФУТЕР */}
      <div className="edit-footer">
        <div className="footer-status">
          {isDirty && (
            <span className="status-warning">
              <AlertCircle size={16} /> У вас есть несохраненные изменения
            </span>
          )}
        </div>
        <div className="footer-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => router.back()}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="save-btn"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Save size={18} />
            {loading ? "Создание..." : "Создать секцию"}
          </button>
        </div>
      </div>
    </div>
  );
}
