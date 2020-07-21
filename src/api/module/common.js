import request from '@/api/request-filter'

// 菜单类
export function getTable(params) {
  return request({
    url: '/menu/getTree',
    method: 'get',
    params
  })
}
export function getSelect(type) {
  return request({
    url: '/menu/getSelect',
    method: 'get',
    params: {
      type
    }
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
export function permissionsSelect(type) {
  return request({
    url: '/permission/getSelect',
    method: 'get',
    params: {
      type
    }
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
// 角色相关
export function getRoles(params) {
  return request({
    url: '/sysRole/queryPage',
    method: 'get',
    params
  })
}
export function CreateRole(data) {
  return request({
    url: '/sysRole/insert',
    method: 'post',
    data
  })
}
export function UpdateRole(data) {
  return request({
    url: '/sysRole/update',
    method: 'post',
    data
  })
}
export function deleteRole(id) {
  return request({
    url: '/sysRole/delete',
    method: 'delete',
    params: {
      id
    }
  })
}

// 权限和角色

export function getRolePermission(id) {
  return request({
    url: '/permission/getRolePermission',
    method: 'get',
    params: {
      id
    }
  })
}
export function getUserRoles(id) {
  return request({
    url: '/role/getUserRole',
    method: 'get',
    params: {
      id
    }
  })
}
export function setRolePermission(roleId, data) {
  return request({
    url: '/permission/setRolePermission',
    method: 'post',
    params: {
      roleId
    },
    data
  })
}
export function setUserRole(userId, data) {
  return request({
    url: '/role/setUserRole',
    method: 'post',
    params: {
      userId
    },
    data
  })
}
export function setUserMenu(userId, data) {
  return request({
    url: '/menu/setUserMenu',
    method: 'post',
    params: {
      userId
    },
    data
  })
}

export function getAllRoles() {
  return request({
    url: '/sysRole/queryAll',
    method: 'get'
  })
}
export function getUserMenuId(id) {
  return request({
    url: '/menu/getUserMenuId',
    method: 'get',
    params: {
      id
    }
  })
}
