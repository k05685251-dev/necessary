
import React, { useEffect, useMemo, useState } from "react";
import Hero3D from "./Hero3D";
import "./App.css";

const products = [
  { id: 1, name: "POS кассовый компьютер", category: "Кассовые системы", price: 6500000, icon: "🖥️", description: "Компьютер для кассы и торгового зала", tag: "Популярное" },
  { id: 2, name: "Сенсорный POS-монитор 15.6″", category: "Кассовые системы", price: 3200000, icon: "🖥️", description: "Сенсорный экран для кассового рабочего места" },
  { id: 3, name: "POS-терминал All-in-One", category: "Кассовые системы", price: 7800000, icon: "💻", description: "Компьютер и сенсорный экран в одном корпусе", tag: "Хит продаж" },
  { id: 4, name: "Компактный кассовый компьютер", category: "Кассовые системы", price: 4500000, icon: "🖥️", description: "Компактный компьютер для магазина" },
  { id: 5, name: "Кассовый денежный ящик", category: "Кассовые системы", price: 850000, icon: "💵", description: "Ящик для хранения наличных денег" },
  { id: 6, name: "Автоматический денежный ящик", category: "Кассовые системы", price: 1200000, icon: "💰", description: "Открытие через подключение к кассе" },
  { id: 7, name: "POS-клавиатура", category: "Кассовые системы", price: 420000, icon: "⌨️", description: "Клавиатура для кассового рабочего места" },
  { id: 8, name: "Кассовый дисплей покупателя", category: "Кассовые системы", price: 950000, icon: "🖥️", description: "Показывает покупателю сумму покупки" },

  { id: 9, name: "Сканер штрихкодов 1D", category: "Сканеры штрихкодов", price: 350000, icon: "🔎", description: "Сканирование обычных товарных штрихкодов" },
  { id: 10, name: "2D-сканер QR и штрихкодов", category: "Сканеры штрихкодов", price: 620000, icon: "📷", description: "Читает QR-коды и двухмерные штрихкоды", tag: "Популярное" },
  { id: 11, name: "Беспроводной сканер", category: "Сканеры штрихкодов", price: 890000, icon: "📡", description: "Беспроводное сканирование товаров" },
  { id: 12, name: "Настольный сканер", category: "Сканеры штрихкодов", price: 1450000, icon: "🔍", description: "Сканер для интенсивной работы на кассе" },
  { id: 13, name: "Ручной промышленный сканер", category: "Сканеры штрихкодов", price: 1750000, icon: "📦", description: "Сканирование товаров на складе" },
  { id: 14, name: "Сканер-кольцо для пальца", category: "Сканеры штрихкодов", price: 2100000, icon: "💍", description: "Сканирование при комплектации заказов" },

  { id: 15, name: "Термопринтер чеков 58 мм", category: "Принтеры", price: 480000, icon: "🧾", description: "Компактный принтер для небольшого магазина" },
  { id: 16, name: "Термопринтер чеков 80 мм", category: "Принтеры", price: 950000, icon: "🖨️", description: "Печать кассовых чеков", tag: "Популярное" },
  { id: 17, name: "Мобильный чековый принтер", category: "Принтеры", price: 1250000, icon: "🖨️", description: "Печать чеков в дороге и на выезде" },
  { id: 18, name: "Принтер товарных этикеток", category: "Принтеры", price: 1350000, icon: "🏷️", description: "Печать этикеток со штрихкодами" },
  { id: 19, name: "Промышленный принтер этикеток", category: "Принтеры", price: 4200000, icon: "🏷️", description: "Для больших объёмов складской печати" },
  { id: 20, name: "Обычный офисный принтер", category: "Принтеры", price: 1850000, icon: "🖨️", description: "Печать документов и накладных" },

  { id: 21, name: "Банковский POS-терминал", category: "Оплата", price: 1800000, icon: "💳", description: "Приём банковских карт при поддержке банка" },
  { id: 22, name: "Бесконтактный терминал", category: "Оплата", price: 2250000, icon: "💳", description: "Поддержка бесконтактной оплаты" },
  { id: 23, name: "Мобильный платёжный терминал", category: "Оплата", price: 1950000, icon: "📱", description: "Платёжное устройство для мобильной торговли" },
  { id: 24, name: "USB-считыватель карт", category: "Оплата", price: 380000, icon: "💳", description: "Считыватель для совместимых систем" },

  { id: 25, name: "Электронные торговые весы", category: "Весы", price: 1250000, icon: "⚖️", description: "Взвешивание товаров в магазине" },
  { id: 26, name: "Весы с печатью этикеток", category: "Весы", price: 3900000, icon: "⚖️", description: "Взвешивание и печать товарных этикеток" },
  { id: 27, name: "Настольные цифровые весы", category: "Весы", price: 650000, icon: "⚖️", description: "Компактные весы для прилавка" },
  { id: 28, name: "Складские платформенные весы", category: "Весы", price: 2400000, icon: "📦", description: "Для взвешивания коробок и грузов" },

  { id: 29, name: "Терминал сбора данных", category: "Складское оборудование", price: 2800000, icon: "📟", description: "Сканирование и учёт товаров на складе", tag: "Для склада" },
  { id: 30, name: "Мобильный компьютер со сканером", category: "Складское оборудование", price: 3500000, icon: "📱", description: "Проверка остатков и перемещение товаров" },
  { id: 31, name: "RFID-считыватель", category: "Складское оборудование", price: 2600000, icon: "📡", description: "Работа с совместимыми RFID-метками" },
  { id: 32, name: "Ручной сканер инвентаризации", category: "Складское оборудование", price: 1450000, icon: "📦", description: "Для проверки наличия товаров" },
  { id: 33, name: "Складской принтер этикеток", category: "Складское оборудование", price: 1700000, icon: "🏷️", description: "Маркировка коробок и складских мест" },

  { id: 34, name: "Процессор Intel Core i5", category: "Компьютерные комплектующие", price: 1850000, icon: "🧩", description: "Процессор для совместимых компьютеров" },
  { id: 35, name: "Процессор AMD Ryzen 5", category: "Компьютерные комплектующие", price: 1950000, icon: "🧩", description: "Процессор для настольного ПК" },
  { id: 36, name: "Материнская плата", category: "Компьютерные комплектующие", price: 1450000, icon: "🔌", description: "Плата для сборки компьютера" },
  { id: 37, name: "Оперативная память DDR4 16 GB", category: "Компьютерные комплектующие", price: 480000, icon: "💾", description: "Модуль памяти для совместимых систем" },
  { id: 38, name: "Оперативная память DDR5 16 GB", category: "Компьютерные комплектующие", price: 680000, icon: "💾", description: "Модуль памяти нового поколения" },
  { id: 39, name: "SSD-накопитель 512 GB", category: "Компьютерные комплектующие", price: 620000, icon: "💽", description: "Быстрый накопитель для компьютера" },
  { id: 40, name: "SSD-накопитель 1 TB", category: "Компьютерные комплектующие", price: 980000, icon: "💽", description: "Дополнительное пространство для файлов" },
  { id: 41, name: "Жёсткий диск HDD 2 TB", category: "Компьютерные комплектующие", price: 850000, icon: "💿", description: "Накопитель для хранения данных" },
  { id: 42, name: "Блок питания 650 W", category: "Компьютерные комплектующие", price: 720000, icon: "🔋", description: "Питание совместимых настольных ПК" },
  { id: 43, name: "Видеокарта", category: "Компьютерные комплектующие", price: 3500000, icon: "🎮", description: "Графический адаптер для компьютера" },
  { id: 44, name: "Корпус компьютера", category: "Компьютерные комплектующие", price: 650000, icon: "🖥️", description: "Корпус для сборки настольного ПК" },
  { id: 45, name: "Кулер для процессора", category: "Компьютерные комплектующие", price: 280000, icon: "🌀", description: "Охлаждение совместимого процессора" },

  { id: 46, name: "Монитор 24 дюйма", category: "Компьютерная периферия", price: 1650000, icon: "🖥️", description: "Монитор для кассы или офиса" },
  { id: 47, name: "Клавиатура USB", category: "Компьютерная периферия", price: 120000, icon: "⌨️", description: "Проводная клавиатура для компьютера" },
  { id: 48, name: "Беспроводная клавиатура", category: "Компьютерная периферия", price: 250000, icon: "⌨️", description: "Беспроводная работа за компьютером" },
  { id: 49, name: "Компьютерная мышь", category: "Компьютерная периферия", price: 85000, icon: "🖱️", description: "Проводная мышь для рабочего места" },
  { id: 50, name: "Беспроводная мышь", category: "Компьютерная периферия", price: 180000, icon: "🖱️", description: "Беспроводная компьютерная мышь" },
  { id: 51, name: "USB-хаб", category: "Компьютерная периферия", price: 150000, icon: "🔌", description: "Дополнительные USB-порты для устройств" },
  { id: 52, name: "Сетевой адаптер Wi-Fi", category: "Компьютерная периферия", price: 190000, icon: "📶", description: "Подключение совместимого компьютера к Wi-Fi" },

  { id: 53, name: "Маршрутизатор Wi-Fi", category: "Сетевое оборудование", price: 520000, icon: "📡", description: "Сеть для магазина и кассовых устройств" },
  { id: 54, name: "Коммутатор Ethernet 8 портов", category: "Сетевое оборудование", price: 380000, icon: "🔌", description: "Подключение нескольких сетевых устройств" },
  { id: 55, name: "Сетевой кабель Ethernet", category: "Сетевое оборудование", price: 45000, icon: "🔗", description: "Проводное подключение к локальной сети" },
  { id: 56, name: "Источник бесперебойного питания", category: "Сетевое оборудование", price: 950000, icon: "🔋", description: "Резервное питание для совместимой техники" },

  { id: 57, name: "Считыватель магнитных карт", category: "Дополнительное оборудование", price: 290000, icon: "💳", description: "Считывание совместимых карт" },
  { id: 58, name: "Сканер документов", category: "Дополнительное оборудование", price: 850000, icon: "📄", description: "Оцифровка документов и накладных" },
  { id: 59, name: "Веб-камера для компьютера", category: "Дополнительное оборудование", price: 320000, icon: "📷", description: "Видеосвязь и рабочие видеозвонки" },
  { id: 60, name: "Защитный сетевой фильтр", category: "Дополнительное оборудование", price: 160000, icon: "🔌", description: "Подключение нескольких электроприборов" },
  { id: 61, name: "Сетевой адаптер питания", category: "Дополнительное оборудование", price: 95000, icon: "🔋", description: "Питание совместимого оборудования" },
  { id: 62, name: "Подставка для POS-терминала", category: "Дополнительное оборудование", price: 380000, icon: "🧰", description: "Удобное размещение POS-устройства" },
  { id: 63, name: "Держатель планшета для кассы", category: "Дополнительное оборудование", price: 270000, icon: "📱", description: "Крепление планшета на кассовой стойке" },
  { id: 64, name: "Защитный чехол для терминала", category: "Дополнительное оборудование", price: 120000, icon: "🛡️", description: "Защита совместимого устройства" },
];

