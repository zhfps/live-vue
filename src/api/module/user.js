import request from '@/api/request-filter'

export function login(params) {
  return request({
    url: '/login',
    method: 'POST',
    params
  })
}
