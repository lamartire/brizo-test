<script>
import { createErrorMessage } from 'api'
import {
  Article,
  Confirm,
  PostEditor,
  NewPostButton,
  Notifications,
} from 'components'

export default {
  name: 'PostsPage',

  components: {
    Article,
    Confirm,
    PostEditor,
    NewPostButton,
    Notifications,
  },

  data: () => ({
    creatingPost: false,
    editingPost: null,
    deletingPost: null,
  }),

  computed: {
    posts() {
      return this.$store.getters.getPosts
    },
  },

  async created() {
    try {
      await this.getPosts()

      window.addEventListener('scroll', this.onScrollPage)
    } catch (err) {
      console.log(err)
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScrollPage)
  },

  methods: {
    startPostEdit(post) {
      this.editingPost = post
    },

    startPostDelete(post) {
      this.deletingPost = post
    },

    startPostCreate() {
      this.creatingPost = true
    },

    onCancelDelete() {
      this.deletingPost = null
    },

    onCloseEditor() {
      if (this.creatingPost) {
        this.creatingPost = false
      } else {
        this.editingPost = null
      }
    },

    addNotification(type, message) {
      this.$store.commit('addNotification', {
        message,
        type,
      })
    },

    async getPosts() {
      try {
        await this.$store.dispatch('getPosts')
      } catch (err) {
        this.addNotification(
          'error',
          createErrorMessage(err.message, 'posts loading')
        )
      }
    },

    async onScrollPage(e) {
      const { scrollY, innerHeight } = window
      const { scrollHeight } = document.body

      if (scrollHeight <= scrollY + innerHeight) {
        await this.getPosts()
      }
    },

    async createPost(body) {
      try {
        await this.$store.dispatch('createPost', {
          body,
        })

        this.creatingPost = false
      } catch (err) {
        this.addNotification(
          'error',
          createErrorMessage(err.message, 'post create')
        )
      }
    },

    async editPost(body) {
      try {
        await this.$store.dispatch('editPost', {
          postId: this.editingPost.id,
          body,
        })

        this.editingPost = null
      } catch (err) {
        this.addNotification(
          'error',
          createErrorMessage(err.message, 'post edit')
        )
      }
    },

    async onConfirmDelete() {
      try {
        await this.$store.dispatch('deletePost', {
          postId: this.deletingPost.id,
        })

        this.deletingPost = null
      } catch (err) {
        this.addNotification(
          'error',
          createErrorMessage(err.message, 'post delete')
        )
      }
    },

    async onSubmitEditor(body) {
      if (this.editingPost) {
        await this.editPost(body)
      } else {
        await this.createPost(body)
      }
    },
  },
}
</script>

<template>
  <section>
    <Notifications />
    <NewPostButton
      @click="startPostCreate"
    />
    <PostEditor
      v-if="creatingPost || editingPost"
      :post="editingPost"
      @close="onCloseEditor"
      @submit="onSubmitEditor"
    />
    <Confirm
      v-if="deletingPost"
      message="Are you sure to delete this post?"
      @confirm="onConfirmDelete"
      @close="onCancelDelete"
    />
    <Article
      v-for="post in posts"
      :key="post.id"
      :title="post.attributes.title"
      :body="post.attributes.body"
      @edit="startPostEdit(post)"
      @delete="startPostDelete(post)"
    />
  </section>
</template>

<style lang="stylus">
</style>
