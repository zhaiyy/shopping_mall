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
          <a href="javascript:void(0)" :class="{'default':true, 'cur':!sort}" @click="sortByDefault">Default</a>
          <a href="javascript:void(0)" :class="{'price':true, 'cur':sort}" @click="sortByPrice">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd  @click="setPriceFilter('all')"><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}">All</a></dd>
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
                      <a href="javascript:;" class="btn btn--m" @click="addCart(key.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                   infinite-scroll-distance="10" infinite-scroll-throttle-delay="500">
                <img v-if='!isLoadingAll' src="@/assets/loading-spinning-bubbles.svg">
                <span v-if='isLoadingAll'>加载完成</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
  <model :mdShow="mdShow" v-on:close="closeModel">
    <p slot="message">请先登录否则无法加入</p>
    <div slot="btnGruop">
      <a class="btn btn--m" @click="mdShow = false">关闭</a>
    </div>
  </model>
  <model :mdShow="mdShowCart" v-on:close="closeModel">
    <p slot="message">
      <svg class="icon-status-ok">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
      </svg>
      <span>加入购物车成功</span>
    </p>
    <div slot="btnGruop">
      <a class="btn btn--m" @click="mdShowCart = false">继续购物</a>
      <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
    </div>
  </model>
  <nav-footer></nav-footer>
  </div>
</template>
<style>

</style>
<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import axios from 'axios'
 // import '@/mock/goods'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
  import Model from '@/components/model'
 export default {
   name: 'goodsList',
   components: {
     NavHeader,
     NavFooter,
     NavBread,
     Model
   },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        goodsList:[],
        busy:true,
        mdShow:false,
        mdShowCart:false,
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
        isLoadingAll:false,
        sort :false,
        params:{
          page:1,
          pageSize:10,
          sort:''
        }
      }
    },
   created(){

   },
   mounted(){
     this.getGoodslist()
   },

   methods:{
     getGoodslist(flag = false){
       axios.get('/api/goods',{params:this.params}).then(res=>{
         if(res.data.status){
           alert(res.data.msg)
           return
         }
         if(flag){
           this.goodsList =  this.goodsList.concat(res.data.result.data)
           if(res.data.result.count <this.params.pageSize || res.data.result.count == 0){
             this.busy = true
             this.isLoadingAll = true
           }
         }else{
           this.isLoadingAll = res.data.result.count == 0
           this.goodsList = res.data.result.data
           this.busy = false;
         }
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
       this.page = 1;
       this.overLayFlag = false;
       const price = this.priceFilter[this.priceChecked];
       this.params = Object.assign({},this.params,{
         sort:'prodcutPrice',
         page:1,
         priceChecked:price?price:''
       })
       this.getGoodslist()
     },
     sortByDefault(){
       this.sort = false
       this.params = Object.assign({},this.params,{
         sort:'',
         page:1
       })
       this.getGoodslist();
     },
     sortByPrice(){
       this.sort = true
       this.params = Object.assign({},this.params,{
         sort:'prodcutPrice',
         page:1
       })
       this.getGoodslist();
     },
     addCart(id){
       axios.post('/api/goods/addCart',{productId:id}).then(res=>{
         if(res.data.status){
           alert(res.data.msg)
         }else{
           this.mdShowCart = true;

          // alert('添加成功')
         }
       })
     },
     loadMore(){
       this.busy =false
       setTimeout(() => {
         let page = parseInt(this.params.page)
         page = page+1
         this.params = Object.assign({},this.params,{
           page:page
         })
         this.getGoodslist(true);
         //this.busy = true;
       }, 1000);
     },
     closeModel(){
       this.mdShow = false;
       this.mdShowCart = false;
     }
    }
  }
</script>
