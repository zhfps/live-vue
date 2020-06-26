import { login } from '@/api/module/user'
import { getCache, setCache } from '@/plugin/cache'

const state = {
  Access_Token: getCache('token')
}
const mutations = {
  SET_USER_INFO: (sate, user) => {
    state.custom = Object.assign({}, user)
  },
  SET_ACCESS_TOKEN: (state, token) => {
    state.Access_Token = token
  }
}
const actions = {
  setUserInfo({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user).then(res => {
        commit('SET_ACCESS_TOKEN', res)
        setCache('token', res)
        resolve(res)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
