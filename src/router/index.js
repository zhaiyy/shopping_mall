import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/goodsList'
import Title from '@/views/title'
import Image from '@/views/image'
import Cart from '@/views/cart'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      components:{
        default:GoodsList,
        title:Title,
        image:Image,
      } ,
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: Cart,
    },
  ]
})
