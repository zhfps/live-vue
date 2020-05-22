import request from '@/api/request-filter'

export function getTable(params) {
  return request({
    url: '/menu/getTree',
    method: 'get',
    params
  })
}
