"use client";
import { FooterTop } from "./FooterTop/FooterTop";
import { FooterContacts } from "./FooterContacts/FooterContacts";
import { FooterNavigation } from "./FooterNavigation/FooterNavigation";
import { FooterBottom } from "./FooterBottom/FooterBottom";
import { MobileTabBar } from "./MobileTabBar/MobileTabBar";
import "./Footer.scss";

export const Footer = () => {
  return (
    <>
      <footer className="footer" role="contentinfo" aria-label="Подвал сайта">
        <div className="footer__container container">
          <FooterTop />
          <FooterContacts />
          <FooterNavigation />
          <div className="footer__divider"></div>
          <FooterBottom />
        </div>
      </footer>
      <MobileTabBar />
    </>
  );
};

export default Footer;
