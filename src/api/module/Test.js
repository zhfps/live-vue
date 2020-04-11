import request from '@/api/request-filter'

export function test() {
  return request({
    url: '/sysUser/All',
    method: 'get',
    params: {
      page: 1,
      pageSize: 50
    }
  })
}
