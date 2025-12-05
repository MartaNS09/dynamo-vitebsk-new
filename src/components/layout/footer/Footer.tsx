
"use client";

import React, { useState } from "react";
import "./Footer.scss";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <>
      {/* Основной футер */}
      <footer className="footer" role="contentinfo" aria-label="Подвал сайта">
        <div className="footer__container container">
          {/* Верхняя строка: Лого - Слоган - Кнопки */}
          <div className="footer__top-row">
            <div className="footer__logo-section">
              <Link href="/" className="footer__logo">
                <div className="footer__logo-icon">Д</div>
                <div className="footer__logo-text">
                  <h2 className="footer__logo-title">Динамо</h2>
                  <span className="footer__logo-subtitle">СДЮШОР Витебск</span>
                </div>
              </Link>
            </div>

            <div className="footer__slogan-section">
              <p className="footer__slogan">Сила в движении и единстве</p>
            </div>

            <div className="footer__actions">
              <a
                href="#signup"
                className="footer__signup-button button button--small"
              >
                Записаться
              </a>
              <a
                href="https://instagram.com/dynamo_vitebsk"
                className="footer__instagram-link"
                aria-label="Наш Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div className="footer__contacts-section">
            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <address className="footer__contact-text">
                ул. Терешковой 16/2, Витебск
              </address>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM5 6h1.5c.1 1.2.3 2.4.6 3.5L5.3 11.8c1.2 2.4 3 4.5 5.1 6l2.1-2.1c1.1.3 2.3.5 3.5.6V19c-7.2 0-13-5.8-13-13z" />
                </svg>
              </div>
              <a href="tel:+375333102525" className="footer__contact-link">
                +375 (33) 310-25-25
              </a>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <a
                href="mailto:vitebsksdushor@dynamo.by"
                className="footer__contact-link"
              >
                vitebsksdushor@dynamo.by
              </a>
            </div>

            <div className="footer__contact-item">
              <div className="footer__contact-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <span className="footer__contact-text">Пн-Сб: 9:00-20:00</span>
            </div>
          </div>

          {/* Навигация для десктопа */}
          <div className="footer__navigation-desktop">
            <div className="footer__column">
              <h3 className="footer__column-title">О нас</h3>
              <ul className="footer__links">
                <li>
                  <Link href="/history">История</Link>
                </li>
                <li>
                  <Link href="/administration">Администрация</Link>
                </li>
                <li>
                  <Link href="/trainers">Тренера</Link>
                </li>
                <li>
                  <Link href="/contacts">Контакты</Link>
                </li>
                <li>
                  <Link href="/blog">Блог</Link>
                </li>
                <li>
                  <Link href="/rent">Прокат</Link>
                </li>
              </ul>
            </div>

            <div className="footer__column">
              <h3 className="footer__column-title">Информация</h3>
              <ul className="footer__links">
                <li>
                  <Link href="/">Главная</Link>
                </li>
                <li>
                  <Link href="/departments">Отделения</Link>
                </li>
                <li>
                  <Link href="/sections">Секции</Link>
                </li>
                <li>
                  <Link href="/subscriptions">Абонементы</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Навигация для мобильных (аккордеон) */}
          <div className="footer__navigation-mobile">
            <div className="footer__accordion">
              <button
                className="footer__accordion-button"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                aria-expanded={isAboutOpen}
              >
                <span>О нас</span>
                <svg
                  className={`footer__accordion-icon ${
                    isAboutOpen ? "footer__accordion-icon--open" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <div
                className={`footer__accordion-content ${
                  isAboutOpen ? "footer__accordion-content--open" : ""
                }`}
                hidden={!isAboutOpen}
              >
                <ul className="footer__mobile-links">
                  <li>
                    <Link href="/history">История</Link>
                  </li>
                  <li>
                    <Link href="/administration">Администрация</Link>
                  </li>
                  <li>
                    <Link href="/trainers">Тренера</Link>
                  </li>
                  <li>
                    <Link href="/contacts">Контакты</Link>
                  </li>
                  <li>
                    <Link href="/blog">Блог</Link>
                  </li>
                  <li>
                    <Link href="/rent">Прокат</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer__accordion">
              <button
                className="footer__accordion-button"
                onClick={() => setIsInfoOpen(!isInfoOpen)}
                aria-expanded={isInfoOpen}
              >
                <span>Информация</span>
                <svg
                  className={`footer__accordion-icon ${
                    isInfoOpen ? "footer__accordion-icon--open" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </button>
              <div
                className={`footer__accordion-content ${
                  isInfoOpen ? "footer__accordion-content--open" : ""
                }`}
                hidden={!isInfoOpen}
              >
                <ul className="footer__mobile-links">
                  <li>
                    <Link href="/">Главная</Link>
                  </li>
                  <li>
                    <Link href="/departments">Отделения</Link>
                  </li>
                  <li>
                    <Link href="/sections">Секции</Link>
                  </li>
                  <li>
                    <Link href="/subscriptions">Абонементы</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Разделитель */}
          <div className="footer__divider"></div>

          {/* Нижняя часть */}
          <div className="footer__bottom">
            <div className="footer__legal">
              <p className="footer__copyright">
                © {currentYear} Учреждение «Витебская СДЮШОР» БФСО «Динамо»
              </p>
              <p className="footer__unp">УНП 390344581</p>
              <p className="footer__rights">Все права защищены</p>
            </div>

            <div className="footer__developer">
              <p className="footer__dev-text">
                Разработано для спорта{" "}
                <a
                  href="https://ваша-компания.by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__dev-link"
                >
                  Название Вашей Компании
                </a>
              </p>
              <Link href="/privacy" className="footer__policy-link">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Липкая навигация для мобильных (таббар) с ЦВЕТНЫМИ иконками */}
      <nav className="footer__mobile-nav" aria-label="Мобильная навигация">
        <Link href="/" className="footer__mobile-nav-item">
          <div className="footer__mobile-nav-icon footer__mobile-nav-icon--home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L5 9V21H9V14H15V21H19V9L22 7L12 2Z"
                stroke="url(#home-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="home-gradient"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6B6B" />
                  <stop offset="1" stopColor="#FF8E53" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Главная</span>
        </Link>

        <Link href="/departments" className="footer__mobile-nav-item">
          <div className="footer__mobile-nav-icon footer__mobile-nav-icon--departments">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 19V9L12 3L2 9V19H5V11H19V19H22Z"
                stroke="url(#departments-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V16H15V22"
                stroke="url(#departments-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="departments-gradient"
                  x1="2"
                  y1="3"
                  x2="22"
                  y2="22"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4ECDC4" />
                  <stop offset="1" stopColor="#44A08D" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Отделения</span>
        </Link>

        <Link href="/sections" className="footer__mobile-nav-item">
          <div className="footer__mobile-nav-icon footer__mobile-nav-icon--sections">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="url(#sections-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="8"
                y1="3"
                x2="8"
                y2="21"
                stroke="url(#sections-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="3"
                x2="16"
                y2="21"
                stroke="url(#sections-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="3"
                y1="8"
                x2="21"
                y2="8"
                stroke="url(#sections-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="3"
                y1="16"
                x2="21"
                y2="16"
                stroke="url(#sections-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="sections-gradient"
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9D50BB" />
                  <stop offset="1" stopColor="#6E48AA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Секции</span>
        </Link>

        <Link href="/subscriptions" className="footer__mobile-nav-item">
          <div className="footer__mobile-nav-icon footer__mobile-nav-icon--subscriptions">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="2"
                y="7"
                width="20"
                height="14"
                rx="2"
                ry="2"
                stroke="url(#subscriptions-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
                stroke="url(#subscriptions-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="11"
                r="1"
                fill="url(#subscriptions-gradient)"
              />
              <circle
                cx="12"
                cy="15"
                r="1"
                fill="url(#subscriptions-gradient)"
              />
              <defs>
                <linearGradient
                  id="subscriptions-gradient"
                  x1="2"
                  y1="3"
                  x2="22"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFD166" />
                  <stop offset="1" stopColor="#FFB347" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Абонементы</span>
        </Link>
      </nav>
    </>
  );
};

export default Footer;
