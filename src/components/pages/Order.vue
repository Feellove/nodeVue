<template>
  <div id="order">
    <div class="navBar">
      <van-nav-bar title="填写订单" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
    </div>
    <!-- 联系人卡片 -->
    <van-contact-card :type="cardType" :name="currentContact.name" :tel="currentContact.tel" :address="currentContact.address" @click="showList = true"/>
    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-address-list v-model="chosenContactId" :list="list" @add="onAdd" @edit="onEdit" @select="onSelect"/>
      <!--<van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/>-->
    </van-popup>
    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-address-edit :contact-info="editingContact" :area-list="areaList" :is-edit="isEdit" @save="onSave" @delete="onDelete"/>
    </van-popup>
    <div class="goodsContent">
      <van-card v-for="(item,index) in checkedGoods" :key="index" :title="item.NAME" :num="item.NUM" :price="item.PRICE" :thumb="item.IMAGE"/>
    </div>
    <van-submit-bar :price="totalPrice" label="总计：" buttonText="提交订单" :loading="isSubmit" :disabled="isDisabled" @submit="onSubmit"/>
  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'

  export default {
    data(){
      return {
        chosenContactId : null,
        editingContact : {},
        showList : false,
        showEdit : false,
        isEdit : false,
        list : [{
          name : '张三',
          tel : '13000000000',
          address : '兰光科技园b713',
          id : 0
        }],
        areaList : '',
        isSubmit : false,
        isDisabled : false,
        checkedGoods : [],
        totalPrice : 0
      };
    },
    created(){
      this.checkedGoods = this.$route.params.checkedGoods
      this.totalPrice = this.$route.params.totalPrice
      this.initList()
    },
    computed : {
      cardType(){
        return this.chosenContactId !== null ? 'edit' : 'add';
      },

      currentContact(){
        const id = this.chosenContactId;
        return id !== null ? this.list.filter(item => item.id === id)[0] : {};
      }
    },

    methods : {
      //初始化联系人
      initList(){

      },
      // 添加联系人
      onAdd(){
        this.editingContact = {id : this.list.length};
        this.isEdit = false;
        this.showEdit = true;
      },

      // 编辑联系人
      onEdit(item){
        this.isEdit = true;
        this.showEdit = true;
        this.editingContact = item;
      },

      // 选中联系人
      onSelect(){
        this.showList = false;
      },

      // 保存联系人
      onSave(info){
        this.showEdit = false;
        this.showList = false;

        if(this.isEdit){
          this.list = this.list.map(item => item.id === info.id ? info : item);
        } else {
          this.list.push(info);
        }
        this.chosenContactId = info.id;
      },

      // 删除联系人
      onDelete(info){
        this.showEdit = false;
        this.list = this.list.filter(item => item.id !== info.id);
        if(this.chosenContactId === info.id){
          this.chosenContactId = null;
        }
      },
      onSubmit(){
        this.isSubmit = true;
        console.log(this.checkedGoods);
        console.log(this.checkedGoods);
        axios({
          url : url.deleteCart,
          method : 'post',
          data : {deleteData : this.checkedGoods}
        }).then(response =>{
          if(response.data.code == 200 && response.data.message){
            this.$router.replace({name : "payment", params : {data : this.checkedGoods, totalPrice : this.totalPrice}})
          } else {
            Toast('服务器错误，数据取得失败')
          }
        }).catch(error =>{
          console.log(error)
        })

      },
      onClickLeft(){
        this.$router.go(-1)
      }
    }
  };
</script>
<style>
  #order .van-contact-card--add{
    line-height:1.707rem;
  }
  #order .van-contact-card__content{
    padding:0.64rem 0.427rem;
  }
  #order .van-contact-card--add .van-contact-card__icon{
    width:1.707rem;
    font-size:1.707rem;
  }
  #order .van-contact-card__icon{
    margin-right:0.427rem;
  }
  #order .van-contact-card__text{
    line-height:0.853rem;
    font-size:0.6rem
  }
  #order .van-contact-card__arrow{
    right:0.427rem;
    font-size:0.512rem;
  }
  #order .van-card{
    height:4.267rem;
    font-size:0.683rem;
    padding:0.213rem 0.64rem 0.213rem 4.907rem;
  }
  #order .van-card__thumb{
    top:0.213rem;
    left:0.64rem;
    width:3.84rem;
    height:3.84rem;
  }
  #order .van-card__title{
    max-height:1.707rem;
  }
  #order .van-card__desc, .van-card__title{
    line-height:0.853rem;
  }
  #order .van-card__price{
    font-size:0.6rem;
  }
  #order .van-card__num, .van-card__price{
    min-width:3.413rem;
    line-height:0.853rem;
  }
  #order .van-card__num{
    font-size:0.512rem;
  }
  #order .van-submit-bar__bar{
    height:2.13rem;
    font-size:0.683rem;
  }
  #order .van-submit-bar__price{
    padding-right:0.512rem;
  }
  #order .van-submit-bar .van-button{
    width:4.693rem;
    font-size:0.683rem
  }
  #order .van-submit-bar__price-decimal{
    font-size:0.512rem;
  }
  #order .van-button--normal{
    padding:0 0.64rem;
    font-size:0.6rem;
  }
  #order .van-address-list__group{
    padding-bottom:1.707rem;
  }
  #order .van-cell{
    padding:0.427rem 0.64rem;
    line-height:1.024rem;
    font-size:0.6rem;
  }
  #order .van-address-list .van-cell__value{
    padding-right:1.451rem;
  }
  #order .van-radio__input{
    height:0.853rem;
  }
  #order .van-radio .van-icon{
    font-size:0.853rem;
  }
  #order .van-address-list .van-radio__label{
    margin-left:1.365rem;
  }
  #order .van-radio__label{
    line-height:0.853rem;
    margin-left:0.427rem;
  }
  #order .van-address-list__name{
    font-size:0.6rem;
  }
  #order .van-address-list__address{
    font-size:0.512rem;
  }
  #order .van-address-list__edit{
    right:0.64rem;
    font-size:0.853rem;
  }
  #order .van-address-list__add .van-icon-add{
    font-size:0.853rem;
  }
  #order .van-cell__left-icon, #order .van-cell__right-icon{
    font-size:0.683rem;
    line-height:1.024rem;
    margin-right:0.213rem;
  }
</style>
<style scoped>
  .navBar{
    font-size:0.683rem;
    height:1.96rem;
  }
  .goodsContent{
    margin-bottom:2.13rem;
  }
</style>
