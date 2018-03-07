import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods/:goodsID',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
