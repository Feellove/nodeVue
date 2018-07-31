<template>
  <div style="background-color:#efefef;padding-bottom:2.13rem">
    <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="toOrderList(1,'待付款')"/>
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="pending-orders" @click="toOrderList(2,'待收货')"/>
        待收货
      </van-col>
      <van-col span="6">
        <van-icon name="pending-deliver" @click="toOrderList(3,'已完成')"/>
        已完成</router-link>
      </van-col>
      <van-col span="6">
        <van-icon name="pending-evaluate" @click="toOrderList(4,'已取消')"/>
        已取消
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link to="/orderList"/>
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell icon="exchange" title="我的积分" is-link/>
      <van-cell icon="gold-coin" title="我的优惠券" is-link/>
      <van-cell icon="gift" title="我收到的礼物" is-link/>
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell icon="location" title="地址管理" is-link/>
      <van-cell icon="edit-data" title="修改密码" is-link/>
      <van-cell icon="close" title="退出登录" is-link @click="loginOut"/>
      <van-cell icon="info-o" title="关于我们" is-link/>
    </van-cell-group>
    <!--tab-bar area-->
    <tab-bar :postVal="postVal"></tab-bar>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  import tabBar from '../component/tabBar.vue'

  export default {
    components : {
      tabBar
    },
    data(){
      return {
        postVal : 3,
      }
    },
    methods : {
      loginOut(){
        localStorage.userInfo = ''
        this.$router.push('/login')
      },
      toOrderList(index, val){
        this.$router.push({name : 'orderList', query : {index : index, value : val}})
      }
    }
  };
</script>

<style scoped>
  .user-poster{
    width:100%;
    display:block;
  }
  .user-group{
    margin-bottom:.3rem;
  }
  .user-links{
    padding:15px 0;
    font-size:12px;
    text-align:center;
    background-color:#fff;
  }
  .van-icon{
    display:block;
    font-size:24px;
  }

</style>
