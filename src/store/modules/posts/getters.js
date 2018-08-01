export const getters = {
  getPosts(state) {
    const { entities, list } = state

    return list.map(id => entities[id])
  },
}
