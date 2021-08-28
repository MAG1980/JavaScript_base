"use strict";
let goldenClass = "products__item-stars_golden";
let products = document.querySelectorAll(".products__item-stars");
products.forEach(fillElement);

function fillElement(element) {
  element.addEventListener("mouseover", function (event) {
    let i = event.target.closest("i");
    if (i == null) return;
    if (!i.classList.contains("goldenClass")) {
      i.classList.add(goldenClass);
      let prevSibling = i.previousElementSibling;
      while (prevSibling !== null) {
        prevSibling.classList.add(goldenClass);
        prevSibling = prevSibling.previousElementSibling;
      }
    }
  });
}
products.forEach(unfillElement);

function unfillElement(element) {
  element.addEventListener("mouseout", function (event) {
    let nextSibling = event.target.nextElementSibling;
    while (
      // nextSibling !== null &&
      nextSibling.classList.contains(goldenClass)
    ) {
      nextSibling.classList.remove(goldenClass);

      nextSibling = nextSibling.nextElementSibling;
    }
  });
}
