import loginPage from "../pages/login";
import HomePage from "../pages/home-page";
import PageNotFound from "../pages/not-found";

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  isAuthenticated = !!currentUser;

  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

export const routes = [
  {
    path: "/",
    component: HomePage,
    meta: { title: "Trang Chủ" },
    beforeEnter: guardMyroute,
  },
  {
    path: "/home-page",
    component: HomePage,
    meta: { title: "Trang Chủ" },
    beforeEnter: guardMyroute,
  },
  {
    path: "/login",
    component: loginPage,
    meta: { title: "Login Page" },
  },

  {
    path: "*",
    component: PageNotFound,
    meta: { title: "Không Tìm Thấy Trang" },
  },
];
