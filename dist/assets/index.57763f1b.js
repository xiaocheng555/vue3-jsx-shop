import{c as e,a as t,d as n,r as o,u as r,b as a,e as s,w as i,f as c,T as d,B as p,i as m,g as u,h as l,o as _,j as h,F as f,k as E,l as b}from"./vendor.6c8c2553.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const g={},v=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`./${e}`)in g)return;g[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},L=[{path:"/",redirect:{name:"Home"}},{path:"/home",name:"Home",component:()=>v((()=>import("./index.7a98fe12.js")),["assets/index.7a98fe12.js","assets/index.79382820.css","assets/index.3895b6c3.css","assets/index.36abdde3.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/index.c77fe791.js","assets/index.1f329e5d.css"])},{path:"/category",name:"category",component:()=>v((()=>import("./index.b72dbd85.js")),["assets/index.b72dbd85.js","assets/index.68e8a0d3.css","assets/index.8cd774ab.css","assets/index.15719ffa.css","assets/index.01291678.css","assets/index.4d68c842.css","assets/good.9f30feb0.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css"])},{path:"/cart",name:"cart",component:()=>v((()=>import("./index.10449c00.js")),["assets/index.10449c00.js","assets/index.2ea6afe0.css","assets/index.3bf96acf.css","assets/index.650a012a.css","assets/index.4d68c842.css","assets/index.ac8d3efa.css","assets/index.54ccd6c3.css","assets/index.36abdde3.css","assets/cart.7e38b868.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/index.b2344599.js"])},{path:"/user",name:"user",component:()=>v((()=>import("./index.cbdb516b.js")),["assets/index.cbdb516b.js","assets/index.a4436252.css","assets/index.8cd774ab.css","assets/index.36abdde3.css","assets/user.154776ed.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/index.c77fe791.js","assets/index.1f329e5d.css"])},{path:"/user/setting",name:"setting",component:()=>v((()=>import("./index.400b2eb4.js")),["assets/index.400b2eb4.js","assets/index.f0c0bdc0.css","assets/index.3bf96acf.css","assets/index.8cd774ab.css","assets/index.15719ffa.css","assets/index.36abdde3.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/md5.692fc149.js","assets/md5.778c14fb.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/user.154776ed.js"])},{path:"/user/address",name:"address",component:()=>v((()=>import("./index.dfe7de59.js").then((function(e){return e.i}))),["assets/index.dfe7de59.js","assets/index.64e0dba5.css","assets/index.4d68c842.css","assets/index.8cd774ab.css","assets/index.3bf96acf.css","assets/index.ac8d3efa.css","assets/index.3ded2af8.css","assets/index.15719ffa.css","assets/index.4ed9daec.css","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/index.36abdde3.css"])},{path:"/user/about",name:"about",component:()=>v((()=>import("./index.2a0588f5.js")),["assets/index.2a0588f5.js","assets/index.36abdde3.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css"])},{path:"/product/:id",name:"product-detail",component:()=>v((()=>import("./index.84008950.js")),["assets/index.84008950.js","assets/index.0c63e7e7.css","assets/index.3ded2af8.css","assets/index.3bf96acf.css","assets/index.36abdde3.css","assets/cart.7e38b868.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/good.9f30feb0.js","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/index.b2344599.js"])},{path:"/product/list",name:"product-list",component:()=>v((()=>import("./index.197608c9.js")),["assets/index.197608c9.js","assets/index.b9c43ea5.css","assets/index.650a012a.css","assets/index.4d68c842.css","assets/index.54ccd6c3.css","assets/index.07dd3f0b.css","assets/index.8cd774ab.css","assets/index.15719ffa.css","assets/index.01291678.css","assets/index.3895b6c3.css","assets/good.9f30feb0.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/index.b2344599.js"])},{path:"/order/list",name:"order-list",component:()=>v((()=>import("./index.ace12d54.js")),["assets/index.ace12d54.js","assets/index.3d33813a.css","assets/index.07dd3f0b.css","assets/index.3895b6c3.css","assets/index.650a012a.css","assets/index.4d68c842.css","assets/index.36abdde3.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/order.035fef5e.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/index.b2344599.js"])},{path:"/order/create",name:"order-create",component:()=>v((()=>import("./index.e27f2682.js")),["assets/index.e27f2682.js","assets/index.2e3aa52a.css","assets/index.3bf96acf.css","assets/index.650a012a.css","assets/index.4d68c842.css","assets/index.8cd774ab.css","assets/index.ac8d3efa.css","assets/index.3ded2af8.css","assets/index.15719ffa.css","assets/index.4ed9daec.css","assets/index.36abdde3.css","assets/index.dfe7de59.js","assets/index.64e0dba5.css","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/cart.7e38b868.js","assets/index.b2344599.js","assets/order.035fef5e.js"])},{path:"/order/:id",name:"order-detail",component:()=>v((()=>import("./index.bd5e109a.js")),["assets/index.bd5e109a.js","assets/index.9c4b470d.css","assets/index.3bf96acf.css","assets/index.650a012a.css","assets/index.4d68c842.css","assets/index.3ded2af8.css","assets/index.4ed9daec.css","assets/index.36abdde3.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/index.c77fe791.js","assets/index.1f329e5d.css","assets/order.035fef5e.js","assets/index.b2344599.js"])},{path:"/login",name:"login",component:()=>v((()=>import("./index.daa548d3.js")),["assets/index.daa548d3.js","assets/index.16df34b1.css","assets/index.8cd774ab.css","assets/index.15719ffa.css","assets/index.36abdde3.css","assets/index.3bf96acf.css","assets/user.154776ed.js","assets/request.324758d0.js","assets/request.11eb7ae7.css","assets/vendor.6c8c2553.js","assets/vendor.b60dbf26.css","assets/md5.692fc149.js","assets/md5.778c14fb.css"])}],j=e({history:t(),routes:L});var y={components:{Tabbar:n({name:"tabbar",setup(){const e=o(0),t=o(!0),n=r(),l=a(),_=s((()=>l.state.cartCount)),h=[{name:"首页",icon:"wap-home-o",path:"/home"},{name:"分类",icon:"points",path:"/category"},{name:"购物车",icon:"shopping-cart-o",path:"/cart",isCart:!0},{name:"我的",icon:"user-o",path:"/user"}];return i((()=>n.path),(n=>{(n=>{const o=h.findIndex((e=>e.path===n));o>-1?(e.value=o,t.value=!0):t.value=!1})(n)}),{immediate:!0}),()=>{let n;return t.value?c("div",{class:"tabbar-wrap"},[c(u,{modelValue:e.value,"onUpdate:modelValue":t=>e.value=t},(o=n=h.map((e=>c(d,{icon:e.icon,onClick:()=>{j.push(e.path)}},{default:()=>[e.isCart?c(p,{content:_.value,offset:[-5,-23]},{default:()=>[e.name]}):e.name]}))),"function"==typeof o||"[object Object]"===Object.prototype.toString.call(o)&&!m(o)?n:{default:()=>[n]}))]):void 0;var o}}})}};y.render=function(e,t,n,o,r,a){const s=l("router-view"),i=l("Tabbar");return _(),h(f,null,[c(s),c(i)],64)};var O=E({state:()=>({cartCount:0}),mutations:{setCartCount(e,t){e.cartCount=t}},actions:{},getters:{}});b(y).use(j).use(O).mount("#app");export{j as r};