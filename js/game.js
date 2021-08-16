let game = {
  start() {
    alert("Откройте консоль браузера!");
    console.log(
      `Приветствуем Вас в игре "Кто хочет стать миллионером?", ${user.name}!`
    );
    questions.every((element) => {
      console.group("Ответьте на вопрос:");
      console.log(`Вопрос: ${element.question}`);
      console.log(`Выберите правильный вариант ответа:`);
      element.answers.forEach((answer) => {
        console.log(`${answer}`);
      });
      console.groupEnd();
      game.answ = prompt(
        `Введите Ваш вариант ответа,  ${user.name}!
        Если хотите закончить игру - введите "end"`
      ).toLowerCase();
      if (game.answ === "end") {
        return false;
      }
      if (game.answ === element.correctAnswer) {
        alert("Ответ правильный!");
        user.score += 1;
      } else {
        alert("Вы ошиблись!");
      }
      return true;
    });
    let result = game.end();
    if (result === false) return;
    if (result === true) game.init();
  },
  end() {
    console.log(`Игра закончена!
  Ваш счёт: ${user.score}.`);
    game.answ = prompt(
      `Хотите начать новую игру,  ${user.name}!
       Тогда введите "yes"!
       Чтобы закончить игру, введите "end"`
    ).toLowerCase();
    if (game.answ === "yes") return true;
    if (game.answ === "end") return false;
  },
  init() {
    user.score = 0;
    console.clear();
    console.log("Начинаем игру!");
    user.name = prompt("Введите своё имя");
    game.start();
  },
};
