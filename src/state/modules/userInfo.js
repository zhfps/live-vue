import { login } from '@/api/module/user'

function getAccessToken() {
  const Access_Token = localStorage.getItem('Access_Token')
  if (Access_Token !== undefined) {
    return Access_Token
  } else {
    return null
  }
}
function setAccessToken(token) {
  localStorage.setItem('Access_Token', token)
}
const state = {
  Access_Token: getAccessToken()
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
        setAccessToken(res)
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
