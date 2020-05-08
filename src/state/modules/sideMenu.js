import { sideMenu } from '@/model/sideMenu'
import { findMenuItem } from '@/plugin'

const data = sideMenu
const state = {
  menus: data
}
const mutations = {
  CHANG_ACTIVE_ICON: (sate, name) => {
    findMenuItem(state.menus, name)
  }
}
const actions = {
  changActiveIcon({ commit }, data) {
    commit('CHANG_ACTIVE_ICON', data)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
