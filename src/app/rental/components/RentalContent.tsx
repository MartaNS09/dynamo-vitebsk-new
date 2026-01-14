"use client";

import { rentalItems } from "@/data/rental-items";

export default function RentalContent() {
  const winterItems = rentalItems.filter((item) => item.category === "winter");
  const summerItems = rentalItems.filter((item) => item.category === "summer");

  return (
    <div className="rental-content-old-style">
      {/* ЗИМА - 2 карточки в ряд */}
      <div className="rental-season-section">
        <h2 className="rental-season-title winter-title">Зима</h2>
        <div className="rental-winter-grid">
          {winterItems.map((item) => (
            <div key={item.id} className="rental-item-card-with-emoji">
              <div className="rental-emoji-container">
                <span className="rental-item-emoji">{item.emoji}</span>
              </div>
              <div className="rental-card-content">
                <h3 className="rental-item-title">{item.name}</h3>
                {item.description && (
                  <p className="rental-item-desc">{item.description}</p>
                )}
                <div className="rental-prices-old">
                  <div className="price-line">
                    <span>сутки</span>
                    <span className="price-value">
                      {item.priceDay.toFixed(2)} руб.
                    </span>
                  </div>
                  <div className="price-line">
                    <span>выходные</span>
                    <span className="price-value">
                      {item.priceWeekend.toFixed(2)} руб.
                    </span>
                  </div>
                  <div className="price-line">
                    <span>неделя</span>
                    <span className="price-value">
                      {item.priceWeek.toFixed(2)} руб.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ЛЕТО  */}
      <div className="rental-season-section">
        <h2 className="rental-season-title summer-title">Лето</h2>
        <div className="rental-summer-grid">
          {summerItems.map((item) => (
            <div key={item.id} className="rental-item-card-with-emoji">
              <div className="rental-emoji-container">
                <span className="rental-item-emoji">{item.emoji}</span>
              </div>
              <div className="rental-card-content">
                <h3 className="rental-item-title">{item.name}</h3>
                {item.description && (
                  <p className="rental-item-desc">{item.description}</p>
                )}
                <div className="rental-prices-old">
                  <div className="price-line">
                    <span>сутки</span>
                    <span className="price-value">
                      {item.priceDay.toFixed(2)} руб.
                    </span>
                  </div>
                  <div className="price-line">
                    <span>выходные</span>
                    <span className="price-value">
                      {item.priceWeekend.toFixed(2)} руб.
                    </span>
                  </div>
                  <div className="price-line">
                    <span>неделя</span>
                    <span className="price-value">
                      {item.priceWeek.toFixed(2)} руб.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
