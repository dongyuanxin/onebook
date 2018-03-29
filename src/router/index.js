import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Book from '@/views/book/Index'
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
      name:"Book",
      component:Book,
      children:[
        {
          path:':user',
          component:Book
        },
        {
          path:':user/:name',
          component:Book
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
