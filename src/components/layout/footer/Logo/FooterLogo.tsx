"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export const FooterLogo = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href="/"
      className="footer__logo"
      aria-label="СДЮШОР Динамо Витебск - на главную"
    >
      <div className="footer__logo-icon" aria-hidden="true">
        {imageError ? (
          <span className="footer-logo-fallback">Д</span>
        ) : (
          <div className="footer-logo-image-wrapper">
            <Image
              src="/logo-dynamo.png"
              alt="Логотип СДЮШОР Динамо Витебск"
              fill
              priority
              quality={75}
              className="footer-logo-image"
              onError={() => setImageError(true)}
              sizes="50px"
            />
          </div>
        )}
      </div>
      <div className="footer__logo-text">
        <div className="footer__logo-title">Динамо</div>
        <span className="footer__logo-subtitle">СДЮШОР Витебск</span>
      </div>
      <span className="visually-hidden">
        Спортивная детско-юношеская школа олимпийского резерва Динамо Витебск
      </span>
    </Link>
  );
};
