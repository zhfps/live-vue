import { login } from '@/api/module/user'

const state = {
  Access_Token: ''
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
