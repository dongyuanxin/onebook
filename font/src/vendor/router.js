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

const isEmptyStr = str => {
  return str === null || str === "null" || str === undefined || str === ""; // vue-router 会强制转化 null => "null"
};

router.beforeEach((to, from, next) => {
  if (to.name === "book" || to.path.startsWith("/book")) {
    let queryRight = !isEmptyStr(to.query.psgId),
      paramsRight =
        !isEmptyStr(to.params.platform) &&
        !isEmptyStr(to.params.user) &&
        !isEmptyStr(to.params.depository);
    if (queryRight && paramsRight) {
      return next();
    } else if (!queryRight && paramsRight) {
      let path = window.localStorage.getItem("bookPath"),
        psgId = window.localStorage.getItem("bookPsgId");
      if (
        isEmptyStr(path) === false &&
        isEmptyStr(psgId) === false &&
        to.path === path
      ) {
        return next({
          name: "book",
          params: to.params,
          query: {
            psgId
          }
        });
      } else {
        return next(helpMdRoute);
      }
    } else {
      return next(helpMdRoute);
    }
  }
  return next();
});

export default router;
