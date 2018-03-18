import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Blog from '@/views/Blog'
import Paper from '@/views/Paper'

Vue.use(Router)

export default new Router({
  mode:'history',
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
      path:'/book',
      name:"Blog",
      component:Blog,
      children:[
        {
          path:':user',
          component:Blog
        },
        {
          path:':user/:name',
          component:Blog
        }
      ]
    },
    {
      path:'/paper',
      name:'Paper',
      component:Paper
    },
    {
      path:'*',
      name:"404",
      component:Home
    }
  ]
})
