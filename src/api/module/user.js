import request from '@/api/request-filter'

export function login(params) {
  return request({
    url: '/login',
    method: 'POST',
    params
  })
}
// 权限管理
export function getUserInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}
