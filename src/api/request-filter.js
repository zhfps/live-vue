import axios from 'axios'
import { Notification } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 3000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // data 是 axios 返回数据中的 data
    const { code, data } = response.data
    // 根据 code 进行判断
    if (code === 200) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 admin 请求最新版本
      return data
    } else {
      Notification({
        message: response.data.msg,
        type: 'error',
        position: 'bottom-right',
        duration: 3 * 1000
      })
    }
  },
  error => {
    Notification({
      message: '未知错误，请联系管理员',
      type: 'error',
      position: 'bottom-right',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
