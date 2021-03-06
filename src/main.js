// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import vueScroll from 'vue-infinite-scroll'
import Store from './store'

Vue.use(Vuex)
Vue.use(vueScroll)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})

const store = new Vuex.Store(Store)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
