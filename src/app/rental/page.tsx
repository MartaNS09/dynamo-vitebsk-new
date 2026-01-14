import { Metadata } from "next";
import RentalContent from "./components/RentalContent";
import { RentalImportantInfo } from "./components/RentalImportantInfo";
import "./rental.scss";

export const metadata: Metadata = {
  title: "Прокат спортивного инвентаря | СДЮШОР Динамо Витебск",
  description: "Аренда лыж, тюбингов, палаток, роликовых коньков и туристического снаряжения. Выгодные цены на прокат инвентаря в Витебске.",
};

export default function RentalPage() {
  return (
    <div className="rental-page">
      {/* Герой-секция */}
      <section className="rental-hero">
        <div className="container">
          <h1 className="rental-title">
            <span>ПРОКАТ</span>
          </h1>
          <p className="rental-subtitle">
            Аренда спортивного инвентаря и туристического снаряжения
          </p>
        </div>
      </section>

      {/* Основной контент */}
      <div className="container rental-container">
        <RentalContent />
        <RentalImportantInfo />
      </div>

      {/* Контактная секция */}
      <section className="rental-contact">
        <div className="container">
          <h3 className="rental-contact-title">Забронировать инвентарь</h3>
          <p className="rental-contact-text">
            Звоните для бронирования и уточнения деталей:
          </p>
          <a 
            href="tel:+375292101012" 
            className="rental-phone-btn"
          >
            +375 (29) 210-10-12
          </a>
          <p className="rental-address">пр-т Московский, 35 | Пн-Пт: 09:00-18:00</p>
        </div>
      </section>
    </div>
  );
}
