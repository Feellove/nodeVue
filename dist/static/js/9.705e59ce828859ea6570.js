webpackJsonp([9],{"/0wt":function(e,r){},SaQH:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});s("GKy3");var a=s("4vvA"),t=s.n(a),o=s("mtWM"),n=s.n(o),i=s("1GZU"),c=s.n(i),l={data:function(){return{username:"",password:"",openLoading:!1,usernameErrorMsg:"",passwordErrorMsg:""}},methods:{goBack:function(){this.$router.go(-1)},registerAction:function(){this.checkForm()&&this.axiosRegisterUser()},axiosRegisterUser:function(){var e=this;this.openLoading=!0,n()({url:c.a.registerUser,method:"post",data:{userName:this.username,password:this.password}}).then(function(r){console.log(r),200==r.data.code?(t.a.success(r.data.message),e.$router.push("/login")):(console.log(r.data.message),e.openLoading=!1,t.a.fail("注册失败"))}).catch(function(r){console.log(r),t.a.fail("注册失败"),e.openLoading=!1})},checkForm:function(){var e=!0;return this.username.length<5?(this.usernameErrorMsg="用户名不能少于5位",e=!1):this.usernameErrorMsg="",this.password.length<6?(this.passwordErrorMsg="密码不能少于6位",e=!1):this.passwordErrorMsg="",e}}},u={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",[s("van-nav-bar",{attrs:{title:"用户注册","left-text":"返回","left-arrow":""},on:{"click-left":e.goBack}}),e._v(" "),s("div",{staticClass:"register-panel"},[s("van-field",{attrs:{label:"用户名",icon:"clear",placeholder:"请输入用户名",required:"","error-message":e.usernameErrorMsg},on:{"click-icon":function(r){e.username=""}},model:{value:e.username,callback:function(r){e.username=r},expression:"username"}}),e._v(" "),s("van-field",{attrs:{type:"password",label:"密码",placeholder:"请输入密码",required:"","error-message":e.passwordErrorMsg},model:{value:e.password,callback:function(r){e.password=r},expression:"password"}}),e._v(" "),s("div",{staticClass:"register-button"},[s("van-button",{attrs:{type:"primary",size:"large",loading:e.openLoading},on:{click:e.registerAction}},[e._v("马上注册")])],1)],1)],1)},staticRenderFns:[]};var d=s("VU/8")(l,u,!1,function(e){s("/0wt")},"data-v-3c1ff60e",null);r.default=d.exports}});
//# sourceMappingURL=9.705e59ce828859ea6570.js.map