"use client";

import Image from "next/image";
import Link from "next/link";
import type { Department } from "@/data/departments";
import styles from "./DepartmentCard.module.scss";

interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      href={`/departments/${department.seoSlug}`}
      className={styles.departmentCard}
      aria-label={`Перейти на страницу отделения ${department.title}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={department.coverImage}
          alt={department.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={styles.imageOverlay}></div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{department.title}</h3>
        <p className={styles.description}>{department.description}</p>

        <div className={styles.meta}>
          <span className={styles.ageInfo}>
            <span className={styles.icon}>👤</span>
            {department.ageInfo}
          </span>
          <span className={styles.locations}>
            <span className={styles.icon}>📍</span>
            {department.locations.length}{" "}
            {department.locations.length === 1 ? "локация" : "локации"}
          </span>
        </div>

        <div className={styles.cta}>
          <span className={styles.ctaText}>Подробнее об отделении</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </Link>
  );
}
