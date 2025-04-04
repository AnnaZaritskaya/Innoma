import "./src/scss/style.scss";
import { loadRouteModule } from "./src/js/modules/router.js";
import { initSpoilers } from './src/js/modules/spoiler.js';
import { initCarousel } from './src/js/modules/carousel.js';

document.addEventListener("DOMContentLoaded", initRoute);
window.addEventListener("popstate", initRoute);

function initRoute() {
  loadRouteModule()
      .then((module) => {
          if (module && typeof module.init === "function") {
              module.init();
          }
          initSpoilers(); // Инициализация спойлеров после загрузки модуля
          initCarousel();
          
      })
      .catch((error) => console.error("Error loading the module", error));
}
