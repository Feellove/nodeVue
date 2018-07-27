<template>
  <!--search bar layout-->
  <div class="search-bar">
    <van-search placeholder="请输入商品名称" @focus="toSearch"/>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods : {
      toSearch(){
        this.$router.push('/searchContent')
      }
    }
  }
</script>
<style>
  .search-bar .van-search{
    background-color:#e5017d !important;
    line-height:1.024rem;
  }
  .search-bar .van-search .van-icon-search{
    font-size:0.683rem;
  }
  .search-bar .van-search .van-cell{
    line-height:1.024rem;
    border-radius:0.171rem;
    padding:0.128rem 0.427rem 0.128rem 1.493rem;
  }
  .search-bar .van-field__control{
    font-size:0.512rem;
  }

</style>
