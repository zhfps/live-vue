import request from '@/api/request-filter'

export function getTable() {
  return request({
    url: '/menu/getTree',
    method: 'get'
  })
}
