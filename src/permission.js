import router from "@/router";
import store from "./store";

const whiteList = ["/login", "/404"];

// router.beforeEach((to, from, next) => {
//   const token = store.state.user.Token;
//   if (token) {
//     if (token.path === "/login") return next("/");
//     next();
//   } else {
//     const isCloudes = whiteList.includes(to.path);
//     next("/login");
//   }
// });
