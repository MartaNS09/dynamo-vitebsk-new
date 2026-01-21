import Link from "next/link";
import {
  Shield,
  Cookie,
  FileText,
  Home,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  Settings,
} from "lucide-react";
import { Metadata } from "next";
import styles from "./privacy.module.scss";

export const metadata: Metadata = {
  title: "Политика обработки файлов cookie | СДЮШОР Динамо Витебск",
  description:
    "Политика обработки персональных данных и использования файлов cookie. Согласие на использование файлов cookie на сайте спортивной школы.",
  keywords: "cookie, файлы cookie, политика конфиденциальности, защита данных",
  robots: "index, follow",
  openGraph: {
    title: "Политика обработки файлов cookie | Динамо Витебск",
    description: "Узнайте, как мы используем файлы cookie на нашем сайте",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        <div className="max-w-4xl mx-auto">
          {/* Навигация */}
          <nav className={styles.nav}>
            <Link href="/" className={styles.backButton}>
              <Home className={styles.iconHome} />
              <span>Вернуться на главную</span>
            </Link>
          </nav>

          {/* Заголовок */}
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <div className={styles.iconWrapper}>
                <Shield className={styles.iconShield} />
              </div>
              <div className={styles.titleContent}>
                <h1 className={styles.title}>
                  Политика обработки файлов cookie
                </h1>
                <div className={styles.metaInfo}>
                  <span className={styles.badge}>СДЮШОР «Динамо Витебск»</span>
                  <span className={styles.date}>Актуально с {currentDate}</span>
                </div>
              </div>
            </div>

            <div className={styles.alertBox}>
              <div className={styles.alertContent}>
                <AlertCircle className={styles.iconAlert} />
                <div className={styles.alertText}>
                  <p className={styles.alertTitle}>
                    Информация для пользователей
                  </p>
                  <p className={styles.alertDescription}>
                    На этой странице объясняется, как мы используем файлы cookie
                    на нашем сайте в соответствии с законодательством Республики
                    Беларусь.
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Основной контент */}
          <main className={styles.mainContent}>
            <div className={styles.content}>
              {/* Раздел 1 */}
              <section className={styles.section}>
                <div className={styles.sectionTitle}>
                  <Cookie className={styles.iconSection} />
                  <h2>1. Что такое файлы cookie</h2>
                </div>
                <p className={styles.sectionText}>
                  Файлы cookie — это небольшие текстовые файлы, которые
                  сохраняются на вашем устройстве (компьютере, планшете,
                  смартфоне) при посещении веб-сайтов.
                </p>

                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <CheckCircle className={styles.iconFeature} />
                    <span className={styles.featureText}>
                      Обеспечение корректной работы сайта
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle className={styles.iconFeature} />
                    <span className={styles.featureText}>
                      Запоминание ваших предпочтений и настроек
                    </span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle className={styles.iconFeature} />
                    <span className={styles.featureText}>
                      Анализ посещаемости для улучшения сайта
                    </span>
                  </div>
                </div>
              </section>

              {/* Раздел 2 */}
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  2. Типы используемых cookie
                </h2>

                <div className={styles.cardGrid}>
                  {/* Необходимые cookie */}
                  <div className={`${styles.card} ${styles["card--green"]}`}>
                    <div className={styles.cardHeader}>
                      <div
                        className={`${styles.iconCard} ${styles["iconCard--green"]}`}
                      >
                        <CheckCircle />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>Необходимые</h3>
                        <span
                          className={`${styles.cardSubtitle} ${styles["cardSubtitle--green"]}`}
                        >
                          Обязательные для работы
                        </span>
                      </div>
                    </div>
                    <p className={styles.cardContent}>
                      Эти cookie необходимы для базовой функциональности сайта.
                      Они обеспечивают безопасность, управление сессиями и
                      доступ к защищенным разделам. Не могут быть отключены.
                    </p>
                  </div>

                  {/* Функциональные cookie */}
                  <div className={`${styles.card} ${styles["card--blue"]}`}>
                    <div className={styles.cardHeader}>
                      <div
                        className={`${styles.iconCard} ${styles["iconCard--blue"]}`}
                      >
                        <Settings />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>Функциональные</h3>
                        <span
                          className={`${styles.cardSubtitle} ${styles["cardSubtitle--blue"]}`}
                        >
                          Для вашего удобства
                        </span>
                      </div>
                    </div>
                    <p className={styles.cardContent}>
                      Запоминают ваши настройки: выбранную тему оформления, язык
                      интерфейса, регион для отображения актуальной информации.
                    </p>
                  </div>
                </div>
              </section>

              {/* Раздел 3 */}
              <section className={styles.section}>
                <h2>3. Согласие на использование cookie</h2>

                <div className={styles.infoBox}>
                  <h3 className={styles.infoTitle}>
                    Как работает ваше согласие:
                  </h3>
                  <div className={styles.stepList}>
                    <div className={styles.stepItem}>
                      <div className={styles.stepNumber}>1</div>
                      <span className={styles.stepText}>
                        При первом посещении вы видите баннер cookie
                      </span>
                    </div>
                    <div className={styles.stepItem}>
                      <div className={styles.stepNumber}>2</div>
                      <span className={styles.stepText}>
                        Вы можете выбрать «Принять» или «Отклонить»
                      </span>
                    </div>
                    <div className={styles.stepItem}>
                      <div className={styles.stepNumber}>3</div>
                      <span className={styles.stepText}>
                        Ваше решение сохраняется на 1 месяц
                      </span>
                    </div>
                    <div className={styles.stepItem}>
                      <div className={styles.stepNumber}>4</div>
                      <span className={styles.stepText}>
                        Через 1 месяц мы снова спросим ваше согласие
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Раздел 4 */}
              <section className={styles.section}>
                <h2>4. Управление cookie</h2>
                <p className={styles.sectionText}>
                  Вы можете управлять файлами cookie несколькими способами:
                </p>

                <div className={styles.cardGrid}>
                  <div className={`${styles.card} ${styles["card--blue"]}`}>
                    <div className={styles.cardHeader}>
                      <div
                        className={`${styles.iconCard} ${styles["iconCard--blue"]}`}
                      >
                        <Settings />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>
                          В настройках браузера
                        </h3>
                      </div>
                    </div>
                    <p className={styles.cardContent}>
                      Большинство браузеров позволяют блокировать или удалять
                      cookie. Обратите внимание, что это может повлиять на
                      работу сайта.
                    </p>
                  </div>

                  <div className={`${styles.card} ${styles["card--blue"]}`}>
                    <div className={styles.cardHeader}>
                      <div
                        className={`${styles.iconCard} ${styles["iconCard--blue"]}`}
                      >
                        <FileText />
                      </div>
                      <div>
                        <h3 className={styles.cardTitle}>Через наш баннер</h3>
                      </div>
                    </div>
                    <p className={styles.cardContent}>
                      При каждом посещении вы можете изменить своё решение
                      относительно использования cookie.
                    </p>
                  </div>
                </div>
              </section>

              {/* Раздел 5 - Контакты */}
              <section className={styles.section}>
                <h2>5. Контактная информация</h2>

                <div className={styles.contactsSection}>
                  <div className={styles.contactGrid}>
                    {/* Адрес */}
                    <div className={styles.contactItem}>
                      <div className={styles.iconContactWrapper}>
                        <MapPin className={styles.iconContact} />
                      </div>
                      <div className={styles.contactInfo}>
                        <p className={styles.contactLabel}>Адрес организации</p>
                        <p className={styles.contactValue}>
                          ул. Терешковой 16/2, Витебск, Республика Беларусь
                        </p>
                      </div>
                    </div>

                    {/* Телефон */}
                    <div className={styles.contactItem}>
                      <div className={styles.iconContactWrapper}>
                        <Phone className={styles.iconContact} />
                      </div>
                      <div className={styles.contactInfo}>
                        <p className={styles.contactLabel}>
                          Контактный телефон
                        </p>
                        <p className={styles.contactValue}>
                          +375 (33) 310-25-25
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className={styles.contactItem}>
                      <div className={styles.iconContactWrapper}>
                        <Mail className={styles.iconContact} />
                      </div>
                      <div className={styles.contactInfo}>
                        <p className={styles.contactLabel}>Электронная почта</p>
                        <p className={styles.contactValue}>
                          vitebsksdushor@dynamo.by
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.noticeBox}>
                    <p className={styles.noticeText}>
                      По всем вопросам, связанным с обработкой персональных
                      данных или использованием файлов cookie, вы можете
                      обратиться по указанным контактам в рабочее время.
                    </p>
                  </div>
                </div>
              </section>

              {/* Юридический блок */}
              <section className={styles.section}>
                <div className={styles.legalBox}>
                  <h3 className={styles.legalTitle}>Юридическая информация</h3>
                  <p className={styles.sectionText}>
                    Настоящая политика разработана в соответствии с:
                  </p>
                  <ul className={styles.legalList}>
                    <li className={styles.legalListItem}>
                      Законом Республики Беларусь от 10.11.2008 № 455-З «Об
                      информации, информатизации и защите информации»
                    </li>
                    <li className={styles.legalListItem}>
                      Законом Республики Беларусь от 07.05.2021 № 99-З «О защите
                      персональных данных»
                    </li>
                    <li className={styles.legalListItem}>
                      Общими положениями о защите данных (GDPR) для
                      пользователей из ЕС
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Футер страницы */}
            <div className={styles.pageFooter}>
              <div className={styles.footerContent}>
                <div className={styles.footerInfo}>
                  <p className={styles.footerDate}>
                    Последнее обновление: {currentDate}
                  </p>
                  <p className={styles.footerCopyright}>
                    © {new Date().getFullYear()} СДЮШОР «Динамо Витебск»
                  </p>
                </div>
                <Link href="/" className={styles.footerButton}>
                  <Home className={styles.iconFooter} />
                  <span>На главную</span>
                </Link>
              </div>
            </div>
          </main>

          {/* SEO блок */}
          <div className={styles.seoBlock}>
            <p className={styles.seoText}>
              Политика обработки файлов cookie | СДЮШОР Динамо Витебск |
              Спортивная школа олимпийского резерва | Витебск
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
