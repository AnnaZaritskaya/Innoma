export function initBurger() {
    const burger = document.querySelector('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    } else {
      console.error('Элемент .burger не найден');
    }
  }