import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

export const posts = {
  state: {
    entities: {},
    list: [],
  },
  actions,
  getters,
  mutations,
}
