import Vue from 'vue'
import VueRouter from 'vue-router'

import { Posts, Post } from 'pages'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Posts,
    },
    {
      path: '/:id',
      component: Post,
    },
  ],
})
