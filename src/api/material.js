import axios from '@/utils/request'
// 导出获取文章信息的请求
export function getArticles (id) {
  return axios({
    url: `articles/${id}`
  })
}
