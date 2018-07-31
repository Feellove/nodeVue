<template>
  <div>
    <div class="navBar" style="margin-bottom:1.9rem">
      <van-nav-bar title="支付中心" left-text="返回" left-arrow right-text="订单中心" fixed @click-left="toBackOrder" @click-right="toOrder"></van-nav-bar>
    </div>
    <div>
      <van-radio-group v-model="payType" @change="changeType">
        <van-cell-group>
          <van-cell title="支付宝支付" clickable @click="payType = '支付宝支付'">
            <van-radio name="支付宝支付"/>
          </van-cell>
          <van-cell title="微信支付" clickable @click="payType = '微信支付'">
            <van-radio name="微信支付"/>
          </van-cell>
          <van-cell title="银行卡支付" clickable @click="payType = '银行卡支付'">
            <van-radio name="银行卡支付"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="bottom_btn" @click="sureOrder">
      <van-button type="danger" size="large"><span>{{payType}}</span><span>{{totalPrice | moneyFilter}}</span>元
      </van-button>
    </div>
    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" @confirm="confirm">
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {toMoney} from '@/filter/moneyFilter.js'
  import {Dialog} from 'vant';
  import {Toast} from 'vant';

  var uuid = require('node-uuid');
  export default {
    data(){
      return {
        payType : '支付宝支付',
        totalPrice : '',
        show : false,
        password : '',
        orderData : [],
        orderID : ''
      }
    },
    created(){
      this.orderData = this.$route.params.data
      this.totalPrice = this.$route.params.totalPrice / 100
      this.orderID = this.$route.params.id
    },
    filters : {
      moneyFilter(money){
        return toMoney(money)
      }
    },
    methods : {
      beforeClose(action, done){
        if(action === 'confirm'){
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      changeType(name){
        console.log(name);
        this.payType = name
      },
      toOrder(){
        this.$router.push({name : 'orderList'})
      },
      toBackOrder(){
        Dialog.confirm({
          title : '确定离开吗?',
          message : '您的订单将在20分钟内取消，请尽快完成支付'
        }).then(() =>{
          if(!this.orderID){
            let status = '待付款';
            this.insertOrder(status);
          }
          this.toOrder()
        }).catch(() =>{
        });
      },
      confirm(){
        let status = '待收货';
        if(!this.orderID){
          this.insertOrder(status);
        } else {
          this.updateOrder(this.orderID, status);
        }
        this.toOrder()
      },
      sureOrder(){
        this.show = true
      },
      updateOrder(id, status){
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
      insertOrder(status){
        let orderId = uuid.v1().replace(/-/g, '');
        axios({
          url : url.insertOrder,
          method : 'post',
          data : {id : orderId, status : status, price : this.totalPrice, orderData : this.orderData}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            console.log(response.data.message);
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
<style scoped>
  .bottom_btn{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
  }
</style>
