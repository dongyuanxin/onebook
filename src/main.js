// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 前端虚拟路由
  store, // 全局状态管理器
  components: { App },
  template: '<App/>'
})
