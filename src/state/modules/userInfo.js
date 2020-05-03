
const state = {
  custom: {}
}
const mutations = {
  SET_USER_INFO: (sate, user) => {
    state.custom = Object.assign({}, user)
  }
}
const actions = {
  setUserInfo({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_INFO', user)
      resolve(state.custom)
      reject(state.custom)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
