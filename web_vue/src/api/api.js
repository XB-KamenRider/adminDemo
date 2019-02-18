/**
 * Created by liudehua on 18/7/30.
 */

import Login from './login';
import User from './user';
import Goods from './goods';

(function (window) {
  const Api = {
    Login: Login,
    User: User,
    Goods: Goods
  };

  window.Api = Api;
})(window);

export default {
  install: function (Vue) {
    Vue.Api
  }
}
