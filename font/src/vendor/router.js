import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Book = () => import("@/views/Book/Index");
const User = {
  Login: () => import("@/views/User/Login"),
  Space: () => import("@/views/User/Space")
};
const _Error = () => import("@/views/Error");
const Test = () => import("@/views/Test");

const router = new Router({
  routes: [
    {
      path: "/book/:platform/:user/:depository",
      name: "book",
      component: Book
    },
    {
      path: "/user/login",
      name: "login",
      component: User.Login
    },
    {
      path: "/user/space",
      name: "space",
      component: User.Space
    },
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "*",
      name: "error",
      component: _Error
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
