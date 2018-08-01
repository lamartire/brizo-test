<script>
export default {
  name: 'Notifications',

  data: () => ({
    showTimeout: 3500,
  }),

  computed: {
    notifications() {
      return this.$store.getters.getNotifications
    },
  },

  watch: {
    notifications(nv) {
      nv.forEach(notifcation => {
        this.$message({
          duration: this.showTimeout,
          message: notifcation.text,
          type: notifcation.type,
        })
        this.$store.commit('removeNotification', {
          notifcationId: notifcation.id,
        })
      })
    },
  },
}
</script>

<template>
  <div class="notifications" />
</template>
