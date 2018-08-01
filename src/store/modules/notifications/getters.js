export const getters = {
  getNotifications(state) {
    const { entities, list } = state

    return list.map(id => entities[id])
  },
}
