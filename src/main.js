import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import VueEasyLightbox from "vue-easy-lightbox";
import breadcrumbs from "vue-3-breadcrumbs";
import Notifications from "@kyvg/vue3-notification";
import SwiperClass /* swiper modules... */ from "swiper";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css";

import App from "./App.vue";
import router from "./router";
SwiperClass.use([
  /* swiper modules... */
]);

export const HTTP = axios.create({
  baseURL: "db.json",
  // headers: {
  //   Authorization: "Bearer {token}",
  // },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(VueEasyLightbox);
app.use(breadcrumbs, {
  includeComponent: true, // {boolean} [includeComponent=false] - Include global breadcrumbs component or not
});
app.use(Notifications);
app.use(VueAwesomeSwiper);

app.mount("#app");

// setTimeout(() => app.mount("#app"), 3000);
