import { normalize } from 'normalizr'
import { apiFetch } from 'api'
import { Post } from 'schemas'

export const actions = {
  async getPosts({ state, commit }) {
    const {
      data: { data },
    } = await apiFetch('/posts', {
      method: 'GET',
      params: {
        offset: state.list.length,
      },
    })
    const { entities, result } = normalize(data, [Post])

    commit('setPosts', {
      entities: entities.posts,
      list: result,
    })
  },

  async createPost({ dispatch, commit }, { body }) {
    const { data } = await apiFetch('/posts', {
      method: 'POST',
      data: body,
    })
    const { entities, result } = normalize(data, Post)

    commit('addPost', {
      postId: result,
      post: entities.posts[result],
    })
  },

  async editPost({ commit, dispatch }, { postId, body }) {
    const { data } = await apiFetch(`/posts/${postId}`, {
      method: 'PUT',
      data: body,
    })
    const { entities } = normalize(data, Post)

    commit('changePost', {
      post: entities.posts[postId],
      postId,
    })
  },

  async deletePost({ commit }, { postId }) {
    await apiFetch(`/posts/${postId}`, {
      method: 'DELETE',
    })

    commit('removePost', {
      postId,
    })
  },
}
