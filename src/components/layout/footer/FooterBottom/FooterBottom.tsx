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
        <Link href="/privacy" className="footer__policy-link">
          Политика конфиденциальности
        </Link>

        <p className="footer__dev-text">
          Разработано{" "}
          <a
            href="https://www.apsod.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="footer__dev-link"
            aria-label="Перейти на сайт разработчика APSOD (откроется в новом окне)"
            title="Студия веб-разработки APSOD"
          >
            APSOD
          </a>
        </p>
      </div>
    </div>
  );
};
