"use client";
import { FOOTER_CONTACTS } from "@/lib/config/footer-navigation";
import {
  LocationIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
} from "@/components/icons";

export const FooterContacts = () => {
  return (
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
  );
};
