<template>
  <div>
    <div class="navBar" style="margin-bottom:2rem">
      <van-nav-bar title="支付中心" left-text="返回" left-arrow right-text="订单中心" fixed @click-left="toOrder" @click-right="toOrder"></van-nav-bar>
    </div>
    <div>
      <van-radio-group v-model="payType" @change="changeType">
        <van-cell-group>
          <van-cell title="支付宝支付" clickable @click="payType = '1'">
            <van-radio name="1"/>
          </van-cell>
          <van-cell title="微信支付" clickable @click="payType = '2'">
            <van-radio name="2"/>
          </van-cell>
          <van-cell title="银行卡支付" clickable @click="payType = '3'">
            <van-radio name="3"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        payType : '1'
      }
    },
    methods : {
      changeType(name){
        console.log(name);
      },
      //      getOrder(){},
      toOrder(){
        console.log(1);
      }
    }
  }
</script>
