<template>
  <div class="wsDemo">
    <ul>
      <li v-for="item in list" :key="item.id" :class="userData.value == item.id ? 'active' : ''">
        <div class="">
          {{ item.name }} {{ item.time | dateMin }}
        </div>
        <p class="content">
          {{ item.content }}
        </p>
      </li>
    </ul>
    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="content">
    </el-input>
    <el-button @click="send">发送</el-button>
  </div>
</template>

<script>
export default {
  name: "WsDemo",
  data() {
    return {
      userData: {},
      list: [],
      userList: [],
      websock: "",
      content: ""
    };
  },
  created() {
    // this.getUserInfoAction();
  },
  methods: {
    getUserInfoAction() {
      this.http.get(Api.User.userInfo()).then(response => {
        Util.processRes(this, response, res => {
          console.log(res);
        })
      })
    },
    changSelectAction(item) {
      console.log(item);
    },
    send() {
      let obj = {
        userId: this.userData.value,
        name: this.userData.label,
        time: null,
        content: this.content
      };
      this.readyChat(obj);
    },
    /* webSocket会话 */
    /* 会话过程中实际调用的函数 */
    readyChat(data) {
      let This = this;
      if (this.websock.readyState === 1) {
        // this.websock.readyState = 1 表示连接成功，可以立即发送信息
        this.websocketSend(data);
      } else if (this.websock.readyState === 0) {
        // 表示正在连接，设置300ms后发送信息
        setTimeout(function() {
          This.websocketSend(data);
        }, 300);
      } else {
        // 连接未创建或者创建失败，则重新创建连接，并设置500ms后发送信息
        this.websochetInit();
        setTimeout(function() {
          This.websocketSend(data);
        }, 500);
      }
    },
    /* 初始化websochet */
    websochetInit() {
      if ("WebSocket" in window) {
        this.websock = new WebSocket("ws://localhost:8085/");
      } else {
        return;
      }
      this.websock.onmessage = this.websocketMessage;
    },
    /* websochet发送信息 */
    websocketSend(data) {
      this.websock.send(JSON.stringify(data));
    },
    /* websochet接收服务器返回的信息 */
    websocketMessage(e) {
      this.list.push(JSON.parse(e.data));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
@import "./../../assets/css/variable.scss";
</style>

