const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  IS_ACTIVE: (state, name) => {
    state.visitedViews.map(item => {
      if (item.name === name) {
        item.color = '#409EFF'
      } else {
        item.color = '#eee'
      }
    })
  },
  ADD_VISITED_VIEW: (state, view) => {
    state.visitedViews.map(item => {
      if (item.name === view.name) {
        item.color = '#409EFF'
      } else {
        item.color = '#eee'
      }
    })
    const item = {
      path: view.path,
      name: view.name,
      title: view.meta.title || 'no-name',
      icon: view.meta.icon || 'dog',
      color: '#409EFF'
    }
    const length = state.visitedViews.length
    if (state.visitedViews.some(v => v.path === view.path)) return
    // 最多存储六个页面
    if (length > 6) {
      state.visitedViews.splice(0, 1, item)
    } else {
      state.visitedViews.push(item)
    }
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (state, name) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.name === name) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, name) => {
    for (const i of state.cachedViews) {
      if (i === name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_LEFT_VISITED_VIEWS: (state, name) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.name === name) {
        state.visitedViews.splice(0, i)
        break
      }
    }
  },
  DEL_LEFT_CACHED_VIEWS: (state, name) => {
    for (const i of state.cachedViews) {
      if (i === name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(0, index)
        break
      }
    }
  },
  DEL_RIGHT_VISITED_VIEWS: (state, name) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.name === name) {
        const right = state.cachedViews.length - i - 1
        state.visitedViews.splice(i, right)
        break
      }
    }
  },
  DEL_RIGHT_CACHED_VIEWS: (state, name) => {
    for (const i of state.cachedViews) {
      if (i === name) {
        const index = state.cachedViews.indexOf(i)
        const right = state.cachedViews.length - index - 1
        state.cachedViews.splice(index, right)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, name) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.name === name
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, name) => {
    for (const i of state.cachedViews) {
      if (i === name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = []
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  isActive({ commit }, name) {
    commit('IS_ACTIVE', name)
  },
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }, name) {
    return new Promise(resolve => {
      dispatch('delVisitedView', name)
      dispatch('delCachedView', name)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delLeftView({ dispatch, state }, name) {
    return new Promise(resolve => {
      dispatch('delLeftVisitedView', name)
      dispatch('delLeftCachedView', name)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delRightView({ dispatch, state }, name) {
    return new Promise(resolve => {
      dispatch('delRightVisitedView', name)
      dispatch('delRightCachedView', name)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', name)
      resolve([...state.visitedViews])
    })
  },
  delLeftVisitedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_LEFT_VISITED_VIEWS', name)
      resolve([...state.visitedViews])
    })
  },
  delLeftCachedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_LEFT_CACHED_VIEWS', name)
      resolve([...state.cachedViews])
    })
  },
  delRightVisitedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_VISITED_VIEWS', name)
      resolve([...state.visitedViews])
    })
  },
  delRightCachedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_RIGHT_CACHED_VIEWS', name)
      resolve([...state.cachedViews])
    })
  },
  delCachedView({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', name)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({ dispatch, state }, name) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', name)
      dispatch('delOthersCachedViews', name)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', name)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, name) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', name)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews')
      dispatch('delAllCachedViews')
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
