
/**
 * auth liudeua
 * description 验证类
 * time 20180725
 */
(function (window) {
  const Verify = {
    accountPattern: (value) => {
      const pattern = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
      if (pattern.test(value)) {
        return true
      } else {
        return false
      }
    },
    pwdPattern: (value) => {
      const pattern = /[a-zA-Z0-9_]{4,20}$/
      if (pattern.test(value)) {
        return true
      } else {
        return false
      }
    },
    phone: (value) => {
      const pattern = /^[1][0-9]{10}$/
      if (pattern.test(value)) {
        return true
      } else {
        return false
      }
    }
  }
  window.Verify = Verify;

})(window);

export default {
  install: function (Vue) {
    Vue.Verify
  }
}
