/**
 * auth liudeua
 * description 验证类
 * time 20180725
 */
const verify = {
  // 账号格式验证
  accountPattern: (value) => {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
    if (pattern.test(value)) {
      return true
    } else {
      return false
    }
  },
  // 手机号码格式验证
  phone: (value) => {
    const pattern = /^[1][0-9]{10}$/
    if (pattern.test(value)) {
      return true
    } else {
      return false
    }
  },
  // 验证是否重复
  repetition: (models, key, obj, succCallback, errorCallback) => {
    models[key].find(obj, (err, data) => {
      if(err) {
        res.send(err);
      }else {
        if(data.length) {
          succCallback(data);
        }else {
          errorCallback(false);
        }
      }
    })
  }
}

module.exports = verify
