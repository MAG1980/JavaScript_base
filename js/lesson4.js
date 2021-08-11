"use strict";

function startTasks() {
  let tuskNumber = prompt(
    'Введите номер задания.\n Если хотите завершить работу программы, введите "7".'
  );

  switch (tuskNumber) {
    case "1":
      /**
       *
       * @returns array: {[number - преобразуемое числo, fault - принимает значение true если введённое значение не удовлетворяет условиям]
       *
       */
      function input_Number() {
        let number = null;
        let fault = false;
        number = +prompt("Введите число в диапазоне [0, 999]");
        if (number < 0) {
          console.log("Введённое число меньше 0");
          fault = true;
        }
        if (number > 999) {
          console.log("Введённое число больше 999");
          fault = true;
        }
        if (isNaN(number)) {
          console.log("Введённое значение не является числом");
          fault = true;
        }
        return [number, fault];
      }

      function numberToObject() {
        let arrValue = input_Number();
        let number = arrValue[0];
        let error = arrValue[1];
        if (error) return {};
        let units = number - Math.floor(number / 10) * 10;
        console.log(units);
        let tens = (number - units - Math.floor(number / 100) * 100) / 10;
        console.log(tens);
        let hundereds = (number - tens * 10 - units) / 100;
        console.log(hundereds);
        return { units, tens, hundereds };
      }
      console.log(numberToObject());
      startTasks();
      break;

    case "2":
      {
        function Product(name, price) {
          this.name = name;
          this.price = price;
        }
        Product.prototype.make25PercentDiscount = function () {
          let price = this.price;
          this.price = 0.75 * price;
        };
        let product1 = new Product("tv", 1000);
        console.log(product1);
        product1.make25PercentDiscount();
        console.log(product1);
      }
      startTasks();
      break;

    case "3":
      {
        class Product {
          constructor(name, price) {
            this.name = name;
            this.price = price;
          }
          make25PercentDiscount() {
            let price = this.price;
            this.price = 0.75 * price;
          }
        }
        let product1 = new Product("tv", 1000);
        console.log(product1);
        product1.make25PercentDiscount();
        console.log(product1);
      }
      startTasks();
      break;

    case "4":
      {
        function Post(author, text, date) {
          this.author = author;
          this.text = text;
          this.date = date;
        }
        Post.prototype.edit = function (text) {
          this.text = text;
        };

        let post1 = new Post("Lindgren", "Carlson", "1970");
        console.log("Синтаксис ES5");
        console.log(post1);
        post1.edit("boy");
        console.log(post1);

        function AttachedPost(author, text, date) {
          Post.call(this, author, text, date);
          this.highlighted = false;
        }

        AttachedPost.prototype = Object.create(Post.prototype);
        AttachedPost.prototype.constructor = AttachedPost;
        AttachedPost.prototype.makeTextHighlighted = function () {
          this.highlighted = true;
        };

        let attPost1 = new AttachedPost("Pushkin", "Onegin", "1820");
        console.log(attPost1);
        debugger;
        attPost1.edit("Tatjana");
        console.log(attPost1);
        debugger;
        attPost1.makeTextHighlighted();
        console.log(attPost1);
      }

      startTasks();
      break;

    case "5":
      {
        class Post {
          constructor(author, text, date) {
            this.author = author;
            this.text = text;
            this.date = date;
          }
          edit(text) {
            this.text = text;
          }
        }

        let post1 = new Post("Lindgren", "Carlson", "1970");
        console.log("Синтаксис ES6");
        console.log(post1);
        post1.edit("boy");
        console.log(post1);

        class AttachedPost extends Post {
          constructor(author, text, date) {
            super(author, text, date);
            this.highlighted = false;
          }
          makeTextHighlighted() {
            this.highlighted = true;
          }
        }

        let attPost1 = new AttachedPost("Pushkin", "Onegin", "1820");
        console.log(attPost1);
        debugger;
        attPost1.edit("Tatjana");
        console.log(attPost1);
        debugger;
        attPost1.makeTextHighlighted();
        console.log(attPost1);
      }
      startTasks();
      break;

    case "6":
      startTasks();
      break;

    case "7":
      break;
  }
}

startTasks();
