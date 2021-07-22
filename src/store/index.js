import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth/auth";
import homePage from "./modules/homePage/homePage";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    homePage
  }
});
