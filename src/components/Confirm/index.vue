<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    emitClose() {
      this.$emit('close')
    },

    emitConfirm() {
      this.$emit('confirm')
    },
  },
}
</script>


<template>
  <el-dialog
    :visible="true"
    :before-close="emitClose"
    :title="title"
    class="confirm"
  >
    <span>{{message}}</span>
    <el-row class="confirm__footer">
      <el-button
        type="primary"
        @click="emitConfirm"
      >
        Confirm
      </el-button>
      <el-button
        @click="emitClose"
      >
        Cancel
      </el-button>
    </el-row>
  </el-dialog>
</template>

<style lang="stylus">
  .confirm__footer
    margin-top 35px
</style>
