// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入通用样式
import '@/common/reset.js'
import '@/common/styles/index.css'

// 引入mint-ui
import { Swipe, SwipeItem } from 'mint-ui'
// import 'mint-ui/lib/style.css'
// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.config.productionTip = false

// 监听全局路由的变化,控制底部工具栏的显示与隐藏
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/songlist' || to.path === '/singer' || to.path === '/rank') {
    store.state.isNav = true
  } else {
    store.state.isNav = false
  }
  if (to.path === '/lrc') {
    store.state.hideBol = true
  } else {
    store.state.hideBol = false
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
