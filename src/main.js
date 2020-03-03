import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'// 引入权限模块
import ElementUI from 'element-ui' // 引入elementui组件库
import 'element-ui/lib/theme-chalk/index.css'// 引入组件库的css样式文件

import '@/styles/index.less'// 引入公共样式文件

import axios from 'axios'// 引入axios包

import Components from '@/components'// 引入普通组件

Vue.prototype.$axios = axios// 将axios赋值给Vue对象的原型对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共的请求头

Vue.use(Components)// 全局注册普通组件
Vue.use(ElementUI)// 全局注册组件库
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
