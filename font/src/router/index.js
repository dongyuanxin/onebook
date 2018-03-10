import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Blog from '@/views/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Home
    },
    {
      path:'/home',
      name:'Home',
      component: Home
    },
    {
      path:'/blog',
      name:"Blog",
      component:Blog
    }
  ]
})
