import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入页面样式
import './assets/css/index.less'
// 按需引入elementui
import './plugins/element.js'
// 引入路由权限
import './permissions.js'
// VueLoopScroll滚动插件
import VueLoopScroll from 'vueloopscroll'
import 'vueloopscroll/lib/vueloopscroll.css'
Vue.use(VueLoopScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
