import axios from 'axios'
import state from '@/state'
import { getCache } from '@/plugin/cache'
// 文件类
export function fileUpload(directory, formData) {
  const url = `/api/fileUpload/${directory}`
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access_Token': state.getters.Access_Token ? state.getters.Access_Token : getCache('token', 'text')
    }
  })
}
