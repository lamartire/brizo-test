import Vue from 'vue'
import { without } from 'lodash/fp'

export const mutations = {
  setPosts(state, { entities, list }) {
    Object.assign(state.entities, entities)
    state.list = state.list.concat(list)
  },

  addPost(state, { postId, post }) {
    Vue.set(state.entities, postId, post)
    state.list.unshift(postId)
  },

  changePost(state, { postId, post }) {
    Object.assign(state.entities[postId], post)
  },

  removePost(state, { postId }) {
    Vue.delete(state.entities, postId)
    state.list = without([postId], state.list)
  },
}
