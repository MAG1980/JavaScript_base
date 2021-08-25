window.onload = function () {
  //details - внешняя обёртка корзины
  let headerCart = document.querySelector(".header__cart");

  //Контейнер карточек товаров в корзине
  let headerCards = document.getElementById("header__cards");

  //Коллекция товаров в корзине
  let cartItems = headerCards.querySelectorAll(".header__card");

  //Элемент, отображающий количество товаров в корзине
  let spanCartCounter = document.getElementById("header__cart-counter");

  //Счётчик товаров в корзине
  let cartItemCounter = null;
  spanCartCounter.textContent = cartItemCounter;

  //Коллекция карточек товаров
  let productsItems = document.querySelectorAll(".products__item");

  //Добавление обработчика события click кнопке "Add to cart" каждого товара
  productsItems.forEach((item) => {
    item.addEventListener("click", addToCart);
  });

  //TOTAL price (HTML-element)
  let totalPriceElem = document.getElementById("header__cart-total-price");

  //TOTAL price (Number)
  let totalPrice = null;

  /**
   * Добавляет товар в корзину при возникновении события
   * @param {*} event
   * @returns
   */
  function addToCart(event) {
    console.log(this);
    console.log(event.target);
    event.preventDefault();
    cartItemCounterIncrement();
    CartItemCounterRenderer();
    console.log(this.querySelector(".products__image").getAttribute("src"));
    console.log(this.querySelector(".products__name").textContent);
    let product = {
      imgSrc: this.querySelector(".products__image").getAttribute("src"),
      cardTitle: this.querySelector(".products__name").textContent,
      price: this.querySelector(".products__price").textContent.slice(1),
    };

    //Шаблонный литерал товара в корзине
    let newItemInCart = markUpGenerator(product);

    //Отрисовка нового товара в корзине
    addItemToHTMLRenderer(headerCards, newItemInCart);

    //Добавление прослушивания события нажатия на кнопку "Close"
    addListenerToClose(headerCards);

    totalPriceRenderer();
  }
  /**
   * Отрисовывает текущее значение итоговой стоимости товаров в корзине
   */
  function totalPriceRenderer() {
    totalPriceElem.textContent = `$${totalPriceCalc()}`;
  }

  /**
   * Возвращает итоговую стоимость товаров в корзине
   */
  function totalPriceCalc() {
    return arrPricesToNumber(arrCartPrices());
  }

  /**
   * Возвращает массив цен товаров в корзине
   */
  function arrCartPrices() {
    //Массив цен товаров в корзине
    let arrPrices = Array.from(cartItems).map(function (cartItem) {
      //Текст строки с ценой товара
      let stringPrice =
        cartItem.querySelector(".header__card_text").textContent;
      //Номер позиции символа $ в строке с ценой товара
      let numberPos$ = stringPrice.indexOf("$");
      //Часть строки с ценой, начиная с $, преобразованная в число
      return Number(stringPrice.slice(numberPos$ + 1));
    });
    return arrPrices;
  }
  /**
   * Возвращает сумму цен всех товаров в корзине
   */
  function arrPricesToNumber(arrPrices) {
    if (!arrPrices.length) {
      return 0;
    }
    //Сумма всех элеметов массива
    return (totalPrice = arrPrices.reduce(function (sum, price) {
      return (sum += price);
    }));
  }

  /**
   * Добавляет последнему дочернему элементу вызов функции удаления товара из корзины при клике по кнопке"Close"
   * @param {*} parent  Родительский элемент, в котором будет производиться поиск кнопки "Close"
   */
  function addListenerToClose(parent) {
    parent.lastElementChild
      .querySelector(".header__card_close")
      .addEventListener("click", removeFromCart);
  }

  /*   //Добавление обработчика события click кнопке "x" каждого товара в корзине
  cartItems.forEach((item) => {
    item
      .querySelector(".header__card_close")
      .addEventListener("click", removeFromCart);
  }); */

  /**
   * Удаляет товар из корзины при возникновении события
   */
  function removeFromCart() {
    this.parentElement.remove(this);
    cartItemCounterDecrement();
    CartItemCounterRenderer();
    cartContentUpdater();
    totalPriceRenderer();
  }

  function cartContentUpdater() {
    cartItems = headerCards.querySelectorAll(".header__card");
  }

  /**
   * Увеличивает счётчик товаров в корзине на 1
   */
  function cartItemCounterIncrement() {
    cartItemCounter += 1;
  }

  /**
   * Уменьшает счётчик товаров в корзине на 1
   */
  function cartItemCounterDecrement() {
    cartItemCounter -= 1;
  }
  /**
   * Обновляет отображение счётчика товаров в корзине
   */
  function CartItemCounterRenderer() {
    spanCartCounter.textContent = cartItemCounter;
    if (
      cartItemCounter >= 0 &&
      spanCartCounter.classList.contains("visually-hidden")
    ) {
      spanCartCounter.classList.remove("visually-hidden");
    }
    if (
      cartItemCounter === 0 &&
      !spanCartCounter.classList.contains("visually-hidden")
    ) {
      spanCartCounter.classList.add("visually-hidden");
    }
  }

  /**
   * Возвращает разметку товара для размещения в корзине
   * @param {*} productInfoObj
   * @returns  HTML
   */
  function markUpGenerator(product) {
    return `<div class="header__card">
              <a class="header__card_link">
                  <img src=${product.imgSrc} alt="товар" class="header__card_img">
                  <div class="header__card_info">
                      <h3 class="header__card_title">${product.cardTitle}</h3>
                      <p class="header__card_icons"><i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star" aria-hidden="true"></i>
                          <i class="fa fa-star-half-o" aria-hidden="true"></i>
                      </p>
                      <p class="header__card_text">1 x $${product.price}</p>
                  </div>
              </a>
              <button class="header__card_close" type="button"><i class="fa fa-times-circle"
                      aria-hidden="true"></i></button>
              </div>`;
  }
  /**
   *Добавляет блок разметки НTML (markUp) перед закрывающим тегом элемента (element).
   * @param {*} element - элемент HTML, в который будет добавляться блок разметки
   * @param {*} markUp - блок HTML-разметки, который будет добавлен на страницу
   */
  function addItemToHTMLRenderer(element, markUp) {
    element.insertAdjacentHTML("beforeend", markUp);
    cartItems = headerCards.querySelectorAll(".header__card");
  }
};
