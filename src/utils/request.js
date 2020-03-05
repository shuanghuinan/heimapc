// 在这个文件内进行与axios有关的配置
import axios from 'axios'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置公共的请求头

// 设置axios的请求拦截器
axios.interceptors.request.use(function (config) {
  // 如果请求成功,就将令牌加入到请求当中,这样做的目的是-----
  // 每次发请求时都必须要携带令牌, 每次发请求都要将令牌设置给请求, 次次都这样的话太过于麻烦
  // 所以在这个文件中为axios设置了请求拦截器,在每次请求成功发送到服务器之前拦截请求,并把令牌加入到请求中
  // 这样,以后发请求后,就不用再操心令牌的问题
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('user-token')}`
  return config
}, function (error) {
  return Promise.reject(error)
})

// 设置axios的响应拦截器
axios.interceptors.response.use(function (response) {
  // 设置响应拦截器的原因是:响应数据response的嵌套层太多,所以在这里给他脱层皮,只返回data
  // 之后获取的时候就不用写res.data.data,而直接写res.data就可以了
  return response.data ? response.data : {}
}, function (error) {
//   console.log(error.response.status)
  // 如果响应失败qie状态码为401,则代表永远忽认证失败/用户身份不对,即拿错令牌或者令牌失效
  // 这时,我们要做的是:删除令牌,跳到登录页
  if (error.response.status === 401) {
    window.localStorage.removeItem('user-token')
    router.push('/login')
  }

  return Promise.reject(error)
})
export default axios
