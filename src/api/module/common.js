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
export function CreateUser(data) {
  return request({
    url: '/user/insert',
    method: 'post',
    data
  })
}
export function UpdateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
export function deleteUser(id) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params: {
      id
    }
  })
}
// 权限模块
export function getPermissions(params) {
  return request({
    url: '/permission/getTree',
    method: 'get',
    params
  })
}
export function createPermissions(data) {
  return request({
    url: '/permission/insert',
    method: 'post',
    data
  })
}
export function permissionsSelect() {
  return request({
    url: '/permission/getSelect',
    method: 'get'
  })
}
export function deletePermissions(id) {
  return request({
    url: '/permission/delete',
    method: 'delete',
    params: {
      id
    }
  })
}
export function updatePermission(data) {
  return request({
    url: '/permission/update',
    method: 'post',
    data
  })
}
