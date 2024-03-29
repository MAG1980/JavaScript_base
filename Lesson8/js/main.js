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
    console.log(event.target);
    if (event.target.closest(".products__add_link") == null) {
      return;
    }

    event.preventDefault();

    let product = {
      imgSrc: this.querySelector(".products__image").getAttribute("src"),
      cardTitle: this.querySelector(".products__name").textContent,
      price: this.querySelector(".products__price").textContent.slice(1),
      rating: this.querySelector(".products__item-stars").innerHTML,
      isPresentedInCart() {
        if (this.count() > 1) {
          return true;
        }
        return false;
      },
      /**
       * Возвращает количество единиц одного товара в корзине,
       * Формирование InCartLink (ссылки текущий товар в корзине в DOM)
       * @returns Number
       */
      count() {
        let counter = 1;
        if (cartItems.length === 0) {
          return counter;
        }
        for (let i = 0; i < cartItems.length; i++) {
          if (
            cartItems[i]
              .querySelector(".header__card_img")
              .getAttribute("src") === this.imgSrc &&
            cartItems[i].querySelector(".header__card_title").textContent ===
              this.cardTitle
          ) {
            counter =
              Number(
                cartItems[i].querySelector(".header__card_text-span")
                  .textContent
              ) + 1;
            this.InCartLink = cartItems[i];
          }
        }
        return counter;
      },
      //Ссылка на текущий товар в корзине в DOM
      InCartLink: null,
    };

    //Шаблонный литерал товара в корзине
    let newItemInCart = markUpGenerator(product);

    //Отрисовка нового товара в корзине
    addItemToHTMLRenderer(headerCards, product, newItemInCart);

    //Добавление прослушивания события нажатия на кнопку "Close"
    addListenerToClose(headerCards);
    CartItemCounterRenderer();
    totalPriceRenderer();
  }

  /**
   * Возвращает true, если такой товар уже есть в корзине
   * @param {*} product Объект товара, добавляемого в корзину
   * @returns Boolean
   */
  function isProductInCart(product) {
    let result = false;
    if (cartItems.length === 0) {
      return result;
    }
    for (let i = 0; i < cartItems.length; i++) {
      console.log(cartItems[i].querySelector(".header__card_img"));
      if (
        cartItems[i].querySelector(".header__card_img").getAttribute("src") ===
          product.imgSrc &&
        cartItems[i].querySelector(".header__card_title").textContent ===
          product.cardTitle
      ) {
        result = true;
        break;
      }
    }
    return result;
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
   * Возвращает массив суммарной стоимости каждой позиции товара в корзине
   * (с учётом количества единиц каждого товара)
   */
  function arrCartPrices() {
    //Массив цен товаров в корзине
    let arrPrices = Array.from(cartItems).map(function (cartItem) {
      //Количество единиц товара в корзине
      let itemQuantity = Number(
        cartItem.querySelector(".header__card_text-span").textContent
      );
      //Текст строки с ценой товара
      let stringPrice =
        cartItem.querySelector(".header__card_text").textContent;
      //Номер позиции символа $ в строке с ценой товара
      let numberPos$ = stringPrice.indexOf("$");
      //Часть строки с ценой, начиная с $, преобразованная в число
      return itemQuantity * Number(stringPrice.slice(numberPos$ + 1));
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

  function removeFromCart() {
    this.parentElement.remove(this);
    CartItemCounterRenderer();
    cartContentUpdater();
    totalPriceRenderer();
  }

  function cartContentUpdater() {
    cartItems = headerCards.querySelectorAll(".header__card");
  }

  /**
   * Обновляет отображение счётчика товаров в корзине
   */
  function CartItemCounterRenderer() {
    let cartItemsCounter = 0;
    // headerCards = document.getElementById("header__cards");
    // if (typeof headerCards == "undefined") {
    //   cartItemsCounter = 0;
    // }
    let arrItemsCount = Array.from(
      document.querySelectorAll(".header__card_text-span")
    ).map((elem) => Number(elem.textContent));
    if (arrItemsCount.length !== 0) {
      //Суммарное количество товаров в корзине
      cartItemsCounter = arrItemsCount.reduce((sum, current) => sum + current);
    }

    //Отрисовка количества товаров в корзине на странице
    spanCartCounter.textContent = cartItemsCounter;
    if (
      cartItemsCounter >= 0 &&
      spanCartCounter.classList.contains("visually-hidden")
    ) {
      spanCartCounter.classList.remove("visually-hidden");
      headerCart.setAttribute("open", "");
    }
    if (
      cartItemsCounter === 0 &&
      !spanCartCounter.classList.contains("visually-hidden")
    ) {
      spanCartCounter.classList.add("visually-hidden");
      headerCart.removeAttribute("open");
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
                  <img src=${
                    product.imgSrc
                  } alt="товар" class="header__card_img">
                  <div class="header__card_info">
                      <h3 class="header__card_title">${product.cardTitle}</h3>
                      <p class="header__card_icons">
                          ${product.rating}
                      </p>
                      <p class="header__card_text"><span class="header__card_text-span">${product.count()}</span> x $${
      product.price
    }</p>
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
  function addItemToHTMLRenderer(parent, product, markUp) {
    if (product.isPresentedInCart()) {
      itemInCartCount(product);
    } else {
      parent.insertAdjacentHTML("beforeend", markUp);
      cartItems = headerCards.querySelectorAll(".header__card");
    }
  }

  function itemInCartCount(product) {
    product.InCartLink.querySelector(".header__card_text-span").textContent =
      product.count();
  }
};
