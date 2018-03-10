<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>goods</span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd  @click="priceChecked = 'all'"><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)"  @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(key,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+key.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{key.productName}}</div>
                    <div class="price">{{key.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
              <img src="@/assets/loading-spinning-bubbles.svg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>

</style>
<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import axios from 'axios'
  import '@/mock/goods'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
 export default {
   name: 'goodsList',
   components: {
     NavHeader,
     NavFooter,
     NavBread
   },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        goodsList:[],
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          },
        ],
        priceChecked:'all',
        filterBy:false,
        overLayFlag:false,
      }
    },
   created(){

   },
   mounted(){
     this.getGoodslist()
   },
   methods:{
     getGoodslist(){
       axios.get('/api/goods').then(res=>{
         this.goodsList = res.data.result
       })
     },
     showFilter(){
        this.filterBy = true;
        this.overLayFlag = true;
     },
     closePop(){
       this.filterBy = false;
       this.overLayFlag = false;
     },
     setPriceFilter(index){
       this.priceChecked = index;
       this.filterBy = false;
       this.overLayFlag = false;
     }
    }
  }
</script>
