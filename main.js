import "./src/scss/style.scss";
import { loadRouteModule } from "./src/js/modules/router.js";
import { initSpoilers } from './src/js/modules/spoiler.js';
import { initEmployeesCarousel } from './src/js/modules/employees-carousel';

document.addEventListener("DOMContentLoaded", initRoute);
window.addEventListener("popstate", initRoute);

function initRoute() {
  loadRouteModule()
      .then((module) => {
          if (module && typeof module.init === "function") {
              module.init();
          }
          initSpoilers(); // Инициализация спойлеров после загрузки модуля
          initEmployeesCarousel();
          
      })
      .catch((error) => console.error("Error loading the module", error));
}
