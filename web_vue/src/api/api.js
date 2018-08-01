// 定义url
window.server_path = {
  login: '/api/login'
};

import Login from './login';

(function (window) {
  const Api = {
    Login: Login
  };

  window.Api = Api;
})(window);

export default {
  install: function (Vue) {
    Vue.Api
  }
}
