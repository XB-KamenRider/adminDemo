<template>
  <div class="forget_pwd">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "ForgetPwd",
  data() {
    return {
      msg: "找回密码",
      api: {
        loginApi: "/api/login/loginApi",
        loginInfoApi: "/ucm/boss/role/queryRoleListByPage"
      },
      loginState: false,
      loginData: {
        account: "",
        password: ""
      }
    };
  },
  mounted() {

  },
  methods: {
    subLoginMsg() {
      this.http
        .post(this.api.loginApi, this.loginData)
        .then(response => {
          Util.processRes(
            this,
            response,
            res => {
              this.loginState = false;
            },
            responseData => {
              this.loginState = false;
            }
          );
        })
        .catch(res => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "./../../assets/css/variable.scss";
.login {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background: $primaryColor;
}
.login_box {
  width: 21.875rem;
  height: 18.75rem;
  left: 50%;
  top: 50%;
  margin-left: -10.9375rem;
  margin-top: -9.375rem;
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
    background-color: $primaryColor;
    color: #fff;
    border-radius: 4px 4px 0 0;
    text-indent: 1.25rem;
  }
  #formlogin {
    width: 17.5rem;
    margin: 1.25rem auto;
    .msgError {
      min-height: 1.4375rem;
      margin-top: 0.3125rem;
      margin-bottom: 0.3125rem;
      height: auto !important;
      a {
        width: 100%;
        display: inline-block;
        color: #e4393c;
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
  }
}
</style>

