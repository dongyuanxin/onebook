import Vue from "vue";
import Router from "vue-router";
import { helpMdRoute } from "@/vendor/setting";

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
      path: "/",
      name: "home",
      redirect: helpMdRoute
    },
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

router.beforeEach((to, from, next) => {
  if (to.name === "book" || to.path.startsWith("/book")) {
    if (
      to.query.hasOwnProperty("psgId") &&
      to.params.hasOwnProperty("platform") &&
      to.params.hasOwnProperty("user") &&
      to.params.hasOwnProperty("depository")
    ) {
      next();
    } else {
      next(helpMdRoute);
    }
  } else {
    next();
  }
});

export default router;
