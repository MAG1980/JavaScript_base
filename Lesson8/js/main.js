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
  let cartItemCounter = 3;
  spanCartCounter.textContent = cartItemCounter;

  //Коллекция карточек товаров
  let productsItems = document.querySelectorAll(".products__item");

  //Добавление обработчика события click кнопке "Add to cart" каждого товара
  productsItems.forEach((item) => {
    item.addEventListener("click", addToCart);
  });

  //TOTAL price (HTML)
  let totalPrice = document.getElementById("header__cart-total-price");

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
    updateCartItemCounter();
    console.log(this.querySelector(".products__image").getAttribute("src"));
    console.log(this.querySelector(".products__name").textContent);
    let product = {
      imgSrc: this.querySelector(".products__image").getAttribute("src"),
      cardTitle: this.querySelector(".products__name").textContent,
      price: this.querySelector(".products__price").textContent.slice(1),
    };

    //Шаблонный литерал товара в корзине
    let newItemInCart = markUpGenerator(product);

    addItemToHTML(headerCards, newItemInCart);

    addListenerToClose(headerCards);
  }
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
    updateCartItemCounter();
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
  function updateCartItemCounter() {
    spanCartCounter.textContent = cartItemCounter;
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
  function addItemToHTML(element, markUp) {
    element.insertAdjacentHTML("beforeend", markUp);
    cartItems = headerCards.querySelectorAll(".header__card");
  }

  addItemToHTML(
    headerCards,
    markUpGenerator({ imgSrc: "img/products/product_13.jpg" })
  );
};