const resources = [
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
    title: "Что такое мобильная POS-система?",
    description: "Узнайте, как мобильные POS-системы помогают продавать товары и управлять магазином.",
    link: "Узнайте о мобильных POS-системах",
  },
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
    title: "Программное обеспечение для точек продаж",
    description: "Узнайте о программах для управления продажами, заказами и покупателями.",
    link: "Узнайте больше о POS",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
    title: "Как выбрать POS-систему",
    description: "Изучите, на что стоит обратить внимание при выборе решения для бизнеса.",
    link: "Выберите свою POS-систему",
  },
];

const faqs = [
  {
    question: "Что такое POS-система?",
    answer: "POS-система помогает оформлять покупки, принимать платежи, учитывать товары и отслеживать продажи.",
  },
  {
    question: "Какие устройства нужны для кассы?",
    answer: "Обычно используют POS-компьютер или планшет, сканер штрихкодов, принтер чеков и денежный ящик. Дополнительные устройства зависят от типа магазина.",
  },
  {
    question: "Можно ли подключить сканер к компьютеру?",
    answer: "Многие сканеры подключаются через USB или Bluetooth. Перед покупкой нужно проверить совместимость с компьютером и кассовой программой.",
  },
  {
    question: "Для чего нужен принтер этикеток?",
    answer: "Он печатает ценники, товарные этикетки и штрихкоды. Подходящая модель зависит от размера этикеток и объёма печати.",
  },
  {
    question: "Все ли платёжные терминалы работают с Shopify POS?",
    answer: "Совместимость зависит от страны, банка, модели устройства и поддерживаемых платёжных интеграций. Перед покупкой необходимо проверить требования поставщика.",
  },
  {
    question: "Можно ли использовать обычный компьютер для кассы?",
    answer: "Иногда да, но нужно проверить совместимость операционной системы, браузера, кассового приложения и подключаемого оборудования.",
  },
];

