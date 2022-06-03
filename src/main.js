import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import VueEasyLightbox from "vue-easy-lightbox";
import breadcrumbs from "vue-3-breadcrumbs";

import App from "./App.vue";
import router from "./router";

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

app.mount("#app");
