"use client";

import { Button } from "@/components/ui/Button/Button";
import { Phone, Mail, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import styles from "./ContactCTA.module.scss";

export const ContactCTA = () => {
  return (
    <section className={styles.cta} aria-labelledby="cta-title" id="contact">
      <div className="container">
        <div className={styles.cta__content}>
          {/* Левая часть — текст */}
          <div className={styles.cta__text}>
            <div className={styles.cta__badge}>
              <Users size={20} />
              <span>Запись открыта</span>
            </div>

            <h2 className={styles.cta__title} id="cta-title">
              Готовы начать{" "}
              <span className={styles.cta__highlight}>спортивный путь</span>?
            </h2>

            <p className={styles.cta__description}>
              Приглашаем на пробную тренировку. Наши тренеры помогут выбрать
              направление, подходящее именно вам или вашему ребенку.
            </p>

            {/* Контакты */}
            <div className={styles.cta__contacts}>
              <div className={styles.contact}>
                <div className={styles.contact__icon}>
                  <Phone size={20} />
                </div>
                <div className={styles.contact__info}>
                  <div className={styles.contact__label}>Телефон</div>
                  <a href="tel:+375333102525" className={styles.contact__value}>
                    +375 (33) 310-25-25
                  </a>
                </div>
              </div>

              <div className={styles.contact}>
                <div className={styles.contact__icon}>
                  <Mail size={20} />
                </div>
                <div className={styles.contact__info}>
                  <div className={styles.contact__label}>Email</div>
                  <a
                    href="mailto:dynamo-vitebsk@mail.ru"
                    className={styles.contact__value}
                  >
                    dynamo-vitebsk@mail.ru
                  </a>
                </div>
              </div>

              <div className={styles.contact}>
                <div className={styles.contact__icon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.contact__info}>
                  <div className={styles.contact__label}>Адрес</div>
                  <div className={styles.contact__value}>
                    г. Витебск, ул. Терешковой, 16/2
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть — кнопка */}
          <div className={styles.cta__action}>
            <div className={styles.cta__card}>
              <div className={styles.cta__cardIcon}>
                <Calendar size={32} />
              </div>
              <h3 className={styles.cta__cardTitle}>Запись на тренировку</h3>
              <p className={styles.cta__cardText}>
                Оставьте заявку, и мы свяжемся с вами в течение дня
              </p>

              <Button
                variant="primary"
                size="large"
                // href="/contact"
                href="/enrollment" // ← ИЗМЕНИТЬ на это
                className={styles.cta__button}
              >
                <span>Записаться сейчас</span>
                <ArrowRight size={20} />
              </Button>

              <p className={styles.cta__note}>
                Или позвоните:{" "}
                <a href="tel:+375333102525" className={styles.cta__phone}>
                  <strong>+375 (33) 310-25-25</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
