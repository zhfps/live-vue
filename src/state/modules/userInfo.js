import { login, getUserInfo } from '@/api/module/user'
import { getCache, setCache } from '@/plugin/cache'

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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
