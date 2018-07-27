<template>
  <div>
    <div class="navBar">
      <!--<van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight" v-if="this.show">-->
      <!--<van-icon name="edit" slot="right"/>-->
      <!--</van-nav-bar>-->
      <van-nav-bar title="购物车" fixed @click-right="edit" v-if="!completeState">
        <van-icon name="edit" slot="right"/>
      </van-nav-bar>
      <van-nav-bar title="购物车" right-text="完成" fixed @click-right="completeEdit" v-else></van-nav-bar>
    </div>
    <div class="shoppingContent">
      <van-checkbox-group v-model="checkedGoods" @change="setCheckSingle">
        <van-row v-for="(item,index) in carts" :key="index">
          <van-col span="3">
            <div class="singleCheck">
              <van-checkbox :key="item.ID" :name="item"></van-checkbox>
            </div>
          </van-col>
          <van-col span="7">
            <div class="singleImg">
              <img :src="item.IMAGE" height="80%"/>
            </div>
          </van-col>
          <van-col span="14">
            <div class="singleContent">
              <span class="singleTitle">{{item.NAME}}</span>
              <span class="singlePrice">￥{{item.PRICE | moneyFilter}}</span> <span class="singleStepper">
            <van-stepper :default-value="item.NUM" @change="changeNum(item.ID,index)" ref="stepValue"/></span>
            </div>
          </van-col>
        </van-row>
      </van-checkbox-group>
    </div>
    <div v-if="!cartsSate">
      <div class="account" v-if="!editState">
        <van-submit-bar style="bottom: 2.13rem" :price="totalPrice" button-text="去结算" @submit="cartSubmit">
          <van-checkbox v-model="checked" @change="setCheckAll" style="padding: 0 0.6rem;">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div class="account" v-else>
        <van-submit-bar style="bottom: 2.13rem" button-text="删除" @submit="cartDel">
          <van-checkbox v-model="checked" @change="setCheckAll" style="padding: 0 0.6rem;">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <div v-else style="font-size:0.6rem;color:#ccc;text-align:center">
      <van-icon name="cart" style="font-size:1.28rem"></van-icon>
      购物车为空，请先选择心仪的商品加入
    </div>
    <tab-bar :postVal="postVal"></tab-bar>
  </div>

</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  import {toMoney} from '@/filter/moneyFilter.js'
  import tabBar from '../component/tabBar.vue'

  export default {
    components : {
      tabBar
    },
    data(){
      return {
        checked : false,
        show : false,
        checkedGoods : [],
        editState : false,
        completeState : false,
        cartsSate : false,
        value : 1,
        postVal : 2,
        carts : [],
        totalMoney : ''
      }
    },
    created(){
      this.show = this.$route.query.show
      this.initCart()
    },
    filters : {
      moneyFilter(money){
        return toMoney(money)
      },
      totalFilter(money, num){
        return totalMoney(money, num)
      }
    },
    computed : {
      totalPrice(){
        return this.carts.reduce((total, item) => total + (this.checkedGoods.indexOf(item) !== -1 ? item.PRICE * 100 * item.NUM : 0), 0);
      },
    },
    methods : {
      onClickLeft(){
        this.$router.go(-1)
      },
      edit(){
        this.editState = true;
        this.completeState = true;
      },
      completeEdit(){
        this.editState = false;
        this.completeState = false;
      },
      //初始化购物车
      initCart(){
        axios({
          url : url.checkCart,
          method : 'post',
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.carts = response.data.message;
            if(this.carts.length === 0){
              this.cartsSate = true
            }
            console.log(this.carts);
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            console.log(error)
          })

      },
      //改变数量
      changeNum(id, index){
        let num = this.$refs.stepValue[index].$data.currentValue
        let cartId = id
        axios({
          url : url.updateCart,
          method : 'post',
          data : {cartId : cartId, num : num}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            console.log(response.data.message);
            this.carts = response.data.message;
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
          .catch(error =>{
            console.log(error)
          })
      },
      setCheckSingle(val){
      },
      setCheckAll(val){
        this.checkedGoods = val ? this.carts.map(carts => carts) : [];
      },
      cartSubmit(){
        this.$router.push({name : 'order', params : {checkedGoods : this.checkedGoods, totalPrice : this.totalPrice}})
      },
      //删除
      cartDel(){
        console.log(this.checkedGoods);
        axios({
          url : url.deleteCart,
          method : 'post',
          data : {deleteData : this.checkedGoods}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.initCart()
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
<style>
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
  .shoppingContent .van-checkbox__icon{
    font-size:0.512rem;
    width:0.853rem;
    height:0.853rem;
  }
  .shoppingContent .van-checkbox__icon, .shoppingContent .van-checkbox__label{
    line-height:0.853rem;
  }
  .singleContent .van-stepper__minus, .singleContent .van-stepper__plus{
    width:1.71rem;
    height:1.28rem;
    padding:0.213rem;
  }
  .singleContent .van-stepper__input{
    width:1.408rem;
    height:1.109rem;
    font-size:.6rem;
  }
  .account .van-submit-bar__bar{
    height:2.13rem;
    font-size:0.682rem;
  }
  .account .van-checkbox__icon{
    font-size:0.512rem;
    width:0.853rem;
    height:0.853rem;
  }
  .account .van-checkbox__icon, .account .van-checkbox__label{
    line-height:0.853rem;
  }
  .account .van-submit-bar .van-button{
    font-size:0.682rem;
    width:4.693rem;
  }
  .van-submit-bar__price-decimal{
    font-size:0.512rem;
  }
</style>
<style scoped>
  .navBar{
    font-size:0.683rem;
    height:1.96rem;
  }
  .singleContent{
    position:relative;
    top:0.2rem;
  }
  .singleCheck, .singleImg, .singleContent{
    height:4.6rem;
  }
  .singleCheck{
    padding-left:0.6rem;
    line-height:4.5rem;
  }
  .van-checkbox__icon{
    font-size:0.512rem;
  }
  .singleImg{
    text-align:center;
  }
  .singleImg > img{
    border:0.043rem solid #eee;
    margin:0.4rem;
  }
  .singleContent span{
    display:inline-block;
  }
  .singleTitle{
    width:100%;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  .singleTitle, .singlePrice{
    font-size:0.678rem;
    color:#ef694f;
  }
  .singlePrice{
    line-height:2.7rem;
  }
  .singleStepper{
    position:absolute;
    right:0.4rem;
    line-height:3rem
  }
  .shoppingContent{
    margin-bottom:4.13rem;
  }
  .van-row{
    height:4.6rem;
    border-bottom:0.043rem solid #eee;
  }
  .account{
    position:fixed;
    left:0;
    bottom:2.13rem;
    background-color:#fff;
    width:100%;
    z-index:1;
    border:solid 0.043rem #eee;
    overflow:hidden;
  }
  /*.account-button{*/
  /*float:right;*/
  /*}*/
  /*.allAccount{*/
  /*padding-left:0.4rem;*/
  /*font-size:0.6rem;*/
  /*}*/
  /*.van-cell-swipe__right{*/
  /*color:#ffffff;*/
  /*font-size:15px;*/
  /*width:65px;*/
  /*height:44px;*/
  /*display:inline-block;*/
  /*text-align:center;*/
  /*line-height:44px;*/
  /*background-color:#f44;*/
  /*}*/
</style>
