import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Util from "@/util";

Vue.use(Router);

const router = new Router({
  base: "/",
  mode: "history",
  linkActiveClass: "active",
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  var userId = Util.getCookie("_S_USER_ID");
  if (to.matched.some(record => record.meta.requiresAuth) && userId === null) {
    next({ path: "/login" });
  } else {
    next();
  }
});
// eslint-disable-next-line
router.afterEach((to, from) => {
  NProgress.done();
})
export default router;
