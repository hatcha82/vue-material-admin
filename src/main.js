import Vue from "vue"
import "./plugins"
import App from "./App.vue"
import i18n from "@/i18n"
import router from "./router/"
import store from "./store"
import "./registerServiceWorker"
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "font-awesome/css/font-awesome.css"
import "@fortawesome/fontawesome-free/css/all.css"
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app")
