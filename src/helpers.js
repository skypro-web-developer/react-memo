// Модуль для изменения окончания слов

// Задаем формы для слов "попытка" и "пользователь"
export const attemptForms = ["попытка", "попытки", "попыток"];

export const wordEndingChanger = (function () {
  // Вспомогательная функция для определения окончания в зависимости от числа
  function getEnding(number, endings) {
    // Приводим число к положительному значению
    number = Math.abs(number);

    // Исключаем числа от 11 до 19, так как для них окончание всегда будет "-ок"/
    number %= 100;
    if (number >= 11 && number <= 19) {
      return endings[2];
    }

    // Определяем последнюю цифру числа
    const lastDigit = number % 10;

    // В зависимости от последней цифры определяем окончание
    switch (lastDigit) {
      case 1:
        return endings[0];
      case 2:
      case 3:
      case 4:
        return endings[1];
      default:
        return endings[2];
    }
  }

  // Основная функция для изменения окончания слова
  function changeEnding(number, wordForms) {
    // Получаем окончание с использованием вспомогательной функции
    const ending = getEnding(number, wordForms);
    // Формируем строку с окончанием и пробелом перед словом
    return " " + ending;
  }

  // Экспортируемая часть модуля
  return {
    changeEnding: changeEnding,
  };
})();
