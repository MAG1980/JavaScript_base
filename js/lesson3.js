"use strict";

function startTasks() {
  let tuskNumber = prompt(
    'Введите номер задания.\n Если хотите завершить работу программы, введите "7".'
  );

  switch (tuskNumber) {
    case "1":
      for (let i = 0; i <= 10; i++) {
        if (i === 0) {
          console.log(`${i} - это ноль`);
        } else if (i % 2) {
          console.log(`${i} - это нечётное число`);
        } else {
          console.log(`${i} - это чётное число`);
        }
      }
      startTasks();
      break;

    case "2":
      const post = {
        author: "John", //вывести этот текст
        postId: 23,
        comments: [
          {
            userId: 10,
            userName: "Alex",
            text: "lorem ipsum",
            rating: {
              likes: 10,
              dislikes: 2, //вывести это число
            },
          },
          {
            userId: 5, //вывести это число
            userName: "Jane",
            text: "lorem ipsum 2", //вывести этот текст
            rating: {
              likes: 3,
              dislikes: 1,
            },
          },
        ],
      };

      console.log(post.author);
      console.log(post.comments[0].rating.dislikes);
      console.log(post.comments[1].userId);
      console.log(post.comments[1].text);
      startTasks();
      break;

    case "3":
      {
        const products = [
          {
            id: 3,
            price: 200,
          },
          {
            id: 4,
            price: 900,
          },
          {
            id: 1,
            price: 1000,
          },
        ];

        products.forEach(function discountPrice(item) {
          item.discountPrice = 0.85 * item.price;
          console.log(item);
          console.log(`Цена товара: ${item.price}`);
          console.log(`Цена товара со скидкой: ${item.discountPrice}`);
        });
      }
      startTasks();
      break;

    case "4":
      {
        const products = [
          {
            id: 3,
            price: 127,
            photos: ["1.jpg", "2.jpg"],
          },
          {
            id: 5,
            price: 499,
            photos: [],
          },
          {
            id: 10,
            price: 26,
            photos: ["3.jpg"],
          },
          {
            id: 8,
            price: 78,
          },
        ];

        let productsFiltered1 = products.filter((obj) => {
          if (obj.photos !== undefined && obj.photos.length !== 0) return true;
        });
        console.group("Пункт 1");
        console.log(productsFiltered1);
        console.groupEnd();

        let productsFiltered2 = products.sort((objA, objB) => {
          return objA.price - objB.price;
        });
        console.group("Пункт 2");
        console.log(productsFiltered2);
        console.groupEnd();
      }
      startTasks();
      break;

    case "5":
      alert("Для просмотра результата откройте консоль.");
      for (let i = 0; i <= 9; console.log(i++));
      startTasks();
      break;

    case "6":
      let row = "";
      for (let i = 1; i <= 20; i++) {
        row += "x";
        console.log(row);
      }
      startTasks();
      break;

    case "7":
      break;
  }
}

startTasks();
