// redis 链接
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');

// redis 链接错误
client.on("error", function (error) {
  console.log(error);
});

const token = {
  setToken: function(UserId, key) {
    client.select('0', (error) => {
      // set 
      client.set(key, UserId, (error, res) => {
        //设置过期
        client.expire(key, 3600, (err, success) => {
          console.log(err);
        });
        // this.getToken(key);
      });
    });
  },
  getToken: (key, callback) => {
    client.select('0', function (error) {
      // get
      client.get(key, function (error, res) {
        console.log(res);
        if(error) {
          callback(error)
        }else {
          callback(res[0])
        }
        // 关闭链接
        // client.end();
      });
    });
  }
}


module.exports = token
