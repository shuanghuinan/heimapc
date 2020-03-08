import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home' // 引入主页组件
import Login from '@/views/login' // 引入登录页面组件
import SecondHome from '@/views/home/second_home' // 引入主页的默认显示组件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      // 二级路由为空时,表示二级路由的默认组件  eg:
      { path: '', component: SecondHome },
      { path: 'comment', component: () => import('@/views/comment') }, // 引入评论组件,按需加载
      { path: 'material', component: () => import('@/views/material') }, // 引入素材组件,按需加载
      // { path: 'articles', component: () => import('@/views/articles') } // 引入文章(内容)组件,按需加载
      { path: 'articles', component: () => import('@/views/articles/index_two') }, // 引入文章(内容)组件,按需加载
      { path: 'publish', component: () => import('@/views/publish') }

    ]
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
export default router
