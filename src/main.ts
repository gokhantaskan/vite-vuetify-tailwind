import "./assets/styles/tailwind.scss";
import "./assets/styles/onboard.scss";
import "./assets/styles/main.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

const app = createApp(App);

app.use(vuetify).use(createPinia()).use(router);

app.mount("#app");
