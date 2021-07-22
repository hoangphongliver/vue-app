import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import i18n from "./plugins/i18n";
import axios from "axios";
import axiosRetry from "axios-retry";
import { routes } from "./routes/routes";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const router = new VueRouter({
  mode: "history",
  routes,
});

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount) => {
    return retryCount * 500;
  },
  retryCondition: (error) => {
    if (error && error.response) {
      return (
        error.status === 503 ||
        error.status === 500 ||
        error.status === 400 ||
        error.status === 404 ||
        error.status === 401
      );
    }
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#vue-app");
