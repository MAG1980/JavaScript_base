"use strict";

function startTasks() {
  let tuskNumber = prompt(
    'Введите номер задания.\n Если хотите завершить работу программы, введите "End".'
  );
  let a = 1,
    b = 1,
    c,
    d;

  function sum(a, b) {
    return a + b;
  }

  function sub(a, b) {
    return a - b;
  }

  function mul(a, b) {
    return a * b;
  }

  function div(a, b) {
    return a / b;
  }

  switch (tuskNumber) {
    case "1":
      alert(`Условие: \n a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
      c = ++a;
      alert(`Пример 1 \n c = ++a = ${c},\n т.к. у префиксного инкремента приоритет выше, \n
      чем у оператора присваивания, то сначала значение, хранимое в переменной а увеличится на 1,\n
       а затем результат будет присвоен переменной с.`);

      d = b++;
      alert(`Пример 2 \n d = b++ = ${d},\n т.к. ассоциативность постфиксного инкремента не определёна,
сначала сработает оператор присваивания, и переменной d будет присвоено значение 1,
 которое имеет переменная b по условию, только после этого значение в переменной
 b увеличится на 1 оператором постфиксного инкремента.`);

      c = 2 + ++a;
      alert(`Пример 3 \n c = 2 + ++a = ${c},\n
 т.к. сначала выполнится префиксный инкремент и значение, хранимое в переменной а,
 увеличится с 2 до 3, а затем выполнится сложение с числом 2, стоящим слева.`);

      d = 2 + b++;
      alert(`Пример 4 \n d = 2 + b++ = ${d} \n
т.к. сначала сработает бинарный плюс, то к 2 прибавится значение, хранимое в переменной
b = ${b}, результат сложения будет присвоен переменной d, после этого значение, хранимое
в переменной b будет увеличено постфиксным инкрементом на 1: ${b}`);

      alert(`a = ${a}`);
      alert(`b = ${b}`);
      startTasks();
      break;

    case "2":
      a = 2;
      alert(`Условие: \n a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
      let x = 1 + (a *= 2);
      alert(`x = 1 \+ \(a \*= 2\) = ${x} \n Оператор группировки имеет наивысший приоритет, \n
      поэтому сначала выполнится действие в скобках: \n а = а * 2 = 4. \n Затем произойдёт сложение 1 и 4. \n
      Результат сложения присвоится переменной х = ${x}.`);
      startTasks();
      break;

    case "3":
      let result = null;
      a = +prompt("Введите значение a", 10);
      b = +prompt("Введите значение b", -10);
      if (a >= 0 && b >= 0) result = a - b;
      if (a < 0 && b < 0) result = a * b;
      if ((a >= 0 && b < 0) || (a < 0 && b >= 0)) result = a + b;
      alert("Результат вычислений: " + result);
      startTasks();
      break;

    case "4":
      /*Функции объявлены в глобальной области видимости*/
      alert(
        `Простые аримфметические функции: \n  \n ${sum} \n ${sub} \n ${mul} \n ${div}`
      );
      startTasks();
      break;

    case "5":
      let operand1 = +prompt("Введите первое значение");
      let operand2 = +prompt("Введите второе значение");
      let operation = prompt(`Выберите первый символ названия
       математической операции: \n
        с - сложение
        в - вычитание
        у - умножение
        д - деление`);
      let upshot = null;

      function mathOperation(arg1, arg2, operation) {
        switch (operation) {
          case "с":
            return sum(arg1, arg2);

          case "в":
            return sub(arg1, arg2);

          case "у":
            return mul(arg1, arg2);

          case "д":
            return div(arg1, arg2);

          default:
            break;
        }
      }

      upshot = mathOperation(operand1, operand2, operation);
      if (isNaN(upshot)) {
        alert("Вы ввели некорректное значение");
      } else {
        alert(`Результат вычислений = ${upshot}`);
      }

      startTasks();
      break;

    case "6":
      let str = "";
      let value = undefined;

      function askValue() {
        let str = prompt(`
                            Введите количество денег,
                  которое Вы хотите положить на счёт в банке`);
        if (isNaN(str)) {
          alert("Вы ввели некорректное значение суммы");
        } else {
          return str;
        }
      }

      while (value === undefined) value = askValue();
      let lastChar = value.charAt(value.length - 1);
      let word = "";

      switch (lastChar) {
        case "0":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          word = "рублей";
          break;
        case "2":
        case "3":
        case "4":
          word = "рубля";
          break;
        case "1":
          word = "рубль";
          break;
      }

      alert(`Ваша сумма в ${value} ${word} успешно зачислена`);

      /* 0,5,6,7,8,9 рублей
      1 рубль
      2,3,4, рубля
      */
      startTasks();
      break;

    case "End":
      alert("Работа программы завершена \n по вашему требованию.");
      break;

    default:
      alert("Вы ввели неподходящее значение!");
      startTasks();
  }
  return;
}

startTasks();
