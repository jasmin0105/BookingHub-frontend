import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: { home:'Home', hotels:'Hotels', restaurants:'Restaurants', events:'Events', map:'Map', compare:'Compare', about:'About', profile:'Profile', logout:'Logout', signin:'Sign In', getstarted:'Get Started' },
    home: { title1:'Book Your', title2:'Perfect Stay', subtitle:'Hotels, restaurants and events — all in one place.', search:'Search hotels, restaurants, events...', searchBtn:'Search', hotels:'Hotels', restaurants:'Restaurants', events:'Events', mapview:'Map View', trending:'Trending Hotels', viewall:'View all', bestRest:'Best Restaurants', upcoming:'Upcoming Events' },
    detail: { about:'About', amenities:'Amenities', reviews:'Reviews', noreviews:'No reviews yet. Be the first!', checkin:'Check-in', checkout:'Check-out', guests:'Guests', total:'Total', booknow:'Book Now →', available:'Available', norooms:'No rooms available', similar:'Similar Hotels', signin_book:'Sign in to Book' },
    profile: { bookings:'Bookings', activity:'Activity', links:'Quick Links', all:'All', confirmed:'Confirmed', pending:'Pending', cancelled:'Cancelled', cancel:'Cancel', download:'Download PDF', paynow:'Pay Now', spent:'Spent', active:'Active' },
    booking: { success:'Booked!', failed:'Booking failed. Try again.' },
    payment: { title:'Complete Your Booking', select:'Select Payment Method', pay:'Pay', processing:'Processing Payment', success:'Payment Successful!', failed:'Payment Failed', done:'Done', tryagain:'Try Again' },
  },
  ru: {
    nav: { home:'Главная', hotels:'Отели', restaurants:'Рестораны', events:'События', map:'Карта', compare:'Сравнить', about:'О нас', profile:'Профиль', logout:'Выйти', signin:'Войти', getstarted:'Начать' },
    home: { title1:'Забронируй', title2:'Идеальный Отдых', subtitle:'Отели, рестораны и события — всё в одном месте.', search:'Поиск отелей, ресторанов, событий...', searchBtn:'Найти', hotels:'Отели', restaurants:'Рестораны', events:'События', mapview:'На карте', trending:'Лучшие Отели', viewall:'Смотреть все', bestRest:'Лучшие Рестораны', upcoming:'Ближайшие События' },
    detail: { about:'Описание', amenities:'Удобства', reviews:'Отзывы', noreviews:'Отзывов пока нет. Будьте первым!', checkin:'Заезд', checkout:'Выезд', guests:'Гости', total:'Итого', booknow:'Забронировать →', available:'Доступно', norooms:'Нет свободных номеров', similar:'Похожие Отели', signin_book:'Войдите чтобы забронировать' },
    profile: { bookings:'Брони', activity:'Активность', links:'Быстрые ссылки', all:'Все', confirmed:'Подтверждено', pending:'Ожидает', cancelled:'Отменено', cancel:'Отменить', download:'Скачать PDF', paynow:'Оплатить', spent:'Потрачено', active:'Активных' },
    booking: { success:'Забронировано!', failed:'Ошибка бронирования. Попробуйте снова.' },
    payment: { title:'Завершите Бронирование', select:'Выберите способ оплаты', pay:'Оплатить', processing:'Обработка платежа', success:'Оплата прошла!', failed:'Ошибка оплаты', done:'Готово', tryagain:'Попробовать снова' },
  },
  ky: {
    nav: { home:'Башкы бет', hotels:'Мейманканалар', restaurants:'Ресторандар', events:'Иш-чаралар', map:'Карта', compare:'Салыштыруу', about:'Биз жөнүндө', profile:'Профиль', logout:'Чыгуу', signin:'Кирүү', getstarted:'Баштоо' },
    home: { title1:'Өз', title2:'Эс алууңду Бук!', subtitle:'Мейманканалар, ресторандар жана иш-чаралар — баары бир жерде.', search:'Мейманкана, ресторан, иш-чара издөө...', searchBtn:'Издөө', hotels:'Мейманканалар', restaurants:'Ресторандар', events:'Иш-чаралар', mapview:'Картада', trending:'Мыкты Мейманканалар', viewall:'Баарын көрүү', bestRest:'Мыкты Ресторандар', upcoming:'Жакынкы Иш-чаралар' },
    detail: { about:'Сүрөттөмө', amenities:'Жайлуулуктар', reviews:'Пикирлер', noreviews:'Азырынча пикир жок. Биринчи болуңуз!', checkin:'Кирүү', checkout:'Чыгуу', guests:'Коноктор', total:'Жалпы', booknow:'Брондоо →', available:'Бош', norooms:'Бош бөлмө жок', similar:'Окшош Мейманканалар', signin_book:'Брондоо үчүн кириңиз' },
    profile: { bookings:'Брондоолор', activity:'Активдүүлүк', links:'Тез шилтемелер', all:'Баары', confirmed:'Тастыкталган', pending:'Күтүүдө', cancelled:'Жокко чыгарылган', cancel:'Жокко чыгаруу', download:'PDF жүктөө', paynow:'Төлөө', spent:'Жумшалган', active:'Активдүү' },
    booking: { success:'Брондолду!', failed:'Брондоо катасы. Кайра аракет кылыңыз.' },
    payment: { title:'Брондоону Аяктоо', select:'Төлөм ыкмасын тандаңыз', pay:'Төлөө', processing:'Төлөм иштетилүүдө', success:'Төлөм өттү!', failed:'Төлөм катасы', done:'Даяр', tryagain:'Кайра аракет' },
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n
