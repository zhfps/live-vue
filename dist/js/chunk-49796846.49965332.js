(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49796846"],{"3c68":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Home"},[n("div",{staticClass:"date"},[e._v(e._s(e.sdate))]),n("div",{staticClass:"week"},[e._v(e._s(e.sweek))]),n("div",{staticClass:"time"},[e._v(e._s(e.stime))])])},a=[],i=(n("a3c3"),{name:"Home",data:function(){return{stime:"00:00:00",sdate:this.getDate(),sweek:this.getWeek()}},created:function(){this.setTime()},methods:{getTime:function(){var e=new Date,t=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();return t},getDate:function(){var e=new Date,t=e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日";return t},getWeek:function(){var e,t=new Date,n=t.getDay();return 0===n&&(e="星期天"),1===n&&(e="星期一"),2===n&&(e="星期二"),3===n&&(e="星期三"),4===n&&(e="星期四"),5===n&&(e="星期五"),6===n&&(e="星期六"),e},setTime:function(){var e=this;setInterval((function(){e.stime=e.getTime()}),1e3)}}}),c=i,u=n("2877"),r=Object(u["a"])(c,s,a,!1,null,null,null);t["default"]=r.exports},a3c3:function(e,t,n){}}]);
//# sourceMappingURL=chunk-49796846.49965332.js.map