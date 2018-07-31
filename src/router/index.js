import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes : [{
    path : '/',
    name : 'ShoppingMall ',
    component : resolve => require(['@/components/pages/ShoppingMall'], resolve)
  }, {
    path : '/register',
    name : 'Register',
    component : resolve => require(['@/components/pages/Register'], resolve)
  }, {
    path : '/login',
    name : 'Login',
    component : resolve => require(['@/components/pages/Login'], resolve)
  }, {
    path : '/Goods',
    name : 'Goods',
    component : resolve => require(['@/components/pages/Goods'], resolve)
  }, {
    path : '/Category',
    name : 'Category',
    component : resolve => require(['@/components/pages/Category'], resolve)
  }, {
    path : '/ShoppingCart',
    name : 'ShoppingCart',
    component : resolve => require(['@/components/pages/ShoppingCart'], resolve)
  }, {
    path : '/order',
    name : 'order',
    component : resolve => require(['@/components/pages/Order'], resolve)
  }, {
    path : '/payment',
    name : 'payment',
    component : resolve => require(['@/components/pages/Payment'], resolve)
  }, {
    path : '/userInfo',
    name : 'userInfo',
    component : resolve => require(['@/components/pages/userInfo'], resolve)
  }, {
    path : '/searchContent',
    name : 'searchContent',
    component : resolve => require(['@/components/pages/searchContent'], resolve)
  }, {
    path : '/orderList',
    name : 'orderList',
    component : resolve => require(['@/components/pages/orderList'], resolve)
  }]
})
