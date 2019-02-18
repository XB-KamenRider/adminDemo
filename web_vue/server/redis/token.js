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
      client.set(key, UserId.toString(), (error, res) => {
        //设置过期
        client.expire(key, 3600);
      });
    });
  },
  getToken: (key, callback) => {
    client.select('0', function (error, success) {
      // get
      client.get(key, function (error, res) {
        if(error) {
          callback(error)
        }else {
          callback(res)
        }
      });
    });
  }
}


module.exports = token
