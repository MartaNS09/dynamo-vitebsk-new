import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      {/* Блок с адресом - ПЕРВЫЙ */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Наш адрес</h3>
        </div>
        <div className="space-y-3">
          <p className="text-gray-700 text-lg font-medium">
            г. Витебск, ул. Терешковой 16/2
          </p>
          <a
            href="https://yandex.ru/maps/-/CDbVBHFg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
          >
            <span>Открыть в картах</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Блок с вопросами - ВТОРОЙ */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              Есть вопросы к администрации?
            </h3>
            <p className="text-gray-600">
              Мы всегда готовы помочь и ответить на ваши вопросы
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Свяжитесь с нами удобным способом. Наши специалисты ответят на все
              вопросы относительно записи в спортивные секции, тренировочного
              процесса и расписания.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+375212372267"
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] group"
            >
              <Phone className="w-5 h-5" />
              <span>Позвонить сейчас</span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>

            <a
              href="mailto:dynamo-vitebsk@example.com"
              className="flex-1 flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg active:scale-[0.98] group"
            >
              <Mail className="w-5 h-5" />
              <span>Написать письмо</span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Блок с телефоном и почтой */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Контакты</h3>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 mb-1">Телефон</p>
              <a
                href="tel:+375212372267"
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                +375 (212) 37-22-67
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 mb-1">Электронная почта</p>
              <a
                href="mailto:dynamo-vitebsk@example.com"
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                dynamo-vitebsk@example.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 mb-1">Часы работы</p>
              <p className="text-xl font-bold text-gray-900">
                Пн-Пт: 9:00 - 18:00
              </p>
              <p className="text-gray-600 mt-1">
                Сб: 10:00 - 15:00, Вс: выходной
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
