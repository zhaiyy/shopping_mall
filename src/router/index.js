import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goodsList'
import Cart from '@/views/cart'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
  ]
})
