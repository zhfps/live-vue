import request from '@/api/request-filter'

// 菜单类
export function getTable(params) {
  return request({
    url: '/menu/getTree',
    method: 'get',
    params
  })
}
export function getSelect() {
  return request({
    url: '/menu/getSelect',
    method: 'get'
  })
}
export function addMenu(data) {
  return request({
    url: '/menu/insert',
    method: 'post',
    data
  })
}
export function updateMenu(data) {
  return request({
    url: '/menu/updateMenu',
    method: 'post',
    data
  })
}
export function updateDelete(id) {
  return request({
    url: '/menu/delete',
    method: 'delete',
    params: {
      id
    }
  })
}
// 用户管理
export function getUsers(params) {
  return request({
    url: '/user/queryPage',
    method: 'get',
    params
  })
}
