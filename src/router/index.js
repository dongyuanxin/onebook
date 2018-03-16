import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Blog from '@/views/Blog'

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
      component:Blog
    },
    {
      path:'/book/:user/:name', // user : githubID ; name: 仓库名字
      name:"BlogWithUserName",
      component:Blog
    },
    {
      path:'/book/:user', // user : githubID ; 仓库名字默认是 : book
      name:"BlogWithUser",
      component:Blog
    },
    {
      path:'*',
      name:"404",
      component:Home
    }
  ]
})
