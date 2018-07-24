<template>
  <!--search bar layout-->
  <div class="search-bar">
    <van-row>
      <van-col span="3"><img :src="locationIcon" width="80%" class="location-icon"/></van-col>
      <van-col span="16">
        <input type="text" class="search-input" placeholder="搜索"/>
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        locationIcon : require("../../assets/images/location.png")
      }
    }
  }
</script>
<style scoped>
  .search-bar{
    background-color:#e5017d;
    line-height:2.2rem;
  }
  .search-input{
    width:100%;
    height:1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom:solid 1px !important;
    background-color:#e5017d;
    color:#fff;
    font-size:0.6rem;
  }
  ::-webkit-input-placeholder{ /* WebKit browsers */
    font-size:0.6rem;
    color:#fff;
  }
  :-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
    font-size:0.6rem;
    color:#fff;
  }
  ::-moz-placeholder{ /* Mozilla Firefox 19+ */
    font-size:0.6rem;
    color:#fff;
  }
  :-ms-input-placeholder{ /* Internet Explorer 10+ */
    font-size:0.6rem;
    color:#fff;
  }
  .location-icon{
    padding-top:0.4rem;
    padding-left:0.3rem;
  }
  .van-button--mini{
    width:2.1rem;
    height:0.94rem;
    line-height:0.85rem;
    font-size:0.427rem;
  }
  .van-tabbar-item__icon .van-icon.van-icon-wap-home{
    font-size:.8rem !important;
  }
</style>
