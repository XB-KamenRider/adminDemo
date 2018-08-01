// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'websocket'

import Util from '@/assets/js/util'
import Common from '@/assets/js/common'
import Filter from '@/assets/js/filter'
import Verify from '@/assets/js/verify'
import Api from '@/api/api'
// import store from '@/store/store'

/**
 * 引入公用scss
 */
import '@/assets/css/element_ui.scss'
import '@/assets/css/base.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.http = Axios

// Vue.prototype.Websockt = Websockt;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
