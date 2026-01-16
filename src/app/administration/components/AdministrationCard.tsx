"use client";

import { useState } from "react";
import { AdministrationMember } from "@/data/administration";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "../administration.module.scss";

interface AdministrationCardProps {
  member: AdministrationMember;
  isCompact?: boolean;
}

export default function AdministrationCard({
  member,
  isCompact = false,
}: AdministrationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(member.fullName);
  const hasDetails = member.bio || member.education || member.workExperience;

  const wrapperClass = isCompact
    ? `${styles.cardWrapper} ${styles.compact}`
    : `${styles.cardWrapper} ${styles.fullWidth}`;

  const cardClass = isCompact
    ? `${styles.adminCard} ${styles.compact} ${
        isExpanded ? styles.expanded : ""
      }`
    : `${styles.adminCard} ${styles.withDetails} ${
        isExpanded ? styles.expanded : ""
      }`;

  return (
    <div className={wrapperClass}>
      <article
        className={cardClass}
        role="article"
        aria-labelledby={`admin-title-${member.id}`}
      >
        <div
          className={`${styles.cardHeader} ${isCompact ? styles.compact : ""}`}
        >
          <div
            className={`${styles.avatarContainer} ${
              isCompact ? styles.compact : ""
            }`}
          >
            <div className={styles.avatar}>
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={`${member.position} - ${member.fullName}`}
                  width={isCompact ? 120 : 110}
                  height={isCompact ? 160 : 147}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                  sizes={
                    isCompact
                      ? "(max-width: 768px) 100px, 120px"
                      : "(max-width: 768px) 95px, 110px"
                  }
                />
              ) : (
                <div
                  className={`${styles.initials} ${
                    isCompact ? styles.compact : ""
                  }`}
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          <div
            className={`${styles.cardMainInfo} ${
              isCompact ? styles.compact : ""
            }`}
          >
            <div
              className={`${styles.position} ${
                isCompact ? styles.compact : ""
              }`}
              aria-label="Должность"
            >
              {member.position}
            </div>
            <h3
              id={`admin-title-${member.id}`}
              className={`${styles.name} ${isCompact ? styles.compact : ""}`}
            >
              {member.fullName}
            </h3>

            {member.shortName && (
              <p
                className={`${styles.shortName} ${
                  isCompact ? styles.compact : ""
                }`}
                aria-label="Краткое имя"
              >
                {member.shortName}
              </p>
            )}

            {member.contactInfo && (
              <div
                className={`${styles.contacts} ${
                  isCompact ? styles.compact : ""
                }`}
                role="region"
                aria-label="Контактная информация"
              >
                {member.contactInfo.phone && (
                  <a
                    href={`tel:${member.contactInfo.phone.replace(/\s/g, "")}`}
                    className={`${styles.contactLink} ${
                      isCompact ? styles.compact : ""
                    }`}
                    aria-label={`Позвонить ${
                      member.shortName || member.fullName
                    }`}
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>{member.contactInfo.phone}</span>
                  </a>
                )}
                {member.contactInfo.email && (
                  <a
                    href={`mailto:${member.contactInfo.email}`}
                    className={`${styles.contactLink} ${
                      isCompact ? styles.compact : ""
                    }`}
                    aria-label={`Написать письмо ${
                      member.shortName || member.fullName
                    }`}
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span className="break-all">
                      {member.contactInfo.email}
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {hasDetails && (
          <div
            className={`${styles.detailsButtonContainer} ${
              isCompact ? styles.compact : ""
            }`}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.detailsButton}
              aria-expanded={isExpanded}
              aria-controls={`admin-details-${member.id}`}
              aria-label={`${
                isExpanded ? "Скрыть" : "Показать"
              } подробную информацию о ${member.position}`}
            >
              <span>{isExpanded ? "Скрыть подробности" : "Подробнее"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        )}
      </article>

      {hasDetails && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`admin-details-${member.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.detailsAccordion}
              role="region"
              aria-label="Детальная информация"
            >
              {member.bio && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>
                    <span className={styles.detailsIcon}>📋</span>
                    Биография
                  </h4>
                  <div className={styles.detailsContent}>{member.bio}</div>
                </div>
              )}

              {member.education && member.education.length > 0 && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>
                    <span className={styles.detailsIcon}>🎓</span>
                    Образование
                  </h4>
                  <ul className={styles.detailsList} role="list">
                    {member.education.map((item, idx) => (
                      <li
                        key={idx}
                        className={styles.detailsListItem}
                        role="listitem"
                      >
                        <span className={styles.listMarker}>{idx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.workExperience && member.workExperience.length > 0 && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>
                    <span className={styles.detailsIcon}>💼</span>
                    Опыт работы
                  </h4>
                  <ul className={styles.detailsList} role="list">
                    {member.workExperience.map((item, idx) => (
                      <li
                        key={idx}
                        className={styles.detailsListItem}
                        role="listitem"
                      >
                        <span className={styles.listMarker}>{idx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {member.additionalInfo && member.additionalInfo.length > 0 && (
                <div className={styles.detailsSection}>
                  <h4 className={styles.detailsTitle}>
                    <span className={styles.detailsIcon}>⭐</span>
                    Дополнительно
                  </h4>
                  <ul className={styles.detailsList} role="list">
                    {member.additionalInfo.map((item, idx) => (
                      <li
                        key={idx}
                        className={styles.detailsListItem}
                        role="listitem"
                      >
                        <span className={styles.listMarker}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
