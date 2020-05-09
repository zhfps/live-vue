function getCustom() {
  const custom = localStorage.getItem('user')
  if (custom !== undefined) {
    return JSON.parse(custom)
  } else {
    return {}
  }
}
function setCustom(user) {
  localStorage.setItem('user', JSON.stringify(user))
}
const state = {
  custom: getCustom()
}
const mutations = {
  SET_USER_INFO: (sate, user) => {
    state.custom = Object.assign({}, user)
  }
}
const actions = {
  setUserInfo({ commit }, user) {
    return new Promise((resolve, reject) => {
      setCustom(user)
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
