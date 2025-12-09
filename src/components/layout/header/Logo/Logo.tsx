"use client";
import Link from "next/link";

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Link
      href="/"
      className="header__logo"
      onClick={onClick}
      aria-label="На главную страницу"
    >
      <div className="header__logo-icon" aria-hidden="true">
        Д
      </div>
      <div className="header__logo-text">
        <h1 className="header__logo-title">Динамо</h1>
        <span className="header__logo-subtitle">Витебск</span>
      </div>
    </Link>
  );
};
