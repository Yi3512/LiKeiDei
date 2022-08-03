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
    token: '',
    // 基本用户信息
    UserInfo: "",
  },
  mutations: {
    setclientToken(state, payload) {
      state.clientToken = payload[0];
      state.random = payload[1];
    },
    // 登录成功返回的数据
    setLoginSin(state, payload) {
      state.UserLoginInfoList = payload;
    },
    // 用户
    getUserId(state, payload) {
      state.UserInfo = payload;
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
      const UserLoginInfo = await Login(payload);
      console.log(UserLoginInfo, "用户登录数据");
      context.commit("setLoginSin", UserLoginInfo);
    },
    async getUserInfo(context, payload) {
      // 用户基本信息
      const UserBasicInfo = await getUserInfo(payload);
      console.log(UserBasicInfo, "用户基本信息");
      context.commit("getUserId", UserBasicInfo);
    },
    // 退出
    // logout(context) {
    //   context.commit("setToken", "");
    //   context.commit("setUserInfo", {});
    // },
  },
  getters: {},
};
