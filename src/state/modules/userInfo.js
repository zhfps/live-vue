
const state = {
  user: {}
}
const mutations = {
  SET_USER_INFO: (sate, user) => {
    state.user = Object.assign({}, user)
  }
}
const actions = {
  setUserInfo({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_INFO', user)
      resolve(state.user)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
