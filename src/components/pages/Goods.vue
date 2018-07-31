<template>
  <div>
    <div class="navBar">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow fixed @click-left="onClickLeft"/>
    </div>
    <div class="topImage">
      <img :src="goodsInfo.IMAGE1" width="100%" :onerror="errorImg"/>
    </div>
    <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-content">
      <van-tabs>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评价">
          <div style="height: 2rem;font-size:0.712rem">敬请期待....</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn"/>
        <van-goods-action-mini-btn icon="cart" text="购物车" :info="info" to="/ShoppingCart?show=true"/>
        <van-goods-action-big-btn text="加入购物车" @click="insertCart"/>
        <van-goods-action-big-btn text="立即购买" primary/>
      </van-goods-action>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  import {toMoney} from '@/filter/moneyFilter.js'

  export default {
    data(){
      return {
        goodsId : '',
        info : null,
        goodsInfo : {},//商品详细数据
        errorImg : 'this.src="' + require('@/assets/images/timg.jpg') + '"'
      }
    },
    created(){
      this.goodsId = this.$route.query.goodsId
      this.getInfo()
    },
    filters : {
      moneyFilter(money){
        return toMoney(money)
      }
    },
    methods : {
      onClickLeft(){
        this.$router.go(-1)
      },
      getInfo(){
        axios({
          url : url.getDetailGoodsInfo,
          method : 'post',
          data : {
            goodsId : this.goodsId
          }
        })
          .then(response =>{
            if(response.data.code == 200 && response.data.message){
              this.goodsInfo = response.data.message
            } else {
              Toast('服务器错误，数据取得失败')
            }
            console.log(this.goodsInfo)
          })
          .catch(error =>{
            console.log(error)
          })
      },
      onClickMiniBtn(){
        Toast('点击图标');
      },
      //加入购物车
      insertCart(){
        this.info++
        axios({
          url : url.insertAllCart,
          method : 'post',
          data : {
            ID : this.goodsInfo.ID,
            NAME : this.goodsInfo.NAME,
            PRICE : this.goodsInfo.PRESENT_PRICE,
            IMAGE : this.goodsInfo.IMAGE1,
            NUM : 1
          }
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.info++
            Toast('加入成功');
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            console.log(error)
          })

      },

    }
  }
</script>
<style>
  .goods-bottom .van-goods-action-mini-btn{
    height:2.13rem;
    font-size:0.427rem;
  }
  .goods-bottom .van-goods-action-big-btn{
    height:2.13rem;
    line-height:2.13rem;
    font-size:0.682rem;
  }
  .goods-bottom .van-goods-action{
    z-index:999;
  }
  .goods-content .van-tabs--line{
    padding-top:1.877rem;
  }
  .goods-content .van-tabs__nav--line{
    padding-bottom:0.64rem;
  }
  .goods-bottom .van-goods-action-mini-btn__icon{
    font-size:0.853rem;
  }
  .goods-content .van-tabs__line{
    bottom:0.64rem;
    height:0.085rem;
  }
  .goods-content .van-tabs--line .van-tabs__wrap{
    height:1.878rem;
  }
  .goods-content .van-tab{
    padding:0 0.213rem;
    font-size:0.6rem;
    line-height:1.878rem;
  }
  .navBar .van-nav-bar{
    height:1.963rem;
    line-height:1.963rem;
  }
  .navBar .van-nav-bar__left, .navBar .van-nav-bar__right{
    font-size:0.6rem;
  }
  .navBar .van-nav-bar__title{
    font-size:0.682rem;
  }
</style>
<style scoped>
  .detail{
    font-size:0;
  }
  .navBar{
    font-size:0.683rem;
    height:1.96rem;
  }
  .goods-name{
    font-size:0.768rem;
    padding-left:0.4rem;
    padding-bottom:0.6rem;
  }
  .goods-price{
    font-size:0.768rem;
    color:#f00;
    padding:0.4rem;
  }
  .goods-content{
    margin-bottom:2.4rem;
  }
</style>
