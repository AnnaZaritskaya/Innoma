export function initBurger() {
  const burger = document.querySelector('.burger');
  const body = document.querySelector('body'); // Предполагаю, что это элемент с классом 'head'

  if (burger && body) { // Проверяем, что оба элемента существуют
      burger.addEventListener('click', function () {
          this.classList.toggle('active'); // Переключаем состояние 'active' у бургера
          body.classList.toggle('active'); // Переключаем состояние 'active' у head
      });
  } else {
      if (!burger) console.error('Элемент .burger не найден');
      if (!body) console.error('Элемент body не найден');
  }
}