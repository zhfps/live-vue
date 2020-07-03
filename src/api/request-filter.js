import axios from 'axios'
import router from '@/router'
import { Loading, Notification } from 'element-ui'
import state from '@/state'
import { getCache } from '@/plugin/cache'
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '正在加载数据',
    spinner: 'el-icon-loading',
    background: 'rgba(45,58,75,0.5)'
  })
}
const service = axios.create({
  baseURL: '/api',
  timeout: 3000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url !== '/login') { config.headers['Access_Token'] = state.getters.Access_Token ? state.getters.Access_Token : getCache('token', 'text') }
    startLoading()
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
    loading.close()
    const { code, data } = response.data
    // 根据 code 进行判断
    if (code === 200) {
      return data
    } else if (code === 403) {
      router.push('/login')
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
    loading.close()
    router.push('/login')
    Notification({
      message: error.message,
      type: 'error',
      position: 'bottom-right',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
