import { Metadata } from "next";
import RentalContent from "./components/RentalContent";
import { RentalImportantInfo } from "./components/RentalImportantInfo";
import "./rental.scss";

export const metadata: Metadata = {
  title: "Прокат спортивного инвентаря в Витебске | СДЮШОР Динамо Витебск",
  description:
    "Аренда лыж, тюбингов, палаток, роликовых коньков и туристического снаряжения в Витебске. Выгодные цены на прокат инвентаря от СДЮШОР Динамо.",
};

export default function RentalPage() {
  return (
    <div className="rental-page">
      {/* Герой-секция */}
      <section
        className="rental-hero"
        aria-label="Главная информация о прокате"
      >
        <div className="container">
          <h1 className="rental-title">
            <span>ПРОКАТ СПОРТИВНОГО ИНВЕНТАРЯ</span>
          </h1>
          <p className="rental-subtitle">
            Аренда спортивного инвентаря и туристического снаряжения в Витебске
          </p>
        </div>
      </section>

      {/* Основной контент */}
      <div className="container rental-container">
        <RentalContent />
        <RentalImportantInfo />
      </div>

      {/* Контактная секция */}
      <section
        className="rental-contact"
        aria-label="Контакты для бронирования"
      >
        <div className="container">
          <h2 className="rental-contact-title">Забронировать инвентарь</h2>
          <p className="rental-contact-text">
            Звоните для бронирования и уточнения деталей:
          </p>
          <a
            href="tel:+375292101012"
            className="rental-phone-btn"
            aria-label="Позвонить по номеру +375 (29) 210-10-12"
            lang="be" // Для белорусского номера
          >
            +375 (29) 210-10-12
          </a>
          <p className="rental-address">
            пр-т Московский, 35 | Пн-Пт: 09:00-18:00
          </p>
        </div>
      </section>
    </div>
  );
}
