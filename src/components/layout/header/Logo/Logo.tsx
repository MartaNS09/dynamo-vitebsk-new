"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href="/"
      className="header__logo"
      onClick={onClick}
      aria-label="СДЮШОР Динамо Витебск - официальный сайт спортивной школы"
    >
      <div className="header__logo-icon" aria-hidden="true">
        {imageError ? (
          <span className="logo-fallback">Д</span>
        ) : (
          <div className="logo-image-wrapper">
            <Image
              src="/logo-dynamo.png"
              alt="Логотип СДЮШОР Динамо Витебск"
              fill
              priority
              quality={75}
              className="logo-image"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 40px, 50px"
            />
          </div>
        )}
      </div>
      <div className="header__logo-text">
        <div className="header__logo-title">Динамо</div>
        <span className="header__logo-subtitle">Витебск</span>
      </div>
      <span className="visually-hidden">
        Официальный сайт СДЮШОР Динамо Витебск - школа олимпийского резерва
      </span>
    </Link>
  );
};
