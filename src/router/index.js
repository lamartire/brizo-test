import Vue from 'vue'
import VueRouter from 'vue-router'

import { Posts } from 'pages'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Posts,
    },
  ],
})
