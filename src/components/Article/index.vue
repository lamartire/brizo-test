<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: false,
    },
  },

  methods: {
    emitEdit() {
      this.$emit('edit')
    },

    emitDelete() {
      this.$emit('delete')
    },
  },
}
</script>

<template>
  <el-card class="article">
    <h2 class="article__title">{{title}}</h2>
    <p class="article__body">
      {{body}}
    </p>
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        @click="emitEdit"
      />
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        @click="emitDelete"
      />
    </el-row>
  </el-card>
</template>

<style lang="stylus">
.article
  display block
  margin-bottom 15px
  &:last-child
    margin-bottom 0
</style>
