import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: resolve => require(['@/components/login/Login'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/components/login/Register'], resolve)
    },
    {
      path: '/forgetpwd',
      name: 'Forgetpwd',
      component: resolve => require(['@/components/login/ForgetPwd'], resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['@/components/index/Index'], resolve),
      children: [{
        path: '/',
        name: 'WsDemo',
        component: resolve => require(['@/components/ws_demo/wsDemo'], resolve)
      }, ]
    }
  ]
})
