"use client";
import Link from "next/link";

export const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
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
  );
};
