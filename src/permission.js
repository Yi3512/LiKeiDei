import router from "@/router";
import store from "./store";

const whiteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  const token = store.state.user.UserLoginInfoList.token;
  // console.log(token);
  if (token) {
    if (!store.state.user.UserInfo.userId) {
      store.dispatch(
        "user/getUserInfo",
        store.state.user.UserLoginInfoList.userId
      );
    }
    // 是 跳到首页
    if (to.path === "/login") return next("/");
    // 不是 直接进入
    next();
  } else {
    // 访问的是否在白名单(未登录也能访问的页面)
    const isCloudes = whiteList.includes(to.path);
    // 在白名单 放行
    if (isCloudes) return next();
    // 不在白名单(不登录不能访问) 跳到登录页
    next("/login");
  }
});
