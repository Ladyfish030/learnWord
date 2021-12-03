// import { userSetter } from 'core-js/fn/symbol'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') ? localStorage.getItem('user') : '',
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    logout: (state) => {
      state.user = ''
    },
  },
  actions: {
    updateUser: ({ commit, state }, data) => {
      commit('setUser', {
        ...state.user,
        ...data,
      })
    },
  },
  modules: {},
  getters: {
    user: (state) => state.user,
  },
})
