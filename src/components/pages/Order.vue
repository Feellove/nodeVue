<template>
  <div>
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
        areaList : {
          province_list : {
            110000 : '北京市',
            120000 : '天津市'
          },
          city_list : {
            110100 : '北京市',
            110200 : '县',
            120100 : '天津市',
            120200 : '县'
          },
          county_list : {
            110101 : '东城区',
            110102 : '西城区',
            110105 : '朝阳区',
            110106 : '丰台区',
            120101 : '和平区',
            120102 : '河东区',
            120103 : '河西区',
            120104 : '南开区',
            120105 : '河北区',
            // ....
          }
        },
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
        this.$router.replace({name : "payment"})
      },
      onClickLeft(){
        this.$router.go(-1)
      }
    }
  };
</script>
<style scoped>
  .navBar{
    font-size:0.683rem;
    height:1.96rem;
  }
  .goodsContent{
    margin-bottom:2.13rem;
  }
</style>
