import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    userToken: ""
  },
  getters: {},
  mutations: {
    newToken(state, token) {
      state.userToken = token;
      localStorage.setItem("token", token);
    }
  },
  actions: {}
});
