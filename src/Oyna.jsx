import React from "react";
import "./Oyna.css";

const industries = [
  { title: "Цветочные и садовые магазины", image: "photo-1416879595882-3373a0480b5b", detail: "Для товаров и сезонных продаж", intro: "Удобно учитывайте цветы, растения, горшки и сезонные товары — от приёмки до продажи.", needs: ["POS-терминал и кассовое ПО", "Сканер штрихкодов", "Принтер чеков", "Весы для сопутствующих товаров"], benefits: ["Быстрое обслуживание покупателей", "Учёт сезонных остатков", "Понятные отчёты о продажах"] },
  { title: "Небольшие магазины", image: "photo-1441986300917-64674bd600d8", detail: "Касса, сканер и печать чеков", intro: "Компактный комплект оборудования для повседневной торговли и быстрого расчёта на кассе.", needs: ["Кассовый компьютер или POS-терминал", "Сканер штрихкодов", "Термопринтер чеков", "Денежный ящик"], benefits: ["Быстрое оформление покупки", "Меньше ошибок при вводе товара", "Контроль выручки и остатков"] },
  { title: "Аптеки", image: "photo-1576602976047-174e57a47881", detail: "Быстрое обслуживание покупателей", intro: "Организуйте кассовое место и учёт большого ассортимента лекарственных и сопутствующих товаров.", needs: ["POS-терминал", "Сканер штрихкодов", "Принтер чеков и этикеток", "Стабильная локальная сеть"], benefits: ["Быстрый поиск и сканирование товаров", "Точный учёт ассортимента", "Удобная печать чеков и этикеток"] },
  { title: "Продуктовые магазины", image: "photo-1542838132-92c53300491e", detail: "Весы и учёт товаров", intro: "Оборудование для продуктов, товаров по весу и постоянного потока покупателей.", needs: ["POS-касса", "Сканер штрихкодов", "Торговые весы", "Принтер чеков"], benefits: ["Ускорение обслуживания", "Удобная работа с весовыми товарами", "Контроль запасов и продаж"] },
  { title: "Кафе и рестораны", image: "photo-1517248135467-4c7edcad34c4", detail: "Заказы и расчёты за столом", intro: "Организуйте приём заказов, оплату и работу кассовой зоны в заведении любого размера.", needs: ["Сенсорный POS-терминал", "Принтер чеков", "Платёжный терминал", "Сетевое оборудование"], benefits: ["Удобный приём заказов", "Быстрая оплата", "Отчётность по продажам"] },
  { title: "Строительные магазины", image: "photo-1530124566582-a618bc2615dc", detail: "Продажи инструмента и материалов", intro: "Поддерживайте точный учёт большого ассортимента инструмента, крепежа и строительных материалов.", needs: ["POS-компьютер", "Ручной сканер", "Принтер этикеток", "Торговые весы"], benefits: ["Быстрое сканирование товаров", "Понятная маркировка", "Управление остатками"] },
  { title: "Склады", image: "photo-1586528116311-ad8dd3c8310d", detail: "Сканирование и инвентаризация", intro: "Собирайте заказы, маркируйте коробки и проводите инвентаризацию с помощью подходящих устройств.", needs: ["Терминал сбора данных", "Мобильный сканер", "Принтер этикеток", "Складские весы"], benefits: ["Быстрее инвентаризация", "Меньше ручного ввода", "Удобная маркировка мест хранения"] },
  { title: "Одежда и обувь", image: "photo-1483985988355-763728e1935b", detail: "Размеры, остатки и продажи", intro: "Следите за размерами, цветами и остатками коллекций в торговом зале и на складе.", needs: ["POS-терминал", "Сканер штрихкодов", "Принтер этикеток", "Денежный ящик"], benefits: ["Удобный учёт вариантов товара", "Быстрый расчёт покупателей", "Контроль остатков по размерам"] },
  { title: "Мебельные магазины", image: "photo-1555041469-a586c61ea9bc", detail: "Учёт моделей и заказов", intro: "Управляйте ассортиментом мебели, заказами клиентов и оплатами в одном рабочем процессе.", needs: ["Компьютер для торгового зала", "POS-терминал", "Принтер документов", "Сетевое оборудование"], benefits: ["Удобная работа с каталогом моделей", "Оформление заказов", "Контроль продаж и оплат"] },
  { title: "Туристические места", image: "photo-1517248135467-4c7edcad34c4", detail: "Удобная касса для посетителей", intro: "Подготовьте кассовое место для билетных продаж, сувениров и дополнительных услуг для посетителей.", needs: ["Компактный POS-терминал", "Платёжный терминал", "Принтер чеков", "Сетевое оборудование"], benefits: ["Быстрое обслуживание гостей", "Приём разных способов оплаты", "Отчётность по сменам"] },
  { title: "Универсальные магазины", image: "photo-1519567241046-7f570eee3ce6", detail: "Оборудование для разных товаров", intro: "Гибкое решение для магазинов с разнообразным ассортиментом и разными типами товаров.", needs: ["POS-касса", "Сканер штрихкодов", "Принтер чеков", "Весы и принтер этикеток"], benefits: ["Поддержка широкого ассортимента", "Быстрая кассовая операция", "Управление товарными остатками"] },
  { title: "Компьютерные магазины", image: "photo-1519389950473-47ba0277781c", detail: "Продажи техники и комплектующих", intro: "Учитывайте компьютеры, комплектующие и аксессуары, включая товары с серийными номерами.", needs: ["POS-компьютер", "Сканер штрихкодов", "Принтер этикеток", "Сетевое оборудование"], benefits: ["Точный учёт комплектующих", "Быстрое оформление продаж", "Удобная печать этикеток"] },
  { title: "Магазины у дома", image: "photo-1556740758-90de374c12ad", detail: "Компактная кассовая зона", intro: "Практичное решение для небольшого пространства, ежедневных продаж и быстрого обслуживания.", needs: ["Компактная POS-касса", "Сканер штрихкодов", "Принтер чеков", "Денежный ящик"], benefits: ["Экономия места на кассе", "Простое обслуживание", "Базовый контроль выручки"] },
  { title: "Оптовая торговля", image: "photo-1566576721346-d4a3b4eaeb55", detail: "Работа с партиями и накладными", intro: "Поддерживайте обработку крупных заказов, складских партий и сопроводительных документов.", needs: ["Компьютер для учёта", "Складской сканер", "Принтер этикеток", "Сетевое оборудование"], benefits: ["Быстрая обработка партий", "Удобная маркировка", "Контроль складских перемещений"] },
  { title: "Винные и специализированные магазины", image: "photo-1510812431401-41d2bd2722f3", detail: "Точная работа с ассортиментом", intro: "Организуйте учёт специализированного ассортимента и поддерживайте аккуратную работу кассы.", needs: ["POS-терминал", "Сканер штрихкодов", "Принтер чеков", "Сетевое оборудование"], benefits: ["Быстрый поиск позиций", "Понятная отчётность", "Контроль наличия товаров"] },
];

