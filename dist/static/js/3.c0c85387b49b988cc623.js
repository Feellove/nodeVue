webpackJsonp([3],{ajo5:function(t,o){},lB2f:function(t,o,e){"use strict";var s={render:function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"search-bar"},[o("van-search",{attrs:{placeholder:"请输入商品名称"},on:{focus:this.toSearch}})],1)},staticRenderFns:[]};var a=e("VU/8")({data:function(){return{}},methods:{toSearch:function(){this.$router.push("/searchContent")}}},s,!1,function(t){e("m7Y8")},null,null);o.a=a.exports},m7Y8:function(t,o){},tW06:function(t,o){},wIYj:function(t,o,e){"use strict";var s=e("cxpW"),a={props:["goods"],data:function(){return{errorImg:'this.src="'+e("v3F0")+'"'}},filters:{moneyFilter:function(t){return Object(s.a)(t)}},methods:{goGoodsPage:function(){this.$router.push({name:"Goods",query:{goodsId:this.goods.goodsId}})}}},r={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"goods-info",on:{click:t.goGoodsPage}},[t.goods.goodsOldPrice?e("div",[e("img",{staticClass:"subImage",attrs:{src:t.goods.goodsImage,onerror:t.errorImg}}),t._v(" "),e("div",{staticClass:"subName"},[t._v(t._s(t.goods.goodsName))]),t._v(" "),e("div",{staticClass:"subPrice"},[e("span",{staticClass:"subNewPrice"},[t._v("￥"+t._s(t._f("moneyFilter")(t.goods.goodsPrice)))]),e("span",{staticClass:"subOldPrice"},[t._v("￥"+t._s(t._f("moneyFilter")(t.goods.goodsOldPrice)))])])]):e("div",[e("div",{staticClass:"goods-image"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.goods.goodsImage,expression:"goods.goodsImage"}],attrs:{width:"90%",onerror:t.errorImg}})]),t._v(" "),e("div",{staticClass:"goods-name"},[t._v(t._s(t.goods.goodsName))]),t._v(" "),e("div",{staticClass:"goods-price"},[t._v("￥"+t._s(t._f("moneyFilter")(t.goods.goodsPrice)))])])])},staticRenderFns:[]};var n=e("VU/8")(a,r,!1,function(t){e("tW06")},"data-v-573dc27e",null);o.a=n.exports},xAP8:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});e("GKy3");var s=e("4vvA"),a=e.n(s),r=e("mtWM"),n=e.n(r),i=e("1GZU"),c=e.n(i),d=e("lB2f"),u=e("/Rkq"),g=e("cxpW"),l=e("wIYj"),v={components:{searchBar:d.a,tabBar:u.a,goodsInfo:l.a},data:function(){return{active:0,showIndex:0,postVal:1,tabNum:5,tabs:[],checked:!0,categories:[],categorySub:[],id:""}},created:function(){this.initCateGory()},computed:{},filters:{moneyFilter:function(t){return Object(g.a)(t)}},methods:{initCateGory:function(){var t=this;n()({url:c.a.getCategoryList,method:"get"}).then(function(o){200==o.data.code&&o.data.message?(t.tabs=o.data.message,t.id=t.$route.query.id?t.$route.query.id:t.tabs[0].ID,t.active=t.id-1,t.chooseCategory(t.id)):a()("服务器错误，数据获取失败")}).catch(function(t){console.log(t)})},chooseCategory:function(t,o){var e=this,s=o?this.tabs[t].ID:t;this.showIndex=0,n()({url:c.a.getCategorySubList,method:"post",data:{categoryId:s}}).then(function(t){200==t.data.code&&t.data.message?(e.categories=t.data.message,e.getCategorySubByCategoryId(e.categories[0].ID)):a()("服务器错误，数据获取失败")}).catch(function(t){console.log(t)})},chooseMenu:function(t,o){this.showIndex=t,this.getCategorySubByCategoryId(o)},getCategorySubByCategoryId:function(t){var o=this;n()({url:c.a.getGoodsListByCategorySubID,method:"post",data:{categoryId:t}}).then(function(t){200==t.data.code&&t.data.message?o.categorySub=t.data.message:a()("服务器错误，数据取得失败")}).catch(function(t){console.log(t)})}}},f={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("search-bar"),t._v(" "),e("div",{staticClass:"tab-bar"},[e("van-tabs",{ref:"itemId",attrs:{active:t.active,"swipe-threshold":t.tabNum,sticky:""},on:{click:t.chooseCategory}},t._l(t.tabs,function(o,s){return e("van-tab",{key:s,attrs:{title:o.MALL_CATEGORY_NAME,id:o.ID}},[e("van-row",[e("van-col",{attrs:{span:"5"}},[e("div",{attrs:{id:"leftNav"}},[e("ul",{staticClass:"left-ul"},t._l(t.categories,function(o,s){return e("li",{key:s,class:{activeLi:s==t.showIndex},on:{click:function(e){t.chooseMenu(s,o.ID)}}},[t._v(t._s(o.MALL_SUB_NAME))])}))])]),t._v(" "),e("van-col",{attrs:{span:"19"}},[e("div",{staticClass:"right-content"},[e("van-row",t._l(t.categorySub,function(t,o){return e("van-col",{key:o,staticStyle:{"background-color":"#fff",height:"10rem",margin:"0 0.26rem 0.26rem"},attrs:{span:"11"}},[e("goods-info",{attrs:{goods:{goodsId:t.ID,goodsImage:t.IMAGE1,goodsName:t.NAME,goodsPrice:t.PRESENT_PRICE,goodsOldPrice:t.ORI_PRICE}}})],1)}))],1)])],1)],1)}))],1),t._v(" "),e("tab-bar",{attrs:{postVal:t.postVal}})],1)},staticRenderFns:[]};var h=e("VU/8")(v,f,!1,function(t){e("xo0z"),e("ajo5")},"data-v-250a7f31",null);o.default=h.exports},xo0z:function(t,o){}});
//# sourceMappingURL=3.c0c85387b49b988cc623.js.map