<template>
  <div class="login_header">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "LoginHeader",
  data() {
    return {
      msg: "登录header",
    };
  },
  mounted() {

  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
.login_header {

}
</style>

