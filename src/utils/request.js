// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器    // request.js  标签下
import axios from "axios";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
}); // 创建一个axios的实例
service.interceptors.request.use(); // 请求拦截器\
// 验证码响应拦截器
service.interceptors.response.use(
  (res) => {
    // const { config, headers, request } = res;
    // console.log(config, "1");
    // console.log(headers, "2");
    // console.log(request, "3");
    if (res.config.url.includes("/api/user-service/user/imageCode/")) {
      return res.request.responseURL;
    }
    if (res) {
      return res
    }
    // Message.error(res.data.msg);
    // return Promise.reject(new Error(res.data.msg));
  }
  // function (error) {
  //   Message.error("系统异常");
  //   return Promise.reject(error);
  // }
); 
service.interceptors.response.use()
export default service; // 导出axios实例
