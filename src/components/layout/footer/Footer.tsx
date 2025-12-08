"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FOOTER_DESKTOP_NAV,
  FOOTER_MOBILE_NAV,
  FOOTER_CONTACTS,
} from "@/lib/config/footer-navigation";
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  InstagramIcon,
  ChevronIcon,
} from "@/components/icons";
import "./Footer.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {
      about: false,
      info: false,
    }
  );

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div className="footer__contacts-section">
            {FOOTER_CONTACTS.map((contact, index) => (
              <div key={index} className="footer__contact-item">
                <div className="footer__contact-icon">
                  {contact.icon === "location" && <LocationIcon />}
                  {contact.icon === "phone" && <PhoneIcon />}
                  {contact.icon === "email" && <EmailIcon />}
                  {contact.icon === "clock" && <ClockIcon />}
                </div>
                {contact.href ? (
                  <a href={contact.href} className="footer__contact-link">
                    {contact.text}
                  </a>
                ) : (
                  <span className="footer__contact-text">{contact.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Навигация для десктопа */}
          <div className="footer__navigation-desktop">
            {FOOTER_DESKTOP_NAV.map((column, index) => (
              <div key={index} className="footer__column">
                <h3 className="footer__column-title">{column.title}</h3>
                <ul className="footer__links">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Навигация для мобильных (аккордеон) */}
          <div className="footer__navigation-mobile">
            {FOOTER_DESKTOP_NAV.map((column, index) => {
              const key = index === 0 ? "about" : "info";
              return (
                <div key={index} className="footer__accordion">
                  <button
                    className="footer__accordion-button"
                    onClick={() => toggleAccordion(key)}
                    aria-expanded={openAccordions[key]}
                  >
                    <span>{column.title}</span>
                    <ChevronIcon isOpen={openAccordions[key]} />
                  </button>
                  <div
                    className={`footer__accordion-content ${
                      openAccordions[key]
                        ? "footer__accordion-content--open"
                        : ""
                    }`}
                    hidden={!openAccordions[key]}
                  >
                    <ul className="footer__mobile-links">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.href}>{link.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
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

      {/* Липкая навигация для мобильных (таббар) */}

      <nav className="footer__mobile-nav" aria-label="Мобильная навигация">
        {FOOTER_MOBILE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="footer__mobile-nav-item"
          >
            <div
              className={`footer__mobile-nav-icon footer__mobile-nav-icon--${item.icon}`}
            >
              {item.icon === "home" && (
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
              )}
              {item.icon === "departments" && (
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
              )}
              {item.icon === "sections" && (
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
              )}
              {item.icon === "subscriptions" && (
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
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Footer;
