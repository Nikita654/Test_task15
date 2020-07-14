// JS
import "./js/";
// VUEX
import { store } from "./store";
//Vue Router
import VueRouter from "vue-router";
// Axios на всякий
import axios from "axios";
import VueAxios from "vue-axios";
// SCSS
import "./assets/scss/main.scss";
window.Vue = require("vue");
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
// Vue components (for use in html)
import formLogin from "./components/formLogin.vue";
import userCompany from "./components/userCompany.vue";
// Vue init
const routes = [
  { path: "/", component: formLogin },
  { path: "/carrier/user/company", component: userCompany }
  //{ path: "/", component: userCompany }
];
const router = new VueRouter({
  routes
});

const app = new Vue({
  el: "#app",
  router,
  store
});
