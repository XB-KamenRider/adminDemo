<template>
  <div class="index">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el_menu">
            <el-submenu :index="item.index" v-for="item in navMenuList" :key="item.index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index" @click="goToPageAction(child.router)">{{ child.name }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      navMenuList: [
        {
          index: "1",
          name: "商品管理",
          router: "1",
          icon: "icon--",
          children: [
            {
              index: "1-1",
              name: "折扣商品",
              router: "/main/discount",
              icon: ""
            },
            {
              index: "1-2",
              name: "我的订单",
              router: "/user/order",
              icon: ""
            },
            {
              index: "1-3",
              name: "我的账单",
              router: "/user/bill",
              icon: ""
            }
          ]
        }
      ]
    };
  },
  created() {
    this.setMenuActiveAction();
  },
  methods: {
    exitAction() {
      this.$confirm("您是否要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.removeItem("token");
        })
        .catch(() => {});
    },
    goToPageAction(router) {
      if (router != this.$route.path) {
        Util.localStorage("set", "boosIsSeach", false);
        this.$router.push({ path: router });
      }
    },
    setMenuActiveAction() {
      this.navMenuList.forEach(element => {
        element.children.forEach(res => {
          if (this.$route.path.includes(res.router)) {
            this.defaultActive = res.index;
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
.index {
  height: 100%;
  .is-vertical {
    height: 100%;
  }
  .el-header {
    background: #23b7e5;
    color: #fff;
  }
  .el-footer {
    background: #dfdfdf;
  }
  .el-header,
  .el-footer {
    padding: 0;
  }
  .el_menu {
    height: 100%;
  }
}
</style>

