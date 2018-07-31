<template>
  <div style="background-color:#efefef" v-lazy="bannerPicArray.imageUrl">
    <!--search-bar area-->
    <search-bar></search-bar>
    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.image" @click="goDetail(banner.goodsId)"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type-bar area-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index" @click="toMallCategory(cate.mallCategoryId)">
        <img v-lazy="cate.image"/><span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item" @click="goDetail(item.goodsId)">
              <img :src="item.image" width="80%"/>
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor area-->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row>
            <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
              <goods-info :goods="{goodsId:item.goodsId,goodsImage:item.image,goodsName:item.name,goodsPrice:item.price}"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
    <!--tab-bar area-->
    <tab-bar :postVal="postVal"></tab-bar>
  </div>
</template>

<script>
  import axios from "axios";
  import url from '@/serviceAPI.config.js'
  import "swiper/dist/css/swiper.css";
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  import floorComponent from "../component/floorComponent";
  import {toMoney} from "@/filter/moneyFilter.js";
  import goodsInfo from "../component/goodsInfoComponent";
  import searchBar from "../component/searchBar.vue"
  import tabBar from "../component/tabBar.vue"

  export default {
    components : {
      swiper,
      swiperSlide,
      floorComponent,
      goodsInfo,
      searchBar,
      tabBar
    },
    data(){
      return {
        postVal : 0,
        swiperOption : {
          slidesPerView : 3
        },
        bannerPicArray : [],
        category : [],
        adBanner : "",
        recommendGoods : [],
        floor1 : [], //楼层1的数据
        floor2 : [], //楼层2的数据
        floor3 : [], //楼层3的数据
        floorName : {}, //楼层名称
        hotGoods : [] //热卖商品
      };
    },
    created(){
      axios({
        url : url.getShoppingMallInfo,
        method : "get"
      })
        .then(response =>{
          if(response.status == 200){
            this.category = response.data.data.category;
            this.adBanner = response.data.data.advertesPicture; //获得广告图片
            this.bannerPicArray = response.data.data.slides; //轮播图片
            this.recommendGoods = response.data.data.recommend; //推荐商品
            this.floor1 = response.data.data.floor1; //楼层1数据
            this.floor2 = response.data.data.floor2; //楼层2数据
            this.floor3 = response.data.data.floor3; //楼层3数据
            this.floorName = response.data.data.floorName;
            this.hotGoods = response.data.data.hotGoods; //热卖商品
          }
        })
        .catch(error =>{});
    },
    methods : {
      toMallCategory(id){
        this.$router.push({
          path : "/Category",
          query : {id : id}
        });
      },
      goDetail(id){
        this.$router.push({name : 'Goods', query : {goodsId : id}})
      }
    },
    filters : {
      moneyFilter(money){
        return toMoney(money);
      }
    }
  };
</script>

<style lang="scss" scoped="" type="text/scss">
  @mixin flex($display, $direction, $wrap){
    display:$display;
    flex-direction:$direction;
    flex-wrap:$wrap;
  }
  .swiper-area{
    clear:both;
    overflow:hidden;
    width:16rem;
  }
  .van-swipe-item img{
    width:16rem;
  }
  .type-bar{
    background-color:#fff;
    margin:0 0.3rem 0.3rem 0.3rem;
    border-radius:0.3rem;
    font-size:0.6rem;
    @include flex(flex, row, nowrap);
  }
  .type-bar div{
    padding:0.3rem;
    font-size:0.51rem;
    text-align:center;
  }
  .type-bar div img{
    width:2.3rem;
    height:2.3rem;
  }
  .recommend-area{
    background-color:#fff;
    margin-top:0.3rem;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:0.6rem;
    padding:0.2rem;
    color:#e5017d;
  }
  .recommend-body{
    border-bottom:1px solid #eee;
  }
  .recommend-item{
    width:99%;
    border-right:1px solid #eee;
    font-size:0.51rem;
    text-align:center;
  }
  .floor-anomaly{
    display:flex;
    flex-direction:row;
    background-color:#fff;
    border-bottom:1px solid #ddd;
  }
  .floor-anomaly div{
    width:10rem;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .floor-one{
    border-right:1px solid #ddd;
  }
  .floor-two{
    border-bottom:1px solid #ddd;
  }
  .floor-rule{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    background-color:#fff;
  }
  .floor-rule div{
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    width:10rem;
    border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right:1px solid #ddd;
  }
  .hot-area{
    text-align:center;
    font-size:0.6rem;
    height:1.8rem;
    line-height:1.8rem;
  }
  .hot-goods{
    padding-bottom:3.2rem;
  }
</style>
