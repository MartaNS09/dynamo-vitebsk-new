"use client";

import { MapPin, Phone, Mail, Clock, LucideIcon } from "lucide-react";
import styles from "../administration.module.scss";

interface ContactItem {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
  link?: string;
  ariaLabel?: string;
  subContent?: string;
}

export default function ContactSection() {
  const contacts: ContactItem[] = [
    {
      id: "address",
      icon: MapPin,
      title: "Адрес",
      content: "ул. Терешковой 16/2, Витебск",
      subContent: "210038, Беларусь",
      link: "https://maps.google.com/?q=Витебск+ул.+Терешковой+16/2",
      ariaLabel: "Открыть адрес на карте",
    },
    {
      id: "director-phone",
      icon: Phone,
      title: "Директор",
      content: "+375 (33) 310-25-25",
      link: "tel:+375333102525",
      ariaLabel: "Позвонить директору",
    },
    {
      id: "sport-department",
      icon: Phone,
      title: "Учебно-спортивный отдел",
      content: "+375 (212) 37-96-54",
      link: "tel:+375212379654",
      ariaLabel: "Позвонить в учебно-спортивный отдел",
    },
    {
      id: "accounting",
      icon: Phone,
      title: "Бухгалтерия",
      content: "+375 (212) 37-36-35",
      link: "tel:+375212373635",
      ariaLabel: "Позвонить в бухгалтерию",
    },
    {
      id: "email",
      icon: Mail,
      title: "Электронная почта",
      content: "vitebsksdushor@dynamo.by",
      link: "mailto:vitebsksdushor@dynamo.by",
      ariaLabel: "Написать письмо",
    },
    {
      id: "hours",
      icon: Clock,
      title: "Часы работы",
      content: "Пн-Сб: 9:00-20:00",
      subContent: "Воскресенье: выходной",
    },
  ];

  return (
    <section
      className={styles.contactsSection}
      aria-labelledby="contacts-heading"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className={styles.sectionHeader}>
            <h2 id="contacts-heading" className={styles.sectionTitle}>
              Контакты для связи
            </h2>
            <p className={styles.sectionDescription}>
              Свяжитесь с нами удобным для вас способом. Мы всегда готовы
              ответить на ваши вопросы.
            </p>
          </div>

          <div className={styles.contactsGrid}>
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <article
                  key={contact.id}
                  className={styles.contactItem}
                  role="article"
                >
                  <div className={styles.contactIcon} aria-hidden="true">
                    <Icon className="w-5 h-5 text-dynamo-blue" />
                  </div>
                  <div className={styles.contactInfo}>
                    <h3 className={styles.contactTitle}>{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className={styles.contactValue}
                        aria-label={contact.ariaLabel}
                      >
                        {contact.content}
                      </a>
                    ) : (
                      <p className={styles.contactValue}>{contact.content}</p>
                    )}
                    {contact.subContent && (
                      <p className={styles.contactSub}>{contact.subContent}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Карта */}
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <MapPin
                className="w-12 h-12 text-dynamo-blue"
                aria-hidden="true"
              />
              <p className={styles.mapText}>г. Витебск, ул. Терешковой 16/2</p>
              <a
                href="https://maps.google.com/?q=Витебск+ул.+Терешковой+16/2"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapButton}
                aria-label="Открыть нашу локацию в Google Maps"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <span>Открыть в картах</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
