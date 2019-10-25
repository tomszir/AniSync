import Vue from 'vue'
import Vuex from 'vuex'

import room from './modules/room'
import video from './modules/video'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { room, video },
  state: {},
  actions: {},
  mutations: {}
})
