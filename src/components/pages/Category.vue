<template>
  <div>
    <search-bar></search-bar>
    <div class="tab-bar">
      <van-tabs :active="active" :swipe-threshold="tabNum" sticky @click="chooseCategory" ref="itemId">
        <van-tab v-for="(item,index) in tabs" :title="item.MALL_CATEGORY_NAME" :key="index" :id="item.ID">
          <van-row>
            <van-col span="5">
              <div id="leftNav">
                <ul class="left-ul">
                  <li v-for="(item,index) in categories" :key="index" @click="chooseMenu(index,item.ID)" :class="{'activeLi': index==showIndex}">{{item.MALL_SUB_NAME}}</li>
                </ul>
              </div>
            </van-col>
            <van-col span="19">
              <div class="right-content">
                <van-row>
                  <van-col span="11" v-for="(item,index) in categorySub" :key="index" style="background-color:#fff;height:10rem;margin:0 0.26rem 0.26rem;">
                    <goods-info :goods="{goodsId:item.ID,goodsImage:item.IMAGE1,goodsName:item.NAME,goodsPrice:item.PRESENT_PRICE,goodsOldPrice:item.ORI_PRICE}"></goods-info>
                  </van-col>
                </van-row>
              </div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
    <tab-bar :postVal="postVal"></tab-bar>
  </div>
</template>
<script>
  import axios from "axios";
  import url from "@/serviceAPI.config.js"
  import {Toast} from 'vant'
  import searchBar from '../component/searchBar.vue'
  import tabBar from '../component/tabBar.vue'
  import {toMoney} from '@/filter/moneyFilter.js'
  import goodsInfo from "../component/goodsInfoComponent";

  export default {
    components : {
      searchBar, tabBar, goodsInfo
    },
    data(){
      return {
        active : 0,
        showIndex : 0,
        postVal : 1,
        tabNum : 5,
        tabs : [],
        checked : true,
        categories : [],
        categorySub : [],
        id : '',
      };
    },
    created(){
      this.initCateGory()

    },
    computed : {},
    filters : {
      moneyFilter(money){
        return toMoney(money);
      }
    },
    methods : {
      //初始化tabs
      initCateGory(){
        axios({
          url : url.getCategoryList,
          method : 'get'
        })
          .then(response =>{
            if(response.data.code == 200 && response.data.message){
              this.tabs = response.data.message
              this.id = this.$route.query.id ? this.$route.query.id : this.tabs[0].ID
              this.active = this.id - 1
              this.chooseCategory(this.id)
            } else {
              Toast('服务器错误，数据获取失败')
            }
          })
          .catch(error =>{
            console.log(error)
          })
      },
      //初始化得到大类
      chooseCategory(id, title){
        var categoryId = title ? this.tabs[id].ID : id
        this.showIndex = 0
        axios({
          url : url.getCategorySubList,
          method : 'post',
          data : {categoryId : categoryId}
        })
          .then(response =>{
            if(response.data.code == 200 && response.data.message){
              this.categories = response.data.message
              this.getCategorySubByCategoryId(this.categories[0].ID)
            } else {
              Toast('服务器错误，数据获取失败')
            }
          })
          .catch(error =>{
            console.log(error)
          })

      },
      //大类切换
      chooseMenu(index, categoryId){
        this.showIndex = index
        this.getCategorySubByCategoryId(categoryId)
      },
      //根据大类ID读取小类类别列表
      getCategorySubByCategoryId(categoryId){
        axios({
          url : url.getGoodsListByCategorySubID,
          method : 'post',
          data : {categoryId : categoryId}
        })
          .then(response =>{
            if(response.data.code == 200 && response.data.message){
              this.categorySub = response.data.message
            } else {
              Toast('服务器错误，数据取得失败')
            }
          })
          .catch(error =>{
            console.log(error)
          })
      }
    }
  }
</script>
<style>
  .tab-bar .van-tab{
    font-size:0.6rem;
    line-height:1.878rem;
  }
  .tab-bar .van-tabs--line{
    padding-top:1.878rem;
  }
  .tab-bar .van-tabs--line .van-tabs__wrap{
    height:1.878rem;
  }
</style>
<style scoped>
  .tab-bar .van-tab span{
    font-size:0.6rem;
  }
  .tab-bar .left-ul{
    font-size:0.6rem;
    background-color:#fff;
  }
  .tab-bar .left-ul > li{
    border-bottom:1px solid #efefef;
    text-align:center;
    line-height:2rem;
    margin-left:0.3rem;
  }
  .tab-bar .left-ul > li.activeLi{
    background-color:#efefef;
  }
  .tab-bar .right-content{
    background-color:#efefef;
    margin-bottom:2.13rem;
    padding-top:0.2rem;
    text-align:center;
    font-size:0.6rem;
  }
</style>
