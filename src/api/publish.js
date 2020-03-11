import axios from '@/utils/request'// 引入axios
// 导出获取频道的请求
export function getChannels () {
  return axios({
    url: '/channels'
  })
}
