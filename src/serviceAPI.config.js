const BASEURL = "https://www.easy-mock.com/mock/5b34982ed2c8ea366cc2ea32/example/"
const LOCALURL = "http://localhost:3333/"
const URL = {
  getShoppingMallInfo : BASEURL + 'index',
  getGoodsInfo : BASEURL + 'getGoodsInfo',
  registerUser : LOCALURL + 'user/register', //用户注册接口
  login : LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo : LOCALURL + 'goods/getDetailGoodsInfo',   //得到商品详细数据
  getCategoryList : LOCALURL + 'goods/getCategoryList',         //得到大类信息
  getCategorySubList : LOCALURL + 'goods/getCategorySubList',         //得到大类信息
  getGoodsListByCategorySubID : LOCALURL + 'goods/getGoodsListByCategorySubID',         //得到大类信息
  insertAllCart : LOCALURL + 'goods/insertAllCart',   //插入购物车
  checkCart : LOCALURL + 'goods/checkCart',           //查看购物车
  updateCart : LOCALURL + 'goods/updateCart',         //更新购物车
  deleteCart : LOCALURL + 'goods/deleteCart',         //删除购物车
  insertKeyword : LOCALURL + 'goods/insertKeyword',   //插入关键字
  checkKeyword : LOCALURL + 'goods/checkKeyword',      //查看关键字
  deleteKeyword : LOCALURL + 'goods/deleteKeyword',      //删除关键字
  checkGoods : LOCALURL + 'goods/checkGoods',     //搜索商品
  insertOrder : LOCALURL + 'goods/insertOrder',      //插入订单
  checkOrder : LOCALURL + 'goods/checkOrder',      //查看订单
  updateOrder : LOCALURL + 'goods/updateOrder',      //更新订单
}

module.exports = URL
