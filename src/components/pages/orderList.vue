<template>
  <div id="orderList">
    <div class="navBar">
      <van-nav-bar title="我的订单" left-text="返回" left-arrow fixed @click-left="toBack"></van-nav-bar>
    </div>
    <div class="tabList">
      <van-tabs v-model="active" :swipe-threshold="tabNum" sticky @click="chooseList">
        <van-tab v-for="tab in tabList" :title="tab" :key="tab">
          <div class="orderList" style="padding-top:1.9rem">
            <van-panel :title="list.NAME" :status="list.STATUS" v-for="(list,index) in orderList" :key="index">
              <div>
                <van-card :title="list.NAME" :desc="list.ID" :price="list.PRICE" :thumb="list.IMAGE"/>
              </div>
              <div slot="footer">
                <van-button size="small" type="danger" v-if="list.STATUS=='待付款'" @click="toPlay(list.PRICE,list.ID)">去支付</van-button>
                <van-button size="small" type="danger" v-if="list.STATUS=='待收货'" @click="confirmReceipt(list.ID,'已完成')">确认收货</van-button>
                <van-button size="small" type="danger" v-if="list.STATUS=='已完成'" @click="buyAgain(list.ID,list.NAME,list.PRICE,list.IMAGE)">再次购买</van-button>
                <van-button size="small" type="danger" v-if="list.STATUS=='已取消'">评价</van-button>
              </div>
            </van-panel>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Dialog} from 'vant'

  export default {
    data(){
      return {
        orderList : [],
        imageURL : '',
        tabList : ['全部', '待付款', '待收货', '已完成', '已取消'],
        active : 0,
        tabNum : 5,
        status : '',
      }
    },
    created(){
      let value = this.$route.query.value ? this.$route.query.value : '全部';
      this.active = this.$route.query.index ? this.$route.query.index : 0;
      this.initList(value);

    },
    methods : {
      toBack(){
        this.$router.go(-1)
      },
      initList(status){
        axios({
          url : url.checkOrder,
          method : 'post',
          data : {status : status}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.orderList = response.data.message
            console.log(this.orderList);
          } else {
            Toast('服务器错误，数据取得失败')
          }
        }).catch(error =>{
          console.log(error)
        })
      },
      chooseList(index, val){
        this.initList(val)
      },
      //去支付
      toPlay(totalPrice, id){
        this.$router.push({name : 'payment', params : {totalPrice : totalPrice * 100, id : id}})
      },
      //确认收货
      confirmReceipt(id, status){
        axios({
          url : url.updateOrder,
          method : 'post',
          data : {id : id, status : status}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
          } else {
            Toast('服务器错误，数据取得失败')
          }
        }).catch(error =>{
          console.log(error)
        })
      },
      //再次购买
      buyAgain(ID, NAME, PRICE, IMAGE){
        axios({
          url : url.insertAllCart,
          method : 'post',
          data : {
            ID : ID,
            NAME : NAME,
            PRICE : PRICE,
            IMAGE : IMAGE,
            NUM : 1
          }
        }).then(response =>{

          if(response.data.code == 200 && response.data.message){

            Toast('加入成功');
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            Dialog.confirm({
              title : '商品已加入购物车',
              //              message: '',
              confirmButtonText : '前往购物车',
              cancelButtonText : '关闭'
            }).then(() =>{
              // on confirm
              this.$router.push({name : 'ShoppingCart'})
            }).catch(() =>{
              // on cancel
            });
            console.log(error)
          })

      }
    }
  }
</script>
<style>
  #orderList .van-panel__footer{
    text-align:right;
  }
  #orderList .van-tabs__wrap{
    top:1.9rem;
  }
</style>
