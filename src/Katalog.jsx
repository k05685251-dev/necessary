import React, { useMemo, useState } from "react";
import "./Katalog.css";

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


const categoryImages = {
  "Кассовые системы": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  "Сканеры штрихкодов": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
  "Принтеры": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=900&q=85",
  "Оплата": "https://images.unsplash.com/photo-1556742059-0cfed4f6a45d?auto=format&fit=crop&w=900&q=85",
  "Весы": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
  "Складское оборудование": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85",
  "Компьютерные комплектующие": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=85",
  "Компьютерная периферия": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=85",
  "Сетевое оборудование": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
  "Дополнительное оборудование": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85"
};

const getProductImage = (product) => product.image || categoryImages[product.category] || categoryImages["Дополнительное оборудование"];

const money = (value) => new Intl.NumberFormat("ru-RU").format(value) + " сум";

export default function Katalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все товары");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  const categories = useMemo(
    () => ["Все товары", ...new Set(products.map((product) => product.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === "Все товары" || product.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ru"));
    return result;
  }, [category, search, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product, quantity = 1) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) return previous.map((item) => item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item);
      return [...previous, { ...product, quantity }];
    });
    setNotice(`${product.name} добавлен в корзину`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id, amount) {
    setCart((previous) => previous
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function openProductDetails(product) {
    setSelectedProduct(product);
    setDetailQuantity(1);
  }

  return (
    <div className="shopify-page katalog-page">
      <header className="navbar katalog-navbar">
        <a href="/" className="shopify-logo"><span className="shopify-bag">S</span><span>shopify</span></a>
        <div className="katalog-nav-actions">
          <a href="/" className="outline-pill">На главную</a>
          <button className="catalog-cart-button" onClick={() => setCartOpen(true)}>🛒 Корзина <span>{cartCount}</span></button>
        </div>
      </header>

      <main className="katalog-main">
        <section className="catalog-section" id="catalog">
          <div className="catalog-container">
            <div className="catalog-heading">
              <div>
                <span className="eyebrow">МАГАЗИН ОБОРУДОВАНИЯ</span>
                <h2>Каталог товаров</h2>
                <p>Выбирайте оборудование для кассы, магазина, склада и компьютера.</p>
              </div>
              <button className="catalog-cart-button katalog-cart-mobile" onClick={() => setCartOpen(true)}>🛒 Корзина <span>{cartCount}</span></button>
            </div>

            <div className="catalog-tools">
              <label className="catalog-search">
                <span>⌕</span>
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Поиск: сканер, принтер, SSD..." aria-label="Поиск товаров" />
                {search && <button onClick={() => setSearch("")} aria-label="Очистить поиск">×</button>}
              </label>
              <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Сортировка товаров">
                <option value="default">Сначала рекомендуемые</option>
                <option value="low">Сначала дешевле</option>
                <option value="high">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </div>

            <div className="category-list">
              {categories.map((item) => <button key={item} className={`category-chip ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="catalog-result-count">Найдено товаров: <strong>{filteredProducts.length}</strong></div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id} onClick={() => openProductDetails(product)} onKeyDown={(event) => { if (event.key === "Enter") openProductDetails(product); }} tabIndex={0} role="button" aria-label={`${product.name} — подробности`}>
                    <div className="product-visual">
                      {product.tag && <span className="product-tag">{product.tag}</span>}
                      <img className="product-photo" src={getProductImage(product)} alt={product.name} loading="lazy" />
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3><p>{product.description}</p>
                      <div className="product-bottom">
                        <strong className="product-price">{money(product.price)}</strong>
                        <button className="add-cart-button" onClick={(event) => { event.stopPropagation(); addToCart(product); }}>+ В корзину</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="catalog-empty"><span>🔎</span><h3>Ничего не найдено</h3><p>Попробуйте изменить поисковый запрос или категорию.</p><button className="outline-pill" onClick={() => { setSearch(""); setCategory("Все товары"); }}>Показать все товары</button></div>
            )}
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div className="product-detail-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <section className="product-detail-modal" role="dialog" aria-modal="true" aria-label="Информация о товаре">
            <button className="product-detail-close" onClick={() => setSelectedProduct(null)} aria-label="Закрыть">×</button>
            <div className="product-detail-image-side"><span className="product-detail-category">{selectedProduct.category}</span><div className="product-detail-icon"><img src={getProductImage(selectedProduct)} alt={selectedProduct.name} /></div><p>Изображение товара</p></div>
            <div className="product-detail-info">
              <span className="product-detail-kicker">ИНФОРМАЦИЯ О ТОВАРЕ</span><h2>{selectedProduct.name}</h2>
              <div className="product-detail-rating"><span>★★★★★</span> <small>Оценки пока не добавлены</small></div>
              <p className="product-detail-description">{selectedProduct.description}</p>
              <div className="product-detail-price-box"><span className="product-detail-price">{money(selectedProduct.price)}</span><span className="product-detail-price-note">Цена за 1 шт.</span></div>
              <div className="product-detail-status"><span className="status-dot" /> Доступен для заказа</div>
              <div className="product-detail-benefits">
                <div><span>✓</span><div><strong>Выбор количества</strong><small>Укажите, сколько единиц нужно</small></div></div>
                <div><span>✓</span><div><strong>Удобная корзина</strong><small>Общая сумма обновится автоматически</small></div></div>
                <div><span>i</span><div><strong>Скидка</strong><small>Если действует скидка, её можно указать в данных товара</small></div></div>
              </div>
              <div className="product-detail-buy-row">
                <div className="detail-quantity-control"><button onClick={() => setDetailQuantity((q) => Math.max(1, q - 1))}>−</button><span>{detailQuantity}</span><button onClick={() => setDetailQuantity((q) => q + 1)}>+</button></div>
                <button className="product-detail-add" onClick={() => { addToCart(selectedProduct, detailQuantity); setSelectedProduct(null); }}>🛒 Добавить в корзину</button>
              </div>
              <p className="product-detail-subtotal">Сумма за выбранное количество: <strong>{money(selectedProduct.price * detailQuantity)}</strong></p>
            </div>
          </section>
        </div>
      )}

      {notice && <div className="cart-notice" role="status">{notice}</div>}

      {cartOpen && (
        <div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer" aria-label="Корзина">
            <div className="cart-header"><div><span className="eyebrow">ВАШ ЗАКАЗ</span><h2>Корзина ({cartCount})</h2></div><button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Закрыть корзину">×</button></div>
            {cart.length === 0 ? (
              <div className="cart-empty"><span>🛒</span><h3>Корзина пока пуста</h3><p>Добавьте товары из каталога, чтобы увидеть свой заказ.</p><button className="hero-button hero-button-black" onClick={() => setCartOpen(false)}>Продолжить покупки</button></div>
            ) : (
              <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}><div className="cart-item-icon">{item.icon}</div><div className="cart-item-main"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity-controls"><button onClick={() => changeQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)}>+</button><button className="remove-item" onClick={() => setCart((previous) => previous.filter((product) => product.id !== item.id))}>Удалить</button></div></div><strong>{money(item.price * item.quantity)}</strong></article>)}</div>
                <div className="cart-footer"><div className="cart-total"><span>Итого</span><strong>{money(cartTotal)}</strong></div><p>Это демонстрационная корзина. Онлайн-оплата и оформление заказа не подключены.</p><button className="hero-button hero-button-black checkout-button" onClick={() => window.alert("Корзина подготовлена. Для оформления заказа подключите backend или платёжную систему.")}>Продолжить</button><button className="clear-cart-button" onClick={() => setCart([])}>Очистить корзину</button></div></>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
