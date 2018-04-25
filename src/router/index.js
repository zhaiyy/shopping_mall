import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goodsList'
import Cart from '@/views/cart'
import Address from '@/views/address'
import OrderList from '@/views/orderList'


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
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderList/:addressId',
      name: 'OrderList',
      component: OrderList
    },
  ]
})
