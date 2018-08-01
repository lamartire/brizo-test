<script>
import { pick } from 'lodash/fp'

export default {
  name: 'PostEditor',

  props: {
    post: {
      type: Object,
      required: false,
    },
  },

  data: () => ({
    form: {
      title: '',
      body: '',
    },

    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
  }),

  created() {
    if (this.post) {
      Object.assign(this.form, pick(['title', 'body'], this.post.attributes))
    }
  },

  methods: {
    emitSubmit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        }
      })
    },

    emitClose() {
      this.$emit('close')
    },
  },
}
</script>


<template>
  <el-dialog
    :visible="true"
    :before-close="emitClose"
    title="New post creating"
    class="post-editor"
  >
    <el-form
      ref="postForm"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="Post title"
        prop="title"
      >
        <el-input
          v-model="form.title"
        />
      </el-form-item>
      <el-form-item
        label="Post body"
        prop="body"
      >
        <el-input
          v-model="form.body"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <el-row class="post-editor__footer">
      <el-button
        type="primary"
        @click="emitSubmit"
      >
        Submit
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
.post-editor__footer
  margin-top 35px
</style>
