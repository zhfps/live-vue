import { login, getUserInfo, logout } from '@/api/module/user'
import { getCache, setCache, deleteCache } from '@/plugin/cache'

const state = {
  Access_Token: getCache('token', 'text'),
  UserInfo: getCache('user', 'object'),
  Permissions: getCache('permissions', 'object'),
  Menus: getCache('menu', 'object')
}
const mutations = {
  STE_MENUS: (sate, menus) => {
    state.Menus = Object.assign({}, menus)
  },
  SET_USER_INFO: (sate, userInfo) => {
    state.UserInfo = Object.assign({}, userInfo)
  },
  SET_PERMISSIONS: (sate, permissions) => {
    state.UserInfo = Object.assign({}, Permissions)
  },
  SET_ACCESS_TOKEN: (state, token) => {
    const { Access_Token } = state
    Object.assign(state, Access_Token)
  },
  LOGOUT: (state) => {
    deleteCache('user')
    deleteCache('token')
    Object.assign(state, { Access_Token: '', UserInfo: '', Permissions: '' })
  }
}
const actions = {
  Login({ commit }, user) {
    return login(user).then(res => {
      commit('SET_ACCESS_TOKEN', res)
      setCache('token', res, 'text')
      return res
    })
  },
  GetUserInfo({ commit }) {
    return getUserInfo().then(res => {
      const { user, menu } = res.principal
      const { authorities } = res
      commit('SET_USER_INFO', user)
      commit('SET_PERMISSIONS', authorities)
      commit('STE_MENUS', menu)
      setCache('user', user, 'object')
      setCache('permissions', authorities, 'object')
      setCache('menu', menu, 'object')
    })
  },
  LogOut({ commit }) {
    return logout().then(res => {
      commit('LOGOUT')
      return res
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
