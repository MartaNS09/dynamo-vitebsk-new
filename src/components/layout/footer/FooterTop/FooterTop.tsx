"use client";
import { InstagramIcon } from "@/components/icons";
import { FooterLogo } from "../Logo/FooterLogo";

export const FooterTop = () => {
  return (
    <div className="footer__top-row">
      <div className="footer__logo-section">
        <FooterLogo /> {/* Заменяем старый логотип на новый */}
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
  );
};
