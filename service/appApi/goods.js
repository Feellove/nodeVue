const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) =>{
  fs.readFile('./dataJson/newGoods.json', 'utf8', (err, data) =>{
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) =>{
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() =>{
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error =>{
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

router.get('/insertAllCategory', async (ctx) =>{
  fs.readFile('./dataJson/category.json', 'utf8', (err, data) =>{
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) =>{
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(() =>{
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error =>{
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

router.get('/insertAllCategorySub', async (ctx) =>{
  fs.readFile('./dataJson/category_sub.json', 'utf8', (err, data) =>{
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) =>{
      console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() =>{
        saveCount++
        console.log('成功插入' + saveCount)
      }).catch(error =>{
        console.log('插入失败:' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

router.post('/getDetailGoodsInfo', async (ctx) =>{
  try{
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID : goodsId}).exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})

router.get('/getCategoryList', async (ctx) =>{
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().sort({ID : 1}).exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})

router.post('/getCategorySubList', async (ctx) =>{
  try{
    let categoryId = ctx.request.body.categoryId
    // let categoryId = 1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID : categoryId}).exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})

router.post('/getGoodsListByCategorySubID', async (ctx) =>{
  try{
    let categorySubId = ctx.request.body.categoryId
    // let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID : categorySubId}).exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})

//购物车操作
router.post('/insertAllCart', async (ctx) =>{
  let data = ctx.request.body
  console.log(data);
  const Cart = mongoose.model('Cart')
  //把商品内容信息写入数据库
  // data.map((value,index)=>{
  //   console.log(value);
  //   let cartInsert = new  Cart(value)
  //   cartInsert.save().then(() =>{
  //     console.log('成功插入')
  //   }).catch(error =>{
  //     console.log('插入失败:' + error)
  //   })
  // })
  let monInsert = new Cart(data);
  monInsert.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log('商品数据写入成功');
    }
  });
})//添加

router.post('/checkCart', async (ctx) =>{
  try{
    const Cart = mongoose.model('Cart')
    let result = await Cart.find().exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//查询

router.post('/updateCart', async (ctx) =>{
  try{
    let cartId = ctx.request.body.cartId
    let num = ctx.request.body.num
    const Cart = mongoose.model('Cart')
    let result = await Cart.update({ID : cartId}, {NUM : num}).exec()
    console.log(await Cart.find().exec());
    ctx.body = {code : 200, message : await Cart.find().exec()}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//更新

router.post('/deleteCart', async (ctx) =>{
  try{
    let deleteData = ctx.request.body.deleteData
    const Cart = mongoose.model('Cart')
    let result = '';
    for(let i = 0; i < deleteData.length; i++){
      result = await Cart.remove({ID : deleteData[i].ID}).exec()
    }
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//删除

//搜索操作
router.post('/insertKeyword', async (ctx) =>{
  let data = ctx.request.body
  console.log(data);
  const Keyword = mongoose.model('Keyword')
  let keyInsert = new Keyword(data);
  let result = await Keyword.find({NAME : data.NAME}).exec()
  console.log(result);
  console.log(result == '');
  if(result == ''){
    console.log(1);
    keyInsert.save().then(() =>{
      console.log('成功插入')
      ctx.body = {code : 200, message : keyInsert}
      console.log(ctx.response);
    }).catch(error =>{
      console.log('插入失败:' + error)
    })
  }
})//添加关键字

router.post('/checkKeyword', async (ctx) =>{
  try{
    const Keyword = mongoose.model('Keyword');
    let result = await Keyword.find().exec();
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//查询关键字

router.post('/deleteKeyword', async (ctx) =>{
  try{
    let name = ctx.request.body.name
    console.log(name);
    const Keyword = mongoose.model('Keyword')
    let result = name !== "" ? await Keyword.remove({NAME : name}).exec() : await Keyword.remove().exec()
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//删除

router.post('/checkGoods', async (ctx) =>{
  try{
    let name = ctx.request.body.name;
    console.log(name);
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({NAME : {$regex : name, $options : "$i"}}).exec()
    console.log(result);
    ctx.body = {code : 200, message : result}
  } catch (err) {
    ctx.body = {code : 500, message : err}
  }
})//查询商品

module.exports = router;
