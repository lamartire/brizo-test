<script>
export default {
  name: 'NewPostButton',

  methods: {
    emitClick() {
      this.$emit('click')
    },
  },
}
</script>


<template>
  <div class="new-post-button">
    <el-button
      type="success"
      icon="el-icon-plus"
      circle
      @click="emitClick"
    />
  </div>
</template>

<style lang="stylus">
  .new-post-button
    position fixed
    left 15px
    bottom 15px
</style>
