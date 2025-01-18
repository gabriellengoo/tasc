export const state = () => ({
  // title: false,
  menu: false,
})

export const mutations = {

  TOGGLE_MENU(state) {
    state.menu = !state.menu
  },
  CLOSE_MENU(state) {
    state.menu = false
  },
}

// import { groq } from '@nuxtjs/sanity'

export const actions = {
 
  // setTitle({ commit }, title) {
  //   commit('SET_TITLE', title)
  // },
}