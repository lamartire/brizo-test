import Vue from 'vue'
import { without } from 'lodash/fp'
import nanoid from 'nanoid'

export const mutations = {
  addNotification(state, { message, type }) {
    const notifcationId = nanoid()

    Object.assign(state.entities, {
      [notifcationId]: {
        id: notifcationId,
        text: message,
        type,
      },
    })
    state.list.unshift(notifcationId)
  },

  removeNotification(state, { notifcationId }) {
    Vue.delete(state.entities, notifcationId)
    state.list = without([notifcationId], state.list)
  },
}
