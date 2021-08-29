"use strict";
let goldenClass = "products__item-stars_golden";
let products = document.querySelector(".products__content");

products.addEventListener("mouseover", fillElem);
products.addEventListener("mouseout", unFillElem);
products.addEventListener("click", setRating);

function fillElem(event) {
  let star = event.target.closest(".fas");
  if (star == null) {
    return;
  }
  while (star != null) {
    star.classList.add(goldenClass);
    star = star.previousElementSibling;
  }
}

function unFillElem(event) {
  let star = event.target.closest(".fas");
  if (star == null) {
    return;
  }
  while (star.nextElementSibling != null) {
    star.classList.remove(goldenClass);
    star.nextElementSibling.classList.remove(goldenClass);
    star = star.nextElementSibling;
  }
}

function setRating(event) {
  event.stopPropagation();
  products.removeEventListener("mouseout", unFillElem);
  setTimeout(function () {
    products.addEventListener("mouseover", fillElem);
    products.addEventListener("mouseout", unFillElem);
  }, 1000);
}
