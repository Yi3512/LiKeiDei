<template>
  <div class="login_box">
    <div class="login_main">
      <div class="logo">
        <img src="../../assets/login_img/logo.595745bd.png" alt="" />
      </div>
      <div class="login_form">
        <el-form :model="loginForm" ref="loginFrom" :rules="loginrules">
          <el-form-item prop="user">
            <el-input
              v-model="loginForm.user"
              prefix-icon="el-icon-mobile-phone"
              placeholder="请输入账号"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              show-password
              placeholder="请输入密码"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Verification">
            <el-input
              class="yzm"
              prefix-icon="iconfont icon-anquan"
              placeholder="请输入验证码"
              v-model="loginForm.Verification"
            >
            </el-input>
            <!-- 验证码 -->
            <span class="yzmwz" @click="onverify">
              <img :src="clientToken" alt="" />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="isLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: mapUserState, mapActions: mapUserActions } =
  createNamespacedHelpers("user");
export default {
  data() {
    return {
      isLoading: false,
      // 输入框
      loginForm: {
        // 用户
        user: "admin",
        // 密码
        password: "admin",
        // 验证码
        Verification: "",
      },
      // 校验规则
      loginrules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]\w{4,15}$/,
            message: "账号以字母开头,5-16位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z]\w{4,15}$/,
            message: "账号以字母开头,5-16位",
            trigger: "blur",
          },
        ],
        Verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapUserState(["clientToken", "random"]),
  },
  created() {
    this.getclientToken();
  },

  methods: {
    ...mapUserActions(["getclientToken", "Login"]),
    onverify() {
      this.getclientToken();
    },
    async isLogin() {
      this.isLoading = true;
      try {
        await this.$refs.loginFrom.validate(async (success) => {
          await this.Login({
            // 用户名
            loginName: this.loginForm.user,
            // 密码
            password: this.loginForm.password,
            // 手机号
            mobile: "",
            // 验证码
            code: this.loginForm.Verification,
            // 随机数
            clientToken: this.random,
            // 登录类型 0：后台；1：运营运维端；2：合作商后台
            loginType: 0,
            // 账号(合作商登录需要，手机号)
            account: "",
          });
          this.$router.push("/dashboard");
          this.$message.success("登录成功");
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login_box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/login_img/background.be4fae7d.png") no-repeat;
  background-size: cover;
  .login_main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 518px;
    height: 388px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 76px 35px 0;
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -50px;
      width: 96px;
      height: 96px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login_form {
      width: 448px;
      height: 280px;
      /deep/ .is-error {
        border-color: #c0c4cc;
      }
      /deep/ .el-input__inner {
        height: 52px;
      }
      /deep/ .el-form-item__content {
        display: flex;
        caret-color: #999999;
      }
      .yzm {
        flex: 2;
      }
      .yzmwz {
        flex: 0;
      }
      /deep/ .el-input__icon {
        font-size: 20px;
        margin-top: 2px;
      }
      .el-button--primary {
        background-color: #6578ed;
        width: 100%;
        height: 52px;
        border-color: #6578ed;
        font-size: 14px;
      }
    }
  }
}
</style>
