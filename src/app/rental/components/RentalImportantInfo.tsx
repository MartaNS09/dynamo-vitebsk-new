export function RentalImportantInfo() {
  return (
    <div className="rental-important-info">
      <div className="rental-important-header">
        <div className="rental-warning-icon">⚠️</div>
        <h3 className="rental-important-title">ВАЖНАЯ ИНФОРМАЦИЯ!</h3>
        <p className="rental-important-subtitle">Пожалуйста, ознакомьтесь с условиями проката перед арендой</p>
      </div>
      
      <div className="rental-info-grid">
        <div className="rental-info-column">
          <div className="info-item">
            <div className="info-icon">📄</div>
            <div>
              <h4 className="info-title">Условия аренды</h4>
              <p className="info-text">Для аренды необходим <strong className="highlight">паспорт РБ</strong> или документ, его заменяющий</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">💰</div>
            <div>
              <h4 className="info-title">Залог</h4>
              <p className="info-text">Залоговая сумма устанавливается индивидуально для каждого вида инвентаря</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">✨</div>
            <div>
              <h4 className="info-title">Состояние</h4>
              <p className="info-text">Инвентарь предоставляется в чистом и исправном состоянии</p>
            </div>
          </div>
        </div>
        
        <div className="rental-info-column">
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div>
              <h4 className="info-title">Бронь по телефону</h4>
              <p className="info-text">
                <a href="tel:+375292101012" className="phone-link">
                  +375 (29) 210-10-12
                </a>
              </p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div>
              <h4 className="info-title">Адрес</h4>
              <p className="info-text">пр-т Московский, 35, Витебск</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div>
              <h4 className="info-title">Режим работы</h4>
              <p className="info-text">Пн-Пт: 09:00-18:00</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">💳</div>
            <div>
              <h4 className="info-title">Оплата</h4>
              <p className="info-text">Работаем за наличный и безналичный расчёт. Принимаем заявки от юридических лиц!</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rental-tip">
        <div className="tip-icon">💡</div>
        <p className="tip-text">
          <strong>Совет:</strong> Для аренды на выходные рекомендуем бронировать инвентарь заранее, особенно в пиковые сезоны.
        </p>
      </div>
    </div>
  );
}
