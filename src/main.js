// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem'
import {
  AddressEdit,
  AddressList,
  Area,
  Button,
  Card,
  Cell,
  CellGroup,
  CellSwipe,
  Checkbox,
  CheckboxGroup,
  Col,
  ContactCard,
  ContactEdit,
  ContactList,
  Field,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Icon,
  Lazyload,
  List,
  NavBar,
  Popup,
  Radio,
  RadioGroup,
  Row,
  Search,
  Stepper,
  SubmitBar,
  Swipe,
  SwipeItem,
  Switch,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  TreeSelect
} from 'vant'

Vue.use(Radio).use(RadioGroup).use(List).use(Area).use(AddressEdit).use(AddressList).use(Card).use(Popup).use(ContactCard).use(ContactList).use(ContactEdit).use(SubmitBar).use(Cell).use(CellGroup).use(CellSwipe).use(Icon).use(Stepper).use(Checkbox).use(CheckboxGroup).use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Switch).use(TreeSelect).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el : '#app',
  router,
  components : {App},
  template : '<App/>'
})
