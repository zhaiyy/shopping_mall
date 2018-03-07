<template>
  <div>
    这是商品列表页面
    <span>{{$route.params.goodsID}}</span>
    <span>{{$route.params.name}}
      <router-link to="/goods/title">显示商品标题</router-link>
      <router-link to="/goods/image">显示商品图片</router-link>
    </span>
    <div>
      <router-view></router-view>

    </div>
    <router-link :to="{name:'cart',params:{cartId:123}}">跳转到购物车页面</router-link>
    <button @click="jump">button-跳转到购物车页面</button>

  </div>
</template>
<style>

</style>
<script>
  import HeaderComponent from '../components/header.vue'
  import OtherComponent from '../components/other.vue'
  export default {
    name: 'goodsList',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      jump(){
        //this.$router.push('/cart')
        //this.$router.push({name:'cart'})
        this.$router.push({path:'/cart?goodsId=123'})
      }
    }
  }
</script>
