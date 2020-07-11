import { login, getUserInfo, logout } from '@/api/module/user'
import { getCache, setCache, deleteCache } from '@/plugin/cache'

const state = {
  Access_Token: getCache('token', 'text'),
  UserInfo: getCache('user', 'object')
}
const mutations = {
  SET_USER_INFO: (sate, userInfo) => {
    state.UserInfo = Object.assign({}, userInfo)
  },
  SET_ACCESS_TOKEN: (state, token) => {
    const { Access_Token } = state
    Object.assign(state, Access_Token)
  },
  LOGOUT: (state) => {
    deleteCache('user')
    deleteCache('token')
    Object.assign(state, { Access_Token: '', UserInfo: '' })
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
      const { user } = res.principal
      commit('SET_USER_INFO', user)
      setCache('user', user, 'object')
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
