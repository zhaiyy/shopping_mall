<template>
  <div>
    这是商品列表页面
    <span>{{$route.params.goodsID}}</span>
  </div>
</template>
<style>
  body{
    background-color: red;
  }
</style>
<script>
  import HeaderComponent from '../components/header.vue'
  import OtherComponent from '../components/other.vue'
</script>
