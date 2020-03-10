// 导航守卫
import router from '@/router'// 引入路由表
import nprogress from 'nprogress'// 引入页面进度条
import 'nprogress/nprogress.css'// 页面进度条的样式文件
router.beforeEach(function (to, from, next) {
  nprogress.start()
  // 如果要去的地址是以home开头,即:要去的地址是主页
  if (to.path.startsWith('/home')) {
    // 则先判断有没有token
    const token = window.localStorage.getItem('user-token')
    // 有则放过
    if (token) {
      next()
    } else {
      // 没有就回登录页
      next('/login')
    }
  } else {
    // 如果要去的地址不是以home开头,直接放过
    next()
  }
})
router.afterEach(function (to, from, next) {
  setTimeout(() => nprogress.done(), 1000)
})
