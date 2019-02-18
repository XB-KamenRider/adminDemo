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
      path: '/main',
      name: 'Main',
      component: resolve => require(['@/components/Main'], resolve),
      children: [{
          path: '/',
          name: 'WsDemo',
          component: resolve => require(['@/components/ws_demo/WsDemo'], resolve)
        },
        {
          path: '/main/discount',
          name: 'Discount',
          component: resolve => require(['@/components/goods/Discount'], resolve)
        }
      ]
    }, {
      path: '/user',
      name: 'User',
      component: resolve => require(['@/components/user/Index'], resolve),
      children: [{
        path: '/',
        name: 'Info',
        component: resolve => require(['@/components/user/Info'], resolve)
      }]
    }
  ]
})
