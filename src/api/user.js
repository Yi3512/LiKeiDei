import request from "@/utils/request";

/**
 * 请求验证码
 * @param {String} clientToken 请求随机数

 * @returns Promise
 */
export function VerifyCode(clientToken) {
  return request({
    method: "GET",
    url: `user-service/user/imageCode/${clientToken}`,
  });
}
/**
 * 登录请求
 * @param {Object} data 
 * @returns Promise
 */
export function Login(data) {
  return request({
    method: "POST",
    url: `user-service/user/login`,
    data,
  });
}
