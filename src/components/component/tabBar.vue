<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" fixed>
      <van-tabbar-item icon="wap-home" to="/">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" to="/Category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" to="/ShoppingCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/userInfo">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    props : ['postVal'],
    data(){
      return {
        active : this.postVal,
      }
    },
    watch : {},
    methods : {}
  }
</script>
<style scoped>
  .van-tabbar{
    height:2.13rem;
  }
  .van-tabbar-item .van-icon{
    font-size:0.768rem;
    margin-bottom:0.213rem;
  }
  .van-tabbar-item{
    font-size:0.51rem;
  }
  .van-tabbar-item--active{
    color:#e5017d;
    /*font-size:0.51rem;*/
  }
</style>
