import Image from "next/image";
import Link from "next/link";
import AbonementCard from "@/components/sport-section/AbonementCard";
import TrainerCard from "@/components/sport-section/TrainerCard";
import { Button } from "@/components/ui/Button/Button";
import {
  ArrowLeftIcon as ArrowLeft,
  PhoneIcon as Phone,
  CalendarIcon as Calendar,
  UsersIcon as Users,
  ClockIcon as Clock,
  LocationIcon as MapPin,
} from "@/components/icons";
import { SportSection } from "@/types/sport-section.types";
import styles from "./DetailPageContent.module.scss";

interface DetailPageContentProps {
  section: SportSection;
}

export default function DetailPageContent({ section }: DetailPageContentProps) {
  // Функция для безопасного получения изображений галереи
  const getGalleryImages = () => {
    // Если есть галерея - используем её
    if (section.gallery && section.gallery.length > 0) {
      return section.gallery;
    }

    // Если нет галереи - создаем из доступных изображений
    const images: string[] = [];

    // Добавляем обложку
    if (section.coverImage) {
      images.push(section.coverImage);
    }

    // Добавляем hero изображения (уникальные)
    if (section.heroImages && section.heroImages.length > 0) {
      section.heroImages.forEach((img) => {
        if (img && !images.includes(img)) {
          images.push(img);
        }
      });
    }

    return images;
  };

  // Мок данные для примера (потом заменить на реальные из API)
  const mockData = {
    abonements:
      section.abonements.length > 0
        ? section.abonements
        : [
            {
              id: "1",
              name: "Месячный абонемент",
              description: "8 занятий в месяц (2 раза в неделю)",
              price: 80,
              currency: "BYN",
              duration: "1 месяц",
              features: ["Группа до 10 человек", "Профессиональный тренер"],
              isPopular: true,
            },
          ],
    trainers:
      section.trainers.length > 0
        ? section.trainers
        : [
            {
              id: "1",
              name: "Иванова Мария Петровна",
              position: "тренер-преподаватель",
              description: "Опыт работы 5+ лет",
            },
          ],
    // ИСПРАВЛЕНО: используем безопасную функцию
    gallery: getGalleryImages(),
    schedule: section.schedule || "Понедельник, среда, пятница 16:00-18:00",
    location: section.location || "г. Витебск, ул. Спортивная, 15, зал №3",
  };

  return (
    <main className={styles.container}>
      {/* Навигация */}
      <nav className={styles.breadcrumbs}>
        <div className="container">
          <div className={styles.breadcrumbsContent}>
            <Button
              variant="outline"
              size="small"
              href="/sports"
              icon={<ArrowLeft />}
              className={styles.backButton}
            >
              Все секции
            </Button>
            <div className={styles.breadcrumbsText}>
              <Link href="/">Главная</Link> /
              <Link href="/sports">Спортивные секции</Link> /
              <span>{section.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{section.name}</h1>
              <p className={styles.subtitle}>{section.shortDescription}</p>

              <div className={styles.heroInfo}>
                <div className={styles.infoItem}>
                  <Users style={{ width: 20, height: 20 }} />
                  <span>{section.ageInfo}</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock style={{ width: 20, height: 20 }} />
                  <span>{mockData.schedule}</span>
                </div>
                <div className={styles.infoItem}>
                  <MapPin style={{ width: 20, height: 20 }} />
                  <span>{mockData.location}</span>
                </div>
              </div>
            </div>

            <div className={styles.heroImage}>
              <Image
                src={section.coverImage}
                alt={section.name}
                width={600}
                height={400}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.contentLayout}>
          {/* Основной контент */}
          <div className={styles.mainContent}>
            {/* Описание секции */}
            <section className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>О секции</h2>
              <div
                className={styles.descriptionContent}
                dangerouslySetInnerHTML={{ __html: section.fullDescription }}
              />
            </section>

            {/* Абонементы */}
            <section className={styles.abonementsSection}>
              <h2 className={styles.sectionTitle}>Абонементы и цены</h2>
              <p className={styles.sectionSubtitle}>
                Выберите подходящий вариант. Администратор может добавлять и
                редактировать абонементы.
              </p>

              <div className={styles.abonementsGrid}>
                {mockData.abonements.map((abonement) => (
                  <AbonementCard
                    key={abonement.id}
                    abonement={abonement}
                    sectionName={section.name}
                  />
                ))}
              </div>
            </section>

            {/* Тренеры */}
            <section className={styles.trainersSection}>
              <h2 className={styles.sectionTitle}>Наши тренеры</h2>
              <div className={styles.trainersGrid}>
                {mockData.trainers.map((trainer) => (
                  <TrainerCard key={trainer.id} trainer={trainer} />
                ))}
              </div>
            </section>

            {/* Галерея - только если есть изображения */}
            {mockData.gallery.length > 0 && (
              <section className={styles.gallerySection}>
                <h2 className={styles.sectionTitle}>Фотогалерея</h2>
                <div className={styles.galleryGrid}>
                  {mockData.gallery.map((image, index) => (
                    <div key={index} className={styles.galleryItem}>
                      <Image
                        src={image}
                        alt={`${section.name} - фото ${index + 1}`}
                        width={300}
                        height={200}
                        className={styles.galleryImage}
                        loading={index > 1 ? "lazy" : "eager"} // Ленивая загрузка после первых 2 изображений
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Сайдбар */}
          <aside className={styles.sidebar}>
            {/* CTA карточка */}
            <div className={styles.ctaCard}>
              <h3 className={styles.ctaTitle}>Записаться в секцию</h3>

              <div className={styles.ctaInfo}>
                <div className={styles.infoRow}>
                  <Clock style={{ width: 18, height: 18 }} />
                  <span>{mockData.schedule}</span>
                </div>
                <div className={styles.infoRow}>
                  <MapPin style={{ width: 18, height: 18 }} />
                  <span>{mockData.location}</span>
                </div>
                <div className={styles.infoRow}>
                  <Users style={{ width: 18, height: 18 }} />
                  <span>
                    {mockData.trainers[0]?.name?.split(" ")[0] || "Тренер"}
                  </span>
                </div>
              </div>

              <div className={styles.ctaActions}>
                <Button
                  variant="primary"
                  size="large"
                  href={`/enrollment?section=${section.slug}`}
                  icon={<Calendar />}
                  fullWidth
                >
                  Записаться онлайн
                </Button>

                <Button
                  variant="outline"
                  size="large"
                  href="tel:+375291234567"
                  icon={<Phone />}
                  fullWidth
                >
                  Позвонить для записи
                </Button>

                <Button
                  variant="secondary"
                  size="large"
                  href={`/sports?trial=${section.slug}`}
                  fullWidth
                >
                  Записаться на пробное
                </Button>
              </div>

              <div className={styles.ctaNote}>
                <p>Первое пробное занятие - бесплатно!</p>
              </div>
            </div>

            {/* Контакты */}
            <div className={styles.contactsCard}>
              <h4 className={styles.contactsTitle}>Контакты</h4>
              <div className={styles.contactsList}>
                <div className={styles.contactItem}>
                  <strong>Телефон:</strong>
                  <a href="tel:+375291234567">+375 (29) 123-45-67</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Email:</strong>
                  <a href="mailto:info@dynamovitebsk.by">
                    info@dynamovitebsk.by
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Адрес:</strong>
                  <span>г. Витебск, ул. Спортивная, 15</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
