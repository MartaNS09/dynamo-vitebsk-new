"use client";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons";

export const FooterTop = () => {
  return (
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
        <a href="#signup" className="footer__signup-button button button--small">
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
