<template>
  <div class="login">
    <div class="login_box">
      <div class="title">
        登录
      </div>
      <div class="form">
        <form id="formlogin" method="post" onsubmit="return false;">
            <p class="msgError"> <a v-if="hintMsg"><i class="el-icon-information"></i>&nbsp;&nbsp;{{hintMsg}}</a></p>
            <div class="item item_fore1">
                <el-input placeholder="用户名" v-model="loginData.account">
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
                <el-button v-if="!loginState" class="login_btn" type="primary"   @click="subLoginMsg">登&nbsp;&nbsp;录</el-button>
                <el-button v-else class="login_btn" type="primary" :loading="true">登录中</el-button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      type: 0,
      hintMsg: "", // 错误信息
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
  mounted() {},
  methods: {
    subLoginMsg() {
      let vm = this;
      // 接口所需参数准备
      if (!vm.loginData.account && !vm.loginData.password) {
        vm.hintMsg = "请输入用户名和密码";
        return;
      } else if (!vm.loginData.account) {
        vm.hintMsg = "请输入用户名";
        return;
      } else if (!vm.loginData.password) {
        vm.hintMsg = "请输入密码";
        return;
      } else {
        vm.hintMsg = "";
        vm.loginState = true;
      }

      vm.http
        .post(this.api.loginApi, this.loginData)
        .then(response => {
          Util.processRes(
            vm,
            response,
            res => {
              vm.loginState = false;
              vm.$router.push({ path: "/index" });
            },
            responseData => {
              vm.loginState = false;
              vm.hintMsg = responseData.msg;
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
.login {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background: #23b7e5
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
    background-color: #000;
    color: #fff;
    border-radius: 4px 4px 0 0;
    text-indent: 1.25rem;
  }
  #formlogin {
    width: 17.5rem;
    margin: 1.25rem auto;
    .msgError {
      min-height: 1.4375rem;
      margin-top: .3125rem;
      margin-bottom: .3125rem;
      height: auto !important;
      a {
        width: 100%;
        display: inline-block;
        color: #e4393c;
        line-height: .9375rem;
        text-indent: .125rem;
        font-size: .875rem;
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

