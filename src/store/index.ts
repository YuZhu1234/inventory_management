import { createStore } from 'vuex'

interface tagState{
  currentMenu:string
}

export default createStore({
  state: {
    currentMenu:''
  },
  mutations: {
    ADD_CURRENT:(state:tagState, currentName:string) => {
      state.currentMenu = currentName
    },
    CLEAR_CURRENT:(state:tagState) => {
      state.currentMenu = ''
    }
  },
  actions: {
    addCurrent:({ commit }) => {
      commit('ADD_CURRENT')
    }
  },
  modules: {
  }
})
