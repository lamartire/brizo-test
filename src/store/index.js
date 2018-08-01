import Vue from 'vue'
import Vuex from 'vuex'

import { posts, notifications } from './modules'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    posts,
    notifications,
  },
})
