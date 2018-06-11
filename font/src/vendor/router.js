import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Error = () => import("@/views/Error");
const Test = () => import("@/views/Test");

const router = new Router({
  routes: [
    {
      path: "*",
      name: "error",
      component: Error
    },
    {
      path: "/test",
      name: "test",
      component: Test
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
