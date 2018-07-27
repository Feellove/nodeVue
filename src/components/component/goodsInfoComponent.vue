<template>
  <div class="goods-info" @click="goGoodsPage">
    <div v-if="goods.goodsOldPrice">
      <img :src="goods.goodsImage" class="subImage">
      <div class="subName">{{goods.goodsName}}</div>
      <div class="subPrice">
        <span class="subNewPrice">￥{{goods.goodsPrice | moneyFilter}}</span><span class="subOldPrice">￥{{goods.goodsOldPrice | moneyFilter}}</span>
      </div>
    </div>
    <div v-else>
      <div class="goods-image">
        <img v-lazy="goods.goodsImage" width="90%"/>
      </div>
      <div class="goods-name">{{goods.goodsName}}</div>
      <div class="goods-price">￥{{goods.goodsPrice | moneyFilter}}</div>
    </div>
  </div>
</template>

<script>
  import {toMoney} from "@/filter/moneyFilter.js";

  export default {
    props : ["goods"],
    filters : {
      moneyFilter(money){
        return toMoney(money);
      }
    },
    methods : {
      goGoodsPage(){
        this.$router.push({name : 'Goods', query : {goodsId : this.goods.goodsId}})
      }
    }
  };
</script>

<style scoped>
  .goods-name{
    padding:0 0.34rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .subImage{
    width:5.8rem;
    height:5.8rem;
  }
  .subName{
    font-size:0.555rem;
    color:#ef694f;
    height:1.621rem;
    text-align:center;
    padding-top:0.6rem;
    overflow:hidden;
  }
  .subPrice{
    text-align:center;
  }
  .subNewPrice{
    color:#ef694f;
    font-size:0.682rem;
  }
  .subOldPrice{
    text-decoration:line-through;
    font-size:0.512rem;
    color:#ccc;
    padding-left:0.2rem;
  }
</style>
