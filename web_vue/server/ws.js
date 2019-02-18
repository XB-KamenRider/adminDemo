var ws = require("nodejs-websocket");
console.log("开始建立连接...")

var server = ws.createServer(function (conn) {
  conn.on("text", function (str) {
    obj = JSON.parse(str);
    obj.time = Date.parse(new Date());
    conn.sendText(JSON.stringify(obj));
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8085)
console.log("WebSocket建立完毕")
