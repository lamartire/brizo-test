import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'

import { router } from 'router'
import { store } from 'store'

import App from './App'

Vue.use(ElementUI, {
  locale,
})

/* eslint-disable */
new Vue({
  el: '#mount-point',
  render: h => h(App),
  router,
  store,
})
