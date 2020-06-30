const state = {
  collapse: true,
  tagsList: [],
  rootPath: 'http://localhost:8080',
  pageSizeList: [30, 100, 150]
}
const mutations = {
  CHANGE_COLLAPSE: (state) => {
    state.collapse = !state.collapse
  },
  ADD_TAG: (state, route) => {
    if (state.tagsList.length >= 8) {
      state.tagsList.shift()
    }
    state.tagsList.push({
      title: route.meta.title,
      path: route.fullPath,
      name: route.matched[1].components.default.name
    })
  },
  DELETE_TAG: (state, index) => {
    state.tagsList.splice(index, 1)
  },
  DELETE_ALL_TAG: (state) => {
    state.tagsList = []
  },
  DELETE_OTHER_TAG: (state, index) => {
    state.tagsList = state.tagsList.splice(index, 1)
  }
}
const actions = {
  changCollapse({ commit }) {
    commit('CHANGE_COLLAPSE')
  },
  deleteTag({ commit }, index) {
    return new Promise((resolve, reject) => {
      commit('DELETE_TAG', index)
      resolve(state.tagsList)
      reject(state.tagsList)
    })
  },
  addTag({ commit }, route) {
    commit('ADD_TAG', route)
  },
  deleteAllTag({ commit }) {
    commit('DELETE_ALL_TAG')
  },
  deleteOtherTags({ commit }, index) {
    commit('DELETE_OTHER_TAG', index)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
