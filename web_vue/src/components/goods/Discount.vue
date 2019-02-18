<template>
  <div class="discount">
    <div class="bg_light pd_shadow p_bg">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>折扣商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="un_content m_t" v-loading="loading">
      <div class="bg_fff p_sm pd_shadow">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input size="small" v-model="params.goodsName" placeholder="请输入商品名称"></el-input>
          </el-col>
          <el-col :span="4.5">
            <el-button type="primary" size="small" @click="crrentChangeAction(1)">查询</el-button>
            <el-button type="info" size="small" @click="resetAction()">重置</el-button>
          </el-col>
          <el-col :span="3" class="fr">
            <el-button class="fr" type="success" size="small" icon="el-icon-plus" @click="updateAction()">新增折扣商品</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="p_lrbg">
      <div class="bg_fff pd_shadow clearfix">
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="到期日期" prop="dateDue">
          <el-date-picker value-format="timestamp" type="date" placeholder="选择时间" v-model="ruleForm.dateDue" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Discount",
  data() {
    return {
      msg: "折扣商品",
      loading: false,
      params: {
        goodsName: ""
      },
      dialogVisible: false,
      ruleForm: {
        name: "",
        dateDue: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称呢过", trigger: "blur" },
          { max: 30, message: "长度在30个字符之间", trigger: "blur" }
        ],
        dateDue: [{ required: true, message: "请选择到期时间", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getListAction();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    resetAction() {},
    updateAction() {
      this.dialogVisible = true;
    },
    crrentChangeAction(val) {
      this.getListAction();
    },
    getListAction() {
      this.http
        .get(Api.Goods.getDiscount(), this.params)
        .then(response => {
          Util.processRes(
            this,
            response,
            res => {
              console.log(res);
            },
            res => {}
          );
        })
        .catch(res => {
          this.loginState = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.http
            .post(Api.Goods.setDiscount(), this.ruleForm)
            .then(response => {
              Util.processRes(
                this,
                response,
                res => {
                  console.log(res);
                },
                res => {}
              );
            })
            .catch(res => {
              this.loginState = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
</style>