const photo = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export default function Oyna() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("industry") || industries[0].title;
  const industry = industries.find((item) => item.title === title) || industries[0];
  const currentIndex = industries.findIndex((item) => item.title === industry.title);
  const otherIndustries = industries.filter((item) => item.title !== industry.title).slice(0, 5);

  return (
    <div className="oyna-page">
      <header className="oyna-nav">
        <a className="oyna-logo" href="/"> <span>S</span> shopify </a>
        <nav><a href="/#industry-showcase">Для бизнеса</a><a href="/katalog">Каталог оборудования</a><a href="/#contact">Контакты</a></nav>
        <a className="oyna-nav-cta" href="/#contact">Начать</a>
      </header>

      <main>
        <section className="oyna-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,18,19,.82), rgba(7,18,19,.3)), url(${photo(industry.image, 1800)})` }}>
          <div className="oyna-hero-inner">
            <a className="oyna-back" href="/#industry-showcase">← Все направления бизнеса</a>
            <span className="oyna-eyebrow">РЕШЕНИЯ ДЛЯ БИЗНЕСА · {String(currentIndex + 1).padStart(2, "0")}</span>
            <h1>{industry.title}</h1>
            <p>{industry.intro}</p>
            <a className="oyna-primary" href="/#contact">Подобрать оборудование <span>↗</span></a>
          </div>
          <div className="oyna-hero-index">{String(currentIndex + 1).padStart(2, "0")} <span>/ 15</span></div>
        </section>

        <section className="oyna-intro-section">
          <div><span className="oyna-eyebrow dark">ПРОДУМАННОЕ РЕШЕНИЕ</span><h2>Всё необходимое для ежедневной работы</h2></div>
          <p>Подберите комплект под задачи вашей команды. Решение можно адаптировать под размер магазина, ассортимент и особенности обслуживания клиентов.</p>
        </section>

        <section className="oyna-equipment-section">
          <div className="oyna-section-heading"><span className="oyna-eyebrow dark">РЕКОМЕНДУЕМОЕ ОБОРУДОВАНИЕ</span><h2>С чего начать</h2></div>
          <div className="oyna-equipment-grid">
            {industry.needs.map((need, index) => (
              <article className="oyna-equipment-card" key={need}>
                <span className="oyna-equipment-number">0{index + 1}</span>
                <div className="oyna-equipment-icon">{["▣", "⌕", "▤", "◈"][index % 4]}</div>
                <h3>{need}</h3>
                <p>{["Основа рабочего места для обслуживания клиентов.", "Помогает быстрее находить товар и оформлять продажу.", "Для чеков, этикеток и документов.", "Для стабильной работы подключённых устройств."][index % 4]}</p>
                <a href="/katalog">Посмотреть каталог <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="oyna-feature-band">
          <div className="oyna-feature-image" style={{ backgroundImage: `url(${photo(industry.image, 1000)})` }} />
          <div className="oyna-feature-copy"><span className="oyna-eyebrow">ПРОСТО И УДОБНО</span><h2>Больше контроля. Меньше рутины.</h2><p>Продажи, оборудование и ежедневные операции становятся понятнее, когда всё нужное находится под рукой.</p>
            <ul>{industry.benefits.map((benefit) => <li key={benefit}><span>✓</span>{benefit}</li>)}</ul>
            <a className="oyna-primary" href="/#contact">Обсудить решение <span>↗</span></a>
          </div>
        </section>

        <section className="oyna-other-section">
          <div className="oyna-section-heading"><span className="oyna-eyebrow dark">ДРУГИЕ НАПРАВЛЕНИЯ</span><h2>Решения для других сфер</h2></div>
          <div className="oyna-other-grid">{otherIndustries.map((item) => (
            <a href={`/oyna?industry=${encodeURIComponent(item.title)}`} className="oyna-other-card" key={item.title}>
              <img src={photo(item.image, 650)} alt={item.title} loading="lazy" />
              <div><h3>{item.title}</h3><p>{item.detail}</p><span>↗</span></div>
            </a>
          ))}</div>
        </section>

        <section className="oyna-bottom-cta" id="contact"><span className="oyna-eyebrow">СЛЕДУЮЩИЙ ШАГ</span><h2>Подберём оборудование под ваши задачи</h2><p>Посмотрите каталог или свяжитесь с нами, чтобы обсудить комплект для вашего бизнеса.</p><div><a className="oyna-primary" href="/katalog">Открыть каталог <span>↗</span></a><a className="oyna-secondary" href="/">На главную</a></div></section>
      </main>
      <footer className="oyna-footer"><a className="oyna-logo" href="/"><span>S</span> shopify</a><p>Оборудование и решения для торговли</p><a href="/#industry-showcase">Все направления бизнеса ↑</a></footer>
    </div>
  );
}
