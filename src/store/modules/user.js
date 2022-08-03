import { VerifyCode, Login, getUserInfo } from "@/api/user";
export default {
  namespaced: true,
  state: {
    // 验证码
    clientToken: "",
    // 随机数
    random: "",
    // 登录用户信息
    UserLoginInfoList: "",
  },
  mutations: {
    setclientToken(state, payload) {
      state.clientToken = payload[0];
      state.random = payload[1];
    },
    // 登录成功返回的数据
    setLoginSin(state, payload) {
      state.Token = payload;
    },
  },
  actions: {
    // 获取验证码
    async getclientToken(context) {
      const random = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      console.log(random, "随机数");
      const clientToken = await VerifyCode(random);
      console.log(clientToken, "验证码");
      context.commit("setclientToken", [clientToken, random]);
    },
    // 用户登录信息
    async Login(context, payload) {
      // 请求的数据
      const res = await Login(payload);
      const UserLoginInfo = res;
      console.log(res, "用户登录数据");
      // 用户基本信息
      const UserBasicInfo = await getUserInfo(UserLoginInfo.data.userId);
      console.log(UserBasicInfo, "用户基本信息");
      context.commit("setLoginSin", UserLoginInfo.data.token);
      // 把token给存入本地
    },
  },
  getters: {},
};
