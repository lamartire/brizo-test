import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

export const notifications = {
  state: {
    entities: {},
    list: [],
  },
  actions,
  getters,
  mutations,
}
