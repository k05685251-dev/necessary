
import React, { useState, useEffect } from "react";
import Hero3D from "./Hero3D";
import "./App.css";

const resources = [
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
    title: "Что такое мобильная POS-система?",
    description:
      "Узнайте, как мобильные POS-системы помогают продавать товары и управлять магазином.",
    link: "Узнайте о мобильных POS-системах",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
    title: "Что такое программное обеспечение для точек продаж?",
    description:
      "Узнайте о программах для управления продажами, заказами и покупателями.",
    link: "Узнайте больше о программном обеспечении POS",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
    title: "Как выбрать POS-систему",
    description:
      "Изучите, на что стоит обратить внимание при выборе решения для бизнеса.",
    link: "Выберите свою POS-систему",
  },
];

const faqs = [
  {
    question: "Что такое POS (точка продаж)?",
    answer:
      "POS-система — это решение для оформления покупок, обработки платежей, управления товарами и отслеживания продаж в магазине.",
  },
  {
    question: "Каковы преимущества использования POS-системы?",
    answer:
      "POS-система помогает управлять запасами, ускорять обслуживание покупателей, контролировать продажи и собирать информацию о бизнесе в одном месте.",
  },
  {
    question: "Какие бывают виды POS-систем?",
    answer:
      "Существуют стационарные, мобильные и облачные POS-системы. Выбор зависит от размера магазина и способа продажи товаров.",
  },
  {
    question: "Как работает система Shopify POS?",
    answer:
      "Shopify POS объединяет розничные продажи и интернет-магазин, позволяя управлять заказами, товарами и данными покупателей в единой системе.",
  },
  {
    question: "Какие компании используют Shopify Retail POS?",
    answer:
      "POS-решения подходят небольшим магазинам, развивающимся брендам и компаниям, которые управляют несколькими торговыми точками.",
  },
  {
    question: "В чем разница между Shopify и Shopify POS?",
    answer:
      "Shopify помогает управлять бизнесом и интернет-магазином, а Shopify POS предназначен для продаж покупателям лично в физических магазинах.",
  },
  {
    question: "Можно ли интегрировать POS-систему с другими бизнес-инструментами?",
    answer:
      "Да. Возможности интеграции зависят от выбранных приложений, оборудования и тарифного плана.",
  },
  {
    question: "Какие отзывы оставляют о Shopify POS?",
    answer:
      "При выборе системы полезно сравнить реальные отзывы о простоте использования, управлении товарами, оплате и качестве поддержки.",
  },
  {
    question: "Доступна ли система Shopify POS в моей стране?",
    answer:
      "Доступность функций и способов оплаты зависит от страны. Перед подключением проверьте актуальные условия Shopify для своего региона.",
  },
];

const features = [
  {
    title: "Многоканальные продажи",
    description:
      "Используйте единый источник данных для продаж онлайн и в физических торговых точках.",
    link: "Многоканальные продажи",
  },
  {
    title: "Управление персоналом",
    description:
      "Настраивайте разрешения сотрудников и управляйте доступом к инструментам магазина.",
    link: "Управление персоналом",
  },
  {
    title: "Обработка платежей",
    description:
      "Организуйте оплату покупок с помощью поддерживаемых платежных решений.",
    link: "Обработка платежей",
  },
  {
    title: "Управление запасами",
    description:
      "Следите за товарами и остатками, чтобы упростить работу с ассортиментом.",
    link: "Управление запасами",
  },
  {
    title: "Управление клиентами",
    description:
      "Сохраняйте информацию о покупателях и помогайте создавать удобный клиентский опыт.",
    link: "Управление клиентами",
  },
  {
    title: "Отчетность и аналитика",
    description:
      "Изучайте результаты продаж и получайте информацию для принятия решений.",
    link: "Отчетность и аналитика",
  },
];

const connectedSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    title: "Продавайте везде",
    description:
      "Продавайте лично и синхронизируйте офлайн- и онлайн-продажи с помощью Shopify POS.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    title: "Повышайте лояльность",
    description:
      "Узнавайте больше о своих клиентах и создавайте персонализированный покупательский опыт.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=85",
    title: "Упростите задачи",
    description:
      "Оптимизируйте ежедневные операции и управляйте заказами, запасами и персоналом.",
  },
];

