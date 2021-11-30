import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import HandleCodeIG from "./pages/HandleCodeIG";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/handle-code",
    name: "handle-code",
    component: HandleCodeIG,
    meta: {
      title: "Handle Code",
    },
  },
];

export default routes;
