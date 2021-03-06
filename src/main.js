import Vue from "vue";
import axios from "axios";
import "./cube-ui";
import App from "./App.vue";
import "./assets/font/iconfont.css";
import router from "./router";
import store from "./store";
import FastClick from "fastclick";
import VueLazyload from "vue-lazyload";


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

FastClick.attach(document.body);

Vue.use(VueLazyload);

Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = binding.value;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");