// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器    // request.js  标签下
import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
service.interceptors.request.use(); // 请求拦截器\
// 验证码响应拦截器
service.interceptors.response.use(
  (res) => {
    // 验证码判断
    if (res.config.url.includes("/api/user-service/user/imageCode/")) {
      return res.request.responseURL;
    }
    if (res.data.success) {
      return res.data;
    }
    Message.error(res.data.msg);
    return Promise.reject(new Error(res.data.msg));
  },
  function (error) {
    console.log(error);
    Message.error(error.msg);
    return Promise.reject(error);
  }
);
service.interceptors.response.use();
export default service; // 导出axios实例
