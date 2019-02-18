<template>
  <div class="register">
    <header>
      <img src="./../../assets/logo.png" alt="">
    </header>
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="register_links">
          <span>新用户注册</span>
          <span>已有账号
            <router-link to="/">登录</router-link>
          </span>
        </div>
        <el-form-item prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入账号" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入6-20位登录密码" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="affirmPassword">
          <el-input v-model="ruleForm.affirmPassword" type="password" placeholder="请再次输入登录密码" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="!loginState" class="register_btn" type="primary" @click="submitForm('ruleForm')">注 册</el-button>
          <el-button v-else class="register_btn" type="primary" :loading="true">加载中</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
export default {
  name: "Register",
  data() {
    const validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      }
      if (Verify.accountPattern(value)) {
        callback();
      } else {
        callback(new Error("您输入的账号格式有误"));
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (Verify.pwdPattern(value)) {
        callback();
      } else {
        callback(new Error("您输入的密码格式有误"));
      }
    };
    const validateAPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入登录密码"));
      }
      if (value == this.ruleForm.password) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致"));
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (Verify.phone(value)) {
        callback();
      } else {
        callback(new Error("输入手机号码格式有误"));
      }
    };
    return {
      msg: "注册",
      loginState: false,
      ruleForm: {
        account: "",
        password: "",
        affirmPassword: "",
        phone: null
      },
      rules: {
        account: [
          { required: true, validator: validateAccount, trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePwd, trigger: "blur" }],
        affirmPassword: [
          { required: true, validator: validateAPwd, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    // 提交注册信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginState = true;
          let obj = Util.deepCopyObj(this.ruleForm);
          obj.password = md5(obj.password);
          this.http
            .post(Api.Login.register(), obj)
            .then(response => {
              Util.processRes(
                this,
                response,
                res => {
                  this.loginState = false;
                  this.goToLogin();
                },
                res => {
                  this.loginState = false;
                }
              );
            })
            .catch(res => {});
        } else {
          return false;
        }
      });
    },
    // 跳转操作
    goToLogin() {
      this.$confirm("注册成功,是否立即登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push('/');
        })
        .catch(() => {
          this.$router.go(0);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.register {
  .form {
    width: 25rem;
    margin: 1.875rem auto;
    .register_btn {
      width: 100%;
    }
    .register_links {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.75rem;
    }
  }
}
</style>

