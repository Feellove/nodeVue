<template>
  <div class="item_list">
    <form action="/search" class="fixedTop">
      <van-search placeholder="请输入商品名称" v-model="searchVal" @search="resetInit" @cancel="onCancel" @input="changeVal" showAction/>
    </form>
    <div class="searchContent" v-if="searchHistory.length&&showHistory">
      <div class="f_left">历史搜索</div>
      <div class="f_right" @click="clearAllHistory">
        <van-icon name="delete" style="font-size: 0.512rem;margin-right: 0.128rem"/>
        清空历史记录
      </div>
      <van-list>
        <van-cell v-for="item in searchHistory" :key="item.NAME" :title="item.NAME" @click="searchName(item.NAME)">
          <span @click="clearOneHistory(item.NAME)"><van-icon name="close" color="#ccc"/></span></van-cell>
      </van-list>
    </div>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    <div class="searchContent" v-if="searchResult.length&&!emptyResult">
      <span style="margin-bottom:0.4rem;display:inline-block">结果如下：</span>
      <div class="searchItem" v-for="item in searchResult" :key="item.NAME">
        <van-row>
          <van-col span="8"><img :src="item.IMAGE1" width="100%"></van-col>
          <van-col span="16"><span class="ItemName">{{item.NAME}}</span></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'

  export default {
    data(){
      return {
        searchVal : '',
        showArrow : false,
        searchHistory : [],//搜索历史
        searchResult : [],//搜索结果
        loading : true,
        finished : true,
        emptyResult : false, // 搜索结果为空时显示
        showHistory : true, // 是否显示历史记录，只有在返回搜索结果后隐藏
      }
    },

    activated(){
    },

    deactivated(){
      document.getElementById('app').removeEventListener("scroll", this.scrollShowArrow);
    },

    created(){
      this.initData()
    },

    methods : {
      resetInit(){
        if(this.searchVal !== ''){
          axios({
            url : url.insertKeyword,
            method : 'post',
            data : {NAME : this.searchVal}
          }).then(response =>{
            if(response.data.code == 200 && response.data.message){
              console.log(response.data.message);
            } else {
              Toast('服务器错误，数据取得失败')
            }
          })
            .catch(error =>{
              console.log(error);
            })
          this.onSearchResult(this.searchVal)
        }
      },
      initData(){
        axios({
          url : url.checkKeyword,
          method : 'post',
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            console.log(response.data.message);
            this.searchHistory = response.data.message;
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            console.log(error);
          })
      },
      scrollShowArrow(){
        this.showArrow = document.getElementById('app').scrollTop > 120;
      },
      itemClick(i){
        this.$router.push({name : "detail", params : {itemId : i}});
      },
      //监听input值的变化
      changeVal(val){
        if(val === ''){
          this.showHistory = true;
          this.searchResult = [];
          this.emptyResult = false;
          this.initData()
        } else {
          this.onSearchResult(val)
        }
      },
      onSearchResult(val){
        axios({
          url : url.checkGoods,
          method : 'post',
          data : {name : val}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.searchResult = response.data.message;
            console.log(this.searchResult);
            if(this.searchResult.length === 0){
              this.emptyResult = true;
            } else {
              this.emptyResult = false;
            }
          } else {
            Toast('服务器错误，数据取得失败')
          }
        }).catch(error =>{
          console.log(error);
        })
        this.showHistory = false;
      },
      //取消
      onCancel(){
        this.$router.go(-1)
      },
      //清除所有历史记录
      clearAllHistory(){
        this.clearOneHistory();
      },
      //清除单个历史记录
      clearOneHistory(name){
        axios({
          url : url.deleteKeyword,
          method : 'post',
          data : {name : name ? name : ""}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            console.log(response.data.message);
            this.initData();
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            console.log(error);
          })
      },
      //点击单个历史记录搜索
      searchName(name){
        this.searchVal = name;
        this.resetInit();
        console.log(this.searchVal);
      },
      onLoad(){
      }
    }
  }
</script>

<style scoped>
  .fade-enter,
  .fade-leave-to{
    opacity:0;
  }
  .fade-enter-active,
  .fade-leave-active{
    transition:all .5s;
  }
  .item_list{
    background-color:#fff;
    padding-top:50px;
    box-sizing:border-box;
  }
  .fixedTop{
    position:fixed;
    width:100%;
    top:0;
    z-index:999;
  }
  .items_loading{
    margin:0 auto;
  }
  .backTop{
    position:fixed;
    right:20px;
    bottom:20px;
    font-size:24px;
  }
  .searchContent{
    font-size:0.6rem;
    padding:0.6rem 0.427rem;
  }
  .searchItem{
    border-top:0.043rem solid #efefef;
  }
  .ItemName{
    line-height:118px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
    width:100%;
    display:inline-block;
  }
  .f_left{
    float:left;
  }
  .f_right{
    float:right;
  }
  .search_none{
    text-align:center;
    font-size:0.682rem;
    margin-top:0.4rem;
  }
  .searchItem:last-child{
    border-bottom:0.043rem solid #efefef;
  }
</style>
