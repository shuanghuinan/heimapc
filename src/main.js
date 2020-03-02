import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入elementui组件库
import 'element-ui/lib/theme-chalk/index.css'// 引入组件库的css样式文件
import '@/styles/index.less'// 引入公共样式文件
import axios from 'axios'// 引入axios包
Vue.use(ElementUI)
Vue.prototype.$axios = axios// 将axios赋值给Vue对象的原型对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共的请求头
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
