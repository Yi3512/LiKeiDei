import router from "@/router";
import store from "./store";

const whiteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  const token = store.state.user.UserLoginInfoList.token;
  console.log(token);
  if (token) {
    // store.dispatch("user/getUserInfo");
    if (token.path === "/login") return next("/");
    next();
  } else {
    const isCloudes = whiteList.includes(to.path);
    if (isCloudes) return next();
    next("/login");
  }
});