const connectedSlides = [
  {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    title: "Продавайте везде",
    description: "Объединяйте продажи в магазине и онлайн.",
  },
  {
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    title: "Повышайте лояльность",
    description: "Создавайте удобный покупательский опыт.",
  },
  {
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=85",
    title: "Упростите задачи",
    description: "Управляйте заказами, запасами и персоналом.",
  },
];

const money = (value) =>
  new Intl.NumberFormat("ru-RU").format(value) + " сум";

function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все товары");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  const categories = useMemo(
    () => ["Все товары", ...new Set(products.map((p) => p.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "Все товары" || product.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ru"));
    }

    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((previous) => (previous + 1) % connectedSlides.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  function openProductDetails(product) {
    setSelectedProduct(product);
    setDetailQuantity(1);
  }

  function addToCart(product, quantity = 1) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...previous, { ...product, quantity }];
    });
    setNotice(`${product.name} добавлен в корзину`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id, amount) {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="shopify-page">
      <header className="navbar">
        <a href="#top" className="shopify-logo">
          <span className="shopify-bag">S</span>
          <span>shopify</span>
        </a>

        <nav className="main-nav">
          <a href="#why">Why Shopify⌄</a>
          <a href="#products">Products⌄</a>
          <a href="#catalog">Каталог</a>
          <a href="#prices">Pricing</a>
          <a
            href="https://www.shopify.com/editions/fall2026"
            target="_blank"
            rel="noopener noreferrer"
            className="fall-edition-button"
          >
            ✦ Fall '26 Edition
          </a>
        </nav>

        <div className="nav-actions">
          <button className="cart-nav-button" onClick={() => setCartOpen(true)}>
            🛒 Корзина <span>{cartCount}</span>
          </button>
          <a href="#start" className="nav-button">Начать</a>
        </div>
      </header>

      <nav className="second-navbar">
        <a href="#catalog">Каталог оборудования</a>
        <a href="#business">Для бизнеса</a>
        <a href="#features">Возможности</a>
        <a href="#resources">Полезные материалы</a>
      </nav>

      <main id="top">
        <section className="hero-section" id="why">
          <Hero3D />
          <div className="hero-content">
            <p className="hero-label">POS-СИСТЕМА И ТОРГОВОЕ ОБОРУДОВАНИЕ</p>
            <h1 className="hero-title">Технологии для каждой продажи</h1>
            <p className="hero-description">
              Кассовые аппараты, сканеры, принтеры, платёжные терминалы
              и компьютерные комплектующие для вашего бизнеса.
            </p>
            <div className="hero-buttons">
              <a href="#catalog" className="hero-button hero-button-black">
                Смотреть каталог <span>→</span>
              </a>
              <a href="#contact" className="hero-button hero-button-outline">
                Связаться с нами <span>→</span>
              </a>
            </div>
            <p className="hero-login">
              Большой выбор оборудования для магазинов, касс и складов.
            </p>
          </div>
        </section>

        <section className="brands-section">
          <div className="brands-container">
            <div className="brand-logo kotn">KOTN</div>
            <div className="brand-logo parachute">PARACHUTE</div>
            <div className="brand-logo alo">alo</div>
            <div className="brand-logo glossier">Glossier.</div>
            <div className="brand-logo gorjana">◉ gorjana</div>
          </div>
        </section>

        <section className="support-section" id="business">
          <h2>Оборудование для бизнеса любого размера</h2>
        </section>

        <section className="business-section">
          <div className="business-container">
            <article className="business-card">
              <img className="business-image" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=85" alt="Магазин" />
              <div className="business-content">
                <h3>Розничный магазин</h3>
                <p>Кассовые компьютеры, сканеры штрихкодов, принтеры чеков и денежные ящики.</p>
              </div>
            </article>
            <article className="business-card">
              <img className="business-image" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85" alt="Склад" />
              <div className="business-content">
                <h3>Склад и логистика</h3>
                <p>Терминалы сбора данных, складские сканеры, весы и принтеры этикеток.</p>
              </div>
            </article>
            <article className="business-card">
              <img className="business-image" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85" alt="Компьютерная техника" />
              <div className="business-content">
                <h3>Компьютерная техника</h3>
                <p>Процессоры, память, SSD, материнские платы, мониторы и периферия.</p>
              </div>
            </article>
          </div>
        </section>

        {/* КАТАЛОГ ОБОРУДОВАНИЯ */}
        <section className="catalog-section" id="catalog">
          <div className="catalog-container">
            <div className="catalog-heading">
              <div>
                <span className="eyebrow">МАГАЗИН ОБОРУДОВАНИЯ</span>
                <h2>Каталог товаров</h2>
                <p>Выбирайте оборудование для кассы, магазина, склада и компьютера.</p>
              </div>
              <button className="catalog-cart-button" onClick={() => setCartOpen(true)}>
                🛒 Корзина <span>{cartCount}</span>
              </button>
            </div>

            <div className="catalog-tools">
              <label className="catalog-search">
                <span>⌕</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Поиск: сканер, принтер, SSD..."
                  aria-label="Поиск товаров"
                />
                {search && (
                  <button onClick={() => setSearch("")} aria-label="Очистить поиск">×</button>
                )}
              </label>

              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Сортировка товаров">
                <option value="default">Сначала рекомендуемые</option>
                <option value="low">Сначала дешевле</option>
                <option value="high">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${category === item ? "selected" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="catalog-result-count">
              Найдено товаров: <strong>{filteredProducts.length}</strong>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                    onClick={() => openProductDetails(product)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") openProductDetails(product);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${product.name} — подробности`}
                  >
                    <div className="product-visual">
                      {product.tag && <span className="product-tag">{product.tag}</span>}
                      <span className="product-emoji" aria-hidden="true">{product.icon}</span>
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-bottom">
                        <strong className="product-price">{money(product.price)}</strong>
                        <button
                          className="add-cart-button"
                          onClick={(event) => { event.stopPropagation(); addToCart(product); }}
                          aria-label={`Добавить ${product.name} в корзину`}
                        >
                          + В корзину
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="catalog-empty">
                <span>🔎</span>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или категорию.</p>
                <button
                  className="outline-pill"
                  onClick={() => { setSearch(""); setCategory("Все товары"); }}
                >
                  Показать все товары
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="everything-section">
          <div className="everything-container">
            <h2>Всё необходимое для магазина в одном каталоге</h2>
            <p>От оборудования для кассы до комплектующих компьютера — выбирайте устройства под свои задачи.</p>
          </div>
        </section>

        <section className="collage-section">
          <div className="collage-container">
            <div className="collage-photo collage-left">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85" alt="Работа с компьютером" />
              <span className="collage-label">Компьютерная техника <b>＋</b></span>
            </div>
            <div className="collage-photo collage-center">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85" alt="Кассовая система" />
              <span className="collage-label">Кассовые системы <b>＋</b></span>
            </div>
            <div className="collage-photo collage-right">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85" alt="Складское оборудование" />
              <span className="collage-label">Склад <b>＋</b></span>
            </div>
          </div>
        </section>

        <section className="connected-section" id="industry">
          <div className="connected-promo">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=85" alt="Магазин" />
            <div>
              <h3>Подберите оборудование для своего магазина</h3>
              <p>Сравните типы устройств и выберите подходящее решение.</p>
              <a href="#catalog">Открыть каталог ↗</a>
            </div>
          </div>
          <div className="connected-dark">
            <div className="connected-inner">
              <span className="eyebrow">РЕШЕНИЯ ДЛЯ ТОРГОВЛИ</span>
              <h2>Удобные инструменты для повседневной работы</h2>
              <div className="connected-layout">
                <div className="connected-image">
                  <img key={activeSlide} src={connectedSlides[activeSlide].image} alt={connectedSlides[activeSlide].title} />
                </div>
                <div className="connected-list">
                  {connectedSlides.map((slide, index) => (
                    <article
                      key={slide.title}
                      className={`connected-item ${activeSlide === index ? "active" : ""}`}
                      onClick={() => setActiveSlide(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActiveSlide(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={activeSlide === index}
                    >
                      <div className="connected-progress">
                        <div className={`connected-progress-fill ${activeSlide === index ? "progress-running" : ""}`} />
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

        <section className="equipment-section" id="features">
          <div className="equipment-container">
            <span className="eyebrow">ТОРГОВОЕ ОБОРУДОВАНИЕ</span>
            <h2>Устройства для кассы, склада и магазина</h2>
            <img className="equipment-image" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85" alt="Оборудование для торговли" />
            <div className="equipment-benefits">
              <article><h3>Для кассовой зоны</h3><p>Компьютеры, сканеры, принтеры чеков и денежные ящики.</p></article>
              <article><h3>Для склада</h3><p>Терминалы сбора данных, этикетки, сканеры и весы.</p></article>
              <article><h3>Для компьютеров</h3><p>Комплектующие, накопители, мониторы и периферия.</p></article>
            </div>
            <a href="#catalog" className="outline-pill">Выбрать оборудование</a>
          </div>
        </section>

        <section className="payments-section">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85" alt="Оплата покупки" />
          <div>
            <span className="eyebrow">ОПЛАТА И КАССА</span>
            <h2>Оборудование для обслуживания покупателей</h2>
            <p>Выбирайте совместимые терминалы оплаты, сканеры, принтеры и кассовые аксессуары.</p>
            <a href="#catalog" className="outline-pill">Посмотреть товары</a>
          </div>
        </section>

        <section className="features-section">
          <div className="features-container">
            <span className="eyebrow">КАТЕГОРИИ КАТАЛОГА</span>
            <h2>Всё в одном месте</h2>
            <p className="section-description">Выберите направление, чтобы посмотреть подходящие устройства.</p>
            <div className="features-grid">
              {categories.slice(1, 7).map((item) => (
                <article className="feature-card" key={item}>
                  <h3>{item}</h3>
                  <p>Посмотрите доступные устройства и выберите товар для своего бизнеса.</p>
                  <button className="text-link-button" onClick={() => { setCategory(item); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>Смотреть товары ↗</button>
                </article>
              ))}
            </div>
            <a href="#catalog" className="outline-pill">Открыть весь каталог</a>
          </div>
        </section>

        <section className="steps-section" id="start">
          <div className="steps-container">
            <h2>Как выбрать оборудование</h2>
            <p className="section-description">Подберите технику по задачам и проверьте её совместимость перед покупкой.</p>
            <div className="steps-grid">
              <article><span className="step-number">1</span><h3>Выберите категорию</h3><p>Кассовые системы, принтеры, сканеры или компьютерные комплектующие.</p></article>
              <article><span className="step-number">2</span><h3>Сравните устройства</h3><p>Обратите внимание на подключение, характеристики и совместимость.</p></article>
              <article><span className="step-number">3</span><h3>Добавьте в корзину</h3><p>Соберите список нужных устройств и проверьте итоговую сумму.</p></article>
            </div>
            <div className="steps-buttons">
              <a href="#catalog" className="hero-button hero-button-black">Выбрать товары</a>
              <a href="#contact" className="outline-pill">Связаться с нами</a>
            </div>
          </div>
        </section>

        <section className="savings-section" id="prices">
          <div className="savings-container">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85" alt="Команда бизнеса" />
            <div>
              <h2>Оснастите свой магазин</h2>
              <p>Подберите набор устройств под бюджет, количество касс и особенности торговли.</p>
              <a href="#catalog" className="hero-button hero-button-black">Перейти к товарам</a>
              <small>Цены в каталоге приведены для демонстрации. Фактическую стоимость уточняйте у продавца.</small>
            </div>
          </div>
        </section>

        <section className="resources-section" id="resources">
          <div className="resources-container">
            <h2>Полезные материалы</h2>
            <p className="resources-description">Рекомендации по выбору оборудования для розничной торговли.</p>
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
          </div>

          <div className="faq-container" id="faq">
            <h2>Часто задаваемые вопросы</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <article className={`faq-item ${openFaq === index ? "faq-item-open" : ""}`} key={faq.question}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                    <span>{faq.question}</span>
                    <span className="faq-icon">{openFaq === index ? "−" : "+"}</span>
                  </button>
                  {openFaq === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="final-cta-content">
            <h2>Найдите оборудование для своего бизнеса</h2>
            <p>Соберите список нужных товаров в каталоге.</p>
            <div className="final-cta-buttons">
              <a href="#catalog" className="hero-button hero-button-light">Открыть каталог</a>
              <button className="hero-button hero-button-dark-outline" onClick={() => setCartOpen(true)}>Посмотреть корзину ({cartCount})</button>
            </div>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div
          className="product-detail-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <section className="product-detail-modal" role="dialog" aria-modal="true" aria-label="Информация о товаре">
            <button className="product-detail-close" onClick={() => setSelectedProduct(null)} aria-label="Закрыть">×</button>

            <div className="product-detail-image-side">
              <span className="product-detail-category">{selectedProduct.category}</span>
              <div className="product-detail-icon">{selectedProduct.icon}</div>
              <p>Изображение товара</p>
            </div>

            <div className="product-detail-info">
              <span className="product-detail-kicker">ИНФОРМАЦИЯ О ТОВАРЕ</span>
              <h2>{selectedProduct.name}</h2>
              <div className="product-detail-rating"><span>★★★★★</span> <small>Оценки пока не добавлены</small></div>
              <p className="product-detail-description">{selectedProduct.description}</p>

              <div className="product-detail-price-box">
                <span className="product-detail-price">{money(selectedProduct.price)}</span>
                <span className="product-detail-price-note">Цена за 1 шт.</span>
              </div>

              <div className="product-detail-status"><span className="status-dot" /> Доступен для заказа</div>
              <div className="product-detail-benefits">
                <div><span>✓</span><div><strong>Выбор количества</strong><small>Укажите, сколько единиц нужно</small></div></div>
                <div><span>✓</span><div><strong>Удобная корзина</strong><small>Общая сумма обновится автоматически</small></div></div>
                <div><span>i</span><div><strong>Скидка</strong><small>Если действует скидка, её можно указать в данных товара</small></div></div>
              </div>

              <div className="product-detail-buy-row">
                <div className="detail-quantity-control" aria-label="Количество товара">
                  <button onClick={() => setDetailQuantity((q) => Math.max(1, q - 1))} aria-label="Уменьшить количество">−</button>
                  <span>{detailQuantity}</span>
                  <button onClick={() => setDetailQuantity((q) => q + 1)} aria-label="Увеличить количество">+</button>
                </div>
                <button
                  className="product-detail-add"
                  onClick={() => {
                    addToCart(selectedProduct, detailQuantity);
                    setSelectedProduct(null);
                  }}
                >
                  🛒 Добавить в корзину
                </button>
              </div>
              <p className="product-detail-subtotal">Сумма за выбранное количество: <strong>{money(selectedProduct.price * detailQuantity)}</strong></p>
            </div>
          </section>
        </div>
      )}

      {notice && <div className="cart-notice" role="status">{notice}</div>}

      {cartOpen && (
        <div className="cart-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCartOpen(false);
        }}>
          <aside className="cart-drawer" aria-label="Корзина">
            <div className="cart-header">
              <div>
                <span className="eyebrow">ВАШ ЗАКАЗ</span>
                <h2>Корзина ({cartCount})</h2>
              </div>
              <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Закрыть корзину">×</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span>🛒</span>
                <h3>Корзина пока пуста</h3>
                <p>Добавьте товары из каталога, чтобы увидеть свой заказ.</p>
                <button className="hero-button hero-button-black" onClick={() => { setCartOpen(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>Перейти в каталог</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <div className="cart-item-icon">{item.icon}</div>
                      <div className="cart-item-main">
                        <h3>{item.name}</h3>
                        <p>{money(item.price)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => changeQuantity(item.id, -1)} aria-label="Уменьшить количество">−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)} aria-label="Увеличить количество">+</button>
                          <button className="remove-item" onClick={() => setCart((previous) => previous.filter((product) => product.id !== item.id))}>Удалить</button>
                        </div>
                      </div>
                      <strong>{money(item.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total"><span>Итого</span><strong>{money(cartTotal)}</strong></div>
                  <p>Это демонстрационная корзина. Онлайн-оплата и оформление заказа не подключены.</p>
                  <button className="hero-button hero-button-black checkout-button" onClick={() => window.alert("Корзина подготовлена. Для оформления заказа подключите backend или платёжную систему.")}>Продолжить</button>
                  <button className="clear-cart-button" onClick={() => setCart([])}>Очистить корзину</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;

