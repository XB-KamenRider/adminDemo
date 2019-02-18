<template>
  <div class="login bg_primary">
    <div class="login_box">
      <div class="title bg_primary">
        登录
      </div>
      <div class="form">
        <form id="formlogin" method="post" onsubmit="return false;">
          <p class="msg_error">
            <a v-if="hintMsg" class="danger_color">
              <i class="el-icon-information"></i>&nbsp;&nbsp;{{hintMsg}}</a>
          </p>
          <div class="item item_fore1">
            <el-input placeholder="账号 / 手机号" v-model="loginData.account" @keydown.13.native="subLoginMsg()">
              <template slot="prepend">
                <i class="iconfont icon-yonghu01"></i>
              </template>
            </el-input>
          </div>
          <div class="item item_fore2">
            <el-input placeholder="密码" type="password" @keydown.13.native="subLoginMsg()" v-model="loginData.password">
              <template slot="prepend">
                <i class="iconfont icon-mima"></i>
              </template>
            </el-input>
          </div>
          <div class="item">
            <el-button v-if="!loginState" class="login_btn" type="primary" @click="subLoginMsg">登&nbsp;&nbsp;录</el-button>
            <el-button v-else class="login_btn" type="primary" :loading="true">登录中</el-button>
          </div>
          <div class="login_links">
            <router-link to="/forgetpwd">忘记密码</router-link>
            <router-link to="/register">免费注册</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from  'js-md5';
export default {
  name: "login",
  data() {
    return {
      type: 0,
      hintMsg: "", // 错误信息
      loginState: false,
      loginData: {
        account: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    subLoginMsg() {
      // 接口所需参数准备
      if (!this.loginData.account && !this.loginData.password) {
        this.hintMsg = "请输入账号和密码";
        return;
      } else if (!this.loginData.account) {
        this.hintMsg = "请输入账号";
        return;
      } else if (!this.loginData.password) {
        this.hintMsg = "请输入密码";
        return;
      } else {
        this.hintMsg = "";
      }
      this.loginState = true;
      let obj = Util.deepCopyObj(this.loginData);
      obj.password = md5(obj.password);
      this.http
        .post(Api.Login.login(), obj)
        .then(response => {
          Util.processRes(
            this,
            response,
            res => {
              // 设置Token
              Util.localStorage('set', 'token', res.data.token);
              this.$router.push({ path: "/main" });
              this.loginState = false;
            },
            res => {
              this.loginState = false;
            }
          );
        })
        .catch(res => {
          this.loginState = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
@import "~@/assets/css/variable.scss";
.login {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
}
.login_box {
  width: 21.875rem;
  height: 20rem;
  left: 50%;
  top: 50%;
  margin-left: -10.9375rem;
  margin-top: -10rem;
  position: fixed;
  z-index: 4;
  background: #fff;
  overflow: visible;
  border-radius: 0.3125rem;
  border: 0.0625rem solid #ccc;
  box-sizing: border-box;
  .title {
    width: 100%;
    height: 3.375rem;
    line-height: 3.375rem;
    font-weight: 600;
    color: #fff;
    border-radius: 4px 4px 0 0;
    text-indent: 1.25rem;
  }
  #formlogin {
    width: 17.5rem;
    margin: 1.25rem auto;
    .msg_error {
      min-height: 1.4375rem;
      margin-top: 0.3125rem;
      margin-bottom: 0.3125rem;
      height: auto !important;
      a {
        width: 100%;
        display: inline-block;
        line-height: 0.9375rem;
        text-indent: 0.125rem;
        font-size: 0.875rem;
      }
    }
    .item {
      margin-bottom: 1.25rem;
      padding: 0rem;
      .forget-pw-safe {
        display: inline-block;
        float: right;
      }
      i {
        font-size: 1.25rem;
      }
    }
    .el-input {
      width: 17.5rem;
      margin-right: 0;
    }
    .login_btn {
      display: inline-block;
      width: 100%;
      text-align: center;
      color: #fff;
      height: 2.5rem;
      border-radius: 0.25rem;
    }
    .login_links {
      display: flex;
      justify-content: space-between;
      margin-top: 0.75rem;
      font-size: 0.75rem;
    }
  }
}
</style>