function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide(
        (previous) => (previous + 1) % connectedSlides.length
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  return (
    <div className="shopify-page">
      {/* ASOSIY NAVBAR */}
      <header className="navbar">
        <a href="#" className="shopify-logo">
          <span className="shopify-bag">S</span>
          <span>shopify</span>
        </a>

        <nav className="main-nav">
          <a href="#why">Why Shopify⌄</a>
          <a href="#products">Products⌄</a>
          <a href="#prices">Pricing</a>
          <a href="#enterprise">Enterprise</a>

          {/* FALL '26 EDITION */}
          <a
            href="https://www.shopify.com/editions/fall2026"
            target="_blank"
            rel="noopener noreferrer"
            className="fall-edition-button"
          >
            <span className="fall-edition-icon">♙</span>
            Fall '26 Edition
          </a>
        </nav>

        <div className="nav-actions">
          <a href="#login" className="login-link">
            Log in
          </a>

          <a href="#start" className="nav-button">
            Start for free
          </a>
        </div>
      </header>

      {/* IKKINCHI NAVBAR */}
      <nav className="second-navbar">
        <a href="#pos">Point of Sale</a>
        <a href="#business">Business Sizes⌄</a>
        <a href="#industry">Industries⌄</a>
        <a href="#features">Features⌄</a>
        <a href="#prices">POS Pricing</a>
      </nav>

      <main>
        {/* HERO: 3D ANIMATSIYA */}
        <section className="hero-section" id="why">
          <Hero3D />

          <div className="hero-content">
            <p className="hero-label">POS-СИСТЕМА</p>

            <h1 className="hero-title">
              Точка продажи для каждой продажи
            </h1>

            <p className="hero-description">
              От первой продажи до полномасштабной работы лучшие
              современные бренды работают с POS-системой Shopify.
            </p>

            <div className="hero-buttons">
              <a
                href="#start"
                className="hero-button hero-button-black"
              >
                Начать бесплатно <span>→</span>
              </a>

              <a
                href="#contact"
                className="hero-button hero-button-outline"
              >
                Свяжитесь с нами <span>→</span>
              </a>
            </div>

            <p className="hero-login">
              У вас уже есть магазин Shopify?{" "}
              <a href="#login">
                Войдите, чтобы настроить Shopify POS
              </a>
            </p>
          </div>
        </section>

        {/* BRENDLAR */}
        <section className="brands-section">
          <div className="brands-container">
            <div className="brand-logo kotn">KOTN</div>
            <div className="brand-logo parachute">PARACHUTE</div>
            <div className="brand-logo alo">alo</div>
            <div className="brand-logo glossier">Glossier.</div>

            <div className="brand-logo gorjana">
              <span className="gorjana-icon">g</span>
              <span>gorjana</span>
            </div>
          </div>
        </section>

        {/* BIZNES TURLARI */}
        <section className="support-section" id="business">
          <h2>
            Поддержка розничных
            <br />
            продавцов любого размера
          </h2>
        </section>

        <section className="business-section">
          <div className="business-container">
            <article className="business-card">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85"
                alt="Один магазин"
                className="business-image"
              />

              <div className="business-content">
                <h3>Один магазин</h3>
                <p>
                  Продавайте в магазине с интегрированным оборудованием,
                  программным обеспечением и обработкой платежей.
                </p>
              </div>
            </article>

            <article className="business-card">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
                alt="Несколько магазинов"
                className="business-image"
              />

              <div className="business-content">
                <h3>Несколько магазинов</h3>
                <p>
                  Оптимизируйте операции с помощью унифицированных
                  данных, отчетности и управления запасами.
                </p>
              </div>
            </article>

            <article className="business-card">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85"
                alt="Продажи на ходу"
                className="business-image"
              />

              <div className="business-content">
                <h3>На ходу</h3>
                <p>
                  Используйте мобильную POS-систему для продаж на рынках,
                  мероприятиях и во временных торговых точках.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* ВСЁ, ЧТО ВАМ НУЖНО */}
        <section className="everything-section" id="products">
          <div className="everything-container">
            <h2>
              Всё, что вам нужно
              <br />
              в магазине, онлайн и во
              <br />
              всех прочих местах
            </h2>

            <p>
              Это возможность продавать лично, подкрепленная
              возможностью продавать онлайн, и всё это на лучшей
              в мире торговой платформе.
            </p>
          </div>
        </section>

        {/* UCHTA RASM */}
        <section className="collage-section">
          <div className="collage-container">
            <div className="collage-photo collage-left">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"
                alt="Управление бизнесом"
              />
              <span className="collage-label">
                Центр управления бизнес-процессами <b>＋</b>
              </span>
            </div>

            <div className="collage-photo collage-center">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85"
                alt="POS-система"
              />
              <span className="collage-label">
                POS-система <b>＋</b>
              </span>
            </div>

            <div className="collage-photo collage-right">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85"
                alt="Онлайн-продажи"
              />
              <span className="collage-label">
                Онлайн-продажи <b>＋</b>
              </span>
            </div>
          </div>
        </section>

        {/* CONNECTED RETAIL */}
        <section className="connected-section" id="industry">
          <div className="connected-promo">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=85"
              alt="Магазин Shopify"
            />

            <div>
              <h3>
                Взгляните изнутри на Точку продажи Shopify
              </h3>

              <p>
                Узнайте, как розничные продавцы используют современные
                инструменты для развития бизнеса.
              </p>

              <a href="#resources">
                Смотреть демонстрацию ↗
              </a>
            </div>
          </div>

          <div className="connected-dark">
            <div className="connected-inner">
              <span className="eyebrow">
                ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ POS
              </span>

              <h2>
                Подключенная розничная торговля.
                <br />
                Такая, какой она и должна быть.
              </h2>

              <div className="connected-layout">
                <div className="connected-image">
                  <img
                    key={activeSlide}
                    src={connectedSlides[activeSlide].image}
                    alt={connectedSlides[activeSlide].title}
                  />
                </div>

                <div className="connected-list">
                  {connectedSlides.map((slide, index) => (
                    <article
                      key={slide.title}
                      className={`connected-item ${
                        activeSlide === index ? "active" : ""
                      }`}
                      onClick={() => setActiveSlide(index)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          setActiveSlide(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={activeSlide === index}
                    >
                      <div className="connected-progress">
                        <div
                          key={`${activeSlide}-${index}`}
                          className={`connected-progress-fill ${
                            activeSlide === index
                              ? "progress-running"
                              : ""
                          }`}
                        />
                      </div>

                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OBORUDOVANIE */}
        <section className="equipment-section">
          <div className="equipment-container">
            <span className="eyebrow">
              POS-ОБОРУДОВАНИЕ ДЛЯ РОЗНИЧНОЙ ТОРГОВЛИ
            </span>

            <h2>
              Интегрированное оборудование,
              <br />
              независимо от того, как вы продаете
            </h2>

            <img
              className="equipment-image"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
              alt="Оборудование для розничной торговли"
            />

            <div className="equipment-benefits">
              <article>
                <h3>Начните как можно быстрее</h3>
                <p>
                  Начните продавать в кратчайшие сроки с помощью
                  надежного оборудования, которое сразу готово к использованию.
                </p>
              </article>

              <article>
                <h3>Продавайте без перерывов</h3>
                <p>
                  Организуйте стабильную работу кассы и удобное
                  оформление покупок с помощью платформы Shopify.
                </p>
              </article>

              <article>
                <h3>Настройте свою конфигурацию</h3>
                <p>
                  Выбирайте оборудование в соответствии с вашим бюджетом
                  и сценарием продаж — у прилавка или на ходу.
                </p>
              </article>
            </div>

            <a href="#features" className="outline-pill">
              Ознакомьтесь с POS-оборудованием
            </a>
          </div>
        </section>

        {/* SHOPIFY PAYMENTS */}
        <section className="payments-section">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85"
            alt="Оплата покупки"
          />

          <div>
            <span className="eyebrow">SHOPIFY PAYMENTS</span>

            <h2>
              Привлекайте 250+
              <br />
              млн новых клиентов
            </h2>

            <p>
              Принимайте платежи и управляйте продажами в единой системе,
              упрощая обслуживание покупателей и работу магазина.
            </p>

            <a href="#features" className="outline-pill">
              Как это работает
            </a>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section" id="features">
          <div className="features-container">
            <span className="eyebrow">ВОЗМОЖНОСТИ POS</span>

            <h2>Все функции. Все в одном месте.</h2>

            <p className="section-description">
              Получите инструменты для повседневных операций и управления
              розничным бизнесом.
            </p>

            <div className="features-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a href="#start">{feature.link} ↗</a>
                </article>
              ))}
            </div>

            <a href="#start" className="outline-pill">
              Изучите все функции
            </a>
          </div>
        </section>

        {/* GETTING STARTED */}
        <section className="steps-section" id="start">
          <div className="steps-container">
            <h2>Как начать работу с Shopify POS</h2>

            <p className="section-description">
              Независимо от того, начинаете ли вы свой путь или уже
              развиваете платформу, мы готовы вам помочь.
            </p>

            <div className="steps-grid">
              <article>
                <span className="step-number">1</span>
                <h3>Начните бесплатно</h3>
                <p>
                  Познакомьтесь с возможностями Shopify и подготовьте
                  свой магазин к работе.
                </p>
              </article>

              <article>
                <span className="step-number">2</span>
                <h3>Создайте свой магазин</h3>
                <p>
                  Получите помощь в настройке магазина и организуйте
                  каталог товаров для продаж.
                </p>
              </article>

              <article>
                <span className="step-number">3</span>
                <h3>Настройте все решение</h3>
                <p>
                  Подготовьте POS-систему, оборудование и инструменты
                  управления для своего бизнеса.
                </p>
              </article>
            </div>

            <div className="steps-buttons">
              <a
                href="#contact"
                className="hero-button hero-button-black"
              >
                Начать бесплатно
              </a>

              <a href="#contact" className="outline-pill">
                Свяжитесь с нами
              </a>
            </div>
          </div>
        </section>

        {/* ECONOMY PROMO */}
        <section className="savings-section" id="prices">
          <div className="savings-container">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"
              alt="Команда бизнеса"
            />

            <div>
              <h2>
                Перейдите и
                <br />
                сэкономьте $2,400*
              </h2>

              <p>
                Изучите возможности POS-оборудования, инструменты
                управления и решения для развития своего бизнеса.
              </p>

              <a
                href="#contact"
                className="hero-button hero-button-black"
              >
                Узнать больше
              </a>

              <small>
                *Условия, доступность предложений и стоимость оборудования
                зависят от выбранного решения и региона.
              </small>
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section className="resources-section" id="resources">
          <div className="resources-container">
            <h2>
              Ресурсы для
              <br />
              розничной торговли
            </h2>

            <p className="resources-description">
              Получите доступ к полезным руководствам, учебным материалам
              и рекомендациям для развития розничной торговли.
            </p>

            <div className="resources-grid">
              {resources.map((resource) => (
                <article className="resource-card" key={resource.title}>
                  <img src={resource.image} alt={resource.title} />

                  <div className="resource-content">
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <a href="#faq">{resource.link} ↗</a>
                  </div>
                </article>
              ))}
            </div>

            <div className="resources-button">
              <a
                href="#faq"
                className="outline-pill outline-pill-light"
              >
                Посетите блог Shopify Retail
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-container" id="faq">
            <h2>Часто задаваемые вопросы</h2>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <article
                  className={`faq-item ${
                    openFaq === index ? "faq-item-open" : ""
                  }`}
                  key={faq.question}
                >
                  <button
                    className="faq-question"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PASTKI CTA */}
        <section className="final-cta" id="contact">
          <div className="final-cta-content">
            <h2>Продавайте лучше с Shopify POS</h2>

            <p>
              Объедините продажи в магазине и онлайн в одном удобном решении.
            </p>

            <div className="final-cta-buttons">
              <a
                href="#start"
                className="hero-button hero-button-light"
              >
                Начать бесплатно
              </a>

              <a
                href="#contact"
                className="hero-button hero-button-dark-outline"
              >
                Свяжитесь с нами
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
