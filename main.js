import "./src/scss/style.scss";
import { loadRouteModule } from "./src/js/modules/router.js";
import { initSpoilers } from './src/js/modules/spoiler.js';
import { initCarousel } from './src/js/modules/carousel.js';
import { initBurger } from './src/js/modules/burger.js';
import { PhoneInput, initPhoneInputs } from './src/js/modules/contact-form.js';

// Делаем функции глобальными при необходимости
window.PhoneInput = PhoneInput;
window.initPhoneInputs = initPhoneInputs;

// Обработчик формы
window.submitForm = function(event) {
  event.preventDefault();
  const phoneInput = document.querySelector('.contact-form__input--phone');
  const phoneValue = phoneInput ? phoneInput.value : '';

  console.log('Форма отправлена:', {
    name: document.getElementById('name')?.value,
    email: document.getElementById('email')?.value,
    phone: phoneValue
  });
};

document.addEventListener("DOMContentLoaded", initRoute);
window.addEventListener("popstate", initRoute);

async function initRoute() {
  try {
    const module = await loadRouteModule();
    if (module?.init && typeof module.init === "function") {
      module.init();
    }
  } catch (error) {
    console.error("Error loading the module", error);
  } finally {
    initSpoilers();
    initCarousel();
    initPhoneInputs();
    initBurger();
  }
}