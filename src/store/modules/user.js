import { VerifyCode, Login } from "@/api/user";
export default {
  namespaced: true,
  state: {
    // 验证码
    clientToken: "",
    // 随机数
    random: "",
    LoginList: "",
    //
    Token: "",
  },
  mutations: {
    setclientToken(state, payload) {
      state.clientToken = payload[0];
      state.random = payload[1];
    },
    // 登录成功返回的数据
    setLoginSin(state, payload) {
      localStorage.setItem("token", payload);
    },
  },
  actions: {
    // 获取验证码
    async getclientToken(context) {
      const random = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      console.log(random, "随机数");
      const res = await VerifyCode(random);
      console.log(res, "验证码");
      context.commit("setclientToken", [res.request.responseURL, random]);
    },
    // 登录
    async Login(context, payload) {
      // 请求的数据
      console.log(payload);
      const { data } = await Login(payload);
      console.log(data, "请求登录数据");
      // 把token给存入本地
      context.commit("setLoginSin", data.token);
    },
  },
  getters: {},
};